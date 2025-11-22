let map, service;

function initMap() {
  // Initialize map (invisible but required by Places API)
  map = new google.maps.Map(document.createElement("div"));
}

function detectLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation not supported by this browser.");
  }
}

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  document.getElementById("location").value = `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
  findNearbyCentres(lat, lon);
}

function error() {
  alert("Unable to fetch your location.");
}

function findNearbyCentres(lat, lon) {
  const location = new google.maps.LatLng(lat, lon);
  const request = {
    location: location,
    radius: 5000, // 5 km
    keyword: "diagnostic centre OR pathology lab OR medical lab"
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    const select = document.getElementById("centres");
    select.innerHTML = `<option value="" disabled selected>-- Centres Near You --</option>`;
    
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      results.forEach(place => {
        const opt = document.createElement("option");
        opt.value = place.name;
        opt.textContent = `${place.name} (${place.vicinity})`;
        select.appendChild(opt);
      });
    } else {
      const opt = document.createElement("option");
      opt.textContent = "No centres found nearby.";
      select.appendChild(opt);
    }
  });
}

function bookTest() {
  const test = document.getElementById("testName").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("timeSlot").value;
  const user = document.getElementById("userName").value;
  const centre = document.getElementById("centres").value;

  if (!test || !date || !time || !user || !centre) {
    alert("Please fill in all fields!");
    return;
  }

  const confirmation = document.getElementById("confirmation");
  confirmation.innerHTML = `
    <h3>Booking Confirmed ✅</h3>
    <p><strong>Name:</strong> ${user}</p>
    <p><strong>Test:</strong> ${test}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Time:</strong> ${time}</p>
    <p><strong>Centre:</strong> ${centre}</p>
  `;
}
