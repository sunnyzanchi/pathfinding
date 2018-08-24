import { getFarthestPair, samePoint } from './utils';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const points = [];

window.addEventListener('contextmenu', e => e.preventDefault());

window.addEventListener('click', e => {
  points.push({ x: e.x, y: e.y });
  points.length > 1 && render(points);
});

const makeRender = ctx => points => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const farthest = getFarthestPair(points);

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
