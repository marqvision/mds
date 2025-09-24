import { useRef, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';
import dayjs, { Dayjs } from 'dayjs';
import { MDSDateRangePicker } from '../../../../components/organisms/DatePickers/DateRangePicker';
import { MDSIcon, MDSSegmentedButton } from '../../../../components';
import { MDSSegmentedButtonProps } from '../../../../components/molecules/SegmentedButton/@types';

const meta: Meta<typeof MDSDateRangePicker> = {
  component: MDSDateRangePicker,
  title: '2. Components/organisms/DatePickers/DateRangePicker',
  parameters: {
    docs: {
      story: {
        layout: 'center',
      },
    },
  },
  args: {
    value: {
      startDate: dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().add(8, 'day').format('YYYY-MM-DD'),
    },
    format: 'MM/DD/YYYY',
    minDate: dayjs().subtract(50, 'day').format('YYYY-MM-DD'),
    maxDate: dayjs().add(50, 'day').format('YYYY-MM-DD'),
  },
  argTypes: {
    format: {
      control: 'select',
      options: ['MM/DD/YYYY', 'YYYY-MM-DD', 'MMM DD, YYYY'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSDateRangePicker>;

const testGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const dataBoxLayout = css`
  display: flex;
  gap: 24px;
`;
const dataBoxStyle = css`
  border: 1px solid lightgray;
  padding: 20px;
  border-radius: 10px;
  width: 320px;
  display: grid;
  gap: 12px;
`;

export const AnchorInput: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<{ startDate: string; endDate: string } | undefined>(args.value);
    const handleChange = (dates?: { startDate: string; endDate: string }) => {
      console.log('dates', dates);
      setDate(dates);
    };

    return (
      <MDSDateRangePicker
        anchor={{
          variant: 'input',
          format: args.format,
        }}
        value={date}
        format={args.format}
        minDate={args.minDate}
        maxDate={args.maxDate}
        onChange={handleChange}
      />
    );
  },
};

export const AnchorFilter: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<{ startDate: string; endDate: string } | undefined>(args.value);
    const handleChange = (dates?: { startDate: string; endDate: string }) => {
      console.log('dates', dates);
      setDate(dates);
    };

    return (
      <MDSDateRangePicker
        anchor={{
          variant: 'filter',
          format: args.format,
        }}
        value={date}
        format={args.format}
        minDate={args.minDate}
        maxDate={args.maxDate}
        onChange={handleChange}
      />
    );
  },
};

export const AnchorPlainButton: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<{ startDate: string; endDate: string } | undefined>(args.value);
    const handleChange = (dates?: { startDate: string; endDate: string }) => {
      console.log('dates', dates);
      setDate(dates);
    };

    return (
      <MDSDateRangePicker
        anchor={{
          variant: 'plainButton',
          format: args.format,
        }}
        value={date}
        format={args.format}
        minDate={args.minDate}
        maxDate={args.maxDate}
        onChange={handleChange}
      />
    );
  },
};

export const AnchorCustom: Story = {
  render: function Render(args) {
    const [date, setDate] = useState<{ startDate: string; endDate: string } | undefined>(args.value);
    const handleChange = (dates?: { startDate: string; endDate: string }) => {
      console.log('dates', dates);
      setDate(dates);
    };
    return (
      <>
        <MDSDateRangePicker
          anchor={{
            variant: 'custom',
            children: ({ selectedDates }) => (
              <div style={{ border: '1px solid lightgray', padding: '10px', width: 'fit-content' }}>
                <div>🚧 In progress - function style</div>
                <div>selectedDates: {JSON.stringify(selectedDates)}</div>
              </div>
            ),
          }}
          value={date}
          format={args.format}
          minDate={args.minDate}
          maxDate={args.maxDate}
          onChange={handleChange}
        />
        {/* 
          
            이 타입으로 하면 성능 이슈가 있는데 왜 그런지 모르겠다 ㅠㅠ
          <MDSDateRangePicker
            anchor={{
              variant: 'custom',
              children: (
                <div style={{ border: '1px solid lightgray', padding: '10px', width: 'fit-content' }}>
                  🚧 In progress - component style
                </div>
              ),
            }}
          /> */}
      </>
    );
  },
};

type DateButtonType = 'custom' | '30d' | '3m' | '6m' | '1y' | 'all';
const DATE_FILTERS: Record<
  DateButtonType,
  MDSSegmentedButtonProps<DateButtonType>['list'][number] & { startDate?: Dayjs }
