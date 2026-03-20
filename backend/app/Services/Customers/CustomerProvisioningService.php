<?php

namespace App\Services\Customers;

use App\Models\Customer;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CustomerProvisioningService
{
    public const DEFAULT_PORTAL_PASSWORD = 'password123';

    public function create(array $attributes): array
    {
        return DB::transaction(function () use ($attributes): array {
            [$user, $temporaryPassword] = $this->resolveCustomerUser($attributes);

            $customer = Customer::query()->create([
                ...$attributes,
                'user_id' => $user->id,
            ]);

            $this->syncUser($user, $attributes);

            return [
                'customer' => $customer->fresh()->load('user'),
                'credentials' => [
                    'email' => $user->email,
                    'temporary_password' => $temporaryPassword,
                ],
            ];
        });
    }

    public function update(Customer $customer, array $attributes): Customer
    {
        return DB::transaction(function () use ($customer, $attributes): Customer {
            $customer->loadMissing('user');
            $user = $customer->user;

            if (! $user) {
                [$user] = $this->resolveCustomerUser($attributes);
            }

            $this->syncUser($user, $attributes);

            $customer->update([
                ...$attributes,
                'user_id' => $user->id,
            ]);

            return $customer->fresh()->load('user');
        });
    }

    private function resolveCustomerUser(array $attributes): array
    {
        $customerRole = Role::query()->where('slug', 'customer')->firstOrFail();

        if (! empty($attributes['user_id'])) {
            $user = User::query()->findOrFail($attributes['user_id']);
            $user->update(['role_id' => $customerRole->id]);

            return [$user->fresh(), null];
        }

        $user = User::query()
            ->where('email', $attributes['email'])
            ->orWhere('phone', $attributes['phone'])
            ->first();

        if ($user) {
            if ($user->customer) {
                throw ValidationException::withMessages([
                    'email' => 'A customer account is already linked to this user profile.',
                ]);
            }

            $user->update(['role_id' => $customerRole->id]);

            return [$user->fresh(), null];
        }

        $user = User::query()->create([
            'role_id' => $customerRole->id,
            'name' => $attributes['name'],
            'email' => $attributes['email'],
            'phone' => $attributes['phone'],
            'password' => self::DEFAULT_PORTAL_PASSWORD,
            'status' => $attributes['status'],
        ]);

        return [$user->fresh(), self::DEFAULT_PORTAL_PASSWORD];
    }

    private function syncUser(User $user, array $attributes): void
    {
        $user->update([
            'name' => $attributes['name'],
            'email' => $attributes['email'],
            'phone' => $attributes['phone'],
            'status' => $attributes['status'],
        ]);
    }
}
