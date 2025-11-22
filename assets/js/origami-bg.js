const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let creases = [];

function spawnCrease() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;

  creases.push({
    x,
    y,
    length: 200 + Math.random() * 300,
    angle: Math.random() * Math.PI,
    opacity: 0.8,
    speed: 0.3 + Math.random() * 0.5
  });
}

setInterval(spawnCrease, 500);

function drawCreases() {
  creases.forEach((c, i) => {
    const x2 = c.x + Math.cos(c.angle) * c.length;
    const y2 = c.y + Math.sin(c.angle) * c.length;

    ctx.strokeStyle = `rgba(0, 0, 0, ${c.opacity})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    c.opacity -= 0.005;
    c.y -= c.speed;

    if (c.opacity <= 0) creases.splice(i, 1);
  });
}
