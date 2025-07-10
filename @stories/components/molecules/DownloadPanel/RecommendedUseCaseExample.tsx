import { useCallback, useRef } from 'react';
import { MDSButton, MDSDownloadPanel } from '../../../../components';
import { useMDSDownloadPanel } from '../../../../components/molecules/DownloadPanel/@hooks';

const useMockProgressResultApi = () => {
  const mockProgressResult = useRef({
    progress: 0,
    completed: false,
  });
  const start = () => {
    return new Promise((resolve) => {
      if (mockProgressResult.current.progress === 100) {
        resolve({
          progress: 100,
          url: 'done',
          completed: true,
        });
        return;
      }
      mockProgressResult.current.progress += 10;
      resolve({
        progress: mockProgressResult.current.progress,
        url: null,
        completed: mockProgressResult.current.completed,
      });
    });
  };
  const stop = () => {
    mockProgressResult.current.completed = false;
    mockProgressResult.current.progress = 0;
    return Promise.resolve({});
  };
  return {
    start,
    stop,
  };
};

const AddExcelExportTaskComponent = () => {
  // 사용하는 쪽의 컴포넌트에서 hook을 이용하여 task를 추가한다.
  const { addTask } = useMDSDownloadPanel();

  const pollingFn = useCallback((taskId: string, signal: AbortSignal) => Promise.resolve({}), []);
  const removeFn = useCallback((taskId: string) => Promise.resolve({}), []);

  const handleClick = () => {
    // 실제 케이스에서는 req api 의 response로 받은 progressId
    const taskId = new Date().getTime().toString();

    addTask({
      taskId,
      fileName: 'test.csv',
      fileType: 'csv',
      taskGroupKey: 'csv-export-from-some-page',
      pollingFn,
      removeFn,
    });
  };

  return (
    <div>
      <MDSButton variant="tint" size="medium" color="bluegray" onClick={handleClick}>
        Export Excel
      </MDSButton>
    </div>
  );
};

const AddPptExportTaskComponent = () => {
  // 사용하는 쪽의 컴포넌트에서 hook을 이용하여 task를 추가한다.
  const { addTask } = useMDSDownloadPanel();

  const { start, stop } = useMockProgressResultApi();

  const pollingFn = useCallback((taskId: string, signal: AbortSignal) => {
    return start();
  }, []);
  const removeFn = useCallback((taskId: string) => {
    return stop();
  }, []);

  const handleClick = () => {
    // 실제 케이스에서는 req api 의 response로 받은 progressId
    const taskId = new Date().getTime().toString();

    addTask({
      taskId,
      fileName: 'test.ppt',
      fileType: 'ppt',
      taskGroupKey: 'ppt-export-from-some-page',
      pollingFn,
      removeFn,
    });
  };

  return (
    <div>
      <MDSButton variant="tint" size="medium" color="bluegray" onClick={handleClick}>
        Export PPT
      </MDSButton>
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
