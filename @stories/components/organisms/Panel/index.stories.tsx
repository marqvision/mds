import { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs, useState, useEffect } from 'storybook/preview-api';
import { MDSButton, MDSModal, MDSPanel, MDSTypography } from '../../../../components';
import { Doc } from './Doc';

const meta: Meta<typeof MDSPanel.Wrapper> = {
  title: '2. Components/organisms/Panel',
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

    const [isOpen2, setIsOpen2] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const handleClose = () => {
      setArgs({ isOpen: false });
    };

    const handleClose2 = () => {
      setIsOpen2(false);
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
            <MDSTypography weight="medium" onClick={handleClose} style={{ cursor: 'pointer' }}>
              Close
            </MDSTypography>
            <MDSButton variant="fill" size="large" color="blue" onClick={() => setIsOpen2(true)}>
              Open 2depth panel
            </MDSButton>
          </MDSPanel.Action>
        </MDSPanel.Wrapper>
        <MDSPanel.Wrapper width={300} onClose={handleClose2} isOpen={isOpen2}>
          <MDSPanel.Header onClose={handleClose2}>Title</MDSPanel.Header>
          <MDSPanel.Content style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[...Array(20)].map((_, index) => (
              <MDSTypography key={index} style={{ border: '1px solid #eee', padding: '16px' }}>
                ReactElement {index}
              </MDSTypography>
            ))}
          </MDSPanel.Content>
          <MDSPanel.Action justifyContent="space-between">
            <MDSTypography weight="medium" onClick={handleClose2} style={{ cursor: 'pointer' }}>
              Close
            </MDSTypography>
            <MDSButton variant="fill" size="large" color="blue" onClick={() => setIsModal(true)}>
              Open modal
            </MDSButton>
          </MDSPanel.Action>
        </MDSPanel.Wrapper>
        <MDSModal.Wrapper isOpen={isModal} onClose={() => setIsModal(false)}>
          <MDSModal.Header onClose={() => setIsModal(false)}>Modal</MDSModal.Header>
          <MDSModal.Content>
            {[...Array(10)].map((_, index) => (
              <MDSTypography key={index}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </MDSTypography>
            ))}
          </MDSModal.Content>
          <MDSModal.Action justifyContent="space-between">
            <MDSTypography weight="medium" onClick={() => setIsModal(false)} style={{ cursor: 'pointer' }}>
              Close
            </MDSTypography>
            <MDSButton variant="fill" size="large" color="blue" onClick={() => alert('no event')}>
              Action
            </MDSButton>
          </MDSModal.Action>
        </MDSModal.Wrapper>
      </>
    );
  },
};

export const SplitPanel: StoryObj<typeof MDSPanel.Wrapper> = {
  parameters: {
    controls: { expanded: true },
  },
  args: {
    width: '50%',
  },
  render: function Render(_) {
    const [{ isOpen, width }, setArgs] = useArgs();
    const handleClose = () => {
      setArgs({ isOpen: false });
    };

    useEffect(() => {
      window.document.body.style.height = '100vh';
      window.document.body.style.padding = '0px';
      window.document.body.style.backgroundColor = 'rgb(52, 62, 73)';

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
        <MDSPanel.Wrapper isOpen={isOpen} width={width} isDimmed={false}>
          <MDSPanel.Header onClose={handleClose}>Title</MDSPanel.Header>
          <MDSPanel.Content style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[...Array(20)].map((_, index) => (
              <MDSTypography key={index} style={{ border: '1px solid #eee', padding: '16px' }}>
                ReactElement {index}
              </MDSTypography>
            ))}
          </MDSPanel.Content>
          <MDSPanel.Action justifyContent="space-between">
            <MDSTypography weight="medium" onClick={handleClose} style={{ cursor: 'pointer' }}>
              Close
            </MDSTypography>
            <MDSButton variant="fill" size="large" color="blue" onClick={() => alert('no action')}>
              Action
            </MDSButton>
          </MDSPanel.Action>
        </MDSPanel.Wrapper>
      </div>
    );
  },
};

export const PanelDirection: StoryObj<typeof MDSPanel.Wrapper> = {
  parameters: {
    controls: {
      expanded: true,
    },
  },
  args: {
    width: '100%',
    direction: 'right',
  },
  argTypes: {
    direction: {
      options: ['left', 'top', 'bottom', 'right'],
      control: 'radio',
    },
  },
  render: function Render(_) {
    const [{ isOpen, width, direction }, setArgs] = useArgs();

    const handleClose = () => {
      setArgs({ isOpen: false });
    };

    return (
      <MDSPanel.Wrapper isOpen={isOpen} width={width} direction={direction}>
        <MDSPanel.Header onClose={handleClose}>Title</MDSPanel.Header>
        <MDSPanel.Content style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[...Array(5)].map((_, index) => (
            <MDSTypography key={index} style={{ border: '1px solid #eee', padding: '16px' }}>
              ReactElement {index}
            </MDSTypography>
          ))}
        </MDSPanel.Content>
      </MDSPanel.Wrapper>
    );
  },
};
