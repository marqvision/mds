import { ArrowDownBorder, ArrowDownFill, ArrowDownOutline, ArrowLeftBorder, ArrowLeftFill, ArrowLeftOutline, ArrowRightBorder, ArrowRightFill, ArrowRightOutline, ArrowUpBorder, ArrowUpFill, ArrowUpOutline } from '../components/Icon';
import { MDSIconProps } from '../components/Icon/@types';
import { MDSTHEME_COLORS } from './@helper';


export default {
  title: '2. Components/Icon',
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
  args: {
    color: 'color/content/neutral/default/normal'
  },
  argTypes: {
    color: {
      control: 'select',
      options: MDSTHEME_COLORS,
    },
    size: {
      control: 'number',
      defaultValue: 24,
    },
  },
};

export const Showcase = (props: MDSIconProps) => {
  return (
    <>
      <div>
        <ArrowLeftOutline {...props} />
        <ArrowLeftBorder {...props} />
        <ArrowLeftFill {...props} />
        <ArrowRightOutline {...props} />
        <ArrowRightBorder {...props} />
        <ArrowRightFill {...props} />
        <ArrowUpOutline {...props} />
        <ArrowUpBorder {...props} />
        <ArrowUpFill {...props} />
        <ArrowDownOutline {...props} />
        <ArrowDownBorder {...props} />
        <ArrowDownFill {...props} />
      </div>
    </>
  );
};
