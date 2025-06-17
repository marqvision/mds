import { parseDateString, isValidDate, autoformatDate } from './@utils';

describe('DateInputGroup utils', () => {
  describe('autoformatDate with "MM/DD/YYYY"', () => {
    it('should add separator after month part', () => {
      expect(autoformatDate('01', 'MM/DD/YYYY')).toBe('01/');
    });

    it('should add separator after day part', () => {
      expect(autoformatDate('01/23', 'MM/DD/YYYY')).toBe('01/23/');
    });

    it('should not add separator if length is not met', () => {
      expect(autoformatDate('1', 'MM/DD/YYYY')).toBe('1');
      expect(autoformatDate('01/2', 'MM/DD/YYYY')).toBe('01/2');
    });

    it('should filter out invalid characters', () => {
      expect(autoformatDate('01a', 'MM/DD/YYYY')).toBe('01');
      expect(autoformatDate('01/a23', 'MM/DD/YYYY')).toBe('01/23');
    });

    it('should limit total length to format length', () => {
      expect(autoformatDate('01/23/20245', 'MM/DD/YYYY')).toBe('01/23/2024');
    });
  });

  describe('parseDateString with "MM/DD/YYYY"', () => {
    it('should correctly parse a valid date string', () => {
      const date = parseDateString('03/15/2024', 'MM/DD/YYYY');
      expect(date).toEqual(new Date(2024, 2, 15));
    });

    it('should return null for an invalid month', () => {
      expect(parseDateString('13/15/2024', 'MM/DD/YYYY')).toBeNull();
      expect(parseDateString('00/15/2024', 'MM/DD/YYYY')).toBeNull();
    });

    it('should return null for an invalid day', () => {
      expect(parseDateString('02/30/2024', 'MM/DD/YYYY')).toBeNull();
      expect(parseDateString('04/31/2024', 'MM/DD/YYYY')).toBeNull();
    });

    it('should return null for an invalid date format', () => {
      expect(parseDateString('3/15/2024', 'MM/DD/YYYY')).toBeNull();
      expect(parseDateString('03/1/2024', 'MM/DD/YYYY')).toBeNull();
      expect(parseDateString('03/15/202', 'MM/DD/YYYY')).toBeNull();
      expect(parseDateString('54/2/3342', 'MM/DD/YYYY')).toBeNull();
    });

    it('should return null for non-numeric parts', () => {
      expect(parseDateString('aa/bb/cccc', 'MM/DD/YYYY')).toBeNull();
    });

    it('should handle dates with invalid month or day values, like "54/02/3342"', () => {
      expect(parseDateString('54/02/3342', 'MM/DD/YYYY')).toBeNull();
    });
  });

  describe('parseDateString with "YYYY-MM-DD"', () => {
    it('should correctly parse a valid date string', () => {
      const date = parseDateString('2024-03-15', 'YYYY-MM-DD');
      expect(date).toEqual(new Date(2024, 2, 15));
    });

    it('should return null for an invalid month', () => {
      expect(parseDateString('2024-13-15', 'YYYY-MM-DD')).toBeNull();
    });

    it('should return null for an invalid day', () => {
      expect(parseDateString('2024-02-30', 'YYYY-MM-DD')).toBeNull();
    });
  });

  describe('isValidDate', () => {
    const minDate = new Date(2024, 0, 1);
    const maxDate = new Date(2024, 11, 31);

    it('should return { isValid: false, isOutOfRange: false } for a null date', () => {
      expect(isValidDate(null)).toEqual({ isValid: false, isOutOfRange: false });
    });

    it('should return { isValid: true, isOutOfRange: false } for a valid date within range', () => {
      const date = new Date(2024, 5, 15);
      expect(isValidDate(date, minDate, maxDate)).toEqual({ isValid: true, isOutOfRange: false });
    });

    it('should return { isValid: true, isOutOfRange: true } for a date before minDate', () => {
      const date = new Date(2023, 11, 31);
      const result = isValidDate(date, minDate, maxDate);
      expect(result.isValid).toBe(true);
      expect(result.isOutOfRange).toBe(true);
    });

    it('should return { isValid: true, isOutOfRange: true } for a date after maxDate', () => {
      const date = new Date(2025, 0, 1);
      const result = isValidDate(date, minDate, maxDate);
      expect(result.isValid).toBe(true);
      expect(result.isOutOfRange).toBe(true);
    });

    it('should return { isValid: true, isOutOfRange: false } for a valid date without range constraints', () => {
      const date = new Date();
      expect(isValidDate(date)).toEqual({ isValid: true, isOutOfRange: false });
    });
  });
}); 