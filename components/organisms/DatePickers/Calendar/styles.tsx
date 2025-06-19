import { css } from '@emotion/react';
import styled from '@emotion/styled';

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
  row-gap: 2px;
  padding: 2px 12px 12px;
`;

export const DayCell = styled.div<{
  isDisplayedMonth: boolean;
  isToday: boolean;
  isSelectable: boolean;
  isStartDate?: boolean;
  isEndDate?: boolean;
  isStartAndEndSame?: boolean;
  isInRange?: boolean;
  isSelectionInProgress?: boolean;
  isAnchorDate?: boolean;
}>`
  aspect-ratio: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: ${({ isSelectable }) => (isSelectable ? 'pointer' : 'default')};

  background: ${({ isInRange, isStartDate, isEndDate, isSelectionInProgress, isStartAndEndSame, theme }) => {
    if (isSelectionInProgress || isStartAndEndSame) {
      return 'transparent';
    } else if (isStartDate) {
      return `linear-gradient(90deg, transparent 50%, ${theme.color.bg.fill.primary.tint.normal} 50%)`;
    } else if (isEndDate) {
      return `linear-gradient(90deg, ${theme.color.bg.fill.primary.tint.normal} 50%, transparent 50%)`;
    } else if (isInRange) {
      return theme.color.bg.fill.primary.tint.normal;
    } else {
      return 'transparent';
    }
  }};

  //#region border styles
  ${({ isStartAndEndSame, isInRange, isSelectionInProgress, isStartDate, isEndDate, theme }) => {
    if (isStartAndEndSame) return;
    else {
      const startDateBorderStyle =
        isSelectionInProgress &&
        isStartDate &&
        css`
          border-top: 2px solid;
          border-bottom: 2px solid;
          border-image: linear-gradient(to right, transparent 50%, ${theme._raw_color.blue50} 50%) 100%
            1;
        `;
      const endDateBorderStyle =
        isSelectionInProgress &&
        isEndDate &&
        css`
          border-top: 2px solid;
          border-bottom: 2px solid;
          border-image: linear-gradient(to right, ${theme._raw_color.blue50} 50%, transparent 50%) 100%
            1;
        `;

      return css`
        border-width: 2px;
        border-color: ${theme._raw_color.blue50};
        border-style: ${isSelectionInProgress && isInRange ? `solid none solid none` : 'none'};

        ${startDateBorderStyle}
        ${endDateBorderStyle}
      `;
    }
  }}

  //#endregion

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

  ${({ isStartDate, isEndDate, isSelectionInProgress, isAnchorDate, theme }) => {
    let bgColor = 'transparent';

    if (isAnchorDate) bgColor = theme.color.bg.fill.primary.default.normal;
    else if (isStartDate || isEndDate) {
      if (isSelectionInProgress) {
        bgColor = theme.color.bg.fill.primary.tint.hover;
      } else {
        bgColor = theme.color.bg.fill.primary.default.normal;
      }
    }

    return css`
      &:after {
        content: '';
        position: absolute;
        z-index: 0;
        display: block;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        background-color: ${bgColor};
      }
    `;
  }}

  &:hover {
    &:after {
      content: '';
      position: absolute;
      z-index: 0;
      display: block;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      background-color: ${({
        isAnchorDate,
        isStartDate,
        isEndDate,
        isSelectionInProgress,
        isDisplayedMonth,
        isSelectable,
        theme,
      }) => {
        if (!isDisplayedMonth || !isSelectable) return 'transparent';
        else if (isAnchorDate) return theme.color.bg.fill.primary.default.hover;
        else if (isSelectionInProgress) return theme.color.bg.fill.primary.tint.hover;
        else if (isStartDate || isEndDate) return theme.color.bg.fill.primary.default.hover;
        return theme.color.bg.fill.primary.tint.hover;
      }};
    }
  }

  //#region 캘린더 내에서 날짜 typography의 상호작용 관련 스타일
  & > span {
    user-select: none;
    z-index: 1;
    color: ${({ isAnchorDate, isStartDate, isEndDate, isSelectionInProgress, isSelectable, theme }) => {
      if (isAnchorDate) return theme.color.content.on_default_color;
      else if (!isSelectable) return theme.color.content.neutral.default.disabled;
      else if (isSelectionInProgress) return theme.color.content.neutral.default.normal;
      else if (isStartDate || isEndDate) return theme.color.content.on_default_color;
      return theme.color.content.neutral.default.normal;
    }};
  }
  //#endregion
`;

export const StartDayCell = styled.div``;
export const EndDayCell = styled.div``;
