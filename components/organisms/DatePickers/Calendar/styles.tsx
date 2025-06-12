import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { DateRangeSelectionMode } from './@types';

export const CalendarLayout = styled.div`
  width: 304px;
  background-color: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};
`;

export const WeekdayHeader = styled.div`
  & > div {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    padding: 6px 12px;
    background-color: ${({ theme }) => theme.color.bg.surface.neutral.secondary.normal};
  }
`;

export const Weekday = styled.div<{ isWeekend: boolean }>`
  color: ${({ isWeekend }) => (isWeekend ? '#ff4d4f' : '#000000')};
  font-weight: 500;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0 12px 12px;
`;

export const DayCell = styled.div<{
  isDisplayedMonth: boolean;
  isToday: boolean;
  isSelectable: boolean;
  isStartDate?: boolean;
  isEndDate?: boolean;
  isInRange?: boolean;
  dateSelectionMode?: DateRangeSelectionMode;
}>`
  aspect-ratio: 1;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: ${({ isSelectable }) => (isSelectable ? 'pointer' : 'default')};

  background-color: ${({ isInRange, isStartDate, isEndDate, theme }) =>
    isStartDate || isEndDate || isInRange ? theme.color.bg.fill.primary.tint.normal : 'transparent'};

  border-radius: ${({ isStartDate, isEndDate }) => {
    if (isStartDate && isEndDate) return '50%';
    else if (isStartDate) return '50% 0 0 50%';
    else if (isEndDate) return '0 50% 50% 0';
    return '0;';
  }};

  ${({ isToday, theme }) =>
    isToday &&
    css`
      &:before {
        content: '';
        display: block;
        border-radius: 50%;
        background-color: ${theme.color.bg.fill.primary.default.normal};
        width: 4px;
        height: 4px;
        position: absolute;
        top: 4px;
        left: 50%;
        transform: translateX(-50%);
      }
    `}

  ${({ isStartDate, isEndDate, theme }) => css`
    &:after {
      content: '';
      position: absolute;
      z-index: 0;
      display: block;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      background-color: ${isStartDate || isEndDate ? theme.color.bg.fill.primary.default.normal : 'transparent'};
    }
  `}

  &:hover {
    &:after {
      content: '';
      position: absolute;
      z-index: 0;
      display: block;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      background-color: ${({ isStartDate, isEndDate, isDisplayedMonth, isSelectable, theme }) => {
        if (isStartDate || isEndDate) return theme.color.bg.fill.primary.default.hover;
        else if (!isDisplayedMonth || !isSelectable) return 'transparent';
        return theme.color.bg.fill.primary.tint.hover;
      }};
    }
  }


  // 캘린더 내에서 날짜 typography의 상호작용 관련 스타일
  & > span {
    user-select: none;
    z-index: 1;
    color: ${({ isStartDate, isEndDate, isDisplayedMonth, isSelectable, theme }) => {
      if (isStartDate || isEndDate) return theme.color.content.on_default_color;
      
      if (!isSelectable) return theme.color.content.neutral.default.disabled;
      return theme.color.content.neutral.default.normal;
    }};
  }
`;
