function showGuide(emergency) {
  const guidance = document.getElementById('guidance');
  let content = '';
  let videoSrc = '';

  switch (emergency) {
    case 'burns':
      content = '<h2>Burns</h2><p>Cool the burn under running water for at least 10 minutes.</p>';
      videoSrc = 'videos/Video for Burns.mp4';
      break;
    case 'cuts':
      content = '<h2>Cuts</h2><p>Apply pressusre to stop bleeding, clean with water, and cover with a sterile bandage.</p>';
      //videoSrc = 'https://www.youtube.com/embed/AhANvBB9hz0'; // Your provided YouTube link for cuts
      break;
    case 'cpr':
      content = '<h2>CPR</h2><p>Perform 30 chest compressions followed by 2 rescue breaths. Continue until help arrives.</p>';
      break;
    case 'poisoning':
      content = '<h2>Poisoning</h2><p>Do not induce vomiting. Call emergency services and give details about the substance.</p>';
      break;
    case 'fractures':
      content = '<h2>Fractures</h2><p>Immobilize the affected area, apply cold packs, and seek medical help.</p>';
      break;
    case 'choking':
      content = '<h2>Choking</h2><p>Perform 5 back blows followed by 5 abdominal thrusts. Repeat if needed.</p>';
      break;
  }

  guidance.innerHTML = `
    ${content}
    ${videoSrc ? `<button onclick="playVideo('${videoSrc}')">▶ Watch Video</button>` : ''}
  `;
}

function playVideo(src) {
  const popup = document.getElementById('videoPopup');
  const video = document.getElementById('popupVideo');
  video.src = src + '?autoplay=1';
  popup.style.display = 'flex';
}

function closeVideo() {
  const popup = document.getElementById('videoPopup');
  const video = document.getElementById('popupVideo');
  popup.style.display = 'none';
  video.src = ''; // stop playback
}
