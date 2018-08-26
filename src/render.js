import { within, getFarthestPair, findShortestPath, samePoint } from './utils'

export const makeRender = ctx => (points, mouse) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  const farthest = points.length > 1 ? getFarthestPair(points) : []
  const path =
    points.length > 1 ? findShortestPath(farthest[0], farthest[1], points) : []
  const drawPath =
    farthest.length > 1 ? [farthest[0], ...path, farthest[1]] : []

  drawPath.length > 1 && ctx.moveTo(drawPath[0].x, drawPath[0].y)
  ctx.strokeStyle = 'gray'
  drawPath.forEach(point => ctx.lineTo(point.x, point.y))
  ctx.stroke()

  points.forEach(point => {
    // TODO: Make this work
    if (farthest.some(samePoint(point))) {
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 1
    } else if (within(10, mouse, point)) {
      ctx.strokeStyle = 'blue'
      ctx.lineWidth = 2
    } else {
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 1
    }

    ctx.beginPath()
    ctx.ellipse(point.x, point.y, 4, 4, 0, 0, Math.PI * 2)
    ctx.stroke()
  })
}
