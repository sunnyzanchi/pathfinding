export const getDistance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

export const getFarthest = (point, points) =>
  points.reduce(
    (cur, n) => (getDistance(n, point) > getDistance(cur, point) ? n : cur),
    point
  );

export const getFarthestPair = points =>
  points.reduce(
    (cur, n) => {
      const farthestFromN = getFarthest(n, points);
      return getDistance(n, farthestFromN) > getDistance(cur[0], cur[1])
        ? [n, farthestFromN]
        : cur;
    },
    [points[0], points[1]]
  );

export const samePoint = p1 => p2 => p1[0] === p2[0] && p1[1] === p2[1];
