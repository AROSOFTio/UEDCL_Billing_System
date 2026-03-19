<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\Complaint;
use App\Models\ComplaintReply;
use App\Models\Customer;
use App\Models\Meter;
use App\Models\MeterReading;
use App\Models\Notification;
use App\Models\Payment;
use App\Models\Receipt;
use App\Models\Role;
use App\Models\Tariff;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $billingRole = Role::query()->where('slug', 'billing_officer')->first();
        $helpdeskRole = Role::query()->where('slug', 'helpdesk_officer')->first();
        $customerRole = Role::query()->where('slug', 'customer')->first();

        $billingOfficer = User::query()->updateOrCreate(
            ['email' => 'billing@uedcl.local'],
            [
                'role_id' => $billingRole?->id,
                'name' => 'Billing Officer',
                'phone' => '+256700000002',
                'password' => Hash::make('password123'),
                'status' => 'active',
            ]
        );

        $helpdeskOfficer = User::query()->updateOrCreate(
            ['email' => 'helpdesk@uedcl.local'],
            [
                'role_id' => $helpdeskRole?->id,
                'name' => 'Helpdesk Officer',
                'phone' => '+256700000003',
                'password' => Hash::make('password123'),
                'status' => 'active',
            ]
        );

        $customerUser = User::query()->updateOrCreate(
            ['email' => 'customer@uedcl.local'],
            [
                'role_id' => $customerRole?->id,
                'name' => 'Grace Nansubuga',
                'phone' => '+256700111222',
                'password' => Hash::make('password123'),
                'status' => 'active',
            ]
        );

        $customer = Customer::query()->updateOrCreate(
            ['account_number' => 'UEDCL-100245'],
            [
                'user_id' => $customerUser->id,
                'name' => 'Grace Nansubuga',
                'phone' => '+256700111222',
                'email' => 'customer@uedcl.local',
                'national_id' => 'CM92011401A',
                'address' => 'Kiwatule, Kampala',
                'status' => 'active',
            ]
        );

        $meter = Meter::query()->updateOrCreate(
            ['meter_number' => 'MT-309225'],
            [
                'customer_id' => $customer->id,
                'meter_type' => 'Domestic',
                'installation_date' => '2025-11-01',
                'status' => 'active',
                'location' => 'Kiwatule Service Area',
            ]
        );

        MeterReading::query()->updateOrCreate(
            ['meter_id' => $meter->id, 'reading_date' => '2026-03-01'],
            [
                'captured_by' => $billingOfficer->id,
                'previous_reading' => 4320,
                'current_reading' => 4615,
                'units_consumed' => 295,
                'notes' => 'Routine monthly reading',
            ]
        );

        MeterReading::query()->updateOrCreate(
            ['meter_id' => $meter->id, 'reading_date' => '2026-04-01'],
            [
                'captured_by' => $billingOfficer->id,
                'previous_reading' => 4615,
                'current_reading' => 4860,
                'units_consumed' => 245,
                'notes' => 'Routine monthly reading',
            ]
        );

        $tariff = Tariff::query()->updateOrCreate(
            ['name' => 'Domestic Standard'],
            [
                'unit_price' => 550,
                'fixed_charge' => 20000,
                'effective_from' => '2026-01-01',
                'status' => 'active',
            ]
        );

        $paidBill = Bill::query()->updateOrCreate(
            ['bill_number' => 'BILL-2026-0001'],
            [
                'customer_id' => $customer->id,
                'meter_id' => $meter->id,
                'tariff_id' => $tariff->id,
                'billing_cycle' => '2026-03',
                'previous_reading' => 4320,
                'current_reading' => 4615,
                'units_consumed' => 295,
                'tariff_rate' => 550,
                'fixed_charge' => 20000,
                'energy_charge' => 162250,
                'total_amount' => 182250,
                'due_date' => '2026-03-28',
                'status' => 'paid',
            ]
        );

        $unpaidBill = Bill::query()->updateOrCreate(
            ['bill_number' => 'BILL-2026-0002'],
            [
                'customer_id' => $customer->id,
                'meter_id' => $meter->id,
                'tariff_id' => $tariff->id,
                'billing_cycle' => '2026-04',
                'previous_reading' => 4615,
                'current_reading' => 4860,
                'units_consumed' => 245,
                'tariff_rate' => 550,
                'fixed_charge' => 20000,
                'energy_charge' => 134750,
                'total_amount' => 154750,
                'due_date' => '2026-04-28',
                'status' => 'unpaid',
            ]
        );

        $payment = Payment::query()->updateOrCreate(
            ['payment_number' => 'PAY-2026-0001'],
            [
                'bill_id' => $paidBill->id,
                'payment_method' => 'mobile_money',
                'amount' => 182250,
                'reference_number' => 'MM-998822',
                'recorded_by' => $billingOfficer->id,
                'status' => 'success',
                'paid_at' => now(),
            ]
        );

        Receipt::query()->updateOrCreate(
            ['payment_id' => $payment->id],
            [
                'receipt_number' => 'RCT-2026-0001',
                'issued_at' => now(),
                'receipt_data' => [
                    'customer' => $customer->name,
                    'amount' => 182250,
                    'payment_method' => 'mobile_money',
                    'bill_number' => $paidBill->bill_number,
                ],
            ]
        );

        Notification::query()->updateOrCreate(
            ['recipient' => $customer->phone, 'type' => 'bill_generated'],
            [
                'customer_id' => $customer->id,
                'channel' => 'sms',
                'message' => 'Dear Grace Nansubuga, your electricity bill of UGX 154,750 has been generated. Due date: 2026-04-28.',
                'status' => 'success',
                'metadata' => ['mode' => 'mock', 'bill_number' => $unpaidBill->bill_number],
                'sent_at' => now(),
            ]
        );

        Notification::query()->updateOrCreate(
            ['recipient' => $customer->phone, 'type' => 'payment_received'],
            [
                'customer_id' => $customer->id,
                'channel' => 'sms',
                'message' => 'Dear Grace Nansubuga, payment of UGX 182,250 has been received successfully.',
                'status' => 'success',
                'metadata' => ['mode' => 'mock', 'bill_number' => $paidBill->bill_number],
                'sent_at' => now(),
            ]
        );

        $complaint = Complaint::query()->updateOrCreate(
            ['complaint_number' => 'CMP-2026-0001'],
            [
                'customer_id' => $customer->id,
                'subject' => 'Estimated reading dispute',
                'message' => 'The latest bill appears higher than the usual monthly consumption pattern.',
                'category' => 'billing',
                'status' => 'in_progress',
            ]
        );

        ComplaintReply::query()->updateOrCreate(
            ['complaint_id' => $complaint->id, 'user_id' => $helpdeskOfficer->id],
            [
                'reply' => 'Your complaint has been received and assigned for review.',
            ]
        );
    }
}
