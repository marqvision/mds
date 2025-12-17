import styled from '@emotion/styled';
import { MDSTypography } from '../../atoms/Typography';
import { THEME } from './@constants';
import { InternalTabProps, PublicTextItemProps, TabTheme } from './@type';
import { resolveColor } from './@utils';

const Styled = {
  Root: styled.button<{ height: number; dimmedHeight: number; themeType: TabTheme }>`
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${({ height }) => `${height}px`};
    position: relative;
    gap: 4px;
    &:before {
      content: '';
      width: 100%;
      height: ${({ dimmedHeight }) => `${dimmedHeight}px`};
      position: absolute;
      background-color: ${({ theme, themeType }) => resolveColor(theme, THEME.colors[themeType].dimmed)};
      opacity: 0;
      transition: opacity ${THEME.transitionTiming} ease;
      z-index: 0;
      border-radius: 8px;
      pointer-events: none;
    }
    &:hover:before {
      opacity: 1;
    }
    &.disabled {
      opacity: 0.5;
      cursor: default;
    }
    &.disabled:hover:before {
      opacity: 0;
    }
  `,
  Label: styled(MDSTypography)<{ status: 'selected' | 'default'; themeType: TabTheme }>`
    position: relative;
    z-index: 1;
    transition: color ${THEME.transitionTiming} ease, opacity ${THEME.transitionTiming} ease;
    color: ${({ theme, status, themeType }) => resolveColor(theme, THEME.colors[themeType][status].text)};
  `,
};

type Props<T> = PublicTextItemProps<T> & InternalTabProps;

export const TextItem = <T,>(props: Props<T>) => {
  const { value, onClick, tags, children, style, isDisabled, ...internalProps } = props;
  const { isSelected, size = 'medium', theme = 'light', withTitle = false } = internalProps;

  const className = isSelected ? 'selected' : isDisabled ? 'disabled' : undefined;

  const typeProps = {
    ...THEME.size[size].typography,
    style: { opacity: THEME.colors[theme][isSelected ? 'selected' : 'default'].opacity },
  };
  const tabHeight = THEME.size[size].tabSize[withTitle ? 'withTitle' : 'withoutTitle'].height;
  const dimmedHeight = THEME.size[size].tabSize.withTitle.height - 12;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    onClick?.(e, value);
  };

  return (
    <Styled.Root
      className={className}
      height={tabHeight}
      dimmedHeight={dimmedHeight}
      themeType={theme}
      onClick={handleClick}
      style={style}
    >
      <Styled.Label
        themeType={theme}
        status={isSelected ? 'selected' : 'default'}
        weight="medium"
        {...typeProps}
        whiteSpace="nowrap"
      >
        {children}
      </Styled.Label>
      {tags}
    </Styled.Root>
  );
};

TextItem.displayName = 'MDSTabsTextItem';
