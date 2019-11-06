import { concat, map, findLastIndex, includes, reverse, pipe, sortBy } from 'lodash/fp';
import { Content, Id } from './type';

const getContentRefs = (content: Content): Id[] =>
  concat(content.universalRef, map('universalRef', content.modules));

const getSortingScore = (refsInOrder: Id[]) => (contentRefs: Id[]): number =>
  pipe(
    reverse,
    findLastIndex(filteredRef => includes(filteredRef, contentRefs))
  )(refsInOrder);

export const sortByContentRef = (hits: Content[], refsInOrder: Id[] = []): Content[] =>
  pipe(
    reverse,
    sortBy(
      pipe(
        getContentRefs,
        getSortingScore(refsInOrder)
      )
    ),
    reverse
  )(hits);
