import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  JSX,
  Ref,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from 'react';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { MDSIcon } from '../..';
import { CardItemComp, TabsProps, TabTheme, TextItemComp } from './@type';
import { TextItem } from './TextItem';
import { CardItem } from './CardItem';
import { THEME } from './@constants';
import { resolveColor } from './@utils';

const Styled = {
  Root: styled.div<{ themeType: TabTheme }>`
    padding: 0 16px;
    box-shadow: inset 0 -1px 0 0 ${({ theme }) => theme.color.border.neutral.default.normal};
    overflow: hidden;
    position: relative;
    background-color: ${({ theme, themeType }) => resolveColor(theme, THEME.colors[themeType].bg)};
  `,
  TabScroller: styled.div`
    transition: transform ${THEME.transitionTiming} ease-out;
    display: flex;
    align-items: center;
  `,
  ScrollButtonDim: styled.div<{ bgColor: string; direction: 'left' | 'right' }>`
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    top: 0;
    bottom: 1px;
    background-color: ${({ bgColor }) => bgColor};
    ${({ direction, bgColor }) =>
      direction === 'left'
        ? css`
            left: 0;
            &:before {
              content: '';
              position: absolute;
              left: 100%;
              width: 16px;
              top: 0;
              bottom: 0;
              background: linear-gradient(to right, ${bgColor}FF, ${bgColor}00);
              pointer-events: none;
            }
          `
        : css`
            right: 0;
            &:after {
              content: '';
              position: absolute;
              left: -16px;
              width: 16px;
              top: 0;
              bottom: 0;
              background: linear-gradient(to left, ${bgColor}FF, ${bgColor}00);
              pointer-events: none;
            }
          `}
  `,
  ScrollButton: styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
    display: flex;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  `,
  Indicator: styled.div<{ themeType: TabTheme }>`
    position: absolute;
    bottom: 0;
    height: 3px;
    background-color: ${({ theme, themeType }) => resolveColor(theme, THEME.colors[themeType].selected.text)};
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    transition: transform ${THEME.transitionTiming} ease-out, width ${THEME.transitionTiming} ease-out;
  `,
};

const SCROLL_BUTTON_SIZE = 56;

/**
 * @template T
 * @description 자식 컴포넌트로 MDSTabs.TextItem, MDSTabs.CardItem
 *
 * @param {Object} props
 * @param {'light'|'dark'} [props.theme='light']
 * @param {'small'|'medium'|'large'|'x-large'} [props.size='medium']
 * @param {boolean} [props.withTitle=false] 상하 여백 축소
 */
const Tabs = forwardRef(<T,>(props: TabsProps<T>, ref: Ref<HTMLDivElement>) => {
  const { value, theme = 'light', withTitle, onChange, size, bgColor: _bgColor, children: _children } = props;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const _theme = useTheme();

  const [wrapWidth, setWrapWidth] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollStep, setScrollStep] = useState(0);
  const [indicator, setIndicator] = useState<{
    width: number;
    left: number;
  }>();

  const resolveScrollLeft = Math.max(Math.min(scrollLeft, wrapWidth - scrollStep), 0);
  const bgColor = resolveColor(_theme, _bgColor || THEME.colors[theme].bg);

  const { hasOverflowLeft, hasOverflowRight } = (() => {
    if (!wrapWidth) {
      return {
        hasOverflowLeft: false,
        hasOverflowRight: false,
      };
    }

    return {
      hasOverflowLeft: resolveScrollLeft > 0,
      hasOverflowRight: resolveScrollLeft + scrollStep < wrapWidth,
    };
  })();

  const children = Children.map(_children, (child) => {
    if (!isValidElement(child)) return child;

    if (child.type === TextItem || child.type === CardItem) {
      const childValue = child.props.value;
      const isSelected = childValue === value;

      return cloneElement(child, {
        isSelected,
        theme,
        size,
        withTitle,
        onClick: (e: MouseEvent<HTMLButtonElement>) => {
          child.props.onClick?.(e, childValue);

          if (!e.defaultPrevented && !e.isPropagationStopped?.()) {
            onChange(childValue);
          }
        },
      } as Partial<TextItemComp>);
    }

    return child;
  });

  const handleScroll = (to: 'right' | 'left') => {
    if (!scrollerRef.current) {
      return;
    }
    const acc = scrollStep - SCROLL_BUTTON_SIZE;
    if (to === 'right') {
      setScrollLeft((ps) => Math.min(ps + acc, wrapWidth - scrollStep));
    } else {
      setScrollLeft((ps) => Math.max(ps - acc, 0));
    }
  };

  useEffect(() => {
    const ele = scrollerRef.current;

    if (!ele) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const target = entries.at(-1)?.target as HTMLDivElement | undefined;

      if (target) {
        setWrapWidth(target.scrollWidth);
        setScrollStep(target.offsetWidth);
      }
    });

    observer.observe(ele);

    return () => {
      observer.unobserve(ele);
    };
  }, []);

  useEffect(() => {
    const selectedTab = scrollerRef.current?.querySelector('.selected') as HTMLDivElement | null;

    if (selectedTab) {
      setIndicator({
        width: selectedTab.offsetWidth,
        left: selectedTab.offsetLeft,
      });
    }
  }, [value, wrapWidth]);

  useEffect(() => {
    const selectedTab = scrollerRef.current?.querySelector('.selected') as HTMLDivElement | null;

    if (!selectedTab || !scrollStep) return;

    const tabLeft = selectedTab.offsetLeft;
    const tabRight = tabLeft + selectedTab.offsetWidth;
    const buffer = SCROLL_BUTTON_SIZE;

    setScrollLeft((currentScrollLeft) => {
      const visibleLeft = currentScrollLeft + buffer;
      const visibleRight = currentScrollLeft + scrollStep - buffer;

      if (tabLeft < visibleLeft) {
        return Math.max(tabLeft - buffer, 0);
      } else if (tabRight > visibleRight) {
        return Math.min(tabRight - scrollStep + buffer, wrapWidth - scrollStep);
      }
      return currentScrollLeft;
    });
  }, [value, scrollStep, wrapWidth]);

  return (
    <Styled.Root ref={ref} themeType={theme}>
      {hasOverflowLeft && (
        <Styled.ScrollButtonDim bgColor={bgColor} direction="left">
          <Styled.ScrollButton onClick={() => handleScroll('left')}>
            <MDSIcon.ArrowLeft variant="border" color={THEME.colors[theme].default.text} />
          </Styled.ScrollButton>
        </Styled.ScrollButtonDim>
      )}
      <Styled.TabScroller
        ref={scrollerRef}
        style={{
          transform: `translateX(-${resolveScrollLeft}px)`,
        }}
      >
        {children}
      </Styled.TabScroller>
      {hasOverflowRight && (
        <Styled.ScrollButtonDim bgColor={bgColor} direction="right">
          <Styled.ScrollButton onClick={() => handleScroll('right')}>
            <MDSIcon.ArrowRight variant="border" color={THEME.colors[theme].default.text} />
          </Styled.ScrollButton>
        </Styled.ScrollButtonDim>
      )}
      <Styled.Indicator
        themeType={theme}
        ref={indicatorRef}
        style={{
          width: indicator?.width,
          transform: `translateX(${(indicator?.left || 0) - resolveScrollLeft}px)`,
        }}
      />
    </Styled.Root>
  );
}) as (<T>(props: TabsProps<T> & { ref?: Ref<HTMLDivElement> }) => JSX.Element) & {
  displayName?: string;
};

Tabs.displayName = 'MDSTabs';

export const MDSTabs = Object.assign(Tabs, {
  TextItem: TextItem as TextItemComp,
  CardItem: CardItem as CardItemComp,
});

export type MDSTabsProps<T extends string> = TabsProps<T>;
