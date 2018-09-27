import { createStore } from 'redux'

const initialState = {
  currentPoint: null,
  drawing: false,
  mouse: { x: Infinity, y: Infinity },
  points: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.ADD_CHILD: {
      const { currentPoint } = state
      const newPoint = action.payload
      const updated = {
        ...currentPoint,
        children: currentPoint.children.concat(newPoint)
      }
      const points = state.points
        .map(p => (p === currentPoint ? updated : p))
        .concat(newPoint)
      return { ...state, currentPoint: newPoint, points }
    }
    case types.ADD_POINT: {
      const { currentPoint } = state
      const newPoint = action.payload

      if (!currentPoint) {
        return {
          ...state,
          currentPoint: newPoint,
          points: state.points.concat(newPoint)
        }
      }

      const updated = {
        ...currentPoint,
        children: currentPoint.children.concat(newPoint)
      }
      const points = state.points
        .map(p => (p === currentPoint ? updated : p))
        .concat(newPoint)

      return { ...state, currentPoint: newPoint, points }
    }
    case types.SET_CURRENT_POINT:
      return { ...state, currentPoint: action.payload }
    case types.SET_MOUSE:
      return { ...state, mouse: action.payload }
    case types.START_DRAWING:
      return { ...state, drawing: true }
    case types.STOP_DRAWING:
      return { ...state, currentPoint: null, drawing: false }
    default:
      return state
  }
}

export const types = {
  ADD_CHILD: 'ADD_CHILD',
  ADD_POINT: 'ADD_POINT',
  SET_CURRENT_POINT: 'SET_CURRENT_POINT',
  SET_MOUSE: 'SET_MOUSE',
  START_DRAWING: 'START_DRAWING',
  STOP_DRAWING: 'STOP_DRAWING'
}

const store = createStore(reducer, initialState)

export default store
