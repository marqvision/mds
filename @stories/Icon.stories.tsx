import { Meta } from '@storybook/react';
import styled from '@emotion/styled';
import { MDSIcon, MDSIconProps } from '../components/Icon';
import { MDSTypography } from '../components';
import { MDSTHEME_COLORS } from './@helper';

const meta: Meta<typeof MDSIcon.ArrowLeft> = {
  title: '2. Components/Icon',
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
  args: {
    color: 'color/content/neutral/default/normal',
    size: 24,
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

export default meta;


const IconGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
`;
const IconItem = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
`;

export const Showcase = ({ variant, ...rest }: MDSIconProps) => {
  return (
    <>
      <IconGrid>
        <IconItem>
          <MDSTypography>ArrowLeft</MDSTypography>

          <MDSIcon.ArrowLeft variant="outline" {...rest} />
          <MDSIcon.ArrowLeft variant="border" {...rest} />
          <MDSIcon.ArrowLeft variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>ArrowRight</MDSTypography>
          <MDSIcon.ArrowRight variant="outline" {...rest} />
          <MDSIcon.ArrowRight variant="border" {...rest} />
          <MDSIcon.ArrowRight variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>ArrowUp</MDSTypography>
          <MDSIcon.ArrowUp variant="outline" {...rest} />
          <MDSIcon.ArrowUp variant="border" {...rest} />
          <MDSIcon.ArrowUp variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>ArrowDown</MDSTypography>
          <MDSIcon.ArrowDown variant="outline" {...rest} />
          <MDSIcon.ArrowDown variant="border" {...rest} />
          <MDSIcon.ArrowDown variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>Check</MDSTypography>
          <MDSIcon.Check variant="outline" {...rest} />
          <MDSIcon.Check variant="border" {...rest} />
          <MDSIcon.Check variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>AddPlus</MDSTypography>
          <MDSIcon.AddPlus variant="outline" {...rest} />
          <MDSIcon.AddPlus variant="border" {...rest} />
          <MDSIcon.AddPlus variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>Minus</MDSTypography>
          <MDSIcon.Minus variant="outline" {...rest} />
          <MDSIcon.Minus variant="border" {...rest} />
          <MDSIcon.Minus variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>CloseDelete</MDSTypography>
          <MDSIcon.CloseDelete variant="outline" {...rest} />
          <MDSIcon.CloseDelete variant="border" {...rest} />
          <MDSIcon.CloseDelete variant="fill" {...rest} />
        </IconItem>
        <IconItem>
          <MDSTypography>Flag</MDSTypography>
          <MDSIcon.Flag variant="outline" {...rest} />
          <MDSIcon.Flag variant="border" {...rest} />
          <MDSIcon.Flag variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>Help</MDSTypography>
          <MDSIcon.Help variant="outline" {...rest} />
          <MDSIcon.Help variant="border" {...rest} />
          <MDSIcon.Help variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>ErrorWarning</MDSTypography>
          <MDSIcon.ErrorWarning variant="outline" {...rest} />
          <MDSIcon.ErrorWarning variant="border" {...rest} />
          <MDSIcon.ErrorWarning variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>Priority</MDSTypography>
          <MDSIcon.Priority variant="outline" {...rest} />
          <MDSIcon.Priority variant="border" {...rest} />
          <MDSIcon.Priority variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>Info</MDSTypography>
          <MDSIcon.Info variant="border" {...rest} />
          <MDSIcon.Info variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>Send</MDSTypography>
          <MDSIcon.Send variant="outline" {...rest} />
          <MDSIcon.Send variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>HourglassDelay</MDSTypography>
          <MDSIcon.HourglassDelay variant="outline" {...rest} />
          <MDSIcon.HourglassDelay variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>View</MDSTypography>
          <MDSIcon.View variant="outline" {...rest} />
          <MDSIcon.View variant="fill" {...rest} />
        </IconItem>

        <IconItem>
          <MDSTypography>Cards</MDSTypography>
          <MDSIcon.Cards variant="outline" {...rest} />
          <MDSIcon.Cards variant="fill" {...rest} />
        </IconItem>



        <IconItem>
          <MDSTypography>EyesVisibility</MDSTypography>
          {/* @ts-ignore */}
          <MDSIcon.EyesVisibility variant="on" {...rest} />
          {/* @ts-ignore */}
          <MDSIcon.EyesVisibility variant="off" {...rest} />
        </IconItem>






        <IconItem>
          <MDSTypography>Cards</MDSTypography>
          <MDSIcon.Cards variant="outline" {...rest} />
          <MDSIcon.Cards variant="fill" {...rest} />
        </IconItem>

      </IconGrid>
    </>
  );
};
