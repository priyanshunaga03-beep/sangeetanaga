const message =
`sangeeta,
You are the reason behind my smile.
Every moment with you feels magical.
I’m so grateful to have you in my life.
Happy Birthday, my love ❤️`;

let index = 0;
const bgMusic = document.getElementById("bgMusic");
const audioButton = document.getElementById("audioButton");
const sparkleCanvas = document.getElementById("sparkleCanvas");
const confettiCanvas = document.getElementById("confettiCanvas");
const sparkleCtx = sparkleCanvas.getContext("2d");
const confettiCtx = confettiCanvas.getContext("2d");

sparkleCanvas.width = confettiCanvas.width = window.innerWidth;
sparkleCanvas.height = confettiCanvas.height = window.innerHeight;

let sparkles = [];
let confettis = [];

function startCelebration() {
  bgMusic.volume = 0;
  bgMusic.play();
  fadeInMusic();
  typeText();
  showGallery();
  createHearts();
}

// Music fade-in at start
function fadeInMusic() {
  let vol = 0;
  const fade = setInterval(() => {
    if (vol < 0.5) {  // normal background volume
      vol += 0.02;
      bgMusic.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 100);
}

// Toggle music manually
function toggleAudio() {
  if (bgMusic.paused) {
    bgMusic.play();
    audioButton.textContent = "🔊 Pause Music";
  } else {
    bgMusic.pause();
    audioButton.textContent = "🎵 Play Music";
  }
}

// Typing effect
function typeText() {
  if (index < message.length) {
    document.getElementById("typing").innerHTML += message[index++];
    setTimeout(typeText, 50);
  }
}

// Animate gallery images
function showGallery() {
  document.querySelectorAll(".card").forEach((c, i) => {
    setTimeout(() => {
      c.style.opacity = "1";
      c.style.transform = "scale(1)";
    }, i * 150);
  });
}

// Floating hearts
function createHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    document.querySelector(".hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 300);
}

// Secret + Finale with Sparkle, Confetti & Music Boost
function revealSecret() {
  document.getElementById("secretText").style.opacity = "1";

  setTimeout(() => {
    const finale = document.getElementById("finale");
    finale.style.opacity = "1";
    finale.style.pointerEvents = "auto";

    boostMusic();          // NEW: slightly louder finale music
    startFinaleParticles(); // sparkle + confetti
  }, 2000);
}

// ---------------- PARTICLE ANIMATION ----------------
function startFinaleParticles() {
  for (let i = 0; i < 100; i++) {
    sparkles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1,
      opacity: Math.random()
    });

    confettis.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      w: 8,
      h: 4,
      color: `hsl(${Math.random()*360}, 70%, 60%)`,
      speed: Math.random() * 3 + 2
    });
  }

  animateParticles();
}

// Animate sparkle & confetti
function animateParticles() {
  sparkleCtx.clearRect(0,0,sparkleCanvas.width,sparkleCanvas.height);
  confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);

  sparkles.forEach(s => {
    sparkleCtx.beginPath();
    sparkleCtx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    sparkleCtx.fillStyle = `rgba(255,255,255,${s.opacity})`;
    sparkleCtx.fill();
    s.y -= 1.5;
    s.opacity -= 0.01;
    if(s.opacity <=0){ s.opacity=1; s.y = window.innerHeight; }
  });

  confettis.forEach(c => {
    confettiCtx.fillStyle = c.color;
    confettiCtx.fillRect(c.x, c.y, c.w, c.h);
    c.y += c.speed;
    if(c.y > window.innerHeight){
      c.y = -10;
      c.x = Math.random()*window.innerWidth;
    }
  });

  requestAnimationFrame(animateParticles);
}

// Finale music boost
function boostMusic() {
  let targetVol = 1.0; // louder for finale
  let fade = setInterval(() => {
    if(bgMusic.volume < targetVol){
      bgMusic.volume += 0.01;
    } else {
      clearInterval(fade);
    }
  }, 100);
}

// Adjust canvas on resize
window.addEventListener('resize', () => {
  sparkleCanvas.width = confettiCanvas.width = window.innerWidth;
  sparkleCanvas.height = confettiCanvas.height = window.innerHeight;
});