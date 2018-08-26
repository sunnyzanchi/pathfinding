// Get points that are _only_ in set A
// https://en.wikipedia.org/wiki/Complement_(set_theory)
export const complement = a => b =>
  a.filter(p => !b.some(samePoint(p)))

// Naive implementation
export const findShortestPath = (p1, p2, points, path = []) => {
  const pointsWithoutPath = complement(points)(path)
  const closest = getClosest(p1, pointsWithoutPath)
  return samePoint(closest)(p2)
    ? path
    : findShortestPath(closest, p2, points, [...path, closest])
}

export const getClosest = (point, points) => {
  const withoutPoint = points.filter(p => p !== point)
  return withoutPoint.reduce(
    (cur, n) => (getDistance(n, point) < getDistance(cur, point) ? n : cur),
    withoutPoint[0]
  )
}

export const getDistance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

export const getFarthest = (point, points) =>
  points.reduce(
    (cur, n) => (getDistance(n, point) > getDistance(cur, point) ? n : cur),
    point
  )

export const getFarthestPair = points =>
  points.reduce(
    (cur, n) => {
      const farthestFromN = getFarthest(n, points)
      return getDistance(n, farthestFromN) > getDistance(cur[0], cur[1])
        ? [n, farthestFromN]
        : cur
    },
    [points[0], points[1]]
  )

export const samePoint = p1 => p2 => p1.x === p2.x && p1.y === p2.y

export const within = (dist, p1, p2) =>
  getDistance(p1, p2) < dist
