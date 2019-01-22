import { createStore } from 'redux'

const initialState = {
  currentPoint: null,
  drawing: false,
  endPoint: undefined,
  mouse: { x: Infinity, y: Infinity },
  points: [],
  startPoint: undefined
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
        // If we're connecting to an existing point, we don't want
        // to readd it to the list
        .concat(state.points.some(p => p === newPoint) ? [] : newPoint)
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
    case types.SET_PATHFIND_POINT:
      if (!state.startPoint || (state.startPoint && state.endPoint)) {
        // Set the start point if there isn't already one, or if we're starting a new pair
        return { ...state, endPoint: undefined, startPoint: action.payload }
      } else if (state.startPoint === action.payload) {
        // If the point is the same as the already selected start point, do nothing
        return state
      } else {
        // Set the end point
        return { ...state, endPoint: action.payload }
      }
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
  SET_PATHFIND_POINT: 'SET_PATHFIND_POINT',
  START_DRAWING: 'START_DRAWING',
  STOP_DRAWING: 'STOP_DRAWING'
}

const makeStore = state => createStore(reducer, state || initialState)

export default makeStore
