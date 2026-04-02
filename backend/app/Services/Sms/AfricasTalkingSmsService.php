<?php

namespace App\Services\Sms;

use AfricasTalking\SDK\AfricasTalking;
use Exception;
use Illuminate\Support\Facades\Log;

class AfricasTalkingSmsService implements SmsServiceInterface
{
    private ?AfricasTalking $at = null;
    private ?string $senderId = null;

    public function __construct(string $username, string $apiKey, ?string $senderId = null)
    {
        try {
            $this->at = new AfricasTalking($username, $apiKey);
            $this->senderId = $senderId;
        } catch (Exception $e) {
            Log::error("Failed to initialize AfricasTalking SDK: " . $e->getMessage());
        }
    }

    public function send(string $recipient, string $message, array $metadata = []): array
    {
        if (!$this->at) {
            return [
                'status' => 'failed',
                'error' => 'SDK not initialized correctly. Check API credentials.',
            ];
        }

        try {
            $sms = $this->at->sms();
            
            // Format phone number to international E.164 if they entered standard Ugandan '07...'
            if (str_starts_with($recipient, '0')) {
                $recipient = '+256' . ltrim($recipient, '0');
            }

            $options = [
                'to'      => $recipient,
                'message' => $message,
            ];

            if ($this->senderId) {
                $options['from'] = $this->senderId;
            }

            $response = $sms->send($options);

            return [
                'status' => 'success',
                'response' => $response,
            ];
        } catch (Exception $e) {
            Log::error("AfricasTalking SMS failed to send to {$recipient}: " . $e->getMessage());
            
            return [
                'status' => 'failed',
                'error' => $e->getMessage(),
            ];
        }
    }
}
