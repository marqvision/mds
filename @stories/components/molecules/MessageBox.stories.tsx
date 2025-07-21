import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MDSMessageBox } from '../../../components/molecules/MessageBox';

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
          text: 'Undo',
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
        message="‘Baccarat Crystal Vase Twinkle Candlestick Homestay Orna  Homestay Orna...’"
        messageCTA={{
          label: 'See detail >',
          onClick: () => console.log('messageCTA clicked'),
        }}
        actionButton={{
          text: 'Action',
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
