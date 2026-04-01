<?php

namespace App\Services\Reports;

use App\Models\Bill;
use App\Models\Complaint;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class CustomReportService
{
    public function generate($user, string $reportType, ?string $startDate, ?string $endDate, ?string $statusFilter): array
    {
        return match ($reportType) {
            'billing_history' => $this->billingHistory($user, $startDate, $endDate, $statusFilter),
            'payment_history' => $this->paymentHistory($user, $startDate, $endDate, $statusFilter),
            'complaint_log'   => $this->complaintLog($user, $startDate, $endDate, $statusFilter),
            'revenue_summary' => $this->revenueSummary($user, $startDate, $endDate),
            default           => [],
        };
    }

    private function billingHistory($user, ?string $startDate, ?string $endDate, ?string $statusFilter): array
    {
        $query = Bill::query()->with(['customer:id,name,account_number', 'meter:id,meter_number']);

        if ($user->role === 'customer') {
            $query->where('customer_id', $user->id);
        }

        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }
        if ($statusFilter && $statusFilter !== 'all') {
            $query->where('status', $statusFilter);
        }

        return $query->orderByDesc('created_at')->get()->toArray();
    }

    private function paymentHistory($user, ?string $startDate, ?string $endDate, ?string $statusFilter): array
    {
        $query = Payment::query()->with([
            'bill' => function ($q) {
                $q->select('id', 'customer_id', 'bill_number')->with('customer:id,name,account_number');
            }
        ]);

        if ($user->role === 'customer') {
            $query->whereHas('bill', function ($q) use ($user) {
                $q->where('customer_id', $user->id);
            });
        }

        if ($startDate) {
            $query->whereDate('paid_at', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('paid_at', '<=', $endDate);
        }
        if ($statusFilter && $statusFilter !== 'all') {
            $query->where('status', $statusFilter);
        }

        return $query->orderByDesc('paid_at')->get()->toArray();
    }

    private function complaintLog($user, ?string $startDate, ?string $endDate, ?string $statusFilter): array
    {
        $query = Complaint::query()->with('customer:id,name,account_number');

        if ($user->role === 'customer') {
            $query->where('customer_id', $user->id);
        }

        if ($startDate) {
            $query->whereDate('created_at', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('created_at', '<=', $endDate);
        }
        if ($statusFilter && $statusFilter !== 'all') {
            $query->where('status', $statusFilter);
        }

        return $query->orderByDesc('created_at')->get()->toArray();
    }

    private function revenueSummary($user, ?string $startDate, ?string $endDate): array
    {
        if ($user->role !== 'administrator') {
            throw new AccessDeniedHttpException('Only administrators can generate revenue summary reports.');
        }

        $paymentsQuery = Payment::query()->where('status', 'success');
        $billsQuery = Bill::query();

        if ($startDate) {
            $paymentsQuery->whereDate('paid_at', '>=', $startDate);
            $billsQuery->whereDate('created_at', '>=', $startDate);
        }
        if ($endDate) {
            $paymentsQuery->whereDate('paid_at', '<=', $endDate);
            $billsQuery->whereDate('created_at', '<=', $endDate);
        }

        $totalCollected = (float) $paymentsQuery->sum('amount');
        $totalBilled = (float) $billsQuery->sum('total_amount');

        $collectionRate = $totalBilled > 0 ? round(($totalCollected / $totalBilled) * 100, 2) : 0;

        return [
            [
                'metric' => 'Total Billed Value',
                'value' => $totalBilled,
            ],
            [
                'metric' => 'Total Collected Revenue',
                'value' => $totalCollected,
            ],
            [
                'metric' => 'Collection Efficiency Rate',
                'value' => $collectionRate . '%',
            ],
            [
                'metric' => 'Total Transaction Count',
                'value' => $paymentsQuery->count(),
            ],
        ];
    }
}
