import { useEffect, useMemo, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { Query, useQueries, useQueryClient } from '@tanstack/react-query';
import { apiTaskAtom, tasksStatusAtom, updateTaskStatusAtom } from '../@atoms';
import { Task, TaskId } from '../@types';

export const useTaskRunner = () => {
  const apiQueue = useAtomValue(apiTaskAtom);
  const updateTaskStatus = useSetAtom(updateTaskStatusAtom);

  const stableIdsInProgressState = useRef({ inProgress: [] as TaskId[], completed: [] as TaskId[], remainCount: 0 });

  const queries = useMemo(
    () =>
      apiQueue.map((task) => ({
        queryKey: ['mds-download-panel', task.taskGroupKey, task.taskId],
        queryFn: async ({ signal }: { signal?: AbortSignal }) => {
          // callback 함수에 전달하기 위한 용도
          const currentTaskParam: Task = {
            taskId: task.taskId,
            fileName: task.fileName,
            fileType: task.fileType,
            taskGroupKey: task.taskGroupKey,
          };
          try {
            const res = await task.pollingFn(currentTaskParam, signal);
            return res as any;
          } catch (error) {
            if (signal?.aborted) {
              updateTaskStatus({
                taskId: task.taskId,
                status: 'removed',
              });
              await task.removeFn(currentTaskParam);
            } else {
              task.onFailed?.(currentTaskParam, error);
            }

            throw error;
          }
        },
        refetchInterval: (data: any, query: Query) => {
          // note-@jamie: queryFn 이 실행되기 전에 refetchInterval가 먼저 한번 실행된다

          // callback 함수에 전달하기 위한 용도
          const currentTaskParam: Task = {
            taskId: task.taskId,
            fileName: task.fileName,
            fileType: task.fileType,
            taskGroupKey: task.taskGroupKey,
          };

          if (query.state.error) {
            updateTaskStatus({
              taskId: task.taskId,
              status: 'failed',
            });
            return false;
          } else if (data) {
            if (data.completed && data.url) {
              const [_, progressId] = query.queryKey as [string, TaskId];

              if (stableIdsInProgressState.current.completed.includes(progressId)) {
                // 혹시모를 재호출 방지
                return false;
              }
              stableIdsInProgressState.current = {
                inProgress: stableIdsInProgressState.current.inProgress.filter((id) => id !== progressId),
                completed: [...stableIdsInProgressState.current.completed, progressId],
                remainCount: stableIdsInProgressState.current.remainCount - 1,
              };

              task.onCompleted?.(currentTaskParam, data);

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
            return task.pollingInterval;
          }
          return task.pollingInterval;
        },
        onError: (error: any) => {
          // callback 함수에 전달하기 위한 용도
          const currentTaskParam: Task = {
            taskId: task.taskId,
            fileName: task.fileName,
            fileType: task.fileType,
            taskGroupKey: task.taskGroupKey,
          };
          task.onFailed?.(currentTaskParam, error);
        },
        staleTime: Infinity, // 데이터가 'stale'해지지 않도록 설정하여 불필요한 즉시 refetch 방지
      })),
    [JSON.stringify(apiQueue)]
  );

  useQueries({
    queries,
  });

  const tasksStatus = useAtomValue(tasksStatusAtom);
  const queryClient = useQueryClient();
  useEffect(() => {
    tasksStatus.forEach((task) => {
      if (task.status === 'removed') {
        queryClient.cancelQueries({ queryKey: ['mds-download-panel', task.groupKey, task.taskId] });
      }
    });

    const inProgress = tasksStatus
      .filter((task) => task.status === 'processing' || task.status === 'ready')
      .map((task) => task.taskId);
    const completed = tasksStatus.filter((task) => task.status === 'completed').map((task) => task.taskId);
    stableIdsInProgressState.current = {
      inProgress,
      completed,
      remainCount: inProgress.length,
    };
  }, [JSON.stringify(tasksStatus)]);
};
