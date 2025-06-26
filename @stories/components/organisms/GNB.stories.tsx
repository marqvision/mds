import React, { useState } from 'react';
import { MDSGNB, MDSIcon, MDSPlainButton, MDSTooltip, MDSTypography } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSGNB> = {
  component: MDSGNB,
  title: '2. Components/organisms/GNB',
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const [isOpen, setIsOpen] = useState<boolean>(false);

      const toggle = () => {
        setIsOpen((prev) => !prev);
      };

      return <Story args={{ ...context.args, isLNBOpen: isOpen, onLNBToggle: toggle }} />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof MDSGNB>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>{children}</div>;
};

export const Preview: Story = {
  render: (args) => (
    <Wrapper>
      <MDSTypography>
        children prop 에 전달한 요소들은 로고 영역 우측에 출력됩니다.
        <br />
        요소간 gap 이 자동으로 지정되어 있습니다.
      </MDSTypography>
      <MDSGNB {...args}>
        <MDSPlainButton
          size="medium"
          color="bluegray"
          onClick={() => {}}
          endIcon={<MDSIcon.ArrowDown variant="outline" />}
        >
          Custom Button
        </MDSPlainButton>
        <MDSTooltip title="Settings" size="small" position="bottom-center" style={{ marginTop: '4px' }}>
          <MDSPlainButton
            size="medium"
            color="bluegray"
            icon={<MDSIcon.Settings variant="fill" />}
            onClick={() => {}}
          />
        </MDSTooltip>
        <MDSTooltip title="Settings" size="small" position="bottom-center" style={{ marginTop: '4px' }}>
          <MDSPlainButton
            size="medium"
            color="bluegray"
            icon={<MDSIcon.AccountProfile variant="fill" />}
            onClick={() => {}}
          />
        </MDSTooltip>
      </MDSGNB>
    </Wrapper>
  ),
};