> = {
  ['custom']: { label: 'Custom', value: 'custom' },
  ['30d']: {
    label: '30D',
    value: '30d',
    startDate: dayjs().subtract(30, 'd'),
  },
  ['3m']: {
    label: '3M',
    value: '3m',
    startDate: dayjs().subtract(3, 'M'),
  },
  ['6m']: {
    label: '6M',
    value: '6m',
    startDate: dayjs().subtract(6, 'M'),
  },
  ['1y']: {
    label: '1Y',
    value: '1y',
    startDate: dayjs().subtract(1, 'y'),
  },
  ['all']: { label: 'All', value: 'all' },
};
const DATE_OPTIONS = Object.values(DATE_FILTERS);
export const WithSegmentedButton: Story = {
  render: function Render(args) {
    const [selected, setSelected] = useState<{
      date?: { startDate: string; endDate: string };
      datePreset: DateButtonType;
    }>({
      date: undefined,
      datePreset: 'custom',
    });

    const dateRangePickerRef = useRef<{ onClick: () => void }>(null);

    const handleChange = (value: DateButtonType) => {
      switch (value) {
        case 'custom':
          dateRangePickerRef.current?.onClick();
          setSelected((prev) => ({ date: prev.date, datePreset: value }));
          break;
        case 'all':
          setSelected({
            date: {
              startDate: dayjs().format('YYYY-MM-DD'),
              endDate: dayjs().add(500, 'day').format('YYYY-MM-DD'),
            },
            datePreset: value,
          });

          break;
        case '30d':
        case '3m':
        case '6m':
        case '1y':
          setSelected({
            date: {
              startDate: DATE_FILTERS[value].startDate?.format('YYYY-MM-DD') || '',
              endDate: dayjs().format('YYYY-MM-DD'),
            },
            datePreset: value,
          });
          break;
      }
    };

    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        <MDSSegmentedButton
          variant="border"
          type="hug"
          list={DATE_OPTIONS}
          value={selected.datePreset}
          onChange={handleChange}
          selectedIcon={<MDSIcon.Check variant="outline" />}
        />
        
        <MDSDateRangePicker
          anchor={{ variant: 'input', format: args.format }}
          value={selected.date}
          format={args.format}
          ref={dateRangePickerRef}
          onChange={args.onChange}
        />
      </div>
    );
  },
};

// export const AnchorFilter: Story = {
//   render: function Render() {
//     const DEFAULT_VALUE = {
//       format: 'MM/DD/YYYY',
//       minDate: '06/02/2025', //'2025-06-02',
//       maxDate: '07/02/2025', //'2025-07-02',
//     };
//     const [selectedDate, setSelectedDate] = useState<{
//       startDate: Date | null;
//       endDate: Date | null;
//     }>({
//       startDate: null,
//       endDate: null,
//     });
//     const [tempDateRangeInput, setTempDateRangeInput] = useState<{ start: string; end: string }>({
//       start: '',
//       end: '',
//     });
//     const [dateFromMDSDateRangePicker, setDateFromMDSDateRangePicker] = useState<{ start: string; end: string }>({
//       start: '',
//       end: '',
//     });
//     const handleChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
//       setSelectedDate(dates);
//       setDateFromMDSDateRangePicker({
//         start: dayjs(dates.startDate).format(DEFAULT_VALUE.format),
//         end: dayjs(dates.endDate).format(DEFAULT_VALUE.format),
//       });
//     };

//     return (
//       <MDSDateRangePicker
//         anchor={{
//           variant: 'button',
//           format: 'MMM DD, YYYY',
//           separator: ' ~ ',
//           props: {
//             children: 'Button',
//           },
//         }}
//         startDate={{
//           value: selectedDate.startDate ? dayjs(selectedDate.startDate).format(DEFAULT_VALUE.format) : undefined,
//         }}
//         endDate={{
//           value: selectedDate.endDate ? dayjs(selectedDate.endDate).format(DEFAULT_VALUE.format) : undefined,
//         }}
//         format={DEFAULT_VALUE.format as MDSDateRangePickerProps['format']}
//         minDate={dayjs(DEFAULT_VALUE.minDate).toDate()}
//         maxDate={dayjs(DEFAULT_VALUE.maxDate).toDate()}
//         onChange={handleChange}
//       />
//     );
//   },
// };

