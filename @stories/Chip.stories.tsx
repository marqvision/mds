import React from 'react';
import { Story } from '@storybook/blocks';
import { MDSChip, MDSIcon, MDSTag, MDSTypography } from '../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSChip> = {
  component: MDSChip,
  title: '2. Components/Chip',
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
    size: 'medium',
    width: 'hug',
    onClick: undefined,
  },
  argTypes: {
    color: {
      control: 'select',
    },
    width: {
      control: 'text',
    },
    isLoading: {
      control: 'select',
      options: [true, false, 'hideLabel'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDSChip>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>{children}</div>;
};

export const Preview: Story = {
  args: {
    children: 'Chip',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>기본형 width 값을 전달하지 않으면 hug 로 적용되어 내용에 맞게 사이즈가 조절됩니다.</MDSTypography>
      <MDSChip {...args}>{args.children}</MDSChip>
    </Wrapper>
  ),
};

export const WidthFill: Story = {
  args: {
    width: 'fill',
    children: 'Chip',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>width: fill 지정 시 width: 100% 스타일이 지정됩니다.</MDSTypography>
      <MDSChip {...args}>{args.children}</MDSChip>
    </Wrapper>
  ),
};

export const WidthFixed: Story = {
  args: {
    width: '300px',
    children: 'Chip',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>width: hug 또는 fill 이외의 값 지정 시 입력한 width 사이즈가 지정됩니다.</MDSTypography>
      <MDSChip {...args}>{args.children}</MDSChip>
    </Wrapper>
  ),
};

export const VariantFill: Story = {
  args: {
    variant: 'fill',
    children: 'Chip',
  },
  render: (args) => (
    <Wrapper>
      <MDSChip {...args}>{args.children}</MDSChip>
    </Wrapper>
  ),
};

export const VariantTint: Story = {
  args: {
    variant: 'tint',
    children: 'Chip',
  },
  render: (args) => (
    <Wrapper>
      <MDSChip {...args}>{args.children}</MDSChip>
    </Wrapper>
  ),
};

export const VariantBorder: Story = {
  args: {
    variant: 'border',
    children: 'Chip',
  },
  render: (args) => (
    <Wrapper>
      <MDSChip {...args}>{args.children}</MDSChip>
    </Wrapper>
  ),
};

export const StartIcon: Story = {
  args: {
    startIcon: <MDSIcon.Image variant="fill" />,
    children: 'Chip',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>label 의 앞에 아이콘을 추가합니다.</MDSTypography>
      <MDSChip {...args}>{args.children}</MDSChip>
    </Wrapper>
  ),
};

export const EndIcon: Story = {
  args: {
    endIcon: <MDSIcon.ArrowDown variant="outline" />,
    children: 'Chip',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>label 의 뒤에 아이콘을 추가합니다.</MDSTypography>
      <MDSChip {...args}>{args.children}</MDSChip>
    </Wrapper>
  ),
};

export const ColoredIcon: Story = {
  args: {
    variant: 'border',
    startIcon: <MDSIcon.ExcelSheet color="color/content/success/default/normal" />,
    children: 'Chip',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>color 가 지정된 아이콘을 전달할 경우 아이콘의 컬러를 우선 적용합니다.</MDSTypography>
      <MDSChip {...args}>{args.children}</MDSChip>
    </Wrapper>
  ),
};

export const Clickable: Story = {
  args: {
    startIcon: <MDSIcon.Image variant="fill" />,
    endIcon: <MDSIcon.ArrowDown variant="outline" />,
    onClick: () => {},
    children: 'Clickable Chip',
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

      <MDSChip {...args}>{args.children}</MDSChip>
    </Wrapper>
  ),
};

export const Loading: Story = {
  args: {
    startIcon: <MDSIcon.Image variant="fill" />,
    endIcon: <MDSIcon.ArrowDown variant="outline" />,
    onClick: () => {},
    isLoading: true,
    children: 'Loading Chip',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        isLoading: true 전달 시 startIcon 대신 로딩 스피너가 그려지며,
        <br />
        onClick 이벤트 및 hover 효과가 사라집니다.
      </MDSTypography>
      <MDSChip {...args}>{args.children}</MDSChip>
    </Wrapper>
  ),
};

export const LoadingHideLabel: Story = {
  args: {
    startIcon: <MDSIcon.Image variant="fill" />,
    endIcon: <MDSIcon.ArrowDown variant="outline" />,
    onClick: () => {},
    isLoading: 'hideLabel',
    children: 'Loading Chip',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        isLoading: hideLabel 전달 시 내부의 label, icon 대신 중앙에 로딩 스피너가 그려지며,
        <br />
        onClick 이벤트 및 hover 효과가 사라집니다.
      </MDSTypography>
      <MDSChip {...args}>{args.children}</MDSChip>
    </Wrapper>
  ),
};

export const ChipWithTags: Story = {
  args: {
    endIcon: <MDSIcon.ArrowDown variant="outline" />,
    children: 'Filter',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        tags: 단일 태그 또는 태그들의 배열 형태로 전달합니다.
        <br />
        label 과 endIcon 사이에 위치되며, Chip 에서 설정한 gap 사이즈가 Tag 사이의 gap 으로 적용됩니다.
        <br />
        Tag 의 size, color 등의 스타일은 전적으로 사용처에서 결정하며, Chip 에서는 어떠한 값도 전달하지 않습니다.
      </MDSTypography>
      <MDSChip
        {...args}
        tags={
          <MDSTag size="small" variant="tint" color="bluegray">
            Tag
          </MDSTag>
        }
      >
        {args.children}
      </MDSChip>
      <MDSChip
        {...args}
        tags={[
          <MDSTag key="tagLabel1" size="small" variant="tint" color="bluegray">
            Bracelet
          </MDSTag>,
          <MDSTag key="plusCount" size="small" variant="tint" color="bluegray">
            +3
          </MDSTag>,
        ]}
      >
        {args.children}
      </MDSChip>
      <MDSChip
        startIcon={<MDSIcon.Check variant="outline" />}
        size="medium"
        color="blue"
        variant="fill"
        tags={[
          <MDSTag key="tagCount" size="small" variant="tint" color="blue">
            12,345
          </MDSTag>,
          <MDSTag key="tagNew" size="small" variant="fill" color="red">
            N
          </MDSTag>,
        ]}
      >
        Reviewing
      </MDSChip>
    </Wrapper>
  ),
};
