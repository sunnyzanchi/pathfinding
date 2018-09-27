import { last, partition, within } from './utils'

const drawChildren = (ctx, points) => {
  ctx.strokeStyle = 'gray'
  ctx.setLineDash([])

  points.forEach(point => {
    if (point.children.length === 0) return

    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    point.children.forEach(child => ctx.lineTo(child.x, child.y))
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
  drawChildren(ctx, points)
  drawToMouse(ctx, drawing, last(points), mouse)
}