// export const AnchorPlainButton: Story = {
//   render: function Render() {
//     return (
//       <MDSDateRangePicker
//         anchor={{
//           variant: 'plainButton',
//           format: 'MMM DD, YYYY',
//           separator: ' ~ ',
//           props: {
//             children: 'Button',
//           },
//         }}
//         startDate={{
//           value: selectedDate.startDate ? dayjs(selectedDate.startDate).format(DEFAULT_VALUE.format) : undefined,
//         }}
//         endDate={{
//           value: selectedDate.endDate ? dayjs(selectedDate.endDate).format(DEFAULT_VALUE.format) : undefined,
//         }}
//         format={DEFAULT_VALUE.format as MDSDateRangePickerProps['format']}
//         minDate={dayjs(DEFAULT_VALUE.minDate).toDate()}
//         maxDate={dayjs(DEFAULT_VALUE.maxDate).toDate()}
//         onChange={handleChange}
//       />
//     );
//   },
// };

// export const AnchorCustom: Story = {
//   render: function Render() {
//     return (
//       <div css={testGroupStyle}>
//         <div>
//           <MDSDateRangePicker
//             anchor={{
//               variant: 'custom',
//               children: ({ open, close, selectedDates }) => (
//                 <div onClick={open}>
//                   <div>🚧 In progress - function style</div>
//                   <div>selectedDates: {JSON.stringify(selectedDates)}</div>
//                 </div>
//               ),
//             }}
//           />
//         </div>
//         <div>
//           <MDSDateRangePicker
//             anchor={{
//               variant: 'custom',
//               children: <div>🚧 In progress - component style</div>,
//             }}
//           />
//         </div>
//       </div>
//     );
//   },
// };

// // export const AnchorInput: Story = {
// //   render: function Render() {
// //     const DEFAULT_VALUE = {
// //       format: 'MM/DD/YYYY',
// //       startDate: {
// //         value: '05/11/2025',
// //       },
// //       endDate: {
// //         value: '06/25/2025',
// //       },
// //       anchor: {
// //         variant: 'input',
// //         format: 'MM/DD/YYYY',
// //         separator: 'to',
// //         startDateProps: {
// //           label: 'Start date label'
// //         }
// //       } as MDSDateRangePickerProps['anchor'],
// //       minDate: '05/02/2025', //'2025-06-02',
// //       maxDate: '07/02/2025', //'2025-07-02',
// //     };
// //     const [selectedDate, setSelectedDate] = useState<{
// //       startDate: Date | null;
// //       endDate: Date | null;
// //     }>({
// //       startDate: dayjs(DEFAULT_VALUE.startDate.value).toDate(),
// //       endDate: dayjs(DEFAULT_VALUE.endDate.value).toDate(),
// //     });
// //     const [tempDateRangeInput, setTempDateRangeInput] = useState<{ start: string; end: string }>({
// //       start: '',
// //       end: '',
// //     });
// //     const [dateFromMDSDateRangePicker, setDateFromMDSDateRangePicker] = useState<{ start: string; end: string }>({
// //       start: '',
// //       end: '',
// //     });
// //     const handleChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
// //       setSelectedDate(dates);
// //       setDateFromMDSDateRangePicker({
// //         start: dayjs(dates.startDate).format(DEFAULT_VALUE.format),
// //         end: dayjs(dates.endDate).format(DEFAULT_VALUE.format),
// //       });
// //     };

