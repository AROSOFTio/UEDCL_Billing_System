# Online Electricity Billing and Payment System for UEDCL

This repository contains the scaffold and backend implementation for the **Online Electricity Billing and Payment System for UEDCL**. It is organized as a full-stack project with a React + Vite frontend, a Laravel-style backend API, shared documentation, and utility workflows for billing, payments, complaints, notifications, and reporting.

## Repository Structure

```text
uedcl-billing-system/
  frontend/
  backend/
  documentation/
  README.md
```

## Included in This Repository

- Public website pages for the utility-company interface
- Role-based frontend page structure for Customer, Billing Officer, Helpdesk Officer, and Administrator
- Reusable frontend layouts, route protection, mock auth context, and starter services
- Laravel backend models, migrations, seeders, requests, middleware, services, controllers, and API routes
- Sanctum-ready authentication flow with bearer tokens
- Mock SMS notification persistence in the database
- Documentation for schema, API summary, and demo credentials

## Backend Highlights

- Authentication: Laravel Sanctum token login, logout, and current-user endpoint
- Role access: `customer`, `billing_officer`, `helpdesk_officer`, `administrator`
- Billing logic: automatic bill calculation from stored meter readings and tariff settings
- Payments: payment recording, bill status sync, and receipt generation
- Complaints: customer submission, helpdesk reply, and status management
- Notifications: mock SMS records saved in the `notifications` table

## Local Setup

### Frontend

1. Open a terminal in `frontend`
2. Run `npm install`
3. Run `npm run dev`

### Backend

1. Open a terminal in `backend`
2. Run `composer install`
3. Copy `.env.example` to `.env`
4. Configure MySQL credentials
5. Run `php artisan migrate --seed`
6. Run `php artisan serve`

## Demo Credentials

- Administrator: `admin@uedcl.local` / `password123`
- Billing Officer: `billing@uedcl.local` / `password123`
- Helpdesk Officer: `helpdesk@uedcl.local` / `password123`
- Customer: `customer@uedcl.local` / `password123`

## Documentation

- [Project documentation index](./documentation/README.md)
- [Database schema overview](./documentation/database-schema.md)
- [API endpoint summary](./documentation/api-endpoints.md)
- [Demo credentials](./documentation/demo-credentials.md)

## Current Status

The repository now includes the core Laravel backend implementation for authentication, customers, meters, readings, bills, payments, receipts, complaints, reports, and mock SMS notifications. Frontend-to-backend integration and additional polish can continue from this base.
