import React from 'react';
import { MDSImage, MDSTypography2 } from '../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSImage> = {
  component: MDSImage,
  title: '2. Components/Image',
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSImage>;

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

const Grid = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '20px',
      }}
    >
      {children}
    </div>
  );
};

export const Preview: Story = {
  args: {
    fallbackStyle: 'border',
    src: 'https://picsum.photos/id/40/200',
  },
  render: function Render({ children, ...restProps }) {
    return (
      <Wrapper>
        <MDSImage {...restProps}>{children}</MDSImage>
      </Wrapper>
    );
  },
};

export const Default: Story = {
  render: (props) => (
    <Wrapper>
      <MDSTypography2>이미지를 출력합니다. lazy load 를 지원합니다.</MDSTypography2>
      <Grid>
        {[...Array(80)].map((_, i) => (
          <MDSImage key={`preview-${i}`} aspectRatio="1" src={`https://picsum.photos/id/${10 + i}/200`} />
        ))}
      </Grid>
    </Wrapper>
  ),
};

export const IsLoading: Story = {
  render: (props) => (
    <Wrapper>
      <MDSTypography2>로딩 상태 시 placeholder 아이콘이 출력됩니다.</MDSTypography2>
      <Grid>
        {[...Array(4)].map((_, i) => (
          <MDSImage isLoading key={`isLoading-${i}`} fallbackStyle="border" iconSize="medium" aspectRatio="1" src="" />
        ))}
      </Grid>
    </Wrapper>
  ),
};

export const Error: Story = {
  render: (props) => (
    <Wrapper>
      <MDSTypography2>이미지 다운로드에 문제가 있다면 no image 아이콘이 출력됩니다.</MDSTypography2>
      <Grid>
        {[...Array(4)].map((_, i) => (
          <MDSImage
            key={`error-${i}`}
            fallbackStyle="border"
            iconSize="medium"
            aspectRatio="1"
            src={`https://picsum.photos/id/${-2 + i}/200`}
          />
        ))}
      </Grid>
    </Wrapper>
  ),
};

export const ErrorFallback: Story = {
  render: (props) => (
    <Wrapper>
      <MDSTypography2>
        errorFallback 설정에 따라 아이콘, 'no image' 텍스트 또는 둘 다를 출력할 수 있습니다.
      </MDSTypography2>
      <Grid>
        <MDSImage errorFallback="icon" fallbackStyle="border" iconSize="medium" aspectRatio="1" src="" />
        <MDSImage errorFallback="text" fallbackStyle="border" aspectRatio="1" src="" />
        <MDSImage errorFallback="both" fallbackStyle="border" iconSize="medium" aspectRatio="1" src="" />
      </Grid>
    </Wrapper>
  ),
};

export const Variant: Story = {
  render: (props) => (
    <Wrapper>
      <MDSTypography2>loading 또는 error 시 출력되는 스타일을 변경할 수 있습니다.</MDSTypography2>
      <MDSTypography2>variant 의 border 는 정상적인 이미지에는 영향이 없습니다.</MDSTypography2>
      <MDSTypography2 variant="title" size="2xl" weight="medium">
        border
      </MDSTypography2>
      <Grid>
        <MDSImage isLoading fallbackStyle="border" iconSize="medium" aspectRatio="1" src="" />
        <MDSImage errorFallback="icon" fallbackStyle="border" iconSize="medium" aspectRatio="1" src="" />
        <MDSImage errorFallback="text" fallbackStyle="border" aspectRatio="1" src="" />
        <MDSImage errorFallback="both" fallbackStyle="border" iconSize="medium" aspectRatio="1" src="" />
      </Grid>
      <MDSTypography2 variant="title" size="2xl" weight="medium">
        tint
      </MDSTypography2>
      <Grid>
        <MDSImage isLoading fallbackStyle="tint" iconSize="medium" aspectRatio="1" src="" />
        <MDSImage errorFallback="icon" fallbackStyle="tint" iconSize="medium" aspectRatio="1" src="" />
        <MDSImage errorFallback="text" fallbackStyle="tint" aspectRatio="1" src="" />
        <MDSImage errorFallback="both" fallbackStyle="tint" iconSize="medium" aspectRatio="1" src="" />
      </Grid>
    </Wrapper>
  ),
};