// //     return (
// //       <div css={testGroupStyle}>
// //         <div css={dataBoxLayout}>
// //           <div css={dataBoxStyle}>
// //             <MDSTypography variant="title" size="m">
// //               외부 값 주입을 위한 컴포넌트
// //             </MDSTypography>
// //             <MDSInput
// //               fullWidth
// //               value={tempDateRangeInput.start}
// //               label="start date"
// //               placeholder={DEFAULT_VALUE.format}
// //               custom={{
// //                 add: {
// //                   label: '완료',
// //                   onSubmit: (value) => {
// //                     setSelectedDate({ ...selectedDate, startDate: dayjs(value).toDate() });
// //                   },
// //                 },
// //               }}
// //               onChange={(value) => {
// //                 setTempDateRangeInput({ ...tempDateRangeInput, start: value });
// //               }}
// //             />
// //             <MDSInput
// //               fullWidth
// //               value={tempDateRangeInput.end}
// //               label="end date"
// //               placeholder={DEFAULT_VALUE.format}
// //               custom={{
// //                 add: {
// //                   label: '완료',
// //                   onSubmit: (value) => {
// //                     setSelectedDate({ ...selectedDate, endDate: dayjs(value).toDate() });
// //                   },
// //                 },
// //               }}
// //               onChange={(value) => {
// //                 setTempDateRangeInput({ ...tempDateRangeInput, end: value });
// //               }}
// //             />
// //           </div>
// //           <div css={dataBoxStyle}>
// //             <MDSTypography variant="title" size="m">
// //               props
// //             </MDSTypography>
// //             <div>
// //               <pre>{JSON.stringify(DEFAULT_VALUE, null, 2)}</pre>
// //             </div>
// //           </div>
// //           <div css={dataBoxStyle}>
// //             <MDSTypography variant="title" size="m">
// //               결과
// //             </MDSTypography>
// //             <MDSTypography>startDate: {dateFromMDSDateRangePicker.start}</MDSTypography>
// //             <MDSTypography>endDate: {dateFromMDSDateRangePicker.end}</MDSTypography>
// //           </div>
// //         </div>
// //         <div>
// //           <MDSDateRangePicker
// //             anchor={{
// //               variant: 'input',
// //               format: 'MM/DD/YYYY',
// //               separator: 'to',
// //             }}
// //             startDate={{
// //               value: selectedDate.startDate ? dayjs(selectedDate.startDate).format(DEFAULT_VALUE.format) : undefined,
// //               label: 'Start date',
// //             }}
// //             endDate={{
// //               value: selectedDate.endDate ? dayjs(selectedDate.endDate).format(DEFAULT_VALUE.format) : undefined,
// //               label: 'End date',
// //             }}
// //             format={DEFAULT_VALUE.format as MDSDateRangePickerProps['format']}
// //             minDate={dayjs(DEFAULT_VALUE.minDate).toDate()}
// //             maxDate={dayjs(DEFAULT_VALUE.maxDate).toDate()}
// //             onChange={handleChange}
// //           />
// //         </div>

// //         <MDSDivider style={{ margin: '24px 0' }} />

// //         <div css={dataBoxStyle}>
// //           <MDSTypography variant="title" size="m">
// //             Start date label만 있을 때
// //           </MDSTypography>
// //           <MDSDateRangePicker
// //             anchor={DEFAULT_VALUE.anchor}
// //             startDate={{
// //               value: selectedDate.startDate ? dayjs(selectedDate.startDate).format(DEFAULT_VALUE.format) : undefined,
// //               label: 'Start date',
// //             }}
// //             endDate={{
// //               value: selectedDate.endDate ? dayjs(selectedDate.endDate).format(DEFAULT_VALUE.format) : undefined,
// //             }}
// //             format={DEFAULT_VALUE.format as MDSDateRangePickerProps['format']}
// //             minDate={dayjs(DEFAULT_VALUE.minDate).toDate()}
// //             maxDate={dayjs(DEFAULT_VALUE.maxDate).toDate()}
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <div css={dataBoxStyle}>
// //           <MDSTypography variant="title" size="m">
// //             label이 없을 때
// //           </MDSTypography>
// //           <MDSDateRangePicker
// //             anchor={{
// //               variant: 'input',
// //               format: 'MM/DD/YYYY',
// //               separator: 'to',
// //             }}
// //             startDate={{
// //               value: selectedDate.startDate ? dayjs(selectedDate.startDate).format(DEFAULT_VALUE.format) : undefined,
// //             }}
// //             endDate={{
// //               value: selectedDate.endDate ? dayjs(selectedDate.endDate).format(DEFAULT_VALUE.format) : undefined,
// //             }}
// //             format={DEFAULT_VALUE.format as MDSDateRangePickerProps['format']}
// //             minDate={dayjs(DEFAULT_VALUE.minDate).toDate()}
// //             maxDate={dayjs(DEFAULT_VALUE.maxDate).toDate()}
// //             onChange={handleChange}
// //           />
// //         </div>
// //       </div>
// //     );
// //   },
// // };

// // export const AnchorButton: Story = {
// //   render: function Render() {
// //     const DEFAULT_VALUE = {
// //       format: 'MM/DD/YYYY',
// //       minDate: '06/02/2025', //'2025-06-02',
// //       maxDate: '07/02/2025', //'2025-07-02',
// //     };
// //     const [selectedDate, setSelectedDate] = useState<{
// //       startDate: Date | null;
// //       endDate: Date | null;
// //     }>({
// //       startDate: null,
// //       endDate: null,
// //     });
// //     const [tempDateRangeInput, setTempDateRangeInput] = useState<{ start: string; end: string }>({
// //       start: '',
// //       end: '',
// //     });
// //     const [dateFromMDSDateRangePicker, setDateFromMDSDateRangePicker] = useState<{ start: string; end: string }>({
// //       start: '',
// //       end: '',
// //     });
// //     const handleChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
// //       setSelectedDate(dates);
// //       setDateFromMDSDateRangePicker({
// //         start: dayjs(dates.startDate).format(DEFAULT_VALUE.format),
// //         end: dayjs(dates.endDate).format(DEFAULT_VALUE.format),
// //       });
// //     };

