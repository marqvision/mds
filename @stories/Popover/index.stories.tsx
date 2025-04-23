import React, { useState } from 'react';
import { MDSPopover, MDSTypography } from '../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSPopover> = {
  component: MDSPopover,
  title: '2. Components/molecules/Popover',
  args: {
    anchor: <button>클릭</button>,
  },
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSPopover>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
};

export const Preview: Story = {
  args: {
    anchor: <button style={{ width: '200px' }}>클릭</button>,
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <MDSPopover {...props}>
          <MDSTypography>팝업</MDSTypography>
        </MDSPopover>
      </Wrapper>
    );
  },
};

export const Hover: Story = {
  render: function Render() {
    return (
      <Wrapper>
        <div>
          <div style={{ display: 'flex', gap: 0 }}>
            <MDSPopover anchor={<button style={{ width: '200px' }}>마우스 호버</button>} hasDim={false} trigger="hover">
              <MDSTypography>팝업</MDSTypography>
            </MDSPopover>
            <MDSPopover
              anchor={<button style={{ width: '200px' }}>마우스 호버2</button>}
              hasDim={false}
              trigger="hover"
            >
              <MDSTypography>팝업2</MDSTypography>
            </MDSPopover>
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            <MDSPopover
              anchor={<button style={{ width: '200px' }}>마우스 호버3</button>}
              hasDim={false}
              trigger="hover"
            >
              <MDSTypography>팝업3</MDSTypography>
            </MDSPopover>
            <MDSPopover
              anchor={<button style={{ width: '200px' }}>마우스 호버4</button>}
              hasDim={false}
              trigger="hover"
            >
              <MDSTypography>팝업4</MDSTypography>
            </MDSPopover>
          </div>
        </div>
      </Wrapper>
    );
  },
};

export const CustomEvent: Story = {
  render: function Render() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<number>();

    const handleOpen = () => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setData(10);
      }, 2000);
    };

    return (
      <Wrapper>
        <MDSPopover
          anchor={({ open }) => (
            <button
              style={{ width: '200px' }}
              onClick={(e) => {
                handleOpen();
                open(e);
              }}
            >
              클릭
            </button>
          )}
          isLoading={isLoading}
        >
          {({ close }) => (
            <>
              <MDSTypography>팝업 {data}</MDSTypography>
              <button onClick={close}>닫기</button>
            </>
          )}
        </MDSPopover>
      </Wrapper>
    );
  },
};
