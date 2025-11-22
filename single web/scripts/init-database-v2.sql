-- Updated schema to include phone_number and other necessary fields
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('doctor', 'patient')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create doctor_details table
CREATE TABLE IF NOT EXISTS doctor_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  degree VARCHAR(255) NOT NULL,
  certificate_url VARCHAR(500),
  aadhar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create appointment_slots table
CREATE TABLE IF NOT EXISTS appointment_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day_of_week VARCHAR(20) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_minutes INT DEFAULT 30,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  slot_id UUID NOT NULL REFERENCES appointment_slots(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'booked' CHECK (status IN ('booked', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_doctor_details_user_id ON doctor_details(user_id);
CREATE INDEX idx_appointment_slots_doctor_id ON appointment_slots(doctor_id);
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
