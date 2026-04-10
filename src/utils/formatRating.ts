/**
 * 將 1–5 的數字評分格式化為顯示用字串
 * @example formatRating(4.3)  => '★ 4.3'
 * @example formatRating(5)    => '★ 5.0'
 * @example formatRating(0.9)  => throws RangeError
 * @example formatRating(5.1)  => throws RangeError
 */
export function formatRating(rating: number): string {
  if (typeof rating !== 'number' || isNaN(rating)) {
    throw new RangeError(`Invalid rating: ${rating}. Must be a number between 1 and 5.`);
  }
  if (rating < 1 || rating > 5) {
    throw new RangeError(`Rating ${rating} is out of range. Must be between 1 and 5.`);
  }
  return `★ ${rating.toFixed(1)}`;
}
