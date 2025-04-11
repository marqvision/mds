import React from 'react';
import { Story } from '@storybook/blocks';
import { MDSIcon, MDSTag, MDSTypography2 } from '../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSTag> = {
  component: MDSTag,
  title: '2. Components/molecules/Tag',
  parameters: {
    docs: {
      story: {
        layout: 'center',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    variant: 'fill',
    color: 'bluegray',
    size: 'small',
    onClick: undefined,
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['bluegray', 'blue', 'red', 'yellow', 'green', 'teal', 'purple', 'white'],
    },
    size: {
      control: 'select',
      options: ['x-small', 'small', 'medium'],
    },
    variant: {
      control: 'select',
      options: ['fill', 'tint', 'border', 'ai'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDSTag>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>{children}</div>;
};

export const Preview: Story = {
  args: {
    children: 'Tag',
  },
  render: ({ children, ...restProps }) => (
    <Wrapper>
      <MDSTag {...restProps}>{children}</MDSTag>
    </Wrapper>
  ),
};

export const VariantFill: Story = {
  args: {
    variant: 'fill',
  },
  render: (args) => (
    <Wrapper>
      <MDSTag {...args}>Tag</MDSTag>
    </Wrapper>
  ),
};

export const VariantTint: Story = {
  args: {
    variant: 'tint',
  },
  render: (args) => (
    <Wrapper>
      <MDSTag {...args}>Tag</MDSTag>
    </Wrapper>
  ),
};

export const VariantBorder: Story = {
  args: {
    variant: 'border',
  },
  render: (args) => (
    <Wrapper>
      <MDSTag {...args}>Tag</MDSTag>
    </Wrapper>
  ),
};

export const StartIcon: Story = {
  args: {
    startIcon: <MDSIcon.Flag variant="outline" />,
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography2>label 의 앞에 아이콘을 추가합니다.</MDSTypography2>
      <MDSTag {...args}>Tag</MDSTag>
    </Wrapper>
  ),
};

export const EndIcon: Story = {
  args: {
    endIcon: <MDSIcon.ArrowRight variant="outline" />,
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography2>label 의 뒤에 아이콘을 추가합니다.</MDSTypography2>
      <MDSTag {...args}>Tag</MDSTag>
    </Wrapper>
  ),
};

export const ColoredIcon: Story = {
  args: {
    variant: 'border',
    startIcon: <MDSIcon.Flag variant="outline" color="color/content/critical/default/normal" />,
    color: 'blue',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography2>color 가 지정된 아이콘을 전달할 경우 아이콘의 컬러를 우선 적용합니다.</MDSTypography2>
      <MDSTag {...args}>Tag</MDSTag>
    </Wrapper>
  ),
};

export const XSmallSize: Story = {
  args: {
    size: 'x-small',
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography2>x-small 사이즈는 startIcon, endIcon 대신 icon 을 전달해 중앙에 출력합니다.</MDSTypography2>
      <MDSTag {...props}>A</MDSTag>
      <MDSTag {...props}>Tag</MDSTag>
      <MDSTag size="x-small" variant="border" color="blue" icon={<MDSIcon.Flag variant="outline" />} />
      <MDSTag
        size="x-small"
        variant="border"
        color="blue"
        icon={<MDSIcon.Flag variant="outline" color="color/content/critical/default/normal" />}
      />
    </Wrapper>
  ),
};

export const Clickable: Story = {
  args: {
    startIcon: <MDSIcon.Flag variant="outline" />,
    endIcon: <MDSIcon.ArrowRight variant="outline" />,
    onClick: () => {},
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography2>
        onClick 이벤트가 없는 경우 div 요소로 출력되며,
        <br />
        onClick 이벤트가 있는 경우 button 요소로 출력됨과 동시에 hover 컬러 및 cursor: pointer 스타일이 적용됩니다.
        <br />
        로딩 상태에는 onClick 이벤트가 무시됩니다.
      </MDSTypography2>

      <MDSTag {...args}>Clickable Tag</MDSTag>
    </Wrapper>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    startIcon: <MDSIcon.Flag variant="outline" />,
    endIcon: <MDSIcon.ArrowRight variant="outline" />,
    onClick: () => {},
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography2>disabled 상태 시 클릭 이벤트 및 hover 효과가 제거됩니다.</MDSTypography2>
      <MDSTag {...args}>Diabled Tag</MDSTag>
    </Wrapper>
  ),
};

export const LikelyCounterfeit: Story = {
  args: {
    variant: 'ai',
    startIcon: <MDSIcon.Magic />,
    onClick: () => {},
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography2>
        Gen AI 태그 스타일입니다.
        <br />
        그라데이션 효과가 적용되어 있습니다.
      </MDSTypography2>
      <MDSTag {...args}>Likely counterfeit</MDSTag>
    </Wrapper>
  ),
};
