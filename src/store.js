import { createStore } from 'redux'
import { last } from './utils'

const initialState = {
  drawing: false,
  mouse: { x: Infinity, y: Infinity },
  points: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.ADD_CHILD: {
      const lastPoint = last(state.points)
      const newPoint = action.payload
      const updated = {
        ...lastPoint,
        children: lastPoint.children.concat(newPoint)
      }
      const rest = state.points.slice(0, -1)
      const points = [...rest, updated]
      return { ...state, points }
    }
    case types.ADD_POINT: {
      const lastPoint = last(state.points)
      const newPoint = action.payload

      // The very first point we add
      if (!lastPoint) {
        return { ...state, points: [newPoint] }
      }

      const updated = {
        ...lastPoint,
        children: lastPoint.children.concat(newPoint)
      }
      const rest = state.points.slice(0, -1)
      const points = [...rest, updated, newPoint]

      return { ...state, points }
    }
    case types.SET_MOUSE:
      return { ...state, mouse: action.payload }
    case types.START_DRAWING:
      return { ...state, drawing: true }
    case types.STOP_DRAWING:
      return { ...state, drawing: false }
    default:
      return state
  }
}

export const types = {
  ADD_CHILD: 'ADD_CHILD',
  ADD_POINT: 'ADD_POINT',
  SET_MOUSE: 'SET_MOUSE',
  START_DRAWING: 'START_DRAWING',
  STOP_DRAWING: 'STOP_DRAWING'
}

const store = createStore(reducer, initialState)

export default store
