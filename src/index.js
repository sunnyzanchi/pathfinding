import { makeRender } from './render'
import store, { types } from './store'
import { makePoint, within } from './utils'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const render = makeRender(ctx)

store.subscribe(() => {
  const state = store.getState()
  if (state.points.length > 0) {
    render(store.getState())
  }
})

// So we can use right-click
window.addEventListener('contextmenu', e => {
  if (store.getState().drawing) {
    store.dispatch({ type: types.STOP_DRAWING })
  }

  e.preventDefault()
})

canvas.addEventListener('click', e => {
  store.dispatch({ type: types.START_DRAWING })
  const point = makePoint(e.x, e.y)
  const points = store.getState().points
  const nearby = points.find(within(10, point))

  // We're drawing and we want to connect to an existing point
  if (nearby) {
    store.dispatch({ payload: nearby, type: types.ADD_CHILD })
    return
  }

  // We're adding a new point
  store.dispatch({ payload: point, type: types.ADD_POINT })
})

canvas.addEventListener('mousemove', e => {
  const mouse = {
    x: e.x,
    y: e.y
  }

  store.dispatch({ payload: mouse, type: types.SET_MOUSE })
})
