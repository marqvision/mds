import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { MDSIcon, MDSModal, MDSTypography } from '../components';

const meta: Meta<typeof MDSModal.Wrapper> = {
  title: '2. Components/Modal',
};
export default meta;

export const Preview: StoryObj<typeof MDSModal.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      defaultValue: { summary: true },
    },
  },
  args: {
    isOpen: true,
  },
  render: function Render() {
    const [{ isOpen }, setArgs] = useArgs();
    const handleClose = () => {
      setArgs({ isOpen: false });
    };

    return (
      <MDSModal.Wrapper height="440px" onClose={handleClose} isOpen={isOpen}>
        <MDSModal.Header onClose={handleClose}>Title</MDSModal.Header>
        <MDSModal.Content>
          {[...Array(50)].map((_, index) => (
            <MDSTypography key={index}>ReactElement {index}</MDSTypography>
          ))}
        </MDSModal.Content>
        <MDSModal.Action>
          <MDSTypography onClick={handleClose} style={{ cursor: 'pointer' }}>
            Close
          </MDSTypography>
          <MDSTypography color="color/content/primary/default/normal">Action</MDSTypography>
        </MDSModal.Action>
      </MDSModal.Wrapper>
    );
  },
};

export const ModalWrapper: StoryObj<typeof MDSModal.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    onClose: {
      description: '`function`',
      control: 'boolean',
    },
    isOpen: {
      control: 'boolean',
      defaultValue: { summary: true },
    },
    width: {
      control: 'text',
      defaultValue: { summary: '420px' },
    },
    minWidth: {
      description: '`string`',
      control: 'text',
    },
    maxWidth: {
      description: '`string`',
      control: 'text',
      defaultValue: { summary: '100%' },
    },
    height: {
      control: 'text',
    },
    minHeight: {
      description: '`string`',
      control: 'text',
    },
    maxHeight: {
      description: '`string`',
      control: 'text',
      defaultValue: { summary: '100%' },
    },
  },
  args: {
    isOpen: true,
    width: '420px',
    height: '200px',
  },
  render: ({ ...restProps }) => <MDSModal.Wrapper {...restProps} />,
};

export const ModalHeader: StoryObj<typeof MDSModal.Header> = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    controls: { expanded: true },
  },
  argTypes: {
    onClose: {
      control: 'boolean',
    },
    icon: {
      description:
        '아이콘을 react element 로 전달합니다.<br/>storybook 에서는 예시 출력을 위해 boolean 컨트롤러를 사용했습니다.',
      control: {
        type: 'boolean',
      },
    },
    rightSideElement: {
      description:
        '타이틀과 닫기 버튼 사이에 넣을 요소를 react element 로 전달합니다.<br/>storybook 에서는 예시 출력을 위해 boolean 컨트롤러를 사용했습니다.',
      control: {
        type: 'boolean',
      },
    },
    isBorderBottom: {
      control: 'boolean',
      defaultValue: { summary: true },
    },
  },
  args: {
    isBorderBottom: true,
  },
  render: ({ icon, rightSideElement, ...restProps }) => (
    <div style={{ backgroundColor: 'white', height: '400px', borderRadius: '8px' }}>
      <MDSModal.Header
        {...restProps}
        rightSideElement={
          rightSideElement && (
            <MDSTypography weight="bold" color="color/content/critical/default/normal">
              여기에 출력
            </MDSTypography>
          )
        }
        icon={icon && <MDSIcon.ErrorWarning variant="fill" />}
      >
        header
      </MDSModal.Header>
    </div>
  ),
};

export const ModalContent: StoryObj<typeof MDSModal.Content> = {
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    children: {
      description: '`ReactNode`<br/>내용이 길어질 경우 스크롤바가 생깁니다.',
    },
  },
  args: {
    children: (
      <>
        {[...Array(50)].map((_, index) => (
          <MDSTypography key={index}>ReactElement {index}</MDSTypography>
        ))}
      </>
    ),
  },
  render: ({ children, ...restProps }) => (
    <MDSModal.Wrapper isOpen={true} maxHeight="400px">
      <MDSModal.Content {...restProps}>{children}</MDSModal.Content>
    </MDSModal.Wrapper>
  ),
};

export const ModalAction: StoryObj<typeof MDSModal.Action> = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    controls: { expanded: true },
  },
  argTypes: {
    children: {
      description: '`ReactNode`',
    },
    justifyContent: {
      defaultValue: { summary: 'flex-end' },
      options: ['flex-start', 'flex-end', 'space-between', 'space-around'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    justifyContent: 'flex-end',
    children: (
      <>
        <MDSTypography>Close</MDSTypography>
        <MDSTypography color="color/content/primary/default/normal">Action</MDSTypography>
      </>
    ),
  },
  render: ({ children, ...restProps }) => (
    <div
      style={{
        backgroundColor: 'white',
        height: '400px',
        borderRadius: '8px',
        display: 'grid',
        alignItems: 'flex-end',
      }}
    >
      <MDSModal.Action {...restProps}>{children}</MDSModal.Action>
    </div>
  ),
};

export const WithoutHeader: StoryObj = {
  render: () => (
    <MDSModal.Wrapper isOpen={true}>
      <MDSModal.Content>
        {[...Array(50)].map((_, index) => (
          <MDSTypography key={index}>ReactElement {index}</MDSTypography>
        ))}
      </MDSModal.Content>
      <MDSModal.Action>
        <MDSTypography>Close</MDSTypography>
        <MDSTypography color="color/content/primary/default/normal">Action</MDSTypography>
      </MDSModal.Action>
    </MDSModal.Wrapper>
  ),
};

export const WithoutAction: StoryObj = {
  render: () => (
    <MDSModal.Wrapper isOpen={true}>
      <MDSModal.Header onClose={() => {}}>header</MDSModal.Header>
      <MDSModal.Content>
        {[...Array(50)].map((_, index) => (
          <MDSTypography key={index}>ReactElement {index}</MDSTypography>
        ))}
      </MDSModal.Content>
    </MDSModal.Wrapper>
  ),
};
