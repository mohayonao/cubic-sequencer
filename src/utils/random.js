export function coin(x) {
  return Math.random() < x ? 1 : 0;
}

export function irand(x) {
  return Math.floor(Math.random() * x);
}

export function rand2(x) {
  return (Math.random() * 2 - 1) * x;
}

export function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
}
