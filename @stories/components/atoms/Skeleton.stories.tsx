import React from 'react';
import { MDSSkeleton } from '../../../components/atoms/Skeleton';
import { MDSImage, MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSSkeleton> = {
  component: MDSSkeleton,
  title: '2. Components/atoms/Skeleton',
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSSkeleton>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        padding: '24px',
        minHeight: '200px',
      }}
    >
      {children}
    </div>
  );
};

const TitleWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        padding: '12px 0',
        display: 'grid',
        gap: '8px',
      }}
    >
      {children}
    </div>
  );
};

export const Preview: Story = {
  render: function Render(props) {
    return (
      <Wrapper>
        <TitleWrapper>
          <MDSTypography>
            MDSTypography 의 variant, size 를 전달해 동일한 height 로 설정되는 Text 타입 스켈레톤입니다.
          </MDSTypography>
          <MDSTypography>MDSTypography 의 line-height 를 고려해서 상하 여백이 포함됩니다.</MDSTypography>
        </TitleWrapper>
        <MDSSkeleton {...props} />
      </Wrapper>
    );
  },
};

export const Title: Story = {
  render: function Render() {
    return (
      <Wrapper>
        <TitleWrapper>
          <MDSTypography>variant: title, size: 2xl 시 MDSTypography variant: title, size: 2xl 일때와 동일한 height 로 출력됩니다.</MDSTypography>
          <MDSTypography>MDSTypography 의 line-height 를 고려해서 상하 여백이 포함됩니다.</MDSTypography>
        </TitleWrapper>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <MDSSkeleton variant="title" size="2xl" width="100px" />
          <MDSTypography variant="title" size="2xl">
            MDSTypography 의 텍스트
          </MDSTypography>
        </div>
      </Wrapper>
    );
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    size: '48px',
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <TitleWrapper>
          <MDSTypography>Circle 타입 스켈레톤입니다. size 값으로 지름(가로, 세로)을 설정합니다.</MDSTypography>
        </TitleWrapper>
        <MDSSkeleton {...props} />
      </Wrapper>
    );
  },
};

export const Rect: Story = {
  args: {
    variant: 'rect',
    width: '240px',
    height: '48px',
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <TitleWrapper>
          <MDSTypography>Rect 타입 스켈레톤입니다. width, height 값으로 가로, 세로 크기를 설정합니다.</MDSTypography>
          <MDSTypography>borderRadius 값으로 모서리 둥글기 설정이 가능합니다. 기본값은 4px 입니다.</MDSTypography>
        </TitleWrapper>
        <MDSSkeleton {...props} />
      </Wrapper>
    );
  },
};

export const Image: Story = {
  render: function Render(props) {
    return (
      <Wrapper>
        <TitleWrapper>
          <MDSTypography>이미지 로딩은 MDSImage 컴포넌트의 isLoading 속성을 사용해주세요.</MDSTypography>
        </TitleWrapper>
        <MDSImage width="180px" height="180px" isLoading />
      </Wrapper>
    );
  },
};
