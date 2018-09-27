import { partition, within } from './utils'

const drawChildLines = (ctx, points) => {
  ctx.strokeStyle = 'gray'
  ctx.setLineDash([])

  points.forEach(point => {
    if (point.children.length === 0) return

    ctx.beginPath()
    point.children.forEach(child => {
      ctx.moveTo(point.x, point.y)
      ctx.lineTo(child.x, child.y)
    })
    ctx.stroke()
  })
}

const drawPoint = ctx => point => {
  ctx.beginPath()
  ctx.ellipse(point.x, point.y, 4, 4, 0, 0, Math.PI * 2)
  ctx.stroke()
}

const drawPoints = (ctx, state) => {
  const byMouse = within(10, state.mouse)
  const isCurrent = point => point === state.currentPoint

  const [mousePoints, notByMouse] = partition(byMouse)(state.points)
  const [currentPoints, regularPoints] = partition(isCurrent)(notByMouse)

  ctx.setLineDash([])
  ctx.strokeStyle = 'blue'
  mousePoints.forEach(drawPoint(ctx))

  ctx.strokeStyle = 'black'
  regularPoints.forEach(drawPoint(ctx))

  ctx.strokeStyle = 'red'
  // Should only be one but could be none so we use forEach
  currentPoints.forEach(drawPoint(ctx))
}

const drawToMouse = (ctx, { currentPoint, drawing, mouse }) => {
  if (!drawing) return

  ctx.setLineDash([5, 2])
  ctx.strokeStyle = 'gray'
  ctx.moveTo(currentPoint.x, currentPoint.y)
  ctx.lineTo(mouse.x, mouse.y)
  ctx.stroke()
}

export const makeRender = ctx => state => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  drawPoints(ctx, state)
  drawChildLines(ctx, state.points)
  drawToMouse(ctx, state)
}