export const IconSize: Story = {
  render: (props) => (
    <Wrapper>
      <MDSTypography2>loading 또는 error 시 출력되는 아이콘의 사이즈를 변경할 수 있습니다.</MDSTypography2>
      <MDSTypography2 variant="title" size="2xl" weight="medium">
        x-small
      </MDSTypography2>
      <Grid>
        <MDSImage isLoading fallbackStyle="border" iconSize="x-small" aspectRatio="1" src="" />
        <MDSImage errorFallback="icon" fallbackStyle="border" iconSize="x-small" aspectRatio="1" src="" />
        <MDSImage errorFallback="both" fallbackStyle="border" iconSize="x-small" aspectRatio="1" src="" />
      </Grid>
      <MDSTypography2 variant="title" size="2xl" weight="medium">
        small
      </MDSTypography2>
      <Grid>
        <MDSImage isLoading fallbackStyle="border" iconSize="small" aspectRatio="1" src="" />
        <MDSImage errorFallback="icon" fallbackStyle="border" iconSize="small" aspectRatio="1" src="" />
        <MDSImage errorFallback="both" fallbackStyle="border" iconSize="small" aspectRatio="1" src="" />
      </Grid>
      <MDSTypography2 variant="title" size="2xl" weight="medium">
        medium
      </MDSTypography2>
      <Grid>
        <MDSImage isLoading fallbackStyle="border" iconSize="medium" aspectRatio="1" src="" />
        <MDSImage errorFallback="icon" fallbackStyle="border" iconSize="medium" aspectRatio="1" src="" />
        <MDSImage errorFallback="both" fallbackStyle="border" iconSize="medium" aspectRatio="1" src="" />
      </Grid>
      <MDSTypography2 variant="title" size="2xl" weight="medium">
        large
      </MDSTypography2>
      <Grid>
        <MDSImage isLoading fallbackStyle="border" iconSize="large" aspectRatio="1" src="" />
        <MDSImage errorFallback="icon" fallbackStyle="border" iconSize="large" aspectRatio="1" src="" />
        <MDSImage errorFallback="both" fallbackStyle="border" iconSize="large" aspectRatio="1" src="" />
      </Grid>
    </Wrapper>
  ),
};

export const ImageSize: Story = {
  render: (props) => (
    <Wrapper>
      <MDSTypography2>이미지에 width height 또는 aspect ratio 를 설정할 수 있습니다.</MDSTypography2>
      <MDSImage
        fallbackStyle="border"
        iconSize="medium"
        width="150px"
        height="100px"
        src={`https://picsum.photos/id/30/200`}
      />
      <MDSImage
        fallbackStyle="border"
        iconSize="medium"
        width="100px"
        height="150px"
        src={`https://picsum.photos/id/30/200`}
      />
      <MDSImage
        fallbackStyle="border"
        iconSize="medium"
        width="100px"
        aspectRatio="16/9"
        src={`https://picsum.photos/id/30/200`}
      />
      <MDSImage
        fallbackStyle="border"
        iconSize="medium"
        width="150px"
        aspectRatio="4/3"
        src={`https://picsum.photos/id/30/200`}
      />
    </Wrapper>
  ),
};

