import { useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { MDSChip, MDSPanel, MDSTypography } from '../../components';
import { Doc } from './Doc';

const meta: Meta<typeof MDSPanel.Wrapper> = {
  title: '2. Components/Panel',
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

export const DimmedPanel: StoryObj<typeof MDSPanel.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  render: function Render(_) {
    const [{ isOpen }, setArgs] = useArgs();
    const handleClose = () => {
      setArgs({ isOpen: false });
    };

    return (
      <>
        <button onClick={() => setArgs({ isOpen: !isOpen })}>Toggle</button>
        <MDSPanel.Wrapper onClose={handleClose} isOpen={isOpen}>
          <MDSPanel.Header onClose={handleClose}>Title</MDSPanel.Header>
          <MDSPanel.Content style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[...Array(20)].map((_, index) => (
              <MDSTypography key={index} style={{ border: '1px solid #eee', padding: '16px' }}>
                ReactElement {index}
              </MDSTypography>
            ))}
          </MDSPanel.Content>
          <MDSPanel.Action justifyContent="space-between">
            <MDSTypography onClick={handleClose} style={{ cursor: 'pointer' }}>
              Close
            </MDSTypography>
            <MDSChip variant="fill" size="large" color="blue">
              Action
            </MDSChip>
          </MDSPanel.Action>
        </MDSPanel.Wrapper>
      </>
    );
  },
};

export const SplitPanel: StoryObj<typeof MDSPanel.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  render: function Render(_) {
    const [{ isOpen }, setArgs] = useArgs();
    const handleClose = () => {
      setArgs({ isOpen: false });
    };

    useEffect(() => {
      window.document.body.style.height = '100vh';
      window.document.body.style.padding = '0px';
      window.document.body.style.backgroundColor = '#000';

      return () => {
        window.document.body.style.height = '';
        window.document.body.style.padding = '';
        window.document.body.style.backgroundColor = '';
      };
    }, []);

    return (
      <div style={{ display: 'flex', height: '100vh', paddingTop: '20px' }}>
        <div style={{ flex: 'auto', backgroundColor: '#FFF', borderRadius: '16px 16px 0 0', padding: '16px' }}>
          <MDSTypography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
          </MDSTypography>
          <br />
          <button onClick={() => setArgs({ isOpen: !isOpen })}>Toggle</button>
        </div>
        <div
          style={{
            overflow: 'hidden',
            flexShrink: 0,
            flexBasis: isOpen ? '400px' : '0',
            marginLeft: isOpen ? '4px' : 0,
            transition: 'flex .3s ease',
            borderRadius: '16px 16px 0 0',
          }}
        >
          <div style={{ width: '400px', height: '100%', overflow: 'auto' }}>
            {
              <MDSPanel.Wrapper isDimmed={false}>
                <MDSPanel.Header onClose={handleClose}>Title</MDSPanel.Header>
                <MDSPanel.Content style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[...Array(20)].map((_, index) => (
                    <MDSTypography key={index} style={{ border: '1px solid #eee', padding: '16px' }}>
                      ReactElement {index}
                    </MDSTypography>
                  ))}
                </MDSPanel.Content>
                <MDSPanel.Action justifyContent="space-between">
                  <MDSTypography onClick={handleClose} style={{ cursor: 'pointer' }}>
                    Close
                  </MDSTypography>
                  <MDSChip variant="fill" size="large" color="blue">
                    Action
                  </MDSChip>
                </MDSPanel.Action>
              </MDSPanel.Wrapper>
            }
          </div>
        </div>
      </div>
    );
  },
};
