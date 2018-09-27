import { makeRender } from './render'
import store, { types } from './store'
import { makePoint, within } from './utils'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const render = makeRender(ctx)

store.subscribe(() => {
  const state = store.getState()
  if (state.points.length > 0) {
    render(state)
  }
})

// So we can use right-click
window.addEventListener('contextmenu', e => {
  if (store.getState().drawing) {
    store.dispatch({ type: types.STOP_DRAWING })
  }

  e.preventDefault()
})

/**
 * When we left click, four things can happen:
 *
 * In draw mode:
 * 1) We can click on an existing point to connect it to the current point.
 * 2) We can add a new point, connected to the last drawn point.
 *   This sets the new point to the current point.
 *
 * Outside of draw mode:
 * 3) We can click on a point that already exists to start drawing.
 *   This doesn't create a new point, but puts us in draw mode
 *   and sets the point we clicked on to the current point.
 *   The next point we create will be a child of this node.
 * 4) We can add a completely new point, with no connections.
 *   This is what happens on the first click, if we don't click
 *   near another point and we're not already drawing.
 */
canvas.addEventListener('click', e => {
  const { drawing, points } = store.getState()
  const point = makePoint(e.x, e.y)
  const nearby = points.find(within(10, point))

  if (drawing) {
    if (nearby) {
      // 1) Add the point we clicked on to the children of the
      // current point, then set this point to be the current point
      store.dispatch({ payload: nearby, type: types.ADD_CHILD })
    } else {
      // 2) Add a new point, connecting it to the current point,
      // then setting this new point to be the current point
      store.dispatch({ payload: point, type: types.ADD_CHILD })
    }
  } else {
    if (nearby) {
      // 3) We're clicking an existing point to set it to the current point
      // and entering draw mode
      store.dispatch({ payload: nearby, type: types.SET_CURRENT_POINT })
    } else {
      // 4) We're adding a completely new point and entering draw mode
      store.dispatch({ payload: point, type: types.ADD_POINT })
    }

    store.dispatch({ type: types.START_DRAWING })
  }
})

canvas.addEventListener('mousemove', e => {
  const mouse = {
    x: e.x,
    y: e.y
  }

  store.dispatch({ payload: mouse, type: types.SET_MOUSE })
})
