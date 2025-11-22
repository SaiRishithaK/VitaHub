# VITAHUB Healthcare Application - Complete Setup Guide

## Overview
VITAHUB is a comprehensive healthcare appointment and medical testing booking platform with multilingual support (English, Spanish, Hindi) and a light green theme.

## Database Setup

### 1. Initialize Core Database
Run the main database initialization script in your Supabase SQL Editor:
\`\`\`sql
scripts/init-database.sql
\`\`\`

### 2. Create Patient Features Tables
Run the patient features migration:
\`\`\`sql
scripts/migration-patient-features.sql
\`\`\`

### 3. Seed Diagnostic Centers
Run the diagnostic centers seed script:
\`\`\`sql
scripts/seed-diagnostic-centers.sql
\`\`\`

## Features

### For Patients
1. **Profile** - View personal information (name, email, phone)
2. **Doctor Appointment** - Browse doctors and book appointment slots
3. **Medical Test Booking** - Book medical tests at nearby diagnostic centers
4. **Symptom Checker** - Coming Soon
5. **Order Medicines** - Coming Soon
6. **Blood Donation** - Coming Soon
7. **First Aid Guidance** - Coming Soon
8. **SOS** - Coming Soon

### For Doctors
1. **Dashboard** - Manage appointment slots for the week
2. **Appointment Slots** - Add/remove availability slots with day and time
3. **View Bookings** - See patient appointments booked with them

## User Flow

### Patient Journey
1. Landing page → Accept Terms & Conditions
2. Select Language (English, Spanish, Hindi)
3. Select Role (Patient)
4. Sign Up/Login
5. Patient Dashboard with 8 menu options
6. Choose feature and interact

### Doctor Journey
1. Landing page → Accept Terms & Conditions
2. Select Language (English, Spanish, Hindi)
3. Select Role (Doctor)
4. Sign Up/Login with degree, certificate, and Aadhar
5. Doctor Dashboard
6. Add appointment slots for the week
7. View patient appointments

## API Endpoints

### Authentication
- `POST /api/auth/doctor/signup` - Doctor registration
- `POST /api/auth/doctor/login` - Doctor login
- `POST /api/auth/patient/signup` - Patient registration
- `POST /api/auth/patient/login` - Patient login

### Doctors
- `GET /api/doctors` - Get all doctors list
- `GET /api/doctor/[id]/slots` - Get doctor's available slots

### Appointments
- `POST /api/appointments/book` - Book appointment with doctor
- `POST /api/doctor/slots` - Add appointment slot (doctor)
- `DELETE /api/doctor/slots/[slotId]` - Remove appointment slot

### Medical Tests
- `GET /api/medical-tests` - Get all available medical tests
- `GET /api/diagnostic-centers` - Get nearby diagnostic centers
- `POST /api/test-bookings/book` - Book medical test at center

## Database Schema

### Users Table
- `id`, `email`, `password_hash`, `role` (doctor/patient), `name`, `phone_number`

### Doctor Details
- `id`, `user_id`, `degree`, `certificate_url`, `aadhar_url`

### Appointment Slots
- `id`, `doctor_id`, `day_of_week`, `start_time`, `end_time`, `is_available`

### Appointments
- `id`, `doctor_id`, `patient_id`, `slot_id`, `appointment_date`, `start_time`, `end_time`, `status`

### Medical Tests
- `id`, `name`, `category`, `description`

### Test Bookings
- `id`, `patient_id`, `test_id`, `diagnostic_center_id`, `booking_date`, `booking_time`, `status`

### Diagnostic Centers
- `id`, `name`, `address`, `latitude`, `longitude`, `phone`, `email`, `opening_time`, `closing_time`

## Running the Application

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up environment variables in Vercel:
- POSTGRES_URL
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- etc.

3. Start development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open in browser:
\`\`\`
http://localhost:3000
\`\`\`

## Multilingual Support

All pages support 3 languages:
- English (en)
- Spanish (es)
- Hindi (hi)

Language preference is stored in localStorage and persists across sessions.

## Design System

- **Primary Color**: Green (#16a34a, #15803d, #166534)
- **Background**: Light green gradient (from-green-50 to-green-100)
- **Accents**: Emerald and forest green shades
- **Typography**: Geist Sans font family

## Troubleshooting

### Issue: Users not found during login
- Ensure database initialization scripts have been run
- Check DATABASE_URL environment variable is set correctly

### Issue: Location not getting fetched
- Check browser permissions for geolocation
- Ensure HTTPS in production (geolocation requires secure context)

### Issue: Images not uploading
- Certificate and Aadhar uploads are validated on frontend only
- In production, implement actual file storage with Supabase Bucket or similar

## Next Steps

1. Run all SQL migration scripts
2. Set up payment gateway for premium features
3. Implement email notifications for bookings
4. Add doctor ratings and reviews
5. Create admin dashboard for system management
