import { useState } from 'react';
import { MDSTypography, MDSInput, MDSDropdown, MDSDownloadPanelProps } from '../../../../components';

type PanelLabelData = MDSDownloadPanelProps['panel']['label']['status'];

type PanelLabelFormProps = {
  initialData: MDSDownloadPanelProps['panel']['label']['status'];
  onUpdate: (data: MDSDownloadPanelProps['panel']['label']) => void;
};

export const PanelLabelForm = ({ initialData, onUpdate }: PanelLabelFormProps) => {
  const [formData, setFormData] = useState<PanelLabelData>(initialData);

  const list = [
    { label: 'Preparing export', value: 'prepare' },
    { label: 'Exporting', value: 'processing' },
    { label: 'Export complete', value: 'completed' },
    { label: 'Export failed', value: 'failed' },
  ];

  const updateFormData = (value: PanelLabelData) => {
    setFormData(value);
    const title = list.find((item) => item.value === value)?.label || '';
    onUpdate({ title, status: value });
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <MDSTypography variant="title">Panel 설정</MDSTypography>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
        <div>
          <MDSTypography variant="body">상태</MDSTypography>
          <MDSDropdown
            list={list}
            value={formData}
            onChange={(value) => updateFormData(value)}
            renderAnchor={(value, selectedValue, list) => <MDSInput variant="select" list={list} value={value} />}
          />
        </div>
      </div>
    </div>
  );
};
