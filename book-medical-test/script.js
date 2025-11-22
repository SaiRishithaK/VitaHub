function bookTest() {
  const testName = document.getElementById('testName').value;
  const date = document.getElementById('date').value;
  const timeSlot = document.getElementById('timeSlot').value;
  const location = document.getElementById('location').value;
  const userName = document.getElementById('userName').value;

  // Validation
  if (!testName || !date || !timeSlot || !userName) {
    alert('Please fill all required fields!');
    return;
  }

  // Save booking to localStorage (optional, persists across reloads)
  let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  bookings.push({ testName, date, timeSlot, location, userName });
  localStorage.setItem('bookings', JSON.stringify(bookings));

  // Show confirmation
  const confirmation = document.getElementById('confirmation');
  confirmation.innerText = `Booking Confirmed for ${userName} on ${date} (${timeSlot})!`;
  confirmation.style.color = "green";

  // Clear form
  document.getElementById('testName').value = "";
  document.getElementById('date').value = "";
  document.getElementById('timeSlot').value = "";
  document.getElementById('userName').value = "";
}

