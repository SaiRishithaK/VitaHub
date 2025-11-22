# VITAHUB Database Setup Instructions

## Important: Run These SQL Scripts in Order

Your VITAHUB application requires the following database scripts to be executed in your Supabase SQL Editor. **Follow this exact order:**

### Step 1: Initialize Core Database
Run: `scripts/init-database.sql`
- Creates users table (for doctors and patients)
- Creates doctor_details table
- Creates appointment_slots table  
- Creates appointments table

### Step 2: Add Patient Features
Run: `scripts/migration-patient-features.sql`
- Creates medical_tests table with all test types
- Creates test_bookings table
- Creates diagnostic_centers table
- Pre-populates 9 medical test types (Blood Test, ECG, COVID-19, MRI, Ultrasound, X-Ray, Thyroid, 2D Echo, 3D Echo)

### Step 3: Seed Diagnostic Centers
Run: `scripts/seed-diagnostic-centers.sql`
- Inserts 6 diagnostic center locations
- Each center has coordinates, phone, email, and hours

## How to Execute Scripts

1. Go to your Supabase project → SQL Editor
2. Create a new query for each script
3. Copy the entire script contents
4. Click "Run" to execute
5. Wait for success confirmation before moving to the next script

## Verify Setup

After running all scripts, you should see:
- ✅ 9 medical tests in the database
- ✅ 6 diagnostic centers with locations
- ✅ Doctors and patients can be registered
- ✅ Appointment slots and bookings can be created

## Troubleshooting

If you get "table does not exist" errors:
- Make sure you ran Step 1 first
- Check that the init-database.sql completed successfully

If medical tests/diagnostic centers don't show up:
- Verify you ran Steps 2 and 3
- Check the error message in Supabase SQL Editor

If the app still shows "No doctors/tests available":
- Ensure you have signed up at least one doctor
- Check database tables have data using: `SELECT COUNT(*) FROM medical_tests;`
