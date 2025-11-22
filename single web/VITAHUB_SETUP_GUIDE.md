# VITAHUB - Healthcare Appointment Booking System
## Complete Setup & Running Guide

### Overview
VITAHUB is a full-stack healthcare appointment booking platform with separate authentication for doctors and patients, built with Next.js, TypeScript, and Supabase.

### Features Implemented

✅ **Terms & Conditions** - Agree before accessing the app
✅ **Multilingual Support** - English, Spanish, and Hindi
✅ **Separate Role Selection** - Choose Doctor or Patient
✅ **Doctor Registration** - Name, Email, Degree, Certificate, Aadhar
✅ **Patient Registration** - Name, Email, Phone Number
✅ **Doctor Dashboard** - Manage weekly appointment slots
✅ **Patient Dashboard** - Browse doctors and book appointments
✅ **Database Integration** - All data saved to Supabase
✅ **Success Messages** - "You are successfully logged in!" confirmation

---

## Step 1: Database Setup

### Option A: Using Supabase Dashboard (Recommended)
1. Open your Supabase project
2. Go to "SQL Editor"
3. Create a new query
4. Copy and paste the SQL from `scripts/init-database.sql`
5. Click "Run"

### Option B: Using Supabase CLI
\`\`\`bash
supabase db push
\`\`\`

---

## Step 2: Environment Variables

Your Vercel project already has these environment variables configured:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `POSTGRES_URL`
- etc.

No additional setup needed!

---

## Step 3: Running the Application

### Local Development
\`\`\`bash
npm install
npm run dev
\`\`\`

Then open: `http://localhost:3000`

### Deployed Version
Visit your Vercel deployment URL (e.g., `https://vitahub.vercel.app`)

---

## Step 4: Using the App

### First Time Users

1. **Accept Terms & Conditions**
   - Read the terms
   - Click "I Agree"

2. **Select Language**
   - Choose from English, Spanish, or Hindi
   - Changes apply immediately

3. **Select Your Role**
   - Click "I am a Doctor" or "I am a Patient"

4. **Choose Action**
   - **Login** - If you already have an account
   - **Sign Up** - To create a new account

---

### For Doctors

#### Sign Up
- Full Name *
- Email *
- Password *
- Degree/Qualification *
- Upload Certificate * (image/PDF)
- Upload Aadhar * (image/PDF)

#### After Login
- **Dashboard** displays "You are successfully logged in!"
- **Add Appointment Slots**:
  - Select day of week
  - Set start time (e.g., 09:00)
  - Set end time (e.g., 10:00)
  - Set duration (default 30 minutes)
  - Click "Add Slot"
- **View All Slots** - See your created slots and delete if needed
- **Logout** - When finished

---

### For Patients

#### Sign Up
- Full Name *
- Email *
- Phone Number *
- Password *

#### After Login
- **Dashboard** displays "You are successfully logged in!"
- **Left Panel**: Browse all available doctors
- **Right Panel**: View doctor's available slots
- **Book Appointment**: Click "Book" on any available slot
- **Confirmation**: Success message appears after booking
- **Logout** - When finished

---

## Workflow Example

### Doctor Workflow
1. Terms & Conditions → Accept
2. Language → English
3. Role → "I am a Doctor"
4. Sign Up → Fill all required fields
5. Dashboard → Add slots for Monday-Friday
6. Manage → Delete slots as needed
7. Logout

### Patient Workflow
1. Terms & Conditions → Accept
2. Language → English
3. Role → "I am a Patient"
4. Sign Up → Fill all required fields
5. Dashboard → View available doctors
6. Book → Select doctor and available slot
7. Confirm → See success message
8. Logout

---

## API Endpoints

### Authentication
- `POST /api/auth/doctor/signup` - Doctor registration
- `POST /api/auth/doctor/login` - Doctor login
- `POST /api/auth/patient/signup` - Patient registration
- `POST /api/auth/patient/login` - Patient login

### Doctors
- `GET /api/doctors` - List all doctors
- `GET /api/doctor/[id]/slots` - Get doctor's available slots
- `GET /api/doctor/slots?doctorId=[id]` - Get slots for doctor
- `POST /api/doctor/slots` - Add appointment slot
- `DELETE /api/doctor/slots/[id]` - Delete slot

### Appointments
- `POST /api/appointments/book` - Book appointment
- `GET /api/appointments/[id]` - Get appointment details

---

## Database Schema

### Users Table
- id (UUID)
- email (unique)
- password_hash
- role (doctor/patient)
- name
- phone_number
- created_at

### Doctor Details Table
- id (UUID)
- user_id (FK to users)
- degree
- certificate_url
- aadhar_url

### Appointment Slots Table
- id (UUID)
- doctor_id (FK to users)
- day_of_week
- start_time
- end_time
- duration_minutes
- is_available

### Appointments Table
- id (UUID)
- doctor_id (FK)
- patient_id (FK)
- slot_id (FK)
- appointment_date
- status

---

## Troubleshooting

### Issue: "Invalid email or password"
**Solution**: Check that you signed up with the same credentials. Password is case-sensitive.

### Issue: No doctors showing in patient dashboard
**Solution**: Ensure at least one doctor has signed up. Doctors don't appear until they register.

### Issue: Can't add appointment slots
**Solution**: Make sure all fields (day, start time, end time) are filled. Times must be in HH:MM format.

### Issue: Database connection error
**Solution**: Verify Supabase credentials are set in environment variables. Check your Vercel Vars section.

---

## Language Support

All pages support three languages:

🇬🇧 **English**
🇪🇸 **Spanish**
🇮🇳 **Hindi**

Language preference is saved in localStorage and persists across sessions.

---

## File Structure

\`\`\`
vitahub/
├── app/
│   ├── page.tsx (Main entry point)
│   ├── layout.tsx
│   ├── globals.css
│   ├── auth/
│   │   ├── doctor/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   └── patient/
│   │       ├── login/page.tsx
│   │       └── signup/page.tsx
│   ├── doctor/
│   │   └── dashboard/page.tsx
│   ├── patient/
│   │   └── dashboard/page.tsx
│   └── api/
│       ├── auth/
│       ├── doctor/
│       ├── appointments/
│       └── doctors/
├── components/
│   ├── role-selection.tsx
│   ├── doctor-auth.tsx
│   ├── patient-auth.tsx
│   ├── doctor-slot-manager.tsx
│   ├── patient-booking.tsx
│   ├── language-selector.tsx
│   ├── terms-and-conditions.tsx
│   └── ui/
├── scripts/
│   └── init-database.sql
└── package.json
\`\`\`

---

## Next Steps

1. ✅ Database initialized
2. ✅ Environment variables configured
3. ✅ Frontend built and deployed
4. Run locally: `npm run dev`
5. Test the complete flow
6. Deploy to production via Vercel

**Your VITAHUB application is ready to use!**
