import { describe, it, expect } from 'vitest';
import { formatRating } from './formatRating';

describe('formatRating', () => {
  describe('normal values', () => {
    it('formats 4.3 as ★ 4.3', () => {
      expect(formatRating(4.3)).toBe('★ 4.3');
    });

    it('formats integer 5 with one decimal place as ★ 5.0', () => {
      expect(formatRating(5)).toBe('★ 5.0');
    });

    it('formats 3.7 as ★ 3.7', () => {
      expect(formatRating(3.7)).toBe('★ 3.7');
    });
  });

  describe('boundary values', () => {
    it('formats minimum boundary 1.0 as ★ 1.0', () => {
      expect(formatRating(1.0)).toBe('★ 1.0');
    });

    it('formats maximum boundary 5.0 as ★ 5.0', () => {
      expect(formatRating(5.0)).toBe('★ 5.0');
    });
  });

  describe('out-of-range values throw RangeError', () => {
    it('throws RangeError for 0.9 (below minimum)', () => {
      expect(() => formatRating(0.9)).toThrow(RangeError);
    });

    it('throws RangeError for 5.1 (above maximum)', () => {
      expect(() => formatRating(5.1)).toThrow(RangeError);
    });

    it('throws RangeError for -1 (negative)', () => {
      expect(() => formatRating(-1)).toThrow(RangeError);
    });

    it('throws RangeError for 0', () => {
      expect(() => formatRating(0)).toThrow(RangeError);
    });
  });

  describe('invalid inputs throw RangeError', () => {
    it('throws RangeError for NaN', () => {
      expect(() => formatRating(NaN)).toThrow(RangeError);
    });

    it('throws RangeError for undefined cast as number', () => {
      expect(() => formatRating(undefined as unknown as number)).toThrow(RangeError);
    });
  });
});
