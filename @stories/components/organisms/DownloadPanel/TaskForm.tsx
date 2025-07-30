import { useState } from 'react';
import { MDSTypography, MDSInput, MDSDropdown, MDSButton, MDSCheckbox } from '../../../../components';

type TaskFileType = 'csv' | 'pdf' | 'ppt' | 'zip' | 'doc';
type TaskStatus = 'prepare' | 'processing' | 'completed' | 'failed' | 'removed';

export type NewTask = {
  taskId: number;
  fileName: string;
  fileType: TaskFileType;
  progress: number;
  status: TaskStatus;
  onClick?: (taskId: number) => void;
};

type FormData = {
  fileName: string;
  fileType: TaskFileType;
  progress: number;
  status: TaskStatus;
  hasOnClick: boolean;
};

type TaskFormProps = {
  onAddTask: (task: Omit<NewTask, 'taskId'>) => void;
  onClickHandler?: (taskId: number) => void;
};

const initialFormData: FormData = {
  fileName: '',
  fileType: 'csv',
  progress: 0,
  status: 'prepare',
  hasOnClick: false,
};

export const TaskForm = ({ onAddTask, onClickHandler }: TaskFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddTask = () => {
    const newTask = {
      fileName: `${formData.fileName}.${formData.fileType}`,
      fileType: formData.fileType,
      progress: formData.progress,
      status: formData.status,
      onClick: formData.hasOnClick ? onClickHandler : undefined,
    };

    onAddTask(newTask);

    // 폼 초기화
    setFormData(initialFormData);
  };

  const isReadyToAddTask =
    formData.fileName.trim() && formData.fileType && typeof formData.progress === 'number' && formData.status;

  return (
    <div style={{ marginTop: '16px' }}>
      <MDSTypography variant="title">새로운 Task 추가</MDSTypography>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
        <div>
          <MDSTypography variant="body">파일명</MDSTypography>
          <MDSInput
            value={formData.fileName}
            onChange={(value) => updateFormData('fileName', value)}
            placeholder="파일명을 입력하세요"
          />
        </div>

        <div>
          <MDSTypography variant="body">파일 타입</MDSTypography>
          <MDSDropdown
            list={[
              { label: 'CSV', value: 'csv' },
              { label: 'PDF', value: 'pdf' },
              { label: 'PPT', value: 'ppt' },
              { label: 'ZIP', value: 'zip' },
              { label: 'DOC', value: 'doc' },
            ]}
            value={formData.fileType}
            onChange={(value) => updateFormData('fileType', value)}
            renderAnchor={(value, selectedValue, list) => <MDSInput variant="select" list={list} value={value} />}
          />
        </div>

        <div>
          <MDSTypography variant="body">진행률 (%)</MDSTypography>
          <MDSInput
            value={formData.progress.toString()}
            onChange={(value) => updateFormData('progress', Math.min(100, Math.max(0, parseInt(value) || 0)))}
            placeholder="0-100"
          />
        </div>

        <div>
          <MDSTypography variant="body">상태</MDSTypography>
          <MDSDropdown
            list={[
              { label: 'prepare', value: 'prepare' },
              { label: 'processing', value: 'processing' },
              { label: 'completed', value: 'completed' },
              { label: 'failed', value: 'failed' },
              { label: 'removed', value: 'removed' },
            ]}
            value={formData.status}
            onChange={(value) => updateFormData('status', value)}
            renderAnchor={(value, selectedValue, list) => <MDSInput variant="select" list={list} value={value} />}
          />
        </div>

        <MDSTypography as="label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MDSCheckbox value={formData.hasOnClick} onChange={(value) => updateFormData('hasOnClick', value)} />
          클릭 가능한 Task로 설정
        </MDSTypography>

        <MDSButton color="blue" size="large" onClick={handleAddTask} isDisabled={!isReadyToAddTask}>
          Task 추가
        </MDSButton>
      </div>
    </div>
  );
};
