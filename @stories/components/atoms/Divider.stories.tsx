import React from 'react';
import { MDSDivider, MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSDivider> = {
  component: MDSDivider,
  title: '2. Components/atoms/Divider',
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSDivider>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>{children}</div>;
};

export const Preview: Story = {
  render: (props) => (
    <Wrapper>
      <MDSDivider {...props} />
    </Wrapper>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>수평 형태로 출력합니다. (기본형)</MDSTypography>
      <MDSDivider {...props} />
    </Wrapper>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    length: 50,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>수직 형태로 출력합니다.</MDSTypography>
      <MDSDivider {...props} />
    </Wrapper>
  ),
};

export const Weak: Story = {
  args: {
    intensity: 'weak',
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>연한 색상으로 출력합니다.</MDSTypography>
      <MDSDivider {...props} />
    </Wrapper>
  ),
};

export const Strong: Story = {
  args: {
    intensity: 'strong',
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>진한 색상으로 출력합니다.</MDSTypography>
      <MDSDivider {...props} />
    </Wrapper>
  ),
};

export const Thickness: Story = {
  args: {
    thickness: 5,
  },
  render: (props) => {
    const { length, intensity, variant, color, ...restProps } = props;

    return (
      <Wrapper>
        <MDSTypography>두께(dot 의 경우 크기)를 조절할 수 있습니다.</MDSTypography>
        <MDSDivider variant="line" length={length} intensity={intensity} {...restProps} />
        <MDSDivider variant="dot" {...restProps} />
      </Wrapper>
    );
  },
};

export const Length: Story = {
  args: {
    intensity: 'strong',
    length: 50,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>line 의 길이를 조절할 수 있습니다.</MDSTypography>
      <MDSDivider {...props} />
      <MDSDivider variant="line" orientation="vertical" {...props} />
    </Wrapper>
  ),
};

export const CustomColor: Story = {
  args: {
    color: 'color/content/primary/default/normal',
  },
  render: (props) => {
    const { length, intensity, variant, ...restProps } = props;

    return (
      <Wrapper>
        <MDSTypography>divider 기본 지정 컬러 외 다른 컬러를 적용할 수 있습니다.</MDSTypography>
        <MDSDivider variant="line" length={length} {...restProps} />
        <MDSDivider variant="dot" thickness={5} {...restProps} />
      </Wrapper>
    );
  },
};

export const Margin: Story = {
  args: {
    orientation: 'vertical',
    length: 20,
    margin: '0 8px',
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography>margin 속성으로 바깥 여백을 조절할 수 있습니다.</MDSTypography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MDSDivider {...props} />
        <MDSDivider {...props} />
        <MDSDivider {...props} />
      </div>
    </Wrapper>
  ),
};
