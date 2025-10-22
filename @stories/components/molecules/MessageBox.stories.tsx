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
        color="white"
        title="White message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />

      <MDSMessageBox
        title="Bluegray message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <MDSMessageBox
        color="green"
        title="Green message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <MDSMessageBox
        color="blue"
        title="Blue message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <MDSMessageBox
        color="yellow"
        title="Yellow message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <MDSMessageBox
        color="red"
        title="Red message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <MDSMessageBox
        color="purple"
        title="Purple message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <MDSMessageBox
        color="teal"
        title="Teal message box!"
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </Wrapper>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        size="small"
        color="white"
        title="Title"
        titleCTA={{
          label: 'See detail >',
          onClick: () => console.log('titleCTA clicked'),
        }}
        message="'Baccarat Crystal Vase Twinkle Candlestick Homestay Orna...'"
        messageCTA={{
          label: 'See detail >',
          onClick: () => console.log('messageCTA clicked'),
        }}
        actionButton={{
          label: 'Action',
          onClick: () => console.log('Action clicked!'),
        }}
        closeControl={{
          isVisible: true,
          showButton: true,
          onClose: () => console.log('Close clicked'),
        }}
      />

      <MDSMessageBox
        size="small"
        color="green"
        title="Green message!"
        message="This is a small success message box."
        actionButton={{
          label: 'OK',
          onClick: () => alert('OK clicked!'),
        }}
      />

      <MDSMessageBox
        size="small"
        color="yellow"
        title="Yellow message!"
        message="This is a small warning message box."
      />

      <MDSMessageBox size="small" color="red" title="Red message!" message="This is a small error message box." />

      <MDSMessageBox
        size="small"
        images={['https://via.placeholder.com/58', 'https://via.placeholder.com/58']}
        title="With Images Small"
        message="Small message box with thumbnail images."
        actionButton={{
          label: 'View',
          onClick: () => alert('View clicked!'),
        }}
      />
    </Wrapper>
  ),
};

export const SizeComparison: Story = {
  render: () => (
    <Wrapper>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 'bold' }}>Default Size</h3>
        <MDSMessageBox
          color="blue"
          title="Default Size Message Box"
          message="This is the default size message box with standard dimensions."
          actionButton={{
            label: 'Action',
            onClick: () => console.log('Default action clicked'),
          }}
        />
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 'bold' }}>Small Size</h3>
        <MDSMessageBox
          size="small"
          color="blue"
          title="Small Size Message Box"
          message="This is the small size message box with compact dimensions."
          actionButton={{
            label: 'Action',
            onClick: () => console.log('Small action clicked'),
          }}
        />
      </div>
    </Wrapper>
  ),
};

export const WithActionButton: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        color="green"
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
        color="yellow"
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
        color="white"
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
        color="red"
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
        color="green"
        title="Success with Custom Icon"
        message="This message box uses a custom check icon instead of the default info icon."
      />
      <MDSMessageBox color="yellow" title="Warning with Custom Icon" message="This message box uses a warning icon." />
      <MDSMessageBox color="red" title="Error with Custom Icon" message="This message box uses an error icon." />
    </Wrapper>
  ),
};

export const WithCustomActionButtons: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        color="green"
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
        color="yellow"
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
        color="blue"
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
        color="white"
        title="설정"
        message="Settings action with gear icon."
        actionButton={{
          label: '설정',
          onClick: () => alert('설정 clicked!'),
          endIcon: <MDSIcon.Edit variant="fill" />,
        }}
      />
    </Wrapper>
  ),
};

export const AdvancedConfiguration: Story = {
  render: () => (
    <Wrapper>
      <MDSMessageBox
        color="green"
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
        color="white"
        titleIcon={null}
        title="No Icon Message"
        message="This message box has no title icon at all."
      />
      <MDSMessageBox
        color="blue"
        titleIcon={<div>🎉</div>}
        title="Emoji Icon"
        message="You can even use emojis or custom elements as icons!"
      />
    </Wrapper>
  ),
};
