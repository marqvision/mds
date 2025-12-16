import { isDateRangeValid, isDateShapeValid, validateDateAndMinMaxRange } from '../@utils';
import { isPartiallyValidDate, parseDateStringToDate } from '../DateInputGroup/@utils';

describe('DatePickers 유틸 함수', () => {
  describe('validateDateAndMinMaxRange 함수', () => {
    const minDate = new Date(2024, 0, 1);
    const maxDate = new Date(2024, 11, 31);

    it('null 날짜에 대해 { isValid: false, isOutOfRange: false }를 반환해야 합니다', () => {
      expect(validateDateAndMinMaxRange({ date: null })).toEqual({ isValid: false, isOutOfRange: false });
    });

    it('범위 내의 유효한 날짜에 대해 { isValid: true, isOutOfRange: false }를 반환해야 합니다', () => {
      const date = new Date(2024, 5, 15);
      expect(validateDateAndMinMaxRange({ date, minDate, maxDate })).toEqual({ isValid: true, isOutOfRange: false });
    });
  });
});

describe('DateInputGroup 컴포넌트 유틸 함수', () => {
  describe('isDateShapeValid 함수', () => {
    it('MM/DD/YYYY: 부분적으로 또는 완전히 올바른 형태를 유효하다고 판단해야 합니다', () => {
      expect(isDateShapeValid('01', 'MM/DD/YYYY')).toBe(true);
      expect(isDateShapeValid('01/', 'MM/DD/YYYY')).toBe(true);
      expect(isDateShapeValid('01/23', 'MM/DD/YYYY')).toBe(true);
      expect(isDateShapeValid('01/23/', 'MM/DD/YYYY')).toBe(true);
      expect(isDateShapeValid('01/23/2024', 'MM/DD/YYYY')).toBe(true);
    });

    it('MM/DD/YYYY: 잘못된 형태를 유효하지 않다고 판단해야 합니다', () => {
      expect(isDateShapeValid('222222222', 'MM/DD/YYYY')).toBe(false);
      expect(isDateShapeValid('01//23', 'MM/DD/YYYY')).toBe(false);
      expect(isDateShapeValid('01/23/2024/', 'MM/DD/YYYY')).toBe(false);
      expect(isDateShapeValid('a/b/c', 'MM/DD/YYYY')).toBe(false);
      expect(isDateShapeValid('1/23/2024', 'MM/DD/YYYY')).toBe(false);
      expect(isDateShapeValid('01/2/2024', 'MM/DD/YYYY')).toBe(false);
    });

    it('YYYY-MM-DD: 부분적으로 또는 완전히 올바른 형태를 유효하다고 판단해야 합니다', () => {
      expect(isDateShapeValid('2024', 'YYYY-MM-DD')).toBe(true);
      expect(isDateShapeValid('2024-', 'YYYY-MM-DD')).toBe(true);
      expect(isDateShapeValid('2024-01-23', 'YYYY-MM-DD')).toBe(true);
    });

    it('YYYY-MM-DD: 잘못된 형태를 유효하지 않다고 판단해야 합니다', () => {
      expect(isDateShapeValid('222222222', 'YYYY-MM-DD')).toBe(false);
      expect(isDateShapeValid('2024--01', 'YYYY-MM-DD')).toBe(false);
      expect(isDateShapeValid('2023-/10/10', 'YYYY-MM-DD')).toBe(false);
      expect(isDateShapeValid('2024/01-/10', 'YYYY-MM-DD')).toBe(false);
    });
  });

  describe('parseDateString 함수 ("MM/DD/YYYY" 포맷)', () => {
    it('유효한 날짜 문자열을 올바르게 파싱해야 합니다', () => {
      const date = parseDateStringToDate('03/15/2024', 'MM/DD/YYYY');
      expect(date).toEqual(new Date(2024, 2, 15));
    });

    it('유효하지 않은 월에 대해 null을 반환해야 합니다', () => {
      expect(parseDateStringToDate('13/15/2024', 'MM/DD/YYYY')).toBeNull();
      expect(parseDateStringToDate('00/15/2024', 'MM/DD/YYYY')).toBeNull();
    });

    it('유효하지 않은 일에 대해 null을 반환해야 합니다', () => {
      expect(parseDateStringToDate('02/30/2024', 'MM/DD/YYYY')).toBeNull();
      expect(parseDateStringToDate('04/31/2024', 'MM/DD/YYYY')).toBeNull();
    });

    it('유효하지 않은 날짜 포맷에 대해 null을 반환해야 합니다', () => {
      expect(parseDateStringToDate('3/15/2024', 'MM/DD/YYYY')).toBeNull();
      expect(parseDateStringToDate('03/1/2024', 'MM/DD/YYYY')).toBeNull();
      expect(parseDateStringToDate('03/15/202', 'MM/DD/YYYY')).toBeNull();
    });
  });

  describe('parseDateString 함수 ("YYYY-MM-DD" 포맷)', () => {
    it('유효한 날짜 문자열을 올바르게 파싱해야 합니다', () => {
      const date = parseDateStringToDate('2024-03-15', 'YYYY-MM-DD');
      expect(date).toEqual(new Date(2024, 2, 15));
    });

    it('유효하지 않은 월에 대해 null을 반환해야 합니다', () => {
      expect(parseDateStringToDate('2024-13-15', 'YYYY-MM-DD')).toBeNull();
    });

    it('유효하지 않은 일에 대해 null을 반환해야 합니다', () => {
      expect(parseDateStringToDate('2024-02-30', 'YYYY-MM-DD')).toBeNull();
    });
  });

  describe('isPartiallyValidDate 함수', () => {
    it('MM/DD/YYYY: 유효한 부분 날짜를 올바르게 판단해야 합니다', () => {
      expect(isPartiallyValidDate('12', 'MM/DD/YYYY')).toBe(true);
      expect(isPartiallyValidDate('12/31', 'MM/DD/YYYY')).toBe(true);
    });

    it('MM/DD/YYYY: 유효하지 않은 부분 날짜를 올바르게 판단해야 합니다', () => {
      expect(isPartiallyValidDate('13', 'MM/DD/YYYY')).toBe(false);
      expect(isPartiallyValidDate('00', 'MM/DD/YYYY')).toBe(false);
      expect(isPartiallyValidDate('12/32', 'MM/DD/YYYY')).toBe(false);
      expect(isPartiallyValidDate('12/00', 'MM/DD/YYYY')).toBe(false);
    });

    it('YYYY-MM-DD: 유효한 부분 날짜를 올바르게 판단해야 합니다', () => {
      expect(isPartiallyValidDate('2024-12', 'YYYY-MM-DD')).toBe(true);
      expect(isPartiallyValidDate('2024-12-31', 'YYYY-MM-DD')).toBe(true);
    });

    it('YYYY-MM-DD: 유효하지 않은 부분 날짜를 올바르게 판단해야 합니다', () => {
      expect(isPartiallyValidDate('2024-13', 'YYYY-MM-DD')).toBe(false);
      expect(isPartiallyValidDate('2024-00', 'YYYY-MM-DD')).toBe(false);
      expect(isPartiallyValidDate('2024-12-32', 'YYYY-MM-DD')).toBe(false);
      expect(isPartiallyValidDate('2024-12-00', 'YYYY-MM-DD')).toBe(false);
    });

    it('MMM DD, YYYY: 월/일 부분 유효성을 검사해야 합니다', () => {
      expect(isPartiallyValidDate('Jan', 'MMM DD, YYYY')).toBe(true);
      expect(isPartiallyValidDate('Jan 05', 'MMM DD, YYYY')).toBe(true);
      expect(isPartiallyValidDate('Foo', 'MMM DD, YYYY')).toBe(false);
      expect(isPartiallyValidDate('Jan 32', 'MMM DD, YYYY')).toBe(false);
    });

    it('M.D: 월/일 부분 유효성을 검사해야 합니다', () => {
      expect(isPartiallyValidDate('6.', 'M.D')).toBe(true);
      expect(isPartiallyValidDate('6.15', 'M.D')).toBe(true);
      expect(isPartiallyValidDate('13.', 'M.D')).toBe(false);
      expect(isPartiallyValidDate('6.32', 'M.D')).toBe(false);
    });
  });

  describe('isDateRangeValid 함수', () => {
    it('startDate가 endDate보다 이전일 경우 true를 반환해야 합니다', () => {
      const startDate = new Date(2024, 0, 1);
      const endDate = new Date(2024, 0, 2);
      expect(isDateRangeValid(startDate, endDate)).toBe(true);
    });

    it('startDate와 endDate가 동일할 경우 true를 반환해야 합니다', () => {
      const startDate = new Date(2024, 0, 1);
      const endDate = new Date(2024, 0, 1);
      expect(isDateRangeValid(startDate, endDate)).toBe(true);
    });

    it('startDate가 endDate보다 이후일 경우 false를 반환해야 합니다', () => {
      const startDate = new Date(2024, 0, 2);
      const endDate = new Date(2024, 0, 1);
      expect(isDateRangeValid(startDate, endDate)).toBe(false);
    });

    it('startDate 또는 endDate 중 하나가 null일 경우 true를 반환해야 합니다', () => {
      const date = new Date(2024, 0, 1);
      expect(isDateRangeValid(date, null)).toBe(true);
      expect(isDateRangeValid(null, date)).toBe(true);
    });

    it('startDate와 endDate가 모두 null일 경우 true를 반환해야 합니다', () => {
      expect(isDateRangeValid(null, null)).toBe(true);
    });
  });
});
