<?php

namespace App\Services\Reports;

use App\Models\Bill;
use App\Models\Complaint;
use App\Models\Customer;
use App\Models\Meter;
use App\Models\Payment;

class ReportService
{
    public function summary(): array
    {
        return [
            'total_customers' => Customer::query()->count(),
            'total_meters' => Meter::query()->count(),
            'total_bills_generated' => Bill::query()->count(),
            'total_unpaid_bills' => Bill::query()->where('status', 'unpaid')->count(),
            'total_payments' => Payment::query()->count(),
            'unresolved_complaints' => Complaint::query()->whereIn('status', ['pending', 'in_progress'])->count(),
        ];
    }
}
