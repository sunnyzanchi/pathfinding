import test from 'ava'
import {
  complement,
  findShortestPath,
  getClosest,
  getDistance,
  getFarthest,
  getFarthestPair,
  getLinks,
  isInLink,
  makePoint,
  samePoint
} from './utils'

const a = { x: 0, y: 0 }
const b = { x: 5, y: 0 }
const c = { x: 0, y: 5 }
const d = { x: 3, y: 4 }
const e = { x: 30, y: 40 }
const f = { x: -10, y: -10 }
const g = { x: 1, y: 0 }

test('complement', t => {
  const set1 = [a, b, c, d]
  const set2 = [b]
  const set3 = [b, c]
  const set4 = [b, c, d]
  const set5 = [a, b, c, d]

  t.deepEqual(complement(set1)(set2), [a, c, d])
  t.deepEqual(complement(set1)(set3), [a, d])
  t.deepEqual(complement(set1)(set4), [a])
  t.deepEqual(complement(set1)(set5), [])
})

test('findShortestPath', t => {
  // The shortest path from d -> a is d -> b -> a
  // c is way too far out to be shorter
  const a = makePoint(50, 0)
  const b = makePoint(25, 25, [a])
  const c = makePoint(200, 25, [a])
  const d = makePoint(50, 50, [b, c])

  const result = findShortestPath(a, d, [a, b, c, d])
  t.deepEqual(result, [d, b, a])
})

test('getClosest', t => {
  t.is(getClosest(a, [b, c, d, e, f, g]), g)
})

test('getDistance', t => {
  t.is(getDistance(a)(b), 5)
  t.is(getDistance(a)(c), 5)
  t.is(getDistance(a)(d), 5)
})

test('getFarthest', t => {
  t.is(getFarthest(a, [b, c, d, e]), e)
})

test('getFarthestPair', t => {
  t.deepEqual([e, f], getFarthestPair([a, b, c, d, e, f]))
})

test('getLinks', t => {
  const a = makePoint(0, 1)
  const b = makePoint(0, 2, [a])
  const c = makePoint(0, 3, [b])
  const d = makePoint(0, 4, [a, b])
  const e = makePoint(0, 5, [a, d])

  const links = getLinks([a, b, c, d, e])
  t.deepEqual(links, [[b, a], [c, b], [d, a], [d, b], [e, a], [e, d]])
})

test('isInLink', t => {
  const a = makePoint(0, 1)
  const b = makePoint(0, 2, [a])
  const c = makePoint(0, 3, [b])

  const links = getLinks([a, b, c])

  t.true(isInLink(a)(links[0]))
  t.false(isInLink(a)(links[1]))
})

test('samePoint', t => {
  const sameAsA = { x: 0, y: 0 }
  t.true(samePoint(a)(sameAsA))
  t.false(samePoint(a)(f))
})
