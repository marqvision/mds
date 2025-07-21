import { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { MDSButton, MDSDownloadPanel, MDSDownloadPanelTask, MDSTypography } from '../../../../components';
import { useMDSDownloadPanel } from '../../../../components/molecules/DownloadPanel/@hooks';

// #region mock api, generate random file name
type MockProgressResult = {
  progress: number;
  url: string | null;
  completed: boolean;
};
type MockCancelResult = {
  reason: string;
};
const STEP = 1;
const useMockProgressResultApi = () => {
  const mockProgressResult = useRef(new Map<number, MockProgressResult>());
  const startApi = (taskId: number) => {
    return new Promise<MockProgressResult>((resolve) => {
      if (!mockProgressResult.current.has(taskId)) {
        mockProgressResult.current.set(taskId, {
          progress: 0,
          url: null,
          completed: false,
        });
      }

      if (mockProgressResult.current.get(taskId)?.progress === 100) {
        resolve({
          progress: 100,
          url: 'done',
          completed: true,
        });
        return;
      }

      const nextProgress = {
        progress: (mockProgressResult.current.get(taskId)?.progress ?? 0) + STEP,
        url: null,
        completed: false,
      };
      mockProgressResult.current.set(taskId, nextProgress);
      resolve(nextProgress);
    });
  };
  const stopApi = (taskId: number) => {
    mockProgressResult.current.delete(taskId);
    return Promise.resolve({ reason: 'canceled' });
  };
  return {
    startApi,
    stopApi,
  };
};
// zip, csv, ppt, pdf 중 임의의 확장자를 반환하는 함수
function getRandomFileType(): MDSDownloadPanelTask['fileType'] {
  const types: Array<MDSDownloadPanelTask['fileType']> = ['zip', 'csv', 'ppt', 'pdf'];
  const idx = Math.floor(Math.random() * types.length);
  return types[idx];
}

// 임의의 zip, csv, ppt, pdf 파일 이름을 생성하는 함수
function getRandomFileName(fileType: MDSDownloadPanelTask['fileType']): string {
  const randomString = Math.random().toString(36).substring(2, 8);
  const now = new Date();
  const dateStr = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now
    .getDate()
    .toString()
    .padStart(2, '0')}`;
  let baseName = '';

  switch (fileType) {
    case 'zip':
      baseName = `archive_${dateStr}_${randomString}`;
      break;
    case 'csv':
      baseName = `data_export_${dateStr}_${randomString}`;
      break;
    case 'ppt':
      baseName = `presentation_${dateStr}_${randomString}`;
      break;
    case 'pdf':
      baseName = `document_${dateStr}_${randomString}`;
      break;
    default:
      baseName = `file_${dateStr}_${randomString}`;
  }
  return `${baseName}.${fileType}`;
}

// #endregion

const ProgressItem = styled.div`
  margin: 32px 0;
`;
const TaskItem = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;

  & div {
    padding: 16px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  & .zip {
    background-color: ${({ theme }) => theme.color.bg.surface.primary.default.normal};
  }
  & .csv {
    background-color: ${({ theme }) => theme.color.bg.surface.success.default.normal};
  }
  & .ppt {
    background-color: ${({ theme }) => theme.color.bg.surface.purple.default.normal};
  }
  & .pdf {
    background-color: ${({ theme }) => theme.color.bg.surface.teal.default.normal};
  }
`;

const AddPptExportTaskComponent = () => {
  const [localTaskMonitor, setLocalTaskMonitor] = useState<
    {
      taskId: number;
      fileName: string;
      fileType: MDSDownloadPanelTask['fileType'];
      taskStatus: 'ready' | 'processing' | 'completed' | 'failed' | 'removed';
      taskGroupKey: string;
      desc?: string;
    }[]
  >([]);
  const [nextFileType, setNextFileType] = useState<MDSDownloadPanelTask['fileType']>(getRandomFileType());

  // 사용하는 쪽의 컴포넌트에서 hook을 이용하여 task를 추가한다.
  const { addTask } = useMDSDownloadPanel();
  const { startApi, stopApi } = useMockProgressResultApi();

  const pollingFn = useCallback((task: MDSDownloadPanelTask) => {
    return startApi(task.taskId);
  }, []);
  const removeFn = useCallback(async (task: MDSDownloadPanelTask) => {
    return await stopApi(task.taskId);
  }, []);
  const onCompleted = useCallback((selectedTask: MDSDownloadPanelTask, res: MockProgressResult) => {
    console.log('>>>> onComplete callback', selectedTask.taskId);
    setLocalTaskMonitor((prev) =>
      prev.map((task) =>
        task.taskId === selectedTask.taskId ? { ...task, taskStatus: 'completed', desc: res?.url ?? '' } : task
      )
    );
  }, []);
  const onFailed = useCallback((selectedTask: MDSDownloadPanelTask, res: MockProgressResult) => {
    console.log('>>>> onFailed callback', selectedTask.taskId);
    setLocalTaskMonitor((prev) =>
      prev.map((task) =>
        task.taskId === selectedTask.taskId ? { ...task, taskStatus: 'failed', desc: res?.url ?? '' } : task
      )
    );
  }, []);
  const onRemoved = useCallback((selectedTask: MDSDownloadPanelTask, res: MockCancelResult) => {
    console.log('>>>> onRemoved callback', selectedTask.taskId, res);
    setLocalTaskMonitor((prev) =>
      prev.map((task) =>
        task.taskId === selectedTask.taskId ? { ...task, taskStatus: 'removed', desc: '취소' } : task
      )
    );
  }, []);

  const handleClick = (fileType: MDSDownloadPanelTask['fileType']) => {
    // 실제 케이스에서는 req api 의 response로 받은 progressId
    const taskId = new Date().getTime();

    const fileName = getRandomFileName(fileType);

    addTask<MockProgressResult, MockCancelResult, MockProgressResult>({
      taskId,
      fileName,
      fileType,
      taskGroupKey: `${fileType}-export-from-some-page`,
      pollingFn,
      removeFn,
      onCompleted,
      onRemoved,
      onFailed,
    });
    setLocalTaskMonitor((prev) => [
      ...prev,
      {
        taskId,
        fileName,
        fileType,
        taskStatus: 'ready',
        taskGroupKey: `${fileType}-export-from-some-page`,
        desc: '준비',
      },
    ]);
    setNextFileType(getRandomFileType());
  };

  return (
    <div>
      <MDSButton variant="tint" size="medium" color="bluegray" onClick={() => handleClick(nextFileType)}>
        Export {nextFileType} file
      </MDSButton>
      <div style={{ marginTop: '32px' }}>
        <ProgressItem>
          <MDSTypography variant="title" size="m">
            진행 중인 항목
          </MDSTypography>
          <TaskItem>
            {localTaskMonitor
              .filter((task) => task.taskStatus === 'processing' || task.taskStatus === 'ready')
              .map((task) => (
                <div key={task.taskId} className={task.fileType}>
                  <MDSTypography>{task.fileName}</MDSTypography>
                  <MDSTypography>{task.desc}</MDSTypography>
                </div>
              ))}
          </TaskItem>
        </ProgressItem>
        <ProgressItem>
          <MDSTypography variant="title" size="m">
            취소된 항목
          </MDSTypography>
          <TaskItem>
            {localTaskMonitor
              .filter((task) => task.taskStatus === 'removed')
              .map((task) => (
                <div key={task.taskId} className={task.fileType}>
                  <MDSTypography>{task.fileName}</MDSTypography>
                  <MDSTypography>{task.desc}</MDSTypography>
                </div>
              ))}
          </TaskItem>
        </ProgressItem>
        <ProgressItem>
          <MDSTypography variant="title" size="m">
            완료된 항목
          </MDSTypography>
          <TaskItem>
            {localTaskMonitor
              .filter((task) => task.taskStatus === 'completed')
              .map((task) => (
                <div key={task.taskId} className={task.fileType}>
                  <MDSTypography>{task.fileName}</MDSTypography>
                  <MDSTypography>{task.desc}</MDSTypography>
                </div>
              ))}
          </TaskItem>
        </ProgressItem>
        <ProgressItem>
          <MDSTypography variant="title" size="m">
            오류 발생한 항목
          </MDSTypography>
          <TaskItem>
            {localTaskMonitor
              .filter((task) => task.taskStatus === 'failed')
              .map((task) => (
                <div key={task.taskId} className={task.fileType}>
                  <MDSTypography>{task.fileName}</MDSTypography>
                  <MDSTypography>{task.desc}</MDSTypography>
                </div>
              ))}
          </TaskItem>
        </ProgressItem>
      </div>
    </div>
  );
};

const SomeViewLogics = () => {
  return (
    <div>
      {/* <AddExcelExportTaskComponent /> */}
      <AddPptExportTaskComponent />
    </div>
  );
};
export const RecommendedUseCaseExampleAppMain = () => {
  return (
    <div>
      <SomeViewLogics />
      {/* Application 전역에서 단 한번 호출한다 -- Toast 처럼 사용 */}
      <MDSDownloadPanel />
    </div>
  );
};
