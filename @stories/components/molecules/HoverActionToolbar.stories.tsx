import { useState } from 'react';
import styled from '@emotion/styled';
import { MDSHoverActionToolbar } from '../../../components/molecules/HoverActionToolbar';
import { MDSIcon } from '../../../components/atoms/Icon';
import { MDSTooltip } from '../../../components/molecules/Tooltip';
import { MDSPopper } from '../../../components/molecules/HoverActionToolbar/Popper';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof MDSHoverActionToolbar> = {
  component: MDSHoverActionToolbar,
  title: '2. Components/molecules/HoverActionToolbar',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSHoverActionToolbar>;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const Preview: Story = {
  render: () => (
    <MDSHoverActionToolbar
      actions={[
        <MDSTooltip key="open" title="Open link" size="small">
          <IconButton>
            <MDSIcon.OpenNew size={16} />
          </IconButton>
        </MDSTooltip>,
        <MDSTooltip key="copy" title="Copy" size="small">
          <IconButton>
            <MDSIcon.CopyContent size={16} variant="outline" />
          </IconButton>
        </MDSTooltip>,
        <MDSTooltip key="edit" title="Edit" size="small">
          <IconButton>
            <MDSIcon.Edit size={16} variant="outline" />
          </IconButton>
        </MDSTooltip>,
        <MDSTooltip key="info" title="More info" size="small">
          <IconButton>
            <MDSIcon.Info size={16} variant="border" />
          </IconButton>
        </MDSTooltip>,
      ]}
    />
  ),
};

export const WithPopper: Story = {
  render: () => (
    <MDSPopper
      trigger="hover"
      position="top-center"
      offset={0}
      content={
        <MDSHoverActionToolbar
          actions={[
            <MDSTooltip key="open" title="Open link" size="small">
              <IconButton>
                <MDSIcon.OpenNew size={16} />
              </IconButton>
            </MDSTooltip>,
            <MDSTooltip key="copy" title="Copy" size="small">
              <IconButton>
                <MDSIcon.CopyContent size={16} variant="outline" />
              </IconButton>
            </MDSTooltip>,
          ]}
        />
      }
    >
      <span
        style={{
          cursor: 'pointer',
          textDecoration: 'underline',
          textDecorationColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecorationColor = 'currentColor';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecorationColor = 'transparent';
        }}
      >
        Hover me to see toolbar
      </span>
    </MDSPopper>
  ),
};

export const WithDynamicTooltip: Story = {
  render: function Render() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div style={{ display: 'flex' }}>
        <p style={{ marginBottom: 16, color: '#666' }}>Copy 버튼을 클릭하면 툴팁이 &quot;Copied!&quot;로 변경됩니다.</p>
        <MDSHoverActionToolbar
          actions={[
            <MDSTooltip key="open" title="Open link" size="small">
              <IconButton>
                <MDSIcon.OpenNew size={16} />
              </IconButton>
            </MDSTooltip>,
            <MDSTooltip key="copy" title={copied ? 'Copied!' : 'Copy'} size="small">
              <IconButton onClick={handleCopy}>
                <MDSIcon.CopyContent size={16} variant="outline" />
              </IconButton>
            </MDSTooltip>,
          ]}
        />
      </div>
    );
  },
};

export const ImageHoverExample: Story = {
  render: function Render() {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        style={{
          position: 'relative',
          width: 200,
          height: 150,
          borderRadius: 8,
          overflow: 'hidden',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="https://placehold.co/200x150"
          alt="example"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {isHovered && (
          <>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            />
            <MDSHoverActionToolbar
              style={{ position: 'absolute', top: 8, left: 8 }}
              actions={[
                <MDSTooltip key="open" title="Open link" size="small">
                  <IconButton>
                    <MDSIcon.OpenNew size={16} />
                  </IconButton>
                </MDSTooltip>,
                <MDSTooltip key="copy" title="Copy" size="small">
                  <IconButton>
                    <MDSIcon.CopyContent size={16} variant="outline" />
                  </IconButton>
                </MDSTooltip>,
              ]}
            />
          </>
        )}
      </div>
    );
  },
};

export const SingleAction: Story = {
  render: () => (
    <MDSHoverActionToolbar
      actions={[
        <MDSTooltip key="copy" title="Copy" size="small">
          <IconButton>
            <MDSIcon.CopyContent size={16} variant="outline" />
          </IconButton>
        </MDSTooltip>,
      ]}
    />
  ),
};

export const NoTooltip: Story = {
  render: () => (
    <MDSHoverActionToolbar
      actions={[
        <IconButton key="open">
          <MDSIcon.OpenNew size={16} />
        </IconButton>,
        <IconButton key="copy">
          <MDSIcon.CopyContent size={16} variant="outline" />
        </IconButton>,
      ]}
    />
  ),
};
