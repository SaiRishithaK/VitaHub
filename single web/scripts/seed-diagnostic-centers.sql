-- <CHANGE> Seed diagnostic centers with proper location data and fixed format
INSERT INTO diagnostic_centers (name, address, latitude, longitude, phone, email, opening_time, closing_time) VALUES
  ('Apollo Diagnostics - Connaught Place', 'Connaught Place, New Delhi', 28.6295, 77.1895, '+91-11-4040-4040', 'apollo.cp@mail.com', '07:00'::time, '21:00'::time),
  ('Path Labs - Saket', 'Saket, New Delhi', 28.5244, 77.1855, '+91-11-4141-4141', 'pathlabs.saket@mail.com', '06:30'::time, '20:30'::time),
  ('SRL Diagnostics - Karol Bagh', 'Karol Bagh, New Delhi', 28.6505, 77.2270, '+91-11-4242-4242', 'srl.kb@mail.com', '08:00'::time, '19:00'::time),
  ('Thyrocare - Greater Kailash', 'Greater Kailash-1, New Delhi', 28.5355, 77.2084, '+91-11-4343-4343', 'thyrocare.gk@mail.com', '07:30'::time, '22:00'::time),
  ('Max Healthcare - Rajendra Place', 'Rajendra Place, New Delhi', 28.6172, 77.1972, '+91-11-4444-4444', 'max.rp@mail.com', '06:00'::time, '23:00'::time),
  ('Dr. Lal Path Lab - Lajpat Nagar', 'Lajpat Nagar, New Delhi', 28.5677, 77.2299, '+91-11-4545-4545', 'lal.ln@mail.com', '08:00'::time, '20:00'::time);

-- Add rating if column exists
ALTER TABLE diagnostic_centers ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 4.5;
