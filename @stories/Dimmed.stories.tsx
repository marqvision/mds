import { MDSDimmed } from '../components/Dimmed';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { MDSTypography } from '../components';

const meta: Meta<typeof MDSDimmed> = {
  component: MDSDimmed,
  title: '2. Components/Dimmed',
  parameters: {
    docs: {
      story: {
        //iframe 내에 가두기 위한 옵션
        //현재 해당 옵션 설정 시 버그로 인해 autoDoc 컨트롤러에서 액션 불가
        //[참고] https://storybook.js.org/docs/api/doc-block-story#inline
        inline: false,
        height: '400px',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description:
        '현재 버그로 autoDoc 에서 액션 불가<br/>[참고] https://storybook.js.org/docs/api/doc-block-story#inline',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDSDimmed>;

export const Default: Story = {
  args: {
    isOpen: true,
    children: '이곳에 하위 컴포넌트가 출력됩니다.',
  },
};

export const Modal: Story = {
  args: {
    isOpen: true,
  },
  render: function Render(_) {
    const [{ isOpen }, setArgs] = useArgs();
    const handleOpen = () => {
      setArgs({ isOpen: true });
    };
    const handleClose = () => {
      setArgs({ isOpen: false });
    };

    return (
      <>
        <MDSTypography style={{ cursor: 'pointer' }} onClick={handleOpen}>
          열기
        </MDSTypography>
        <MDSDimmed isOpen={isOpen} onClose={handleClose}>
          <div
            style={{ width: '420px', height: '200px', backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}
          >
            하이~
          </div>
        </MDSDimmed>
      </>
    );
  },
};
