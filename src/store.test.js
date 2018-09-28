import { test } from 'ava'
import makeStore, { types } from './store'
import { makePoint } from './utils'

test('store has initial state', t => {
  const store = makeStore()
  const state = store.getState()

  t.is(typeof state, 'object')
})

test('can add a point to the initial state', t => {
  const store = makeStore()
  const point = makePoint(10, 10)

  store.dispatch({ payload: point, type: types.ADD_POINT })
  const { points } = store.getState()
  t.deepEqual(points, [point])
})

test('can add a series of connected points', t => {
  const store = makeStore()
  const a = makePoint(0, 0)
  const b = makePoint(10, 0)
  const c = makePoint(20, 0)
  const d = makePoint(30, 0)

  store.dispatch({ payload: a, type: types.ADD_POINT })
  store.dispatch({ type: types.START_DRAWING })
  store.dispatch({ payload: b, type: types.ADD_CHILD })
  store.dispatch({ payload: c, type: types.ADD_CHILD })
  store.dispatch({ payload: d, type: types.ADD_CHILD })

  const { points } = store.getState()

  t.deepEqual(points[0].children, [b])
  t.deepEqual(points[1].children, [c])
  t.deepEqual(points[2].children, [d])
  t.deepEqual(points[3].children, [])
})

// This is when we're not in draw mode and we click on an existing point,
// then click somewhere else to add a new point
test('can add a child to an existing point', t => {
  const a = makePoint(10, 20)
  const b = makePoint(20, 30)
  const c = makePoint(30, 40)
  const initialState = {
    currentPoint: null,
    drawing: false,
    points: [a, b, c]
  }
  const store = makeStore(initialState)
  const d = makePoint(40, 50)
  store.dispatch({ payload: b, type: types.SET_CURRENT_POINT })
  store.dispatch({ type: types.START_DRAWING })
  store.dispatch({ payload: d, type: types.ADD_CHILD })

  const { currentPoint, points } = store.getState()
  t.deepEqual(points[1].children, [d])
  t.is(currentPoint, d)
})
