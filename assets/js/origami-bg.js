const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// ---- Config ----
const POINT_COUNT = 80;
const MAX_DISTANCE = 150;

const points = [];

for (let i = 0; i < POINT_COUNT; i++) {
  points.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 更新點位置、邊界反彈
  points.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y < 0 || p.y > canvas.height) p.vy *= -1;
    
    // 畫點 (調整點的大小和顏色)
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)"; // 點的顏色：將不透明度從 0.4 增加到 0.6 (更黑)
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); // 點的大小：將半徑從 2 增加到 4 (更大)
    ctx.fill();
  });

  // 畫線（距離近的點互連）
  for (let i = 0; i < POINT_COUNT; i++) {
    for (let j = i + 1; j < POINT_COUNT; j++) {
      const p1 = points[i];
      const p2 = points[j];

      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAX_DISTANCE) {
        const alpha = 1 - dist / MAX_DISTANCE;

        // 線條深度調整：將原本 alpha * 0.25 提高到 alpha * 0.5 (顏色更深)
        // 您可以根據需要調整 0.5 這個數字 (例如 0.6, 0.7)
        ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 0.5})`; 
        
        // 增加線條粗細 (可選，但讓線條更明顯)
        ctx.lineWidth = 1; // 從預設的 1 增加到 1 或 1.5 等，如果想要更粗可以改成 1.5 或 2。
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(update);
}

update();
