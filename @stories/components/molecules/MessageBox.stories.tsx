import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MDSMessageBox } from '../../../components/molecules/MessageBox';
import { MDSIcon } from '../../../components/atoms/Icon';

const meta: Meta<typeof MDSMessageBox> = {
  title: '2. Components/molecules/MessageBox',
  component: MDSMessageBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSMessageBox>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', padding: '24px' }}>
      {children}
    </div>
  );
};

export const Preview: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        title="foo bar bax quz"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <MDSMessageBox
        type="neutral"
        title="Neutral message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <MDSMessageBox
        type="success"
        title="Success message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <MDSMessageBox
        type="primary"
        title="Primary message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <MDSMessageBox
        type="warning"
        title="Warning message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <MDSMessageBox
        type="critical"
        title="Critical message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </Wrapper>
  ),
};

export const WithActionButton: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        type="success"
        title="With Action Button"
        message="You can add a CTA like this."
        actionButton={{
          label: 'Undo',
          onClick: () => alert('Undo clicked!'),
        }}
      />
    </Wrapper>
  ),
};

const WithCloseButtonComponent = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Wrapper>
      <MDSMessageBox
        type="warning"
        title="Closable Message"
        message="You can close this message box manually."
        closeControl={{
          isVisible,
          showButton: true,
          onClose: () => setIsVisible(false),
        }}
      />
    </Wrapper>
  );
};

export const WithCloseButton: Story = {
  render: () => <WithCloseButtonComponent />,
};

export const WithCTA: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        type="neutral"
        title="CTA box"
        titleCTA={{
          label: 'See detail >',
          onClick: () => console.log('titleCTA clicked'),
        }}
        message="'Baccarat Crystal Vase Twinkle Candlestick Homestay Orna  Homestay Orna...'"
        messageCTA={{
          label: 'See detail >',
          onClick: () => console.log('messageCTA clicked'),
        }}
        actionButton={{
          label: 'Action',
          onClick: () => console.log('Undo clicked!'),
        }}
      />
    </Wrapper>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        type="critical"
        title="Custom Width"
        message="This message box has a fixed width of 400px."
        width={400}
      />
    </Wrapper>
  ),
};

export const WithImages: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        title="Message Box with Images"
        message="These are example thumbnails."
        images={[
          'https://via.placeholder.com/64',
          'https://via.placeholder.com/64',
          'https://via.placeholder.com/64',
          'https://via.placeholder.com/64',
        ]}
      />
    </Wrapper>
  ),
};

export const WithCustomTitleIcon: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        type="success"
        titleIcon={<MDSIcon.Check size={20} variant="border" />}
        title="Success with Custom Icon"
        message="This message box uses a custom check icon instead of the default info icon."
      />
      <MDSMessageBox
        type="warning"
        titleIcon={<MDSIcon.Info size={20} variant="border" />}
        title="Warning with Custom Icon"
        message="This message box uses a warning icon."
      />
      <MDSMessageBox
        type="critical"
        titleIcon={<MDSIcon.Info size={20} variant="border" />}
        title="Error with Custom Icon"
        message="This message box uses an error icon."
      />
    </Wrapper>
  ),
};

export const WithCustomActionButtons: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        type="success"
        title="확인 버튼"
        message="Custom action button with check icon and color."
        actionButton={{
          label: '확인',
          onClick: () => alert('확인 clicked!'),
          endIcon: <MDSIcon.Check variant="border" />,
          color: 'green',
        }}
      />
      <MDSMessageBox
        type="warning"
        title="삭제 확인"
        message="Dangerous action with delete icon and red color."
        actionButton={{
          label: '삭제',
          onClick: () => alert('삭제 clicked!'),
          endIcon: <MDSIcon.Trash variant="fill" />,
          color: 'red',
        }}
      />
      <MDSMessageBox
        type="primary"
        title="다운로드"
        message="Download action with download icon."
        actionButton={{
          label: '다운로드',
          onClick: () => alert('다운로드 clicked!'),
          endIcon: <MDSIcon.Download />,
          color: 'blue',
        }}
      />
      <MDSMessageBox
        type="neutral"
        title="설정"
        message="Settings action with gear icon."
        actionButton={{
          label: '설정',
          onClick: () => alert('설정 clicked!'),
          endIcon: <MDSIcon.Edit />,
        }}
      />
    </Wrapper>
  ),
};

export const AdvancedConfiguration: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        type="success"
        titleIcon={<MDSIcon.Check size={16} variant="fill" />}
        title="파일 업로드 완료"
        message="파일이 성공적으로 업로드되었습니다."
        titleCTA={{
          label: '자세히 보기',
          onClick: () => console.log('자세히 보기 clicked'),
        }}
        actionButton={{
          label: '확인',
          onClick: () => alert('확인 clicked!'),
          endIcon: <MDSIcon.Check size={20} variant="fill" />,
          color: 'green',
        }}
      />
    </Wrapper>
  ),
};

export const WithoutDefaultIcon: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        type="neutral"
        titleIcon={null}
        title="No Icon Message"
        message="This message box has no title icon at all."
      />
      <MDSMessageBox
        type="primary"
        titleIcon={<div>🎉</div>}
        title="Emoji Icon"
        message="You can even use emojis or custom elements as icons!"
      />
    </Wrapper>
  ),
};
