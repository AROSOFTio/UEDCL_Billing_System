<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMeterRequest;
use App\Models\Meter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MeterController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Meter::query()->with('customer')->latest();

        $query->when($request->filled('customer_id'), function ($builder) use ($request) {
            $builder->where('customer_id', $request->integer('customer_id'));
        });

        $query->when($request->filled('status'), function ($builder) use ($request) {
            $builder->where('status', $request->string('status'));
        });

        $query->when($request->filled('search'), function ($builder) use ($request) {
            $search = $request->string('search');

            $builder->where(function ($inner) use ($search) {
                $inner->where('meter_number', 'like', "%{$search}%")
                    ->orWhere('meter_type', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        });

        return response()->json($query->get());
    }

    public function store(StoreMeterRequest $request): JsonResponse
    {
        $meter = Meter::query()->create($request->validated());

        return response()->json([
            'message' => 'Meter created successfully.',
            'data' => $meter->load('customer'),
        ], 201);
    }

    public function show(Meter $meter): JsonResponse
    {
        return response()->json($meter->load(['customer', 'readings', 'bills']));
    }

    public function update(StoreMeterRequest $request, Meter $meter): JsonResponse
    {
        $meter->update($request->validated());

        return response()->json([
            'message' => 'Meter updated successfully.',
            'data' => $meter->load('customer'),
        ]);
    }

    public function destroy(Meter $meter): JsonResponse
    {
        $meter->delete();

        return response()->json([
            'message' => 'Meter deleted successfully.',
        ]);
    }
}
