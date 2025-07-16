import styled from '@emotion/styled';
import { TaskDescription } from './@types';

const Z_INDEX_TOP_MOST = 1300 - 1; // note-@jamie: MDSTooltip보다 1 작은 zIndex
const Container = styled.div<{ isFold: boolean }>`
  position: fixed;
  bottom: 0;
  z-index: ${Z_INDEX_TOP_MOST};
  right: 16px;
  width: 412px;
  min-height: 52px;
  max-height: ${({ isFold }) => (isFold ? '52px' : '500px')};
  padding-bottom: 12px;
  background-color: red;

  border-radius: 8px 8px 0px 0px;
  background: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};

  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.16), 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;
const Title = styled.div`
  padding: 20px 20px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .actionButtonBox {
    display: flex;
    gap: 12px;
  }
`;
const Content = styled.div<{ isFold: boolean }>`
  padding: 0 20px;
  overflow: auto;
  max-height: 460px;
`;
const Item = styled.div`
  padding: 12px 8px 12px 0;
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  align-items: center;
  gap: 8px;
  height: 46px;
`;

const FoldIconBox = styled.div<{ isFold: boolean }>`
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1) !important;
  transform: ${({ isFold }) => (isFold ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const ProgressIndicatorBox = styled.div<{ status: TaskDescription['status'] }>`
  .progress-indicator-default {
    display: block;
  }
  .progress-indicator-hover {
    display: none;
  }
  &:hover {
    .progress-indicator-default {
      display: none;
    }
    .progress-indicator-hover {
      display: block;
    }
  }
`;

export const Styles = {
  Container,
  Title,
  Content,
  Item,
  FoldIconBox,
  ProgressIndicatorBox,
};
