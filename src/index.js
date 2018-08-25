import { getFarthestPair, samePoint, findShortestPath } from './utils';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const points = [];

window.addEventListener('contextmenu', e => e.preventDefault());

canvas.addEventListener('click', e => {
  points.push({ x: e.x, y: e.y });
  render(points);
});

const makeRender = ctx => points => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const farthest = points.length > 1 ? getFarthestPair(points) : [];
  const path = points.length > 1 ? findShortestPath(farthest[0], farthest[1], points) : [];
  const drawPath = farthest.length > 1 ? [farthest[0], ...path, farthest[1]] : [];

  drawPath.length > 1 && ctx.moveTo(drawPath[0].x, drawPath[0].y);
  ctx.strokeStyle = 'gray';
  drawPath.forEach(point => ctx.lineTo(point.x, point.y));
  ctx.stroke();

  points.forEach(point => {
    // TODO: Make this work
    if (farthest.some(samePoint(point))) {
      ctx.strokeStyle = 'red';
    } else {
      ctx.strokeStyle = 'black';
    }

    ctx.beginPath();
    ctx.ellipse(point.x, point.y, 4, 4, 0, 0, Math.PI * 2);
    ctx.stroke();
  });
};

const render = makeRender(ctx);
