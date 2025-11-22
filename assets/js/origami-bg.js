const phi = (1 + Math.sqrt(5)) / 2;
const s = 100;

const vertices = [
  [-1,  phi, 0], [1,  phi, 0], [-1, -phi, 0], [1, -phi, 0],
  [0, -1,  phi], [0, 1,  phi], [0, -1, -phi], [0, 1, -phi],
  [ phi, 0, -1], [ phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
].map(v => [v[0]*s, v[1]*s, v[2]*s]);

const edges = [
  [0,1],[0,5],[0,7],[0,10],[0,11],
  [1,5],[1,7],[1,8],[1,9],
  [2,3],[2,4],[2,6],[2,10],[2,11],
  [3,4],[3,6],[3,8],[3,9],
  [4,5],[4,9],[4,11],
  [5,9],[5,11],
  [6,7],[6,8],[6,10],
  [7,8],[7,10],
  [8,9],[9,3],
];

let angleX = 0;
let angleY = 0;

function rotate3D([x, y, z], ax, ay) {
  let cosX = Math.cos(ax), sinX = Math.sin(ax);
  let cosY = Math.cos(ay), sinY = Math.sin(ay);

  let dy = y * cosX - z * sinX;
  let dz = y * sinX + z * cosX;

  let dx = x * cosY + dz * sinY;
  dz = -x * sinY + dz * cosY;

  return [dx, dy, dz];
}

function drawPolyhedron() {
  angleX += 0.002;
  angleY += 0.003;

  const projected = vertices.map(v => rotate3D(v, angleX, angleY));

  edges.forEach(e => {
    let [a, b] = e;
    let [x1, y1] = projected[a];
    let [x2, y2] = projected[b];

    x1 += canvas.width/2;
    y1 += canvas.height/2;
    x2 += canvas.width/2;
    y2 += canvas.height/2;

    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });
}
