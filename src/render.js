import { getFarthestPair, findShortestPath, partition, samePoint, within } from './utils'

const drawLinks = (ctx, points) => {
  ctx.strokeStyle = 'gray'
  ctx.setLineDash([])

  points.forEach(point => {
    if (!point.links.length) return

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    point.links.forEach(link => ctx.lineTo(link.x, link.y))
    ctx.stroke()
  })
}

const drawPoints = (ctx, mouse, points) => {
  const byMouse = within(10, mouse)

  const [mousePoints, notByMouse] = partition(byMouse)(points)

  ctx.setLineDash([])
  ctx.strokeStyle = 'blue'
  mousePoints.forEach(point => {
    ctx.beginPath()
    ctx.ellipse(point.x, point.y, 4, 4, 0, 0, Math.PI * 2)
    ctx.stroke()
  })

  ctx.strokeStyle = 'black'
  notByMouse.forEach(point => {
    ctx.beginPath()
    ctx.ellipse(point.x, point.y, 4, 4, 0, 0, Math.PI * 2)
    ctx.stroke()
  })
}

const drawToMouse = (ctx, drawing, lastPoint, mouse) => {
  if (!drawing) return

  ctx.setLineDash([5, 2])
  ctx.strokeStyle = 'gray'
  ctx.moveTo(lastPoint.x, lastPoint.y)
  ctx.lineTo(mouse.x, mouse.y)
  ctx.stroke()
}

export const makeRender = ctx => ({ drawing, points, mouse }) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  drawPoints(ctx, mouse, points)
  drawLinks(ctx, points)
  drawToMouse(ctx, drawing, points[points.length - 1], mouse)
}
