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
    fallbackStyle: 'border',
    url: 'https://picsum.photos/200',
    width: '200px',
    height: '200px',
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
    fallbackStyle: 'border',
    src: 'https://picsum.photos/200',
    url: 'https://picsum.photos/1920/3600',
    width: '200px',
    height: '200px',
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <MDSTypography>
          MDSImage 의 prop 인 src 를 전달하면, 미리보기 이미지와 뷰어로 출력할 이미지를 별도로 지정할 수 있습니다.
        </MDSTypography>
        <MDSImageViewer {...props} />
      </Wrapper>
    );
  },
};

export const VerticalImage: Story = {
  args: {
    fallbackStyle: 'border',
    url: 'https://picsum.photos/100/3600',
    width: '200px',
    height: '200px',
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
    fallbackStyle: 'border',
    url: 'https://picsum.photos/3600/100',
    width: '200px',
    height: '200px',
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
  args: {
    url: 'https://picsum.photos/400',
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <MDSTypography>
          You can use any element as a trigger for the viewer
        </MDSTypography>
        <MDSImageViewer {...props}>
          {(open) => <MDSChip variant="border" size="medium" color="bluegray" onClick={open} startIcon={<MDSIcon.Image variant="fill" />}>
            Image
          </MDSChip>}
        </MDSImageViewer>
        <MDSTypography as="code" variant="T14" style={{ whiteSpace: 'pre-wrap', backgroundColor: '#ddd', padding: '8px', borderRadius: '4px' }}>
          {`
            <MDSImageViewer {...props}>
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
