import React from 'react';
import { MDSIcon, MDSPlainButton, MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSPlainButton> = {
  component: MDSPlainButton,
  title: '2. Components/molecules/PlainButton',
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
    weight: 'medium',
    onClick: undefined,
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['bluegray', 'bluegray-secondary', 'blue', 'red', 'yellow', 'green', 'white'],
    },
    weight: {
      control: 'radio',
      options: ['medium', 'regular'],
    },
    size: {
      control: 'radio',
      options: ['x-small', 'small', 'medium', 'large'],
    },
  },
};

export default meta;
type CompositeButtonStory = StoryObj<typeof MDSPlainButton<'composite'>>;
type IconButtonStory = StoryObj<typeof MDSPlainButton<'icon'>>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>{children}</div>;
};

export const Preview: CompositeButtonStory = {
  args: {
    children: 'Plain button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        size 기본값 medium
        <br />
        color 기본값 blue
        <br />
        weight 기본값 medium
      </MDSTypography>
      <MDSPlainButton {...args} />
    </Wrapper>
  ),
};

export const StartIcon: CompositeButtonStory = {
  args: {
    startIcon: <MDSIcon.LinkUrl />,
    children: 'Plain button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>label 의 앞에 아이콘을 추가합니다.</MDSTypography>
      <MDSPlainButton {...args} />
    </Wrapper>
  ),
};

export const EndIcon: CompositeButtonStory = {
  args: {
    endIcon: <MDSIcon.OpenNew />,
    children: 'Plain button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>label 의 뒤에 아이콘을 추가합니다.</MDSTypography>
      <MDSPlainButton {...args} />
    </Wrapper>
  ),
};

export const ColoredIcon: CompositeButtonStory = {
  args: {
    startIcon: <MDSIcon.ExcelSheet color="color/content/success/default/normal" />,
    color: 'bluegray',
    children: 'Plain button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>color 가 지정된 아이콘을 전달할 경우 아이콘의 컬러를 우선 적용합니다.</MDSTypography>
      <MDSPlainButton {...args} />
    </Wrapper>
  ),
};

export const Clickable: CompositeButtonStory = {
  args: {
    startIcon: <MDSIcon.AttachFile />,
    endIcon: <MDSIcon.Download />,
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

      <MDSPlainButton {...args} />
    </Wrapper>
  ),
};

export const IconButton: IconButtonStory = {
  args: {
    color: 'blue',
    size: 'medium',
    onClick: () => {},
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        icon 속성을 넣으면 아이콘 버튼 스타일로 출력됩니다.
        <br />
        startIcon, endIcon, children 등 복합 버튼의 속성과 함께 사용할 수 없습니다.
        <br /><br />
        <MDSTypography as="span" variant="title" weight="semibold" style={{ lineHeight: 2 }}>
          icon prop 이 아니라 children 에 아이콘을 넣으면 안되나요?
        </MDSTypography>
        <br />
        1. icon prop 으로 넣어야 사이즈와 컬러(특히 hover 시 컬러)를 PlainButton 에서 지정해줍니다.
        <br />
        2. 클릭 가능한 영역 (hover 시 생기는 박스) 사이즈가 복합 버튼과 아이콘 버튼이 서로 다릅니다.
      </MDSTypography>
      <div>
        <MDSPlainButton {...args} icon={<MDSIcon.Reset />} />{' '}
      </div>
      <div>
        <MDSPlainButton size="small" color="blue" icon={<MDSIcon.OpenNew />} onClick={() => {}} />{' '}
        <MDSPlainButton size="small" color="red" icon={<MDSIcon.Pdf variant="fill" />} onClick={() => {}} />
      </div>
      <div>
        <MDSPlainButton size="medium" color="bluegray" icon={<MDSIcon.AttachFile />} onClick={() => {}} />{' '}
        <MDSPlainButton
          size="medium"
          color="bluegray"
          icon={<MDSIcon.ExcelSheet color="color/content/success/default/normal" />}
          onClick={() => {}}
        />{' '}
        <MDSPlainButton size="medium" color="blue" icon={<MDSIcon.Star variant="fill" />} onClick={() => {}} />
      </div>
      <div>
        <MDSPlainButton size="large" color="green" icon={<MDSIcon.Image variant="fill" />} onClick={() => {}} />{' '}
        <MDSPlainButton size="large" color="bluegray" icon={<MDSIcon.ZoomIn />} onClick={() => {}} />
      </div>
    </Wrapper>
  ),
};
