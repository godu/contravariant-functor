import { concat, map, findLastIndex, includes, reverse, pipe, sortBy } from 'lodash/fp';
import { Content, Id } from './type';

type Compare<T> = (x: T, y: T) => number
const compareNumber: Compare<number> = (x: number, y: number): number => x - y;
const contraMapCompare = <A, B>(ba: ((b: B) => A), compareA: Compare<A>): Compare<B> =>
  (x: B, y: B): number => compareA(ba(x), ba(y));

const getContentRefs = (content: Content): Id[] =>
  concat(content.universalRef, map('universalRef', content.modules));

const getSortingScore = (refsInOrder: Id[]) => (contentRefs: Id[]): number =>
  pipe(
    reverse,
    findLastIndex(filteredRef => includes(filteredRef, contentRefs))
  )(refsInOrder);

export const sortByContentRef = (hits: Content[], refsInOrder: Id[] = []): Content[] => {
  const compareContent = contraMapCompare(
    pipe(
      getContentRefs,
      getSortingScore(refsInOrder)
    ),
    compareNumber
  );

  return hits.reverse().sort(compareContent).reverse();
};
