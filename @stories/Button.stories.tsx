import { MDSButton } from "../components/Button";
import type { Meta, StoryObj } from '@storybook/react';


const meta = {
  title: 'MDS/Button',
  component: MDSButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MDSButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: 'hello world',
  },
};