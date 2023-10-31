export type MediansTuple = [number] | [number, number];

/**
 * Find and return the median numbers.
 *
 * @param array A sorted array of numbers
 * @returns The median number(s) of the array as a "tuple"
 */
export function getMediansOfSortedArray(array: number[]): MediansTuple {
  const halfLength = Math.floor(array.length / 2);

  if (array.length % 2 === 0) {
    // When the array is even, there are 2 median numbers
    return [array[halfLength - 1], array[halfLength]];
  } else {
    return [array[halfLength]];
  }
}
