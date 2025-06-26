import { useState } from 'react';
import { MDSButton, MDSIcon, MDSLNB } from '../../../components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MDSLNB> = {
  component: MDSLNB,
  title: '2. Components/organisms/LNB',
  tags: ['autodocs'],
  args: {
    value: '/performance/overview',
    list: [
      [
        {
          key: 'home',
          path: '/home',
          label: 'Home',
          icon: <MDSIcon.Home variant="outline" />,
        },
        {
          key: 'performance',
          label: 'Performance',
          icon: <MDSIcon.ChartBar variant="outline" />,
          items: [
            {
              key: 'overview',
              path: '/performance/overview',
              label: 'Overview',
            },
            {
              key: 'reports',
              path: '/performance/reports',
              label: 'Reports',
            },
          ],
        },
      ],
      [
        {
          key: 'marketplace',
          label: 'Marketplace',
          icon: <MDSIcon.Shopping variant="outline" />,
          items: [
            {
              key: 'listings',
              path: '/marketplace/listings',
              label: 'Listings',
            },
            {
              key: 'marketplace',
              path: '/marketplace/review-needed',
              label: 'Review Needed',
              isNew: true,
            },
          ],
        },
      ],
    ],
  },
  decorators: [
    (Story, context) => {
      const [isOpen, setIsOpen] = useState<boolean>(false);

      const toggle = () => {
        setIsOpen((prev) => !prev);
      };

      return (
        <div>
          <div style={{ padding: '0 0 12px' }}>
            <MDSButton variant="border" size="medium" color="bluegray" onClick={toggle}>
              {isOpen ? '닫기' : '열기'}
            </MDSButton>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', minHeight: '500px' }}>
            <Story args={{ ...context.args, isOpen }} />
            <div />
          </div>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof MDSLNB>;

export const Preview: Story = {
  render: (args) => <MDSLNB {...args} />,
};
