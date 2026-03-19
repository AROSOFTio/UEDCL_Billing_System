# Online Electricity Billing and Payment System for UEDCL

## Database Schema Overview

The backend includes migrations for the following core tables:

- `roles`
- `users`
- `customers`
- `meters`
- `meter_readings`
- `tariffs`
- `bills`
- `payments`
- `receipts`
- `notifications`
- `complaints`
- `complaint_replies`
- `personal_access_tokens`

## Planned Relationships

- One role has many users
- One user belongs to one role
- One customer can have one linked user account
- One customer has many meters
- One meter has many meter readings
- One meter has many bills
- One bill can have many payments
- One payment has one receipt
- One customer has many complaints
- One complaint has many replies

## Billing Formula

- `Units Consumed = Current Reading - Previous Reading`
- `Energy Charge = Units Consumed × Tariff Rate`
- `Total Bill = Energy Charge + Fixed Charge`
