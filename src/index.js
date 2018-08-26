import { makeRender } from './render'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const render = makeRender(ctx)
const mouse = {}
const points = []

window.addEventListener('contextmenu', e => e.preventDefault())

canvas.addEventListener('click', e => {
  points.push({ x: e.x, y: e.y })
})

canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX
  mouse.y = e.clientY
})

const draw = () => {
  render(points, mouse)
  window.requestAnimationFrame(draw)
}

draw()
