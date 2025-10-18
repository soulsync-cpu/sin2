const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let particlesArray;

    function initParticles(){
      particlesArray = [];
      const number = Math.floor(window.innerWidth / 10);
      for(let i=0;i<number;i++){
        particlesArray.push({
          x: Math.random()*canvas.width,
          y: Math.random()*canvas.height,
          size: Math.random()*3+1,
          speedX: (Math.random()-0.5)*0.5,
          speedY: (Math.random()-0.5)*0.5,
          color: `rgba(255,255,255,${Math.random()})`
        });
      }
    }

    function drawParticles(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i=0;i<particlesArray.length;i++){
        const p = particlesArray[i];
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    }

    function updateParticles(){
      for(let i=0;i<particlesArray.length;i++){
        const p = particlesArray[i];
        p.x += p.speedX;
        p.y += p.speedY;
        if(p.x < 0 || p.x > canvas.width) p.speedX*=-1;
        if(p.y < 0 || p.y > canvas.height) p.speedY*=-1;
      }
    }

    function animateParticles(){
      drawParticles();
      updateParticles();
      requestAnimationFrame(animateParticles);
    }

    function resizeCanvas(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    window.addEventListener('resize',resizeCanvas);
    resizeCanvas();
    animateParticles();

    // Music and cookie logic
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const cookieBar = document.getElementById('cookie-bar');
const acceptBtn = document.getElementById('accept-cookies');

// Check cookie consent
if (localStorage.getItem('cookieAccepted')) {
  cookieBar.style.display = 'none';
  music.play().catch(()=>{});
}

acceptBtn.addEventListener('click', () => {
  localStorage.setItem('cookieAccepted', true);
  cookieBar.style.display = 'none';
  music.play();
});

// Music toggle
musicToggle.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicToggle.textContent = '🔊 Pause Music';
  } else {
    music.pause();
    musicToggle.textContent = '🎵 Play Music';
  }
});
