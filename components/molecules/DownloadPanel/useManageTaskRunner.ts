import { useEffect, useMemo, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { Query, useQueries, useQueryClient } from '@tanstack/react-query';
import { apiTaskAtom, displayTasksAtom, updateTaskStatusAtom } from './@atoms';
import { TaskId } from './@types';

export const useManageTaskRunner = () => {
  const apiQueue = useAtomValue(apiTaskAtom);
  const updateTaskStatus = useSetAtom(updateTaskStatusAtom);

  const stableIdsInProgressState = useRef({ inProgress: [] as TaskId[], completed: [] as TaskId[], remainCount: 0 });

  const queries = useMemo(
    () =>
      apiQueue.map((task) => ({
        queryKey: ['mds-download-panel', task.taskGroupKey, task.taskId],
        queryFn: async ({ signal }: { signal: AbortSignal }) => {
          try {
            const res = await task.pollingFn(task.taskId, signal);
            return res as any;
          } catch (error) {
            if (signal.aborted) {
              updateTaskStatus({
                taskId: task.taskId,
                status: 'removed',
              });
              await task.cancelFn(task.taskId);
            }
            throw error;
          }
        },
        refetchInterval: (data: any, query: Query) => {
          if (query.state.error) {
            updateTaskStatus({
              taskId: task.taskId,
              status: 'failed',
            });
            return false;
          }
          if (data) {
            if (data.completed && data.url) {
              const [_, progressId] = query.queryKey as [string, string];

              if (stableIdsInProgressState.current.completed.includes(progressId)) {
                // 혹시모를 재호출 방지
                return false;
              }
              stableIdsInProgressState.current = {
                inProgress: stableIdsInProgressState.current.inProgress.filter((id) => id !== progressId),
                completed: [...stableIdsInProgressState.current.completed, progressId],
                remainCount: stableIdsInProgressState.current.remainCount - 1,
              };

              downloadFile(data.url, task.fileName);
              updateTaskStatus({
                taskId: task.taskId,
                status: 'completed',
                progress: 100,
              });

              return false;
            } else if (typeof data?.progress === 'number') {
              updateTaskStatus({
                taskId: task.taskId,
                status: data.progress === 0 ? 'ready' : 'processing',
                progress: data.progress,
              });
            }
          }
          return task.pollingInterval;
        },
        staleTime: Infinity, // 데이터가 'stale'해지지 않도록 설정하여 불필요한 즉시 refetch 방지
      })),
    [JSON.stringify(apiQueue)]
  );

  useQueries({
    queries: queries as any,
  });

  const tasks = useAtomValue(displayTasksAtom);
  const queryClient = useQueryClient();
  useEffect(() => {
    tasks.forEach((task) => {
      if (task.status === 'removed') {
        queryClient.cancelQueries({ queryKey: ['mds-download-panel', task.taskGroupKey, task.taskId] });
      }
    });

    const inProgress = tasks
      .filter((task) => task.status === 'processing' || task.status === 'ready')
      .map((task) => task.taskId);
    const completed = tasks.filter((task) => task.status === 'completed').map((task) => task.taskId);
    stableIdsInProgressState.current = {
      inProgress,
      completed,
      remainCount: inProgress.length,
    };
  }, [tasks]);
};


const downloadFile = (url: string, fileName: string) => {
  const a = document.createElement('a');
  if (fileName) {
    a.download = fileName;
  }
  a.href = url;
  a.click();
};
