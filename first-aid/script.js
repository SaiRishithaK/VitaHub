const guides = {
  burns: {
    text: "For burns: Cool the burn under running water for 10-20 mins. Cover with a sterile dressing. Do NOT apply butter or oil.",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
  },
  cuts: {
    text: "For cuts: Wash the wound with clean water. Apply antiseptic and cover with a sterile bandage.",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
  },
  cpr: {
    text: "For CPR: Ensure safety, check responsiveness, call emergency services, then start chest compressions 100-120/min.",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
  },
  poisoning: {
    text: "For poisoning: Call poison control immediately. Do NOT induce vomiting unless instructed.",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
  },
  fractures: {
    text: "For fractures: Immobilize the area with splints. Avoid moving the injured part. Seek medical help.",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
  },
  choking: {
    text: "For choking: Encourage coughing. If severe, perform Heimlich maneuver.",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
  }
};

function showGuide(emergency) {
  const guidanceDiv = document.getElementById('guidance');
  const popup = document.getElementById('videoPopup');
  const video = document.getElementById('popupVideo');

  // Show text guidance
  guidanceDiv.innerText = guides[emergency].text;

  // Load and show video in popup
  video.src = guides[emergency].video;
  popup.style.display = "flex";
}

// Close video popup
function closeVideo() {
  const popup = document.getElementById('videoPopup');
  const video = document.getElementById('popupVideo');
  video.pause();
  video.currentTime = 0;
  popup.style.display = "none";
}
