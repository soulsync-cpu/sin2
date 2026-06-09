// script.js — PI calculator logic (Leibniz, Nilakantha, Monte Carlo visualization)
const btnMath = document.getElementById('btn-mathpi');
const btnLeib = document.getElementById('btn-leibniz');
const btnNila = document.getElementById('btn-nilakantha');
const btnMonte = document.getElementById('btn-monte');
const iterationsInput = document.getElementById('iterations');
const resultEl = document.getElementById('result');
const deltaEl = document.getElementById('delta');

const canvas = document.getElementById('mc-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;
const cx = W/2, cy = H/2, R = Math.min(W,H)/2 - 2;

function setResult(value){
  const num = typeof value === 'number' ? value : Number(value);
  resultEl.textContent = 'Result: ' + (isNaN(num) ? String(value) : num);
  if (!isNaN(num)){
    deltaEl.textContent = 'Difference from Math.PI: ' + Math.abs(num - Math.PI);
  } else deltaEl.textContent = '';
}

btnMath.addEventListener('click', () => {
  setResult(Math.PI);
  clearCanvas();
});

btnLeib.addEventListener('click', () => {
  const n = clampIterations();
  disableButtons(true);
  setTimeout(()=>{
    const pi = leibniz(n);
    setResult(pi);
    disableButtons(false);
    clearCanvas();
  }, 10);
});

btnNila.addEventListener('click', () => {
  const n = clampIterations();
  disableButtons(true);
  setTimeout(()=>{
    const pi = nilakantha(n);
    setResult(pi);
    disableButtons(false);
    clearCanvas();
  }, 10);
});

btnMonte.addEventListener('click', () => {
  const n = clampIterations();
  disableButtons(true);
  runMonteCarlo(n, (pi)=>{
    setResult(pi);
    disableButtons(false);
  });
});

function clampIterations(){
  let n = parseInt(iterationsInput.value, 10) || 1000;
  if (n < 1) n = 1;
  if (n > 5_000_000) n = 5_000_000; // safety cap
  iterationsInput.value = n;
  return n;
}

function disableButtons(dis){
  [btnMath, btnLeib, btnNila, btnMonte].forEach(b=>b.disabled = dis);
}

function leibniz(n){
  let sum = 0;
  for (let i=0;i<n;i++){
    sum += (i % 2 === 0 ? 1 : -1) / (2*i + 1);
  }
  return 4 * sum;
}

function nilakantha(n){
  // n is number of terms to add (not the denominator size)
  let pi = 3;
  let sign = 1;
  let a = 2;
  for (let i=0;i<n;i++){
    pi += sign * (4 / (a * (a+1) * (a+2)));
    sign *= -1;
    a += 2;
  }
  return pi;
}

function clearCanvas(){
  ctx.clearRect(0,0,W,H);
  // draw circle outline
  ctx.save();
  ctx.translate(0,0);
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI*2);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function runMonteCarlo(total, done){
  clearCanvas();
  // draw circle
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI*2);
  ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.stroke();

  let inside = 0;
  let completed = 0;
  const chunk = Math.max(1000, Math.floor(total / 200));

  function step(){
    const to = Math.min(completed + chunk, total);
    for (let i = completed; i < to; i++){
      const x = (Math.random()*2 - 1);
      const y = (Math.random()*2 - 1);
      const px = cx + x * R;
      const py = cy + y * R;
      const isInside = x*x + y*y <= 1;
      if (isInside) inside++;
      // draw a few points (skip drawing when huge iterations)
      if (total <= 200_000 && Math.random() < 0.5){
        ctx.fillStyle = isInside ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.6)';
        ctx.fillRect(px, py, 1, 1);
      }
    }
    completed = to;
    const piEstimate = 4 * (inside / completed);
    setResult(piEstimate);

    if (completed < total){
      // schedule next chunk to keep UI responsive
      setTimeout(step, 0);
    } else {
      done(4 * (inside / total));
    }
  }
  step();
}

// initialize
clearCanvas();
setResult('—');
