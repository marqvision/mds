import React from 'react';
import { MDSChip, MDSIcon, MDSImage, MDSImageViewer, MDSTypography2 } from '../components';
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
        minHeight: '400px',
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  );
};
const CodeStyle = {
  width: '100%',
  whiteSpace: 'pre-wrap',
  backgroundColor: '#ddd',
  padding: '8px',
  borderRadius: '4px',
};

export const Preview: Story = {
  render: function Render() {
    return (
      <Wrapper>
        <MDSTypography2>
          renderAnchor 에서 제공하는 defaultButton 을 미리보기 이미지에서 사용할 수 있습니다.
        </MDSTypography2>
        <MDSImageViewer
          image="https://picsum.photos/200"
          renderAnchor={({ defaultButton }) => (
            <MDSImage
              width="200px"
              height="200px"
              src="https://picsum.photos/200"
              custom={{
                type: 'hover',
                element: defaultButton,
              }}
            />
          )}
        />
        <MDSTypography2 as="code" variant="body" size="m" style={CodeStyle}>
          {`
            <MDSImageViewer
              image="https://picsum.photos/200"
              renderAnchor={({ defaultButton }) => (
                <MDSImage
                  width="200px"
                  height="200px"
                  src="https://picsum.photos/200"
                  custom={{
                    type: 'hover',
                    element: defaultButton,
                  }}
                />
              )}
            />
        `}
        </MDSTypography2>
      </Wrapper>
    );
  },
};

const BoundingBox = () => {
  return (
    <div
      style={{
        width: '80px',
        height: '30px',
        border: '4px solid red',
        position: 'absolute',
        top: '50%',
        left: '30%',
        textAlign: 'center',
      }}
    />
  );
};
export const WithOverlayElement: Story = {
  render: function Render() {
    return (
      <Wrapper>
        <MDSTypography2>image 를 객체 형태로 전달하면 원본 이미지 외에 다른 정보를 출력할 수 있습니다.</MDSTypography2>
        <MDSTypography2>
          overlay 는 원본 이미지(MDSImage) 의 children 으로 전달되어 이미지 내부에 다른 요소를 출력합니다.
        </MDSTypography2>
        <MDSImageViewer
          image={{
            src: 'https://picsum.photos/200',
            overlay: <BoundingBox />, // 원본 이미지 내 BoundingBox 추가
          }}
          renderAnchor={({ defaultButton }) => (
            <MDSImage
              width="200px"
              height="200px"
              src="https://picsum.photos/200"
              custom={{
                type: 'hover',
                element: defaultButton,
              }}
            >
              {/* 미리보기 이미지 내 BoundingBox 추가 */}
              <BoundingBox />
            </MDSImage>
          )}
        />
        <MDSTypography2 as="code" variant="body" size="m" style={CodeStyle}>
          {`
            <MDSImageViewer
              image={{
                src: 'https://picsum.photos/200',
                overlay: <BoundingBox />, // 원본 이미지 내 BoundingBox 추가
              }}
              renderAnchor={({ defaultButton }) => (
                <MDSImage
                  width="200px"
                  height="200px"
                  src="https://picsum.photos/200"
                  custom={{
                    type: 'hover',
                    element: defaultButton,
                  }}
                >
                  {/* 미리보기 이미지 내 BoundingBox 추가 */}
                  <BoundingBox />
                </MDSImage>
              )}
            />
        `}
        </MDSTypography2>
      </Wrapper>
    );
  },
};

export const CustomButton: Story = {
  render: function Render() {
    return (
      <Wrapper>
        <MDSTypography2>
          renderAnchor 에서 제공하는 open 이벤트를 적용해 임의의 요소를 버튼으로 사용할 수 있습니다.
        </MDSTypography2>
        <MDSImageViewer
          image="https://picsum.photos/400"
          renderAnchor={({ open }) => (
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
        />
        <MDSTypography2 as="code" variant="body" size="m" style={CodeStyle}>
          {`
            <MDSImageViewer
              image="https://picsum.photos/400"
              renderAnchor={({ open }) => (
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
            />
        `}
        </MDSTypography2>
      </Wrapper>
    );
  },
};

export const BigImage: Story = {
  args: {
    image: 'https://picsum.photos/3600/400',
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <MDSTypography2>큰 사이즈의 이미지는 max-width 1280px 으로 출력됩니다.</MDSTypography2>
        <MDSImageViewer
          {...props}
          renderAnchor={({ defaultButton }) => (
            <MDSImage
              width="200px"
              height="200px"
              src="https://picsum.photos/200"
              custom={{
                type: 'hover',
                element: defaultButton,
              }}
            />
          )}
        />
      </Wrapper>
    );
  },
};

export const VerticalImage: Story = {
  args: {
    image: 'https://picsum.photos/400/3600',
  },
  render: function Render(props) {
    return (
      <Wrapper>
        <Wrapper>
          <MDSTypography2>세로로 긴 이미지는 스크롤을 내려서 확인합니다.</MDSTypography2>
          <MDSImageViewer
            {...props}
            renderAnchor={({ defaultButton }) => (
              <MDSImage
                width="200px"
                height="200px"
                src="https://picsum.photos/200"
                custom={{
                  type: 'hover',
                  element: defaultButton,
                }}
              />
            )}
          />
        </Wrapper>
      </Wrapper>
    );
  },
};