// //     return (
// //       <div css={testGroupStyle}>
// //         <div css={dataBoxLayout}>
// //           <div css={dataBoxStyle}>
// //             <MDSTypography variant="title" size="m">
// //               외부 값 주입을 위한 컴포넌트
// //             </MDSTypography>
// //             <MDSInput
// //               fullWidth
// //               value={tempDateRangeInput.start}
// //               label="start date"
// //               placeholder={DEFAULT_VALUE.format}
// //               custom={{
// //                 add: {
// //                   label: '완료',
// //                   onSubmit: (value) => {
// //                     setSelectedDate({ ...selectedDate, startDate: dayjs(value).toDate() });
// //                   },
// //                 },
// //               }}
// //               onChange={(value) => {
// //                 setTempDateRangeInput({ ...tempDateRangeInput, start: value });
// //               }}
// //             />
// //             <MDSInput
// //               fullWidth
// //               value={tempDateRangeInput.end}
// //               label="end date"
// //               placeholder={DEFAULT_VALUE.format}
// //               custom={{
// //                 add: {
// //                   label: '완료',
// //                   onSubmit: (value) => {
// //                     setSelectedDate({ ...selectedDate, endDate: dayjs(value).toDate() });
// //                   },
// //                 },
// //               }}
// //               onChange={(value) => {
// //                 setTempDateRangeInput({ ...tempDateRangeInput, end: value });
// //               }}
// //             />
// //           </div>
// //           <div css={dataBoxStyle}>
// //             <MDSTypography variant="title" size="m">
// //               props
// //             </MDSTypography>
// //             <div>
// //               <pre>{JSON.stringify(DEFAULT_VALUE, null, 2)}</pre>
// //             </div>
// //           </div>
// //           <div css={dataBoxStyle}>
// //             <MDSTypography variant="title" size="m">
// //               결과
// //             </MDSTypography>
// //             <MDSTypography>startDate: {dateFromMDSDateRangePicker.start}</MDSTypography>
// //             <MDSTypography>endDate: {dateFromMDSDateRangePicker.end}</MDSTypography>
// //           </div>
// //         </div>
// //         <div>
// //           <MDSDateRangePicker
// //             anchor={{
// //               variant: 'button',
// //               format: 'MMM DD, YYYY',
// //               separator: ' ~ ',
// //               props: {
// //                 children: 'Button',
// //               },
// //             }}
// //             startDate={{
// //               value: selectedDate.startDate ? dayjs(selectedDate.startDate).format(DEFAULT_VALUE.format) : undefined,
// //             }}
// //             endDate={{
// //               value: selectedDate.endDate ? dayjs(selectedDate.endDate).format(DEFAULT_VALUE.format) : undefined,
// //             }}
// //             format={DEFAULT_VALUE.format as MDSDateRangePickerProps['format']}
// //             minDate={dayjs(DEFAULT_VALUE.minDate).toDate()}
// //             maxDate={dayjs(DEFAULT_VALUE.maxDate).toDate()}
// //             onChange={handleChange}
// //           />
// //         </div>
// //       </div>
// //     );
// //   },
// // };

// // export const AnchorPlainButton: Story = {
// //   render: function Render() {
// //     const DEFAULT_VALUE = {
// //       format: 'MM/DD/YYYY',
// //       startDate: '04/11/2025',
// //       endDate: '05/25/2025',
// //       minDate: '05/02/2025', //'2025-06-02',
// //       maxDate: '07/02/2025', //'2025-07-02',
// //     };
// //     const [selectedDate, setSelectedDate] = useState<{
// //       startDate: Date | null;
// //       endDate: Date | null;
// //     }>({
// //       startDate: dayjs(DEFAULT_VALUE.startDate).toDate(),
// //       endDate: dayjs(DEFAULT_VALUE.endDate).toDate(),
// //     });
// //     const [tempDateRangeInput, setTempDateRangeInput] = useState<{ start: string; end: string }>({
// //       start: '',
// //       end: '',
// //     });
// //     const [dateFromMDSDateRangePicker, setDateFromMDSDateRangePicker] = useState<{ start: string; end: string }>({
// //       start: '',
// //       end: '',
// //     });
// //     const handleChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
// //       setSelectedDate(dates);
// //       setDateFromMDSDateRangePicker({
// //         start: dayjs(dates.startDate).format(DEFAULT_VALUE.format),
// //         end: dayjs(dates.endDate).format(DEFAULT_VALUE.format),
// //       });
// //     };

