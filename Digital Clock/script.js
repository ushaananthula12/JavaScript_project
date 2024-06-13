function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var meridian = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
    hours = (hours % 12) || 12; // Convert to 12-hour format
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var timeString = hours + ':' + minutes + ':' + seconds + ' ' + meridian;
    document.getElementById('time').textContent = timeString;
  }
  
  // Update the clock every second
  setInterval(updateClock, 1000);
  
  // Update the clock immediately upon page load
  updateClock();
  