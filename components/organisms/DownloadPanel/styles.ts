import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Task } from './@types';

const Z_INDEX_TOP_MOST = 1300 - 1; // note-@jamie: MDSTooltip보다 1 작은 zIndex
const Container = styled.div<{ isFold: boolean }>`
  position: fixed;
  bottom: 72px;
  z-index: ${Z_INDEX_TOP_MOST};
  right: 16px;

  min-height: 52px;

  padding: 8px 0;
  border-radius: 8px;

  ${({ isFold }) => css`
    width: ${isFold ? '228px' : '412px'};
    max-height: ${isFold ? '52px' : '500px'};
  `}

  background: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};

  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.16), 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1), max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;
const Title = styled.div`
  padding: 4px 16px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .actionButtonBox {
    display: flex;
    align-items: center;
    height: 20px;
    gap: 12px;
  }
`;

const PanelLabelBox = styled.div<{ isFold: boolean }>`
  display: grid;
  grid-template-columns: ${({ isFold }) => (isFold ? '26px 1fr' : '0 1fr')};
  align-items: center;

  & .progressIconBox {
    ${({ isFold }) => css`
      width: ${isFold ? '20px' : '0'};
      opacity: ${isFold ? '1' : '0'};
    `}
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0s cubic-bezier(0.4, 0, 0.2, 1);

    display: flex;
    align-items: center;
  }
`;

const Content = styled.div<{ isFold: boolean }>`
  padding: 12px 16px;
  overflow: auto;

  max-height: ${({ isFold }) => (isFold ? '0' : '428px')};
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;
const Item = styled.div`
  padding: 12px 0;
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  align-items: center;
  gap: 8px;
  height: 46px;
`;

const FileNameBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & svg {
    flex-shrink: 0;
  }
`;

const FoldIconBox = styled.div<{ isFold: boolean }>`
  height: 24px;
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1) !important;
  transform: ${({ isFold }) => (isFold ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const ProgressIndicatorBox = styled.div<{ status: Task['status'] }>`
  display: flex;
  align-items: center;
  justify-content: center;

  .progress-indicator-default {
    display: flex;
  }
  .progress-indicator-hover {
    display: none;
  }
  &:hover {
    .progress-indicator-default {
      display: none;
    }
    .progress-indicator-hover {
      display: flex;
    }
  }
`;

export const Styles = {
  Container,
  Title,
  PanelLabelBox,
  Content,
  Item,
  FileNameBox,
  FoldIconBox,
  ProgressIndicatorBox,
};
