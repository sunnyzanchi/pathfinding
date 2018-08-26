import { test } from 'ava'
import {
  getDistance,
  getFarthest,
  getFarthestPair,
  samePoint,
  getClosest,
  complement,
  findShortestPath
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
  const a = { x: 0, y: 0 }
  const b = { x: 1, y: 0 }
  const c = { x: 2, y: 0 }
  const d = { x: 3, y: 5 }
  const e = { x: 4, y: 0 }
  const f = { x: 5, y: 0 }

  const result = findShortestPath(a, f, [a, b, c, d, e, f])
  t.deepEqual(result, [b, c, e])
})

test('getClosest', t => {
  t.is(getClosest(a, [b, c, d, e, f, g]), g)
})

test('getDistance', t => {
  t.is(getDistance(a, b), 5)
  t.is(getDistance(a, c), 5)
  t.is(getDistance(a, d), 5)
})

test('getFarthest', t => {
  t.is(getFarthest(a, [b, c, d, e]), e)
})

test('getFarthestPair', t => {
  t.deepEqual([e, f], getFarthestPair([a, b, c, d, e, f]))
})

test('samePoint', t => {
  const sameAsA = { x: 0, y: 0 }
  t.true(samePoint(a)(sameAsA))
  t.false(samePoint(a)(f))
})
