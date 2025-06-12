import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const CalendarContainer = styled.div`
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
  gap: 4px;
  padding: 0 12px 12px;
`;

export const DayCell = styled.div<{
  isDisplayedMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isFuture: boolean;
  isSelectable: boolean;
}>`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ isSelectable }) => (isSelectable ? 'pointer' : 'default')};
  border-radius: 50%;
  color: ${({ isSelected, isDisplayedMonth, isSelectable, theme }) => {
    if (isSelected) return theme.color.content.on_default_color;
    if (!isDisplayedMonth) return 'transparent';
    if (!isSelectable) return theme.color.content.neutral.default.disabled;
    return theme.color.content.neutral.default.normal;
  }};
  background-color: ${({ isSelected, theme }) => {
    if (isSelected) return theme.color.bg.fill.primary.default.normal;

    return 'transparent';
  }};

  &:hover {
    background-color: ${({ isSelected, theme }) => {
      return isSelected ? theme.color.bg.fill.primary.default.hover : theme.color.bg.fill.primary.tint.hover;
    }};
  }
  ${({ isToday, theme }) =>
    isToday &&
    css`
      position: relative;
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
  }
`;
