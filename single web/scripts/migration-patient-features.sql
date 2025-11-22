-- Add medical tests table
CREATE TABLE IF NOT EXISTS medical_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  category VARCHAR(100),
  estimated_cost INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add test bookings table
CREATE TABLE IF NOT EXISTS test_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  test_id UUID REFERENCES medical_tests(id) ON DELETE CASCADE,
  diagnostic_center_id UUID REFERENCES diagnostic_centers(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'booked' CHECK (status IN ('booked', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add diagnostic centers table
CREATE TABLE IF NOT EXISTS diagnostic_centers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone VARCHAR(20),
  email VARCHAR(255),
  available_tests TEXT[], -- Array of test IDs
  opening_time TIME,
  closing_time TIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample medical tests
INSERT INTO medical_tests (name, category, description) VALUES
  ('Blood Test', 'General', 'Complete blood count and biochemistry'),
  ('ECG', 'Cardiac', 'Electrocardiogram for heart function'),
  ('COVID-19 Test', 'Infectious Disease', 'RT-PCR COVID-19 test'),
  ('MRI', 'Imaging', 'Magnetic Resonance Imaging scan'),
  ('Ultrasound', 'Imaging', 'Ultrasound imaging procedure'),
  ('X-Ray', 'Imaging', 'X-Ray radiography'),
  ('Thyroid Test', 'Endocrine', 'TSH and thyroid function tests'),
  ('2D Echo', 'Cardiac', '2D Echocardiogram'),
  ('3D Echo', 'Cardiac', '3D Echocardiogram');

-- Create indexes
CREATE INDEX idx_test_bookings_patient ON test_bookings(patient_id);
CREATE INDEX idx_test_bookings_test ON test_bookings(test_id);
CREATE INDEX idx_diagnostic_centers_coords ON diagnostic_centers(latitude, longitude);

-- Enable RLS
ALTER TABLE medical_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_centers ENABLE ROW LEVEL SECURITY;
