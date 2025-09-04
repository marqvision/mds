import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { MDSPlainButton } from '../PlainButton';
import { MDSIcon } from '../../atoms/Icon';
import { MDSTypography } from '../../atoms/Typography';
import { Props } from './@types';
import { PAGINATION_LABELS } from './@constants';

const Styled = {
  Root: styled.div`
    display: inline-flex;
    align-items: center;
  `,
  Label: styled(MDSTypography)`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  Buttons: styled.div`
    display: flex;
  `,
};

/**
 * @param {Props} Props.language language 설정 (기본값: 'en')
 * @param {Props} Props.value 현재 페이지의 시작 offset (0부터 시작)
 * @param {Props} Props.onChange `(value: number) => void` value: 변경된 페이지의 시작 offset
 * @param {Props} Props.totalCount 리스트 아이템의 전체 length
 * @param {Props} Props.pageSize 한 페이지당 보여주는 아이템 수
 * */
export const MDSPagination = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { value, pageSize, totalCount, language = 'en', onChange } = props;

  const startOffset = value + 1;
  const lastOffset = Math.min(value + pageSize, totalCount);

  const handleClickPrev = () => {
    onChange(Math.max(0, value - pageSize));
  };

  const handleClickNext = () => {
    onChange(Math.min(value + pageSize, Math.max(0, totalCount - pageSize)));
  };

  return (
    <Styled.Root ref={ref}>
      <Styled.Label size="s">{PAGINATION_LABELS[language](startOffset, lastOffset, totalCount)}</Styled.Label>
      <Styled.Buttons>
        <MDSPlainButton
          isDisabled={value === 0}
          color="bluegray"
          icon={<MDSIcon.ArrowLeft variant="outline" />}
          onClick={handleClickPrev}
        />
        <MDSPlainButton
          isDisabled={lastOffset >= totalCount}
          color="bluegray"
          icon={<MDSIcon.ArrowRight variant="outline" />}
          onClick={handleClickNext}
        />
      </Styled.Buttons>
    </Styled.Root>
  );
});

MDSPagination.displayName = 'MDSPagination';

export type MDSPaginationProps = Props;
