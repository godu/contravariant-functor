export type Id = string;

export type Content = {
  ref: Id,
  universalRef: Id,
  modules?: [Content]
};


export type Compare<T> = (x: T, y: T) => number

const compareNumber: Compare<number> = (x: number, y: number): number => x - y;

const contraMapCompare = <A, B>(ba: ((b: B) => A), compareA: Compare<A>): Compare<B> =>
  (x: B, y: B): number => compareA(ba(x), ba(y));
