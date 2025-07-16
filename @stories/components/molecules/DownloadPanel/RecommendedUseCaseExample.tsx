import { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { MDSButton, MDSDownloadPanel, MDSTypography } from '../../../../components';
import { useMDSDownloadPanel } from '../../../../components/molecules/DownloadPanel/@hooks';

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

const ProgressItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`;

const AddPptExportTaskComponent = () => {
  const [localTaskMonitor, setLocalTaskMonitor] = useState<
    {
      taskId: number;
      fileName: string;
      taskStatus: 'ready' | 'processing' | 'completed' | 'failed' | 'removed';
      taskGroupKey: string;
      desc?: string;
    }[]
  >([]);

  // 사용하는 쪽의 컴포넌트에서 hook을 이용하여 task를 추가한다.
  const { addTask } = useMDSDownloadPanel();
  const { startApi, stopApi } = useMockProgressResultApi();

  const pollingFn = useCallback((taskId: number) => {
    return startApi(taskId);
  }, []);
  const removeFn = useCallback(async (taskId: number) => {
    return await stopApi(taskId);
  }, []);
  const onCompleted = useCallback((taskId: number, res: MockProgressResult) => {
    console.log('>>>> onComplete callback', taskId);
    setLocalTaskMonitor((prev) =>
      prev.map((task) => (task.taskId === taskId ? { ...task, taskStatus: 'completed', desc: res?.url ?? '' } : task))
    );
  }, []);
  const onFailed = useCallback((taskId: number, res: MockProgressResult) => {
    console.log('>>>> onFailed callback', taskId);
    setLocalTaskMonitor((prev) =>
      prev.map((task) => (task.taskId === taskId ? { ...task, taskStatus: 'failed', desc: res?.url ?? '' } : task))
    );
  }, []);
  const onRemoved = useCallback((taskId: number, res: MockCancelResult) => {
    console.log('>>>> onRemoved callback', taskId, res);
    setLocalTaskMonitor((prev) =>
      prev.map((task) => (task.taskId === taskId ? { ...task, taskStatus: 'removed', desc: '취소' } : task))
    );
  }, []);

  const handleClick = () => {
    // 실제 케이스에서는 req api 의 response로 받은 progressId
    const taskId = new Date().getTime()

    addTask<MockProgressResult, MockCancelResult, MockProgressResult>({
      taskId,
      fileName: 'test.ppt',
      fileType: 'ppt',
      taskGroupKey: 'ppt-export-from-some-page',
      pollingFn,
      removeFn,
      onCompleted,
      onRemoved,
      onFailed,
    });
    setLocalTaskMonitor((prev) => [
      ...prev,
      { taskId, fileName: 'test.ppt', taskStatus: 'ready', taskGroupKey: 'ppt-export-from-some-page', desc: '준비' },
    ]);
  };

  return (
    <div>
      <MDSButton variant="tint" size="medium" color="bluegray" onClick={handleClick}>
        Export PPT
      </MDSButton>
      <div style={{ marginTop: '32px' }}>
        <ProgressItem>
          <MDSTypography variant="title" size="m">
            진행 중인 항목
          </MDSTypography>
          {localTaskMonitor
            .filter((task) => task.taskStatus === 'processing' || task.taskStatus === 'ready')
            .map((task) => (
              <div key={task.taskId}>
                <MDSTypography>{task.fileName}</MDSTypography>
                <MDSTypography>{task.desc}</MDSTypography>
              </div>
            ))}
        </ProgressItem>
        <ProgressItem>
          <MDSTypography variant="title" size="m">
            취소된 항목
          </MDSTypography>
          {localTaskMonitor
            .filter((task) => task.taskStatus === 'removed')
            .map((task) => (
              <div key={task.taskId}>
                <MDSTypography>{task.fileName}</MDSTypography>
                <MDSTypography>{task.desc}</MDSTypography>
              </div>
            ))}
        </ProgressItem>
        <ProgressItem>
          <MDSTypography variant="title" size="m">
            완료된 항목
          </MDSTypography>
          {localTaskMonitor
            .filter((task) => task.taskStatus === 'completed')
            .map((task) => (
              <div key={task.taskId}>
                <MDSTypography>{task.fileName}</MDSTypography>
                <MDSTypography>{task.desc}</MDSTypography>
              </div>
            ))}
        </ProgressItem>
        <ProgressItem>
          <MDSTypography variant="title" size="m">
            오류 발생한 항목
          </MDSTypography>
          {localTaskMonitor
            .filter((task) => task.taskStatus === 'failed')
            .map((task) => (
              <div key={task.taskId}>
                <MDSTypography>{task.fileName}</MDSTypography>
                <MDSTypography>{task.desc}</MDSTypography>
              </div>
            ))}
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
