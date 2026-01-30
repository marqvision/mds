import React from 'react';
import { MDSIcon, MDSInlineButton, MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSInlineButton> = {
  component: MDSInlineButton,
  title: '2. Components/molecules/InlineButton',
  parameters: {
    docs: {
      story: {
        layout: 'center',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    size: 'medium',
    color: 'bluegray',
    onClick: undefined,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['x-small', 'small', 'medium', 'large'],
      table: { defaultValue: { summary: 'medium' } },
    },
    color: {
      control: 'select',
      options: ['bluegray', 'bluegray-secondary', 'blue', 'white'],
      table: { defaultValue: { summary: 'bluegray' } },
    },
    children: {
      table: { defaultValue: { summary: '-' } },
    },
    startIcon: {
      table: { defaultValue: { summary: '-' } },
    },
    endIcon: {
      table: { defaultValue: { summary: '-' } },
    },
    isIconHoverable: {
      table: { defaultValue: { summary: 'false' } },
    },
    isDisabled: {
      table: { defaultValue: { summary: 'false' } },
    },
    href: {
      table: { defaultValue: { summary: '-' } },
    },
    onClick: {
      table: { defaultValue: { summary: '-' } },
    },
    lineClamp: {
      table: { defaultValue: { summary: '-' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDSInlineButton>;

const Wrapper = ({ children, style }: React.PropsWithChildren<{ style?: React.CSSProperties }>) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', ...style }}>
      {children}
    </div>
  );
};

const DarkWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', backgroundColor: '#212B36', padding: '24px', borderRadius: '8px' }}>
      {children}
    </div>
  );
};

export const Preview: Story = {
  args: {
    children: 'Inline button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        size 기본값 medium
        <br />
        color 기본값 bluegray
        <br />
        텍스트에 밑줄(underline)이 적용됩니다.
      </MDSTypography>
      <MDSInlineButton {...args} />
    </Wrapper>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Inline button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>4가지 사이즈를 지원합니다: x-small (12px), small (13px), medium (14px), large (16px)</MDSTypography>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <MDSInlineButton {...args} size="x-small">XSmall</MDSInlineButton>
        <MDSInlineButton {...args} size="small">Small</MDSInlineButton>
        <MDSInlineButton {...args} size="medium">Medium</MDSInlineButton>
        <MDSInlineButton {...args} size="large">Large</MDSInlineButton>
      </div>
    </Wrapper>
  ),
};

export const Colors: Story = {
  args: {
    children: 'Inline button',
    onClick: () => {},
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>4가지 색상을 지원합니다.</MDSTypography>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <MDSInlineButton {...args} color="bluegray">Bluegray</MDSInlineButton>
        <MDSInlineButton {...args} color="bluegray-secondary">Bluegray-secondary</MDSInlineButton>
        <MDSInlineButton {...args} color="blue">Blue</MDSInlineButton>
      </div>
      <DarkWrapper>
        <MDSInlineButton {...args} color="white">White (inverse)</MDSInlineButton>
      </DarkWrapper>
    </Wrapper>
  ),
};

export const StartIcon: Story = {
  args: {
    startIcon: <MDSIcon.LinkUrl />,
    children: 'Inline button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>label 앞에 아이콘을 추가합니다.</MDSTypography>
      <MDSInlineButton {...args} />
    </Wrapper>
  ),
};

export const EndIcon: Story = {
  args: {
    endIcon: <MDSIcon.OpenNew />,
    children: 'Inline button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>label 뒤에 아이콘을 추가합니다.</MDSTypography>
      <MDSInlineButton {...args} />
    </Wrapper>
  ),
};

export const BothIcons: Story = {
  args: {
    startIcon: <MDSIcon.LinkUrl />,
    endIcon: <MDSIcon.OpenNew />,
    children: 'Inline button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>앞뒤 모두 아이콘을 추가할 수 있습니다.</MDSTypography>
      <MDSInlineButton {...args} />
    </Wrapper>
  ),
};

export const Clickable: Story = {
  args: {
    startIcon: <MDSIcon.LinkUrl />,
    endIcon: <MDSIcon.OpenNew />,
    onClick: () => {},
    children: 'Clickable Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        onClick 이벤트가 없는 경우 div 요소로 출력되며,
        <br />
        onClick 이벤트가 있는 경우 button 요소로 출력됨과 동시에 hover 컬러 및 cursor: pointer 스타일이 적용됩니다.
      </MDSTypography>
      <MDSInlineButton {...args} />
    </Wrapper>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled button',
    onClick: () => {},
    isDisabled: true,
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>isDisabled가 true일 때 비활성화 스타일이 적용됩니다.</MDSTypography>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <MDSInlineButton {...args} color="bluegray" />
        <MDSInlineButton {...args} color="blue" />
      </div>
      <DarkWrapper>
        <MDSInlineButton {...args} color="white" />
      </DarkWrapper>
    </Wrapper>
  ),
};

export const Link: Story = {
  args: {
    children: 'Link button',
    href: 'https://example.com',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        href가 있으면 a 태그로 렌더링됩니다.
        <br />
        방문한 링크는 브라우저의 :visited 스타일이 자동 적용됩니다 (indigo 색상).
      </MDSTypography>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <MDSInlineButton {...args} color="bluegray" />
        <MDSInlineButton {...args} color="blue" />
      </div>
      <DarkWrapper>
        <MDSInlineButton {...args} color="white" />
      </DarkWrapper>
    </Wrapper>
  ),
};

export const LineClamp: Story = {
  args: {
    children: 'Very long text that should be truncated when it exceeds the container width',
    lineClamp: 1,
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>lineClamp를 설정하면 텍스트가 말줄임 처리됩니다.</MDSTypography>
      <div style={{ width: '200px' }}>
        <MDSInlineButton {...args} />
      </div>
    </Wrapper>
  ),
};

export const LineClampWithIcon: Story = {
  args: {
    children: 'Very long text that should be truncated when it exceeds the container width',
    lineClamp: 1,
    startIcon: <MDSIcon.LinkUrl />,
    endIcon: <MDSIcon.OpenNew />,
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>1줄 제한 + 텍스트가 길어지는 경우 (아이콘 포함)</MDSTypography>
      <div style={{ width: '200px' }}>
        <MDSInlineButton {...args} />
      </div>
    </Wrapper>
  ),
};

export const MultiLine: Story = {
  args: {
    children: 'This is a very long text that will wrap to multiple lines when the container width is constrained',
    startIcon: <MDSIcon.LinkUrl />,
    endIcon: <MDSIcon.OpenNew />,
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>세로로 길어지는 경우 (텍스트가 여러 줄로 wrap)</MDSTypography>
      <div style={{ width: '150px' }}>
        <MDSInlineButton {...args} />
      </div>
    </Wrapper>
  ),
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom styled button',
    onClick: () => {},
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>style prop을 사용하여 커스텀 스타일을 적용할 수 있습니다.</MDSTypography>
      <MDSInlineButton {...args} style={{ padding: '8px', border: '1px dashed gray' }} />
    </Wrapper>
  ),
};

export const IconOnHover: Story = {
  args: {
    children: 'Hover to see icon',
    endIcon: <MDSIcon.OpenNew />,
    isIconHoverable: true,
    href: 'https://example.com',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        시각적 노이즈를 줄이기 위해 아이콘을 호버 시에만 표시할 수 있습니다.
        <br />
        문장 안에서 사용되는 링크인 경우 Primary 컬러 스타일로 아이콘 없이 사용합니다.
      </MDSTypography>
      <MDSTypography>
        자세한 내용은 <MDSInlineButton {...args} color="blue" /> 에서 확인하세요.
      </MDSTypography>
    </Wrapper>
  ),
};

export const AllStates: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography variant="title" size="m" weight="semibold">All States Overview</MDSTypography>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', textAlign: 'left' }}></th>
            <th style={{ padding: '8px', textAlign: 'center' }}>Normal</th>
            <th style={{ padding: '8px', textAlign: 'center' }}>Disabled</th>
            <th style={{ padding: '8px', textAlign: 'center' }}>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px' }}>bluegray</td>
            <td style={{ padding: '8px', textAlign: 'center' }}><MDSInlineButton color="bluegray" onClick={() => {}}>Button</MDSInlineButton></td>
            <td style={{ padding: '8px', textAlign: 'center' }}><MDSInlineButton color="bluegray" onClick={() => {}} isDisabled>Button</MDSInlineButton></td>
            <td style={{ padding: '8px', textAlign: 'center' }}><MDSInlineButton color="bluegray" href="https://example.com">Link</MDSInlineButton></td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>bluegray-secondary</td>
            <td style={{ padding: '8px', textAlign: 'center' }}><MDSInlineButton color="bluegray-secondary" onClick={() => {}}>Button</MDSInlineButton></td>
            <td style={{ padding: '8px', textAlign: 'center' }}><MDSInlineButton color="bluegray-secondary" onClick={() => {}} isDisabled>Button</MDSInlineButton></td>
            <td style={{ padding: '8px', textAlign: 'center' }}><MDSInlineButton color="bluegray-secondary" href="https://example.com">Link</MDSInlineButton></td>
          </tr>
          <tr>
            <td style={{ padding: '8px' }}>blue</td>
            <td style={{ padding: '8px', textAlign: 'center' }}><MDSInlineButton color="blue" onClick={() => {}}>Button</MDSInlineButton></td>
            <td style={{ padding: '8px', textAlign: 'center' }}><MDSInlineButton color="blue" onClick={() => {}} isDisabled>Button</MDSInlineButton></td>
            <td style={{ padding: '8px', textAlign: 'center' }}><MDSInlineButton color="blue" href="https://example.com">Link</MDSInlineButton></td>
          </tr>
          <tr style={{ backgroundColor: '#212B36' }}>
            <td style={{ padding: '8px', color: 'white' }}>white</td>
            <td style={{ padding: '8px', textAlign: 'center' }}><MDSInlineButton color="white" onClick={() => {}}>Button</MDSInlineButton></td>
            <td style={{ padding: '8px', textAlign: 'center' }}><MDSInlineButton color="white" onClick={() => {}} isDisabled>Button</MDSInlineButton></td>
            <td style={{ padding: '8px', textAlign: 'center' }}><MDSInlineButton color="white" href="https://example.com">Link</MDSInlineButton></td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  ),
};
