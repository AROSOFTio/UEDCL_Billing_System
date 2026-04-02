<?php

namespace App\Providers;

use App\Models\Setting;
use App\Services\Sms\AfricasTalkingSmsService;
use App\Services\Sms\MockSmsService;
use App\Services\Sms\SmsServiceInterface;
use Illuminate\Database\QueryException;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(SmsServiceInterface::class, function ($app) {
            try {
                $enabled = Setting::getCustom('sms.enabled', 'false');
                $provider = Setting::getCustom('sms.provider', 'mock');
            } catch (QueryException $e) {
                // If database hasn't migrated yet during setup, default to mock
                $enabled = 'false';
                $provider = 'mock';
            }

            if ($enabled === 'true' && $provider === 'africastalking') {
                try {
                    return new AfricasTalkingSmsService(
                        Setting::getCustom('sms.at_username', 'sandbox'),
                        Setting::getCustom('sms.at_api_key', ''),
                        Setting::getCustom('sms.sender_id', null)
                    );
                } catch (\Exception $e) {
                    return new MockSmsService();
                }
            }

            return new MockSmsService();
        });
    }

    public function boot(): void
    {
        //
    }
}
