import { Content, Id } from './type';

const getContentIndexByUniversalRef = (content: Content, universalRefs: Id[]): number => {
  const contentRefIndex = universalRefs.indexOf(content.universalRef);

  if (contentRefIndex !== -1) {
    return contentRefIndex;
  }

  if (content.modules) {
    const modulesRefs = content.modules.map(item => item.universalRef);
    return universalRefs.findIndex(ref => modulesRefs.includes(ref));
  }

  return -1;
};

export const sortByUniversalRef = (hits: Content[], universalRefs: Id[] = []): Content[] => {
  if (universalRefs.length === 0) {
    return hits;
  }

  return hits.sort((a: Content, b: Content): number => {
    const aIndex = getContentIndexByUniversalRef(a, universalRefs);
    const bIndex = getContentIndexByUniversalRef(b, universalRefs);

    // To put this content at the end
    if (aIndex === -1) {
      return 1;
    }

    // To put this content at the end
    if (bIndex === -1) {
      return -1;
    }

    return aIndex - bIndex;
  });
};
