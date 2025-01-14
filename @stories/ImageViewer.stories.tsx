import React from 'react';
import { MDSChip, MDSIcon, MDSImageViewer, MDSTypography } from '../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSImageViewer> = {
  component: MDSImageViewer,
  title: '2. Components/ImageViewer',
  parameters: {
    docs: {
      story: {
        height: '400px',
        layout: 'center',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSImageViewer>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        height: '400px',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  );
};

export const Preview: Story = {
  args: {
    src: 'https://picsum.photos/200',
    ImageProps: {
      width: '200px',
      height: '200px',
    },
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <MDSImageViewer {...props} />
      </Wrapper>
    );
  },
};

export const BigSizeImage: Story = {
  args: {
    src: 'https://picsum.photos/1920/3600',
    ImageProps: {
      src: 'https://picsum.photos/200',
      fallbackStyle: 'border',
      width: '200px',
      height: '200px',
    },
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <MDSTypography>
          ImageProps 에 src 를 전달하면, 미리보기 이미지와 뷰어로 출력할 이미지를 별도로 지정할 수 있습니다.
        </MDSTypography>
        <MDSImageViewer {...props} />
      </Wrapper>
    );
  },
};

export const VerticalImage: Story = {
  args: {
    src: 'https://picsum.photos/100/3600',
    ImageProps: {
      width: '200px',
      height: '200px',
    },
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <MDSImageViewer {...props} />
      </Wrapper>
    );
  },
};

export const HorizontalImage: Story = {
  args: {
    src: 'https://picsum.photos/3600/100',
    ImageProps: {
      width: '200px',
      height: '200px',
    },
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <MDSImageViewer {...props} />
      </Wrapper>
    );
  },
};

export const CustomElement: Story = {
  render: function Render() {
    return (
      <Wrapper>
        <MDSTypography>You can use any element as a trigger for the viewer</MDSTypography>
        <MDSImageViewer src="https://picsum.photos/400">
          {(open) => (
            <MDSChip
              variant="border"
              size="medium"
              color="bluegray"
              onClick={open}
              startIcon={<MDSIcon.Image variant="fill" />}
            >
              Image
            </MDSChip>
          )}
        </MDSImageViewer>
        <MDSTypography
          as="code"
          variant="T14"
          style={{ whiteSpace: 'pre-wrap', backgroundColor: '#ddd', padding: '8px', borderRadius: '4px' }}
        >
          {`
            <MDSImageViewer src="https://picsum.photos/400">
              {(open) => 
                <MDSChip variant="border" size="medium" color="bluegray" onClick={open} startIcon={<MDSIcon.Image variant="fill" />}>
                  Image
                </MDSChip>}
            </MDSImageViewer>
        `}
        </MDSTypography>
      </Wrapper>
    );
  },
};

export const Error: Story = {
  args: {
    src: 'error',
    ImageProps: {
      width: '200px',
      height: '200px',
    },
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <MDSImageViewer {...props} />
      </Wrapper>
    );
  },
};
