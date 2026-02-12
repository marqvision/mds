import React from 'react';
import { Story } from '@storybook/addon-docs/blocks';
import { MDSButton, MDSButtonProps } from '../../../components/molecules/Button';
import { MDSIcon, MDSTag, MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof MDSButton> = {
  component: MDSButton,
  title: '2. Components/molecules/Button',
  parameters: {
    docs: {
      story: {
        layout: 'center',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    width: 'hug',
    onClick: undefined,
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['bluegray', 'blue', 'red', 'green', 'yellow', 'purple', 'teal', 'white'],
    },
    width: {
      control: 'text',
    },
    isLoading: {
      control: 'select',
      options: [true, false, 'hideLabel'],
    },
    variant: {
      control: 'select',
      options: ['fill', 'tint', 'border'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'x-large'],
    },
    flat: {
      control: 'select',
      options: [undefined, 'left', 'right', 'both'],
    },
    isDisabled: {
      control: 'boolean',
    },
    isCompleted: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDSButton>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>{children}</div>;
};

export const Preview: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        variant 기본값 fill
        <br />
        size 기본값 medium
        <br />
        color 기본값 blue
        <br />
        width 기본값 hug - 내용에 맞게 사이즈가 조절됩니다.
      </MDSTypography>
      <MDSButton {...args} />
    </Wrapper>
  ),
};

export const WidthFill: Story = {
  args: {
    width: 'fill',
    children: 'Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>width: fill 지정 시 width: 100% 스타일이 지정됩니다.</MDSTypography>
      <MDSButton {...args} />
    </Wrapper>
  ),
};

export const WidthFixed: Story = {
  args: {
    width: '300px',
    children: 'Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>width: hug 또는 fill 이외의 값 지정 시 입력한 width 사이즈가 지정됩니다.</MDSTypography>
      <MDSButton {...args} />
    </Wrapper>
  ),
};

export const VariantFill: Story = {
  args: {
    variant: 'fill',
    children: 'Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSButton {...args} />
    </Wrapper>
  ),
};

export const VariantTint: Story = {
  args: {
    variant: 'tint',
    children: 'Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSButton {...args} />
    </Wrapper>
  ),
};

export const VariantBorder: Story = {
  args: {
    variant: 'border',
    children: 'Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSButton {...args} />
    </Wrapper>
  ),
};

export const StartIcon: Story = {
  args: {
    startIcon: <MDSIcon.Image variant="fill" />,
    children: 'Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>label 의 앞에 아이콘을 추가합니다.</MDSTypography>
      <MDSButton {...args} />
    </Wrapper>
  ),
};

export const EndIcon: Story = {
  args: {
    endIcon: <MDSIcon.ArrowDown variant="outline" />,
    children: 'Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>label 의 뒤에 아이콘을 추가합니다.</MDSTypography>
      <MDSButton {...args} />
    </Wrapper>
  ),
};

export const ColoredIcon: Story = {
  args: {
    variant: 'border',
    startIcon: <MDSIcon.ExcelSheet color="color/content/success/default/normal" />,
    children: 'Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>color 가 지정된 아이콘을 전달할 경우 아이콘의 컬러를 우선 적용합니다.</MDSTypography>
      <MDSButton {...args} />
    </Wrapper>
  ),
};

export const Clickable: Story = {
  args: {
    startIcon: <MDSIcon.Image variant="fill" />,
    endIcon: <MDSIcon.ArrowDown variant="outline" />,
    onClick: () => {},
    children: 'Clickable Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        onClick 이벤트가 없는 경우 div 요소로 출력되며,
        <br />
        onClick 이벤트가 있는 경우 button 요소로 출력됨과 동시에 hover 컬러 및 cursor: pointer 스타일이 적용됩니다.
        <br />
        로딩 상태에는 onClick 이벤트가 무시됩니다.
      </MDSTypography>

      <MDSButton {...args} />
    </Wrapper>
  ),
};

export const Loading: Story = {
  args: {
    startIcon: <MDSIcon.Image variant="fill" />,
    endIcon: <MDSIcon.ArrowDown variant="outline" />,
    onClick: () => {},
    isLoading: true,
    children: 'Loading Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        isLoading: true 전달 시 startIcon 대신 로딩 스피너가 그려지며,
        <br />
        onClick 이벤트 및 hover 효과가 사라집니다.
      </MDSTypography>
      <MDSButton {...args} />
    </Wrapper>
  ),
};

export const LoadingHideLabel: Story = {
  args: {
    startIcon: <MDSIcon.Image variant="fill" />,
    endIcon: <MDSIcon.ArrowDown variant="outline" />,
    onClick: () => {},
    isLoading: 'hideLabel',
    children: 'Loading Button',
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        isLoading: hideLabel 전달 시 내부의 label, icon 대신 중앙에 로딩 스피너가 그려지며,
        <br />
        onClick 이벤트 및 hover 효과가 사라집니다.
      </MDSTypography>
      <MDSButton {...args} />
    </Wrapper>
  ),
};

export const ButtonWithTags: Story = {
  args: {
    endIcon: <MDSIcon.ArrowDown variant="outline" />,
    children: 'Filter',
  },
  argTypes: {
    tags: {
      control: 'select',
      options: {
        // @ts-ignore
        single: (
          <MDSTag size="small" variant="tint" color="bluegray">
            Tag
          </MDSTag>
        ),
        bulk: [
          <MDSTag key="tagLabel1" size="small" variant="tint" color="bluegray">
            Bracelet
          </MDSTag>,
          <MDSTag key="plusCount" size="small" variant="tint" color="bluegray">
            +3
          </MDSTag>,
        ],
      },
      defaultValue: 'single',
    },
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        tags: 단일 태그 또는 태그들의 배열 형태로 전달합니다.
        <br />
        label 과 endIcon 사이에 위치되며, Tag 사이의 gap 은 항상 2px 이고,
        <br />
        Tag와 라벨 사이의 gap은 theme의 tagLeftMargin 값으로 사이즈에 따라 적용됩니다.
        <br />
        Tag 의 size, color 등의 스타일은 전적으로 사용처에서 결정하며, Button 에서는 어떠한 값도 전달하지 않습니다.
      </MDSTypography>
      <MDSButton {...args} />
      <MDSButton
        startIcon={<MDSIcon.Check variant="outline" />}
        size="medium"
        color="blue"
        variant="fill"
        tags={[
          <MDSTag key="tagCount" size="small" variant="tint" color="blue">
            12,345
          </MDSTag>,
          <MDSTag key="tagNew" size="small" variant="fill" color="red">
            N
          </MDSTag>,
        ]}
      >
        Reviewing
      </MDSButton>
    </Wrapper>
  ),
};

export const Buttons: Story = {
  args: {
    color: 'bluegray',
    variant: 'fill',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
  render: ({ children, ...args }) => (
    <Wrapper>
      <MDSTypography>flat 속성으로 Button 을 연결해서 배치할 수 있습니다.</MDSTypography>
      <MDSTypography>flat `right` 또는 `both` 설정 시 오른쪽에 divider 가 나타납니다.</MDSTypography>
      <MDSTypography>기본적으로 inline-flex 이기 때문에 사용 시 div 로 한 번 감싸주기만 하면 됩니다.</MDSTypography>
      <div>
        <MDSButton
          color={args.color}
          variant={args.variant}
          startIcon={<MDSIcon.Calendar />}
          flat="right"
          onClick={() => {}}
          size={args.size as 'small' | 'medium' | 'large'}
        >
          Filter
        </MDSButton>
        <MDSButton
          color={args.color}
          variant={args.variant}
          flat="both"
          onClick={() => {}}
          size={args.size as 'small' | 'medium' | 'large'}
        >
          세개도 되지롱
        </MDSButton>
        <MDSButton
          color={args.color}
          variant={args.variant}
          flat="left"
          onClick={() => {}}
          tags={[
            <MDSTag key="tagCount" size="small" variant="tint" color="bluegray">
              Selected
            </MDSTag>,
            <MDSTag key="tagNew" size="small" variant="tint" color="bluegray">
              +1
            </MDSTag>,
          ]}
          size={args.size as 'small' | 'medium' | 'large'}
          endIcon={<MDSIcon.ArrowDown variant="outline" />}
        >
          Button
        </MDSButton>
      </div>
    </Wrapper>
  ),
};

export const IconButton: Story = {
  args: {
    color: 'bluegray',
    variant: 'fill',
  },
  render: ({ children, ...args }) => (
    <Wrapper>
      <MDSTypography>icon 속성을 넣으면 아이콘 버튼 스타일로 출력됩니다.</MDSTypography>
      <MDSTypography>startIcon, endIcon, children 등 복합 버튼의 속성과 함께 사용할 수 없습니다.</MDSTypography>
      <div>
        <MDSButton variant="border" size="small" color="bluegray" icon={<MDSIcon.OpenNew />} onClick={() => {}} />{' '}
        <MDSButton variant="tint" size="small" color="red" icon={<MDSIcon.Pdf variant="fill" />} onClick={() => {}} />
      </div>
      <div>
        <MDSButton variant="border" size="medium" color="bluegray" icon={<MDSIcon.AttachFile />} onClick={() => {}} />{' '}
        <MDSButton
          variant="border"
          size="medium"
          color="bluegray"
          icon={<MDSIcon.ExcelSheet color="color/content/success/default/normal" />}
          onClick={() => {}}
        />{' '}
        <MDSButton
          isLoading
          variant="fill"
          size="medium"
          color="blue"
          icon={<MDSIcon.Star variant="fill" />}
          onClick={() => {}}
        />
      </div>
      <div>
        <MDSButton
          variant="tint"
          size="large"
          color="green"
          icon={<MDSIcon.Image variant="fill" />}
          onClick={() => {}}
        />{' '}
        <MDSButton variant="border" size="large" color="bluegray" icon={<MDSIcon.ZoomIn />} onClick={() => {}} />
      </div>
      <div>
        <MDSButton variant="border" size="x-large" color="bluegray" icon={<MDSIcon.OpenNew />} onClick={() => {}} />{' '}
        <MDSButton variant="tint" size="x-large" color="red" icon={<MDSIcon.Pdf variant="fill" />} onClick={() => {}} />
      </div>
      <div />

      <MDSTypography>flat 속성으로 복합 버튼과 연결이 가능합니다.</MDSTypography>
      <div>
        <MDSButton
          {...(args as MDSButtonProps<'composite'>)}
          flat="right"
          onClick={() => {}}
          tags={[
            <MDSTag key="tagCount" size="small" variant="tint" color="bluegray">
              Selected
            </MDSTag>,
            <MDSTag key="tagNew" size="small" variant="tint" color="bluegray">
              +1
            </MDSTag>,
          ]}
        >
          Filter
        </MDSButton>
        <MDSButton
          {...(args as MDSButtonProps<'icon'>)}
          flat="left"
          onClick={() => {}}
          icon={<MDSIcon.ArrowDown variant="outline" />}
        />
      </div>
    </Wrapper>
  ),
};

export const LineClamp: Story = {
  args: {
    width: '100px',
    children: (
      <MDSTypography color="inherit" size="inherit" weight="inherit" lineClamp={1} wordBreak="break-all">
        말줄임을 하고 싶어요 사실은 되게 긴데 말이죠.
      </MDSTypography>
    ),
  },
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        line clamp 등 label 에 typography 의 속성을 사용하고 싶다면 MDSTypography 를 직접 사용하세요.
      </MDSTypography>
      <MDSTypography>
        다만 버튼 label 의 스타일을 상속받기 위해{' '}
        <MDSTypography as="span" weight="medium">
          color, size, weight
        </MDSTypography>{' '}
        를{' '}
        <MDSTag size="medium" variant="tint" color="bluegray">
          inherit
        </MDSTag>{' '}
        으로 지정하는 것을 추천합니다.
      </MDSTypography>
      <MDSButton {...args} />
      <MDSButton isDisabled {...args} />
      <MDSButton size="large" {...args} />
      <MDSButton variant="border" color="bluegray" {...args} />
    </Wrapper>
  ),
};