export const ObjectFit: Story = {
  render: (props) => (
    <Wrapper>
      <MDSTypography2>이미지에 object fit, object position 을 전달할 수 있습니다.</MDSTypography2>
      <Grid>
        {[...Array(4)].map((_, i) => (
          <MDSImage
            key={`preview-${i}`}
            fallbackStyle="border"
            iconSize="medium"
            aspectRatio="16/9"
            objectPosition="top left"
            src={`https://picsum.photos/id/${10 + i}/200`}
          />
        ))}
        {[...Array(4)].map((_, i) => (
          <MDSImage
            key={`preview-${i}`}
            fallbackStyle="border"
            iconSize="medium"
            aspectRatio="16/9"
            objectFit="contain"
            objectPosition="bottom left"
            src={`https://picsum.photos/id/${10 + i}/200`}
          />
        ))}
      </Grid>
    </Wrapper>
  ),
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
export const BorderWithChildren: Story = {
  render: (props) => (
    <Wrapper>
      <MDSTypography2>border color 를 전달하면 이미지 외부에 1px 의 border 가 생성됩니다.</MDSTypography2>
      <MDSTypography2>이미지 내부에 다른 요소를 추가할 수도 있습니다.</MDSTypography2>
      <Grid>
        <MDSImage
          fallbackStyle="border"
          iconSize="medium"
          aspectRatio="1"
          borderColor="color/content/critical/default/normal"
          src={`https://picsum.photos/id/40/200`}
        >
          <BoundingBox />
        </MDSImage>
      </Grid>
    </Wrapper>
  ),
};

export const RemoveBorderRadius: Story = {
  render: (props) => (
    <Wrapper>
      <MDSTypography2>이미지는 기본적으로 4px 의 border radius 가 있습니다.</MDSTypography2>
      <MDSTypography2>각 모서리 별 또는 전체 모서리에 border radius 를 제거할 수 있습니다.</MDSTypography2>
      <Grid>
        <MDSImage
          removeBorderRadius
          fallbackStyle="border"
          iconSize="medium"
          aspectRatio="1"
          src={`https://picsum.photos/id/384/200`}
        >
          <div
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
          >
            <MDSTypography2 color="color/content/inverse/default/normal" variant="title" size="m" weight="semibold">
              전체 제거
            </MDSTypography2>
          </div>
        </MDSImage>
        <MDSImage
          removeBorderRadius={{ topLeft: true }}
          fallbackStyle="border"
          iconSize="medium"
          aspectRatio="1"
          src={`https://picsum.photos/id/384/200`}
        >
          <div
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
          >
            <MDSTypography2 color="color/content/inverse/default/normal" variant="title" size="m" weight="semibold">
              topLeft 제거
            </MDSTypography2>
          </div>
        </MDSImage>
        <MDSImage
          removeBorderRadius={{ topLeft: true, bottomRight: true }}
          fallbackStyle="border"
          iconSize="medium"
          aspectRatio="1"
          src={`https://picsum.photos/id/384/200`}
        >
          <div
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
          >
            <MDSTypography2 color="color/content/inverse/default/normal" variant="title" size="m" weight="semibold">
              topLeft, bottomRight 제거
            </MDSTypography2>
          </div>
        </MDSImage>
        <MDSImage
          removeBorderRadius={{ bottomLeft: true, bottomRight: true }}
          fallbackStyle="border"
          iconSize="medium"
          aspectRatio="1"
          src={`https://picsum.photos/id/384/200`}
        >
          <div
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
          >
            <MDSTypography2 color="color/content/inverse/default/normal" variant="title" size="m" weight="semibold">
              bottomLeft, bottomRight 제거
            </MDSTypography2>
          </div>
        </MDSImage>
      </Grid>
    </Wrapper>
  ),
};

export const Hover: Story = {
  args: {
    aspectRatio: '1',
    custom: {
      type: 'hover',
      element: <MDSTypography2 color="color/content/inverse/default/normal">hi!</MDSTypography2>,
    },
    children: <BoundingBox />,
  },
  render: (props) => (
    <Wrapper>
      <MDSTypography2>
        custom 속성 타입 hover 지정 시, 이미지에 마우스를 올리면 element 로 전달 된 요소가 출력됩니다.
      </MDSTypography2>
      <MDSTypography2>
        기본적으로 display: flex 로 설정되어 이미지의 정 중앙에 출력되며 style 속성 전달 또한 가능합니다.
      </MDSTypography2>
      <Grid>
        {[...Array(80)].map((_, i) => (
          <MDSImage key={`preview-${i}`} aspectRatio="1" src={`https://picsum.photos/id/${10 + i}/200`} {...props} />
        ))}
      </Grid>
    </Wrapper>
  ),
};
