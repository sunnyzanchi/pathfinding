// Get points that are _only_ in set A
// https://en.wikipedia.org/wiki/Complement_(set_theory)
export const complement = a => b => a.filter(p => !b.some(samePoint(p)))

// Naive implementation
export const findShortestPath = (p1, p2, points, path = []) => {
  const pointsWithoutPath = complement(points)(path)
  const closest = getClosest(p1, pointsWithoutPath)
  return samePoint(closest)(p2)
    ? path
    : findShortestPath(closest, p2, points, [...path, closest])
}

/**
 * Create an object from a shape of [[key, value], ...]
 * @param {Array} pairs Array of key value pairs to make an object from
 * @return {Object}
 */
export const fromPairs = pairs => {
  // Not functional. But faster than a reduce and it doesn't make a bunch of intermediate objects
  const obj = {}
  pairs.forEach(([key, val]) => (obj[key] = val))
  return obj
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

export const last = list => list[list.length - 1]

export const makePoint = (x, y) => ({
  children: [],
  x,
  y
})

// https://stackoverflow.com/a/47225591
export const partition = predicate => list =>
  list.reduce(
    ([pass, fail], elem) =>
      predicate(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]],
    [[], []]
  )

export const samePoint = p1 => p2 => p1.x === p2.x && p1.y === p2.y

export const within = (dist, p1) => p2 => getDistance(p1, p2) < dist
