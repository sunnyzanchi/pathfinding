import { test } from 'ava';
import { getDistance, getFarthest, getFarthestPair } from './utils';

const a = { x: 0, y: 0 };
const b = { x: 5, y: 0 };
const c = { x: 0, y: 5 };
const d = { x: 3, y: 4 };
const e = { x: 30, y: 40 };
const f = { x: -10, y: -10 };

test('getDistance', t => {
  t.is(getDistance(a, b), 5);
  t.is(getDistance(a, c), 5);
  t.is(getDistance(a, d), 5);
});

test('getFarthest', t => {
  t.is(getFarthest(a, [b, c, d, e]), e);
});

test('getFarthestPair', t => {
  t.deepEqual([e, f], getFarthestPair([a, b, c, d, e, f]));
});
