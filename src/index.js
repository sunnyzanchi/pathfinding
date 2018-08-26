import { makeRender } from './render'
import { within } from './utils'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const render = makeRender(ctx)
const mouse = {}
let points = []

let drawing = false

// So we can use right-click
window.addEventListener('contextmenu', e => {
  if (drawing) {
    drawing = false
  }

  e.preventDefault()
})

canvas.addEventListener('click', e => {
  if (!drawing) {
    drawing = true
  }
  const mouse = { x: e.x, y: e.y }

  if (points.some(within(10, mouse))) {
    points = points.map(point => {
      if (within(10, mouse)(point)) {
        return {
          ...point,
          links: [...point.links, points[points.length - 1]]
        }
      }
      return point
    })
  } else {
    points.push({
      links: points.length ? [points[points.length - 1]] : [],
      x: e.x,
      y: e.y
    })
  }
})

canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX
  mouse.y = e.clientY
})

const draw = () => {
  render({ drawing, mouse, points })
  window.requestAnimationFrame(draw)
}

draw()
