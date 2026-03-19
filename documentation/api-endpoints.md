# Online Electricity Billing and Payment System for UEDCL

## API Endpoint Summary

Base URL: `http://localhost:8000/api`

## Authentication

### Public

- `POST /auth/register`
  - Creates a customer user account and linked customer profile.
- `POST /auth/login`
  - Returns a Sanctum bearer token.

### Authenticated

- `POST /auth/logout`
- `GET /auth/me`

## Billing Officer and Administrator

- `GET /customers`
- `POST /customers`
- `GET /customers/{customer}`
- `PUT /customers/{customer}`
- `GET /meters`
- `POST /meters`
- `GET /meters/{meter}`
- `PUT /meters/{meter}`
- `GET /meter-readings`
- `POST /meter-readings`
- `GET /meter-readings/{meterReading}`
- `GET /tariffs`
- `POST /bills/generate`
- `POST /payments`

## Customer, Billing Officer, Helpdesk, Administrator

- `GET /bills`
- `GET /bills/{bill}`
- `GET /payments`
- `GET /receipts/{receipt}`
- `GET /notifications`
- `GET /complaints`
- `POST /complaints`
- `GET /complaints/{complaint}`

## Helpdesk Officer and Administrator

- `POST /complaints/{complaint}/reply`
- `PATCH /complaints/{complaint}/status`

## Administrator Only

- `DELETE /customers/{customer}`
- `DELETE /meters/{meter}`
- `POST /tariffs`
- `PUT /tariffs/{tariff}`
- `GET /users`
- `POST /users`
- `GET /users/{user}`
- `GET /reports/summary`

## Sample Request Payloads

### Register Customer

```json
{
  "name": "Grace Nansubuga",
  "email": "customer@uedcl.local",
  "phone": "+256700111222",
  "national_id": "CM92011401A",
  "address": "Kiwatule, Kampala",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Login

```json
{
  "email": "admin@uedcl.local",
  "password": "password123",
  "device_name": "local-dev"
}
```

### Create Customer

```json
{
  "account_number": "UEDCL-100300",
  "name": "Kato Enterprises",
  "phone": "+256700333444",
  "email": "info@kato.local",
  "national_id": "CM84001111A",
  "address": "Mukono Road",
  "status": "active"
}
```

### Record Meter Reading

```json
{
  "meter_id": 1,
  "current_reading": 4860,
  "reading_date": "2026-04-01",
  "notes": "Routine monthly reading"
}
```

### Generate Bills

```json
{
  "billing_cycle": "2026-04",
  "tariff_id": 1,
  "due_date": "2026-04-28"
}
```

### Record Payment

```json
{
  "bill_id": 2,
  "payment_method": "mobile_money",
  "amount": 154750,
  "reference_number": "MM-2026-443322"
}
```

### Submit Complaint

```json
{
  "subject": "Estimated reading dispute",
  "message": "The latest reading appears higher than my usage pattern.",
  "category": "billing"
}
```
