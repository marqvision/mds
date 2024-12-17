import React from 'react';
import { MDSChip, MDSIcon, MDSTooltip, MDSTypography } from '../components';
import type { Meta, StoryObj } from '@storybook/react';

const LONG_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const meta: Meta<typeof MDSTooltip> = {
  component: MDSTooltip,
  title: '2. Components/Tooltip',
  parameters: {
    docs: {
      story: {
        layout: 'center',
      },
    },
    layout: 'center',
  },
  args: {
    title: LONG_TEXT,
  },
  argTypes: {
    position: [
      'bottom-left',
      'bottom-right',
      'bottom-center',
      'top-left',
      'top-right',
      'top-center',
      'left-top',
      'left-bottom',
      'left-center',
      'right-top',
      'right-bottom',
      'right-center',
    ],
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSTooltip>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        height: '100vh',
        padding: '24px',
      }}
    >
      {children}
    </div>
  );
};

export const Preview: Story = {
  render: (args) => (
    <Wrapper>
      <div style={{ height: '300px' }}></div>
      <div>
        <MDSTooltip {...args}>
          <MDSChip variant="fill" color="yellow" size="medium">
            Default
          </MDSChip>
        </MDSTooltip>
      </div>
      <MDSTypography style={{ marginTop: '20px' }}>Layout test</MDSTypography>
      <div style={{ display: 'flex', gap: '16px', width: '80%' }}>
        <MDSTooltip {...args} title={`${LONG_TEXT} ${LONG_TEXT} ${LONG_TEXT}`}>
          <MDSChip variant="fill" color="yellow" size="medium">
            Long text
          </MDSChip>
        </MDSTooltip>
        <MDSTooltip position="right-center" title={LONG_TEXT} anchorStyle={{ flex: 1 }}>
          <MDSChip variant="fill" color="green" size="medium" width="fill">
            Anchor right center
          </MDSChip>
        </MDSTooltip>
        <MDSTooltip position="left-bottom" title={LONG_TEXT}>
          <MDSChip variant="fill" color="green" size="large">
            Anchor left bottom
          </MDSChip>
        </MDSTooltip>
        <MDSTooltip title={LONG_TEXT} size="small">
          <MDSChip variant="fill" color="red" size="small">
            Small size
          </MDSChip>
        </MDSTooltip>
      </div>
    </Wrapper>
  ),
};

export const WithoutChildren: Story = {
  render: (args) => (
    <Wrapper>
      <div style={{ display: 'flex', gap: '4px' }}>
        <MDSTypography>children 없으면 Help border 아이콘(16px, color: second) 노출 기본</MDSTypography>
        <MDSTooltip {...args} />
      </div>
    </Wrapper>
  ),
};

export const CustomTooltipContents: Story = {
  render: (args) => {
    const ele = (
      <div style={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}>
        <div>
          {[...Array(5)].map(() => (
            <MDSTypography color="color/content/on_default_color">{LONG_TEXT}</MDSTypography>
          ))}
        </div>
        <MDSIcon.ArrowRight
          variant="outline"
          size={24}
          color="color/content/on_default_color"
          style={{ flexShrink: 0 }}
        />
      </div>
    );

    return (
      <Wrapper>
        <div style={{ display: 'flex', gap: '4px' }}>
          <MDSTooltip
            {...args}
            title={ele}
            position="bottom-center"
            size="medium"
            style={{ padding: '12px 4px 12px 16px' }}
          >
            <MDSTypography style={{ textDecoration: 'underline' }}>
              툴팁 우측에 버튼 넣는 케이스는 padding 수정해서 씁시다.
            </MDSTypography>
          </MDSTooltip>
        </div>
      </Wrapper>
    );
  },
};