// //     return (
// //       <div css={testGroupStyle}>
// //         <div css={dataBoxLayout}>
// //           <div css={dataBoxStyle}>
// //             <MDSTypography variant="title" size="m">
// //               외부 값 주입을 위한 컴포넌트
// //             </MDSTypography>
// //             <MDSInput
// //               fullWidth
// //               value={tempDateRangeInput.start}
// //               label="start date"
// //               placeholder={DEFAULT_VALUE.format}
// //               custom={{
// //                 add: {
// //                   label: '완료',
// //                   onSubmit: (value) => {
// //                     setSelectedDate({ ...selectedDate, startDate: dayjs(value).toDate() });
// //                   },
// //                 },
// //               }}
// //               onChange={(value) => {
// //                 setTempDateRangeInput({ ...tempDateRangeInput, start: value });
// //               }}
// //             />
// //             <MDSInput
// //               fullWidth
// //               value={tempDateRangeInput.end}
// //               label="end date"
// //               placeholder={DEFAULT_VALUE.format}
// //               custom={{
// //                 add: {
// //                   label: '완료',
// //                   onSubmit: (value) => {
// //                     setSelectedDate({ ...selectedDate, endDate: dayjs(value).toDate() });
// //                   },
// //                 },
// //               }}
// //               onChange={(value) => {
// //                 setTempDateRangeInput({ ...tempDateRangeInput, end: value });
// //               }}
// //             />
// //           </div>
// //           <div css={dataBoxStyle}>
// //             <MDSTypography variant="title" size="m">
// //               props
// //             </MDSTypography>
// //             <div>
// //               <pre>{JSON.stringify(DEFAULT_VALUE, null, 2)}</pre>
// //             </div>
// //           </div>
// //           <div css={dataBoxStyle}>
// //             <MDSTypography variant="title" size="m">
// //               결과
// //             </MDSTypography>
// //             <MDSTypography>startDate: {dateFromMDSDateRangePicker.start}</MDSTypography>
// //             <MDSTypography>endDate: {dateFromMDSDateRangePicker.end}</MDSTypography>
// //           </div>
// //         </div>
// //         <div>
// //           <MDSDateRangePicker
// //             anchor={{
// //               variant: 'plainButton',
// //               format: 'MMM DD, YYYY',
// //               separator: ' ~ ',
// //               props: {
// //                 children: 'Button',
// //               },
// //             }}
// //             startDate={{
// //               value: selectedDate.startDate ? dayjs(selectedDate.startDate).format(DEFAULT_VALUE.format) : undefined,
// //             }}
// //             endDate={{
// //               value: selectedDate.endDate ? dayjs(selectedDate.endDate).format(DEFAULT_VALUE.format) : undefined,
// //             }}
// //             format={DEFAULT_VALUE.format as MDSDateRangePickerProps['format']}
// //             minDate={dayjs(DEFAULT_VALUE.minDate).toDate()}
// //             maxDate={dayjs(DEFAULT_VALUE.maxDate).toDate()}
// //             onChange={handleChange}
// //           />
// //         </div>
// //       </div>
// //     );
// //   },
// // };

// // export const AnchorCustom: Story = {
// //   render: function Render() {
// //     return (
// //       <div css={testGroupStyle}>
// //         <div>
// //           <MDSDateRangePicker
// //             anchor={{
// //               variant: 'custom',
// //               children: ({ open, close, selectedDates }) => (
// //                 <div onClick={open}>
// //                   <div>🚧 In progress - function style</div>
// //                   <div>selectedDates: {JSON.stringify(selectedDates)}</div>
// //                 </div>
// //               ),
// //             }}
// //           />
// //         </div>
// //         <div>
// //           <MDSDateRangePicker
// //             anchor={{
// //               variant: 'custom',
// //               children: <div>🚧 In progress - component style</div>,
// //             }}
// //           />
// //         </div>
// //       </div>
// //     );
// //   },
// // };
