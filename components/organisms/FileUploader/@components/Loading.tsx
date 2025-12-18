import { isValidElement } from 'react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../../atoms/Typography';
import { DEFAULT_DISPLAY_MESSAGE } from '../@constants';
import { Progress, TitleOrLanguage } from '../@types';

const Styled = {
  Wrapper: styled.div<{ width: string }>`
    width: ${({ width }) => width};
    display: grid;
    gap: 4px;
  `,
  Label: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 4px;
  `,
  Count: styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
  `,
  ProgressWrapper: styled.div`
    height: 3px;
    border-radius: 3px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.color.bg.fill.neutral.tint.completed};
  `,
  ProgressBar: styled.div<{ progress: number }>`
    width: ${({ progress }) => progress}%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.content.primary.default.normal};
    transition: 200ms;
  `,
};

type Props = {
  width?: string;
  progress?: Progress;
} & TitleOrLanguage;

export const Loading = (props: Props) => {
  const { width = '240px', progress, title, language = 'en' } = props;

  if (!progress?.count && !progress?.percentage) return null;

  const { count = { current: 0, total: 0 }, percentage = 0 } = progress;
  const isSingleFile = count.total < 2;
  const barProgress = isSingleFile ? percentage : (count.current / count.total) * 100;

  return (
    <Styled.Wrapper width={width}>
      <Styled.Label>
        <MDSTypography
          as={isValidElement(title) ? 'div' : undefined}
          size="s"
          weight="medium"
          color="color/content/neutral/tertiary/normal"
        >
          {title || DEFAULT_DISPLAY_MESSAGE[language].uploadingFiles}
        </MDSTypography>
        {isSingleFile ? (
          <MDSTypography size="s" weight="medium">
            {progress.percentage}%
          </MDSTypography>
        ) : (
          <Styled.Count>
            <MDSTypography size="s" weight="medium">
              {progress.count?.current}
            </MDSTypography>
            <MDSTypography size="s" weight="medium" color="color/content/neutral/tertiary/normal">
              /
            </MDSTypography>
            <MDSTypography size="s" weight="medium" color="color/content/neutral/tertiary/normal">
              {progress.count?.total}
            </MDSTypography>
          </Styled.Count>
        )}
      </Styled.Label>
      <Styled.ProgressWrapper>
        <Styled.ProgressBar progress={barProgress} />
      </Styled.ProgressWrapper>
    </Styled.Wrapper>
  );
};

Loading.displayName = 'MDSFileUploader.Loading';
