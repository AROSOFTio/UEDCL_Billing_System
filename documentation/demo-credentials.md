# Online Electricity Billing and Payment System for UEDCL

## Demo Credentials

Use these seeded accounts for local API and frontend testing.

- Administrator: `admin@uedcl.local` / `password123`
- Billing Officer: `billing@uedcl.local` / `password123`
- Helpdesk Officer: `helpdesk@uedcl.local` / `password123`
- Customer: `customer@uedcl.local` / `password123`

## Notes

- Authentication is implemented with Laravel Sanctum bearer tokens.
- Customer registration creates a new customer user and linked customer profile automatically.
- SMS delivery is currently mock-mode and saves outgoing messages into the `notifications` table.
