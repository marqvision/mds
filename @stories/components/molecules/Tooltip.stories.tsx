import React from 'react';
import { useState } from 'storybook/preview-api';
import { MDSButton, MDSDropdown, MDSIcon, MDSTooltip, MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const LONG_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const meta: Meta<typeof MDSTooltip> = {
  component: MDSTooltip,
  title: '2. Components/molecules/Tooltip',
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
          <MDSButton variant="fill" color="yellow" size="medium">
            Default
          </MDSButton>
        </MDSTooltip>
      </div>
      <MDSTypography style={{ marginTop: '20px' }}>Layout test</MDSTypography>
      <div style={{ display: 'flex', gap: '16px', width: '80%' }}>
        <MDSTooltip {...args} title={`${LONG_TEXT} ${LONG_TEXT} ${LONG_TEXT}`}>
          <MDSButton variant="fill" color="yellow" size="medium">
            Long text
          </MDSButton>
        </MDSTooltip>
        <MDSTooltip position="right-center" title={LONG_TEXT}>
          <MDSButton variant="fill" color="green" size="medium" width="fill">
            Anchor right center
          </MDSButton>
        </MDSTooltip>
        <MDSTooltip position="left-bottom" title={LONG_TEXT}>
          <MDSButton variant="fill" color="green" size="large">
            Anchor left bottom
          </MDSButton>
        </MDSTooltip>
        <MDSTooltip title={LONG_TEXT} size="small">
          <MDSButton variant="fill" color="red" size="small">
            Small size
          </MDSButton>
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

export const CustomWidth: Story = {
  args: {
    width: '320px',
    position: 'bottom-center',
    size: 'medium',
  },
  render: (args) => {
    const ele = (
      <div style={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}>
        <MDSTypography color="color/content/on_default_color">
          {[...Array(5)].map(() => args.title).join(', ')}
        </MDSTypography>
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
          <MDSTooltip {...args} title={ele}>
            <MDSTypography style={{ textDecoration: 'underline' }}>width를 고정하는 케이스</MDSTypography>
          </MDSTooltip>
        </div>
      </Wrapper>
    );
  },
};

export const Interactive: Story = {
  args: {
    interactive: false,
    position: 'bottom-center',
    size: 'medium',
  },
  render: function Render(args) {
    const [anchor, setAnchor] = useState('flex-start|center');

    return (
      <Wrapper>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          앵커위치
          <MDSDropdown
            value={anchor}
            list={[
              { value: 'flex-start|center', label: '위쪽' },
              { value: 'center|flex-start', label: '왼쪽' },
              { value: 'flex-end|center', label: '아래쪽' },
              { value: 'center|flex-end', label: '오른쪽' },
            ]}
            onChange={setAnchor}
          />
        </div>
        <div
          style={{
            display: 'flex',
            gap: '4px',
            flex: 1,
            width: '100%',
            justifyContent: anchor.split('|')[1],
            alignItems: anchor.split('|')[0],
          }}
        >
          <div>
            <MDSTooltip {...args}>
              <MDSTypography style={{ textDecoration: 'underline' }}>interactive: true / false</MDSTypography>
            </MDSTooltip>
          </div>
        </div>
      </Wrapper>
    );
  },
};
