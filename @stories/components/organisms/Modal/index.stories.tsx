import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { MDSIcon, MDSModal, MDSTypography } from '../../../../components';
import { Doc } from './Doc';

const meta: Meta<typeof MDSModal.Wrapper> = {
  title: '2. Components/organisms/Modal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: Doc,
      layout: 'centered',
    },
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
};
export default meta;

export const Preview: StoryObj<typeof MDSModal.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  render: function Render(_) {
    const [{ isOpen }, setArgs] = useArgs();
    const handleClose = () => {
      setArgs({ isOpen: false });
    };

    return (
      <MDSModal.Wrapper height="240px" onClose={handleClose} isOpen={isOpen}>
        <MDSModal.Header onClose={handleClose}>Title</MDSModal.Header>
        <MDSModal.Content>
          {[...Array(10)].map((_, index) => (
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
    <MDSModal.Wrapper isOpen={true} height="200px">
      <MDSModal.Header
        {...restProps}
        rightSideElement={
          rightSideElement && (
            <MDSTypography variant="title" size="m" weight="semibold" color="color/content/critical/default/normal">
              여기에 출력
            </MDSTypography>
          )
        }
        icon={icon && <MDSIcon.ErrorWarning variant="fill" />}
      >
        header
      </MDSModal.Header>
    </MDSModal.Wrapper>
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
    <MDSModal.Wrapper isOpen={true} height="200px">
      <MDSModal.Content></MDSModal.Content>
      <MDSModal.Action {...restProps}>{children}</MDSModal.Action>
    </MDSModal.Wrapper>
  ),
};

export const WithoutHeader: StoryObj = {
  render: (_) => (
    <MDSModal.Wrapper isOpen={true}>
      <MDSModal.Content>
        {[...Array(20)].map((_, index) => (
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
  render: (_) => (
    <MDSModal.Wrapper isOpen={true}>
      <MDSModal.Header onClose={() => {}}>header</MDSModal.Header>
      <MDSModal.Content>
        {[...Array(20)].map((_, index) => (
          <MDSTypography key={index}>ReactElement {index}</MDSTypography>
        ))}
      </MDSModal.Content>
    </MDSModal.Wrapper>
  ),
};

export const RightSideElement: StoryObj<typeof MDSModal.Header> = {
  parameters: {
    controls: { expanded: true },
  },
  args: {
    isBorderBottom: false,
    rightSideElement: (
      <MDSTypography variant="title" size="m" weight="semibold" color="color/content/critical/default/normal">
        여기에 출력
      </MDSTypography>
    ),
  },
  render: (args) => {
    return (
      <MDSModal.Wrapper height="240px" isOpen={true}>
        <MDSModal.Header {...args} onClose={() => {}}>
          Title
        </MDSModal.Header>
        <MDSModal.Content>
          {[...Array(10)].map((_, index) => (
            <MDSTypography key={index}>ReactElement {index}</MDSTypography>
          ))}
        </MDSModal.Content>
        <MDSModal.Action>
          <MDSTypography onClick={() => {}} style={{ cursor: 'pointer' }}>
            Close
          </MDSTypography>
          <MDSTypography color="color/content/primary/default/normal">Action</MDSTypography>
        </MDSModal.Action>
      </MDSModal.Wrapper>
    );
  },
};

export const TitleIcon: StoryObj<typeof MDSModal.Header> = {
  parameters: {
    controls: { expanded: true },
  },
  render: (args) => {
    return (
      <MDSModal.Wrapper height="240px" isOpen={true}>
        <MDSModal.Header {...args} icon={<MDSIcon.ErrorWarning variant="fill" />} onClose={() => {}}>
          Title
        </MDSModal.Header>
        <MDSModal.Content>
          {[...Array(10)].map((_, index) => (
            <MDSTypography key={index}>ReactElement {index}</MDSTypography>
          ))}
        </MDSModal.Content>
        <MDSModal.Action>
          <MDSTypography onClick={() => {}} style={{ cursor: 'pointer' }}>
            Close
          </MDSTypography>
          <MDSTypography color="color/content/primary/default/normal">Action</MDSTypography>
        </MDSModal.Action>
      </MDSModal.Wrapper>
    );
  },
};

export const CustomTitle: StoryObj<typeof MDSModal.Header> = {
  parameters: {
    controls: { expanded: true },
  },
  render: (args) => {
    return (
      <MDSModal.Wrapper height="240px" isOpen={true}>
        <MDSModal.Header {...args} onClose={() => {}}>
          <p>Title</p>
          <MDSTypography>Sub title</MDSTypography>
        </MDSModal.Header>
        <MDSModal.Content>
          {[...Array(10)].map((_, index) => (
            <MDSTypography key={index}>ReactElement {index}</MDSTypography>
          ))}
        </MDSModal.Content>
        <MDSModal.Action>
          <MDSTypography onClick={() => {}} style={{ cursor: 'pointer' }}>
            Close
          </MDSTypography>
          <MDSTypography color="color/content/primary/default/normal">Action</MDSTypography>
        </MDSModal.Action>
      </MDSModal.Wrapper>
    );
  },
};

export const JustifyContent: StoryObj<typeof MDSModal.Action> = {
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    justifyContent: {
      options: ['flex-start', 'flex-end', 'space-between', 'space-around'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    justifyContent: 'space-between',
  },
  render: (args) => {
    return (
      <MDSModal.Wrapper height="240px" isOpen={true}>
        <MDSModal.Header onClose={() => {}}>Title</MDSModal.Header>
        <MDSModal.Content>
          {[...Array(10)].map((_, index) => (
            <MDSTypography key={index}>ReactElement {index}</MDSTypography>
          ))}
        </MDSModal.Content>
        <MDSModal.Action {...args}>
          <MDSTypography onClick={() => {}} style={{ cursor: 'pointer' }}>
            Close
          </MDSTypography>
          <MDSTypography color="color/content/primary/default/normal">Action</MDSTypography>
        </MDSModal.Action>
      </MDSModal.Wrapper>
    );
  },
};
