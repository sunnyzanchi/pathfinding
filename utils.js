export const getDistance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

export const getFarthest = (node, nodes) =>
  nodes.reduce(
    (cur, n) => (getDistance(n, node) > getDistance(cur, node) ? n : cur),
    node
  );

export const getFarthestPair = nodes =>
  nodes.reduce(
    (cur, n) => {
      const farthestFromN = getFarthest(n, nodes);
      return getDistance(n, farthestFromN) > getDistance(cur[0], cur[1])
        ? [n, farthestFromN]
        : cur;
    },
    [nodes[0], nodes[1]]
  );
