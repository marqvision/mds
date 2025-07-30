import { useState } from 'react';
import { MDSThemeColorPath } from '../../../../types';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSLoadingIndicator } from '../../../molecules/LoadingIndicator';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { MDSTooltip } from '../../../molecules/Tooltip';
import { Task } from '../@types';
import { Styles } from '../styles';

const READY_STATUS_COLOR = 'color/content/neutral/default/disabled';
const FAILED_STATUS_COLOR = 'color/content/critical/default/normal';
const COMPLETED_STATUS_COLOR = 'color/content/success/default/normal';

const FileIcon = (props: Pick<Task, 'status' | 'fileType'>) => {
  const { status, fileType } = props;
  switch (fileType) {
    case 'csv':
      return (
        <MDSIcon.ExcelSheet
          color={status === 'prepare' ? READY_STATUS_COLOR : 'color/content/success/default/normal'}
          size={20}
        />
      );
    case 'pdf':
      return (
        <MDSIcon.Pdf
          variant="fill"
          color={status === 'prepare' ? READY_STATUS_COLOR : 'color/content/neutral/default/normal'}
          size={20}
        />
      );
    case 'ppt':
      return (
        <MDSIcon.Ppt
          variant="fill"
          color={status === 'prepare' ? READY_STATUS_COLOR : 'color/content/critical/default/normal'}
          size={20}
        />
      );
    case 'zip':
      return (
        <MDSIcon.Archive
          variant="fill"
          color={status === 'prepare' ? READY_STATUS_COLOR : 'color/content/neutral/default/normal'}
          size={20}
        />
      );
    case 'doc':
      return (
        <MDSIcon.Document
          variant="outline"
          color={status === 'prepare' ? READY_STATUS_COLOR : 'color/content/neutral/default/normal'}
          size={20}
        />
      );
    default:
      return null;
  }
};

// note-@jamie: file name 영역에 대해 추가 요청 사항이 나오면, 그냥 전반적으로 file name prop 영역에 react element를 넣을 수 있는 형태로 재구현하기
const FileName = (props: Pick<Task, 'status' | 'fileName'> & { onClick?: () => void }) => {
  const { status, fileName } = props;
  const color: MDSThemeColorPath = status === 'prepare' ? READY_STATUS_COLOR : 'color/content/neutral/default/normal';

  const hasClickEvent = typeof props.onClick === 'function';
  const activeClickEvent = status === 'completed' && hasClickEvent;

  const [isHovered, setIsHovered] = useState(false);
  const supportClickEventProps = activeClickEvent
    ? {
        style: { cursor: 'pointer' },
        textDecoration: isHovered ? 'underline' : 'none',
        onClick: props.onClick,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
      }
    : {};

  return fileName.length > 40 ? (
    <MDSTooltip title={fileName} width="100%" size="small" style={{ marginBottom: 4 }}>
      <Styles.FileNameBox>
        <MDSTypography
          variant="body"
          size="m"
          weight={isHovered ? 'medium' : 'regular'}
          lineClamp={1}
          overflowWrap="break-word"
          wordBreak="break-all"
          color={color}
          {...supportClickEventProps}
        >
          {fileName}
        </MDSTypography>
        {hasClickEvent && <MDSIcon.OpenNew color={color} size={16} />}
      </Styles.FileNameBox>
    </MDSTooltip>
  ) : (
    <Styles.FileNameBox>
      <MDSTypography
        variant="body"
        size="m"
        weight={isHovered ? 'medium' : 'regular'}
        lineClamp={1}
        overflowWrap="break-word"
        wordBreak="break-all"
        color={color}
        {...supportClickEventProps}
      >
        {fileName}
      </MDSTypography>
      {hasClickEvent && <MDSIcon.OpenNew color={color} size={16} />}
    </Styles.FileNameBox>
  );
};
const ProgressIndicator = (props: Pick<Task, 'status' | 'progress'> & { onRemove: () => void }) => {
  const { status, progress, onRemove } = props;

  const toolTipTitle = status === 'processing' ? 'Cancel export' : status === 'completed' ? 'Remove' : 'Remove';
  const toolTipWidth = status === 'processing' ? '85px' : '97px';

  return (
    <Styles.ProgressIndicatorBox status={status}>
      <div className="progress-indicator-default">
        {status === 'prepare' || typeof progress !== 'number' ? (
          <MDSLoadingIndicator isDeterminate backgroundColor progress={0} size={20} />
        ) : status === 'processing' ? (
          <MDSLoadingIndicator isDeterminate backgroundColor progress={progress} size={20} />
        ) : status === 'completed' ? (
          <MDSIcon.Check variant="fill" color={COMPLETED_STATUS_COLOR} size={20} />
        ) : status === 'failed' ? (
          <MDSIcon.ErrorWarning variant="fill" color={FAILED_STATUS_COLOR} size={20} />
        ) : null}
      </div>
      <div className="progress-indicator-hover">
        <MDSTooltip title={toolTipTitle} width={toolTipWidth} popoverDelay={0} size="medium" style={{ textAlign: 'center' }}>
          <MDSPlainButton color="bluegray" icon={<MDSIcon.CloseDelete variant="fill" size={20} />} onClick={onRemove} />
        </MDSTooltip>
      </div>
    </Styles.ProgressIndicatorBox>
  );
};

type TaskItemProps = {
  task: Task;
  onRemove: (taskId: Task['taskId']) => void;
};
export const TaskItem = (props: TaskItemProps) => {
  const { task, onRemove } = props;
  const handleRemove = () => onRemove(task.taskId);
  const handleClick = task.onClick ? () => task.onClick?.(task.taskId) : undefined;

  return (
    <Styles.Item key={task.taskId}>
      <FileIcon fileType={task.fileType} status={task.status} />
      <FileName status={task.status} fileName={task.fileName} onClick={handleClick} />
      <ProgressIndicator status={task.status} progress={task.progress} onRemove={handleRemove} />
    </Styles.Item>
  );
};
