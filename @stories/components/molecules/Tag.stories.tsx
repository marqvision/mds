import React from 'react';
import { Story } from '@storybook/addon-docs/blocks';
import { MDSIcon, MDSTag, MDSTypography } from '../../../components';
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

const Wrapper = ({ children, style }: React.PropsWithChildren<{ style?: React.CSSProperties }>) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', ...style }}>
      {children}
    </div>
  );
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
      <MDSTypography>label 의 앞에 아이콘을 추가합니다.</MDSTypography>
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
      <MDSTypography>label 의 뒤에 아이콘을 추가합니다.</MDSTypography>
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
      <MDSTypography>color 가 지정된 아이콘을 전달할 경우 아이콘의 컬러를 우선 적용합니다.</MDSTypography>
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
      <MDSTypography>x-small 사이즈는 startIcon, endIcon 대신 icon 을 전달해 중앙에 출력합니다.</MDSTypography>
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
      <MDSTypography>
        onClick 이벤트가 없는 경우 div 요소로 출력되며,
        <br />
        onClick 이벤트가 있는 경우 button 요소로 출력됨과 동시에 hover 컬러 및 cursor: pointer 스타일이 적용됩니다.
        <br />
        로딩 상태에는 onClick 이벤트가 무시됩니다.
      </MDSTypography>

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
      <MDSTypography>disabled 상태 시 클릭 이벤트 및 hover 효과가 제거됩니다.</MDSTypography>
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
      <MDSTypography>
        Gen AI 태그 스타일입니다.
        <br />
        그라데이션 효과가 적용되어 있습니다.
      </MDSTypography>
      <MDSTag {...args}>Likely counterfeit</MDSTag>
    </Wrapper>
  ),
};

export const LineClamp: Story = {
  args: {
    children: (
      <MDSTypography color="inherit" size="inherit" weight="inherit" lineClamp={1} wordBreak="break-all">
        말줄임을 하고 싶어요 사실은 되게 긴데 말이죠.
      </MDSTypography>
    ),
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        line clamp 등 label 에 typography 의 속성을 사용하고 싶다면 MDSTypography 를 직접 사용하세요.
      </MDSTypography>
      <MDSTypography>
        다만 버튼 label 의 스타일을 상속받기 위해{' '}
        <MDSTypography as="span" weight="medium">
          color, size, weight
        </MDSTypography>{' '}
        를{' '}
        <MDSTag size="medium" variant="tint" color="bluegray">
          inherit
        </MDSTag>{' '}
        으로 지정하는 것을 추천합니다.
      </MDSTypography>
      <Wrapper style={{ width: '100px' }}>
        <MDSTag {...args} />
        <MDSTag isDisabled {...args} />
      </Wrapper>
    </Wrapper>
  ),
};

