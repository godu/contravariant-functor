import { concat, map, findLastIndex, includes, reverse, pipe, sortBy } from 'lodash/fp';
import { ordNumber, contramap } from 'fp-ts/es6/Ord';
import { sort } from 'fp-ts/es6/Array';
import { Content, Id } from './type';

const getContentRefs = (content: Content): Id[] =>
  concat(content.universalRef, map('universalRef', content.modules));

const getSortingScore = (refsInOrder: Id[]) => (contentRefs: Id[]): number =>
  pipe(
    reverse,
    findLastIndex(filteredRef => includes(filteredRef, contentRefs))
  )(refsInOrder);

export const sortByContentRef = (hits: Content[], refsInOrder: Id[] = []): Content[] => {
  const compareContent = contramap(
    pipe(
      getContentRefs,
      getSortingScore(refsInOrder)
    )
  )(ordNumber);

  return sort(compareContent)(hits.reverse()).reverse();
};
