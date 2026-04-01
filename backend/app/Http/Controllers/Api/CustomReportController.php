<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Reports\CustomReportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomReportController extends Controller
{
    public function __construct(private readonly CustomReportService $customReportService)
    {
    }

    public function generate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'report_type' => 'required|string|in:billing_history,payment_history,complaint_log,revenue_summary',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'nullable|string',
        ]);

        $data = $this->customReportService->generate(
            user: $request->user(),
            reportType: $validated['report_type'],
            startDate: $validated['start_date'] ?? null,
            endDate: $validated['end_date'] ?? null,
            statusFilter: $validated['status'] ?? null
        );

        return response()->json([
            'message' => 'Custom report generated successfully.',
            'report_type' => $validated['report_type'],
            'data' => $data,
        ]);
    }
}
