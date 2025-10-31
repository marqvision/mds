import { useCallback, useMemo, useRef} from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'storybook/preview-api';
import dayjs from 'dayjs';
import { MDSDateRangePicker } from '../../../../components/organisms/DatePickers/DateRangePicker';
import { MDSIcon, MDSPlainButton } from '../../../../components';
import {
  MDSDateRangeSegmentedButton,
  MDSDateRangeSegmentedButtonProps,
} from '../../../../components/organisms/DatePickers/DateRangeSegmentedButton';

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
    format: 'MMM DD, YYYY',
    minDate: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    maxDate: dayjs().add(1, 'year').format('YYYY-MM-DD'),
  },
  argTypes: {
    format: {
      control: 'select',
      options: ['MM/DD/YYYY', 'YYYY-MM-DD', 'MMM DD, YYYY'],
    },
    minDate: {
      control: 'date',
    },
    maxDate: {
      control: 'date',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MDSDateRangePicker>;

export const AnchorInput: Story = {
  args: {
    ...meta.args,
    anchor: {
      variant: 'input',
      mdsInputProps: {
        label: 'Date range picker - input type',
        placeholder: 'PLACEHOLDER ',
      },
    },
  },
  render: function Render(args) {
    const [date, setDate] = useState<{ startDate: string; endDate: string } | undefined>(args.value);
    const handleChange = (dates?: { startDate: string; endDate: string }) => {
      console.log('dates', dates);
      setDate(dates);
    };

    const anchorProps = {
      ...args.anchor,
      format: args.format, // anchor 요소의 format과 DateRangePicker 내부의 format을 다르게 지정할 수 있음
    };

    return (
      <MDSDateRangePicker
        anchor={anchorProps}
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
  args: {
    ...meta.args,
    anchor: {
      variant: 'filter',
      mdsButtonProps: {
        children: 'Date range picker - filter type',
      },
    },
  },
  render: function Render(args) {
    const [date, setDate] = useState<{ startDate: string; endDate: string } | undefined>(args.value);
    const handleChange = (dates?: { startDate: string; endDate: string }) => {
      console.log('dates', dates);
      setDate(dates);
    };

    const anchorProps = {
      ...args.anchor,
      format: args.format, // anchor 요소의 format과 DateRangePicker 내부의 format을 다르게 지정할 수 있음
    };

    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        <MDSDateRangePicker
          anchor={anchorProps}
          value={date}
          format={args.format}
          minDate={args.minDate}
          maxDate={args.maxDate}
          onChange={handleChange}
        />
        {date && (
          <MDSPlainButton color="blue" startIcon={<MDSIcon.Reset />} onClick={() => setDate(undefined)}>
            Reset
          </MDSPlainButton>
        )}
      </div>
    );
  },
};

export const AnchorPlainButton: Story = {
  args: {
    ...meta.args,
    anchor: {
      variant: 'plainButton',
      mdsPlainButtonProps: {
        children: 'Date range picker - plain button type',
      },
    },
  },
  render: function Render(args) {
    const [date, setDate] = useState<{ startDate: string; endDate: string } | undefined>(args.value);
    const handleChange = (dates?: { startDate: string; endDate: string }) => {
      console.log('dates', dates);
      setDate(dates);
    };

    const anchorProps = {
      ...args.anchor,
      format: args.format, // anchor 요소의 format과 DateRangePicker 내부의 format을 다르게 지정할 수 있음
    };

    return (
      <MDSDateRangePicker
        anchor={anchorProps}
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
              // selectedDates는 언제나 YYYY-MM-DD 형식으로 온다.
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

//#region WithMDSDateRangeSegmentedButton > Segmented button 정의 값들
type PresetKey =
  | '10d'
  | '20d'
  | '30d'
  | '3m'
  | '6m'
  | '1y'
  | '10d'
  | 'user-input-1'
  | 'user-input-2'
  | 'user-input-3'
  | 'user-input-4';
type SegmentedProps = MDSDateRangeSegmentedButtonProps<PresetKey>;
type SegmentedPreset = SegmentedProps['list'][number];
type SegmentedValue = SegmentedPreset['value'];
const createDatePresets = (): SegmentedProps['list'] => [
  {
    label: 'Custom',
    value: 'custom',
  },
  {
    label: '30D',
    value: '30d',
  },
  {
    label: '3M',
    value: '3m',
  },
  {
    label: '6M',
    value: '6m',
  },
  {
    label: '1Y',
    value: '1y',
  },
  {
    label: '아무거나',
    value: '10d',
    resolveRange: () => ({
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(10, 'day').format('YYYY-MM-DD'),
    }),
  },
  {
    label: '입력하고 싶은',
    value: '20d',
    resolveRange: () => ({
      startDate: dayjs().subtract(20, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    }),
  },
  {
    label: '프리셋을',
    value: 'user-input-3',
    resolveRange: () => ({
      startDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().add(30, 'day').format('YYYY-MM-DD'),
    }),
  },
  {
    label: '만들어 넣으세요',
    value: 'user-input-4',
    resolveRange: () => ({
      startDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().add(40, 'day').format('YYYY-MM-DD'),
    }),
  },
];
//#endregion
export const WithMDSDateRangeSegmentedButton: Story = {
  render: function Render(args) {
    const [selected, setSelected] = useState<{
      date?: { startDate: string; endDate: string };
      datePreset: SegmentedValue;
    }>({
      date: { startDate: args.value?.startDate ?? '', endDate: args.value?.endDate ?? '' },
      datePreset: 'custom',
    });

    const dateRangePickerRef = useRef<{ onClick: () => void }>(null);
    const presets = useMemo(() => createDatePresets(), []);

    const handleSegmentedChange: SegmentedProps['onChange'] = useCallback((preset, dateRange) => {
      if (preset.value === 'custom') {
        dateRangePickerRef.current?.onClick();
        setSelected((prev) => ({
          date: prev.date,
          datePreset: preset.value,
        }));
        return;
      }

      setSelected({
        date: dateRange,
        datePreset: preset.value,
      });
    }, []);

    const handleDateRangeChange = useCallback(
      (dateRange?: { startDate: string; endDate: string }) => {
        setSelected({
          date: dateRange,
          datePreset: 'custom',
        });
        args.onChange?.(dateRange);
      },
      [args]
    );

    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        <MDSDateRangeSegmentedButton
          list={presets}
          value={selected.datePreset}
          onChange={handleSegmentedChange}
          selectedIcon={<MDSIcon.Check variant="outline" />}
        />
        <MDSDateRangePicker
          anchor={{ variant: 'input', format: args.format }}
          value={selected.date}
          format={args.format}
          ref={dateRangePickerRef}
          onChange={handleDateRangeChange}
        />
      </div>
    );
  },
};

// #region With External Value stories
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
// #endregion
