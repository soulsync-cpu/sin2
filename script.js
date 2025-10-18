// Music + Cookie
const music=document.getElementById('bg-music');
const musicToggle=document.getElementById('music-toggle');
const cookieBar=document.getElementById('cookie-bar');
const acceptBtn=document.getElementById('accept-cookies');

if(localStorage.getItem('cookieAccepted')){
  cookieBar.style.display='none';
  music.play().catch(()=>{});
}

acceptBtn.addEventListener('click',()=>{
  localStorage.setItem('cookieAccepted',true);
  cookieBar.style.display='none';
  music.play().catch(()=>{});
});

musicToggle.addEventListener('click',()=>{
  if(music.paused){music.play(); musicToggle.textContent='🔊 Pause Music';}
  else{music.pause(); musicToggle.textContent='🎵 Play Music';}
});

// Floating Stars
const canvas=document.getElementById('star-bg');
const ctx=canvas.getContext('2d');
let stars=[];
function resizeCanvas(){canvas.width=window.innerWidth; canvas.height=window.innerHeight;}
window.addEventListener('resize',resizeCanvas);
resizeCanvas();
function initStars(){stars=[]; for(let i=0;i<120;i++){stars.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.5+0.5,speed:Math.random()*0.5+0.1});}}
function drawStars(){ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle='#fff'; stars.forEach(star=>{ctx.beginPath();ctx.arc(star.x,star.y,star.r,0,Math.PI*2);ctx.fill(); star.y-=star.speed; if(star.y<0) star.y=canvas.height;}); requestAnimationFrame(drawStars);}
initStars();
drawStars();
