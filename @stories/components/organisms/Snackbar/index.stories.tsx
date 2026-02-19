import React from 'react';
import { Story } from '@storybook/addon-docs/blocks';
import { MDSButton, MDSSnackbar, MDSTypography, MDSSnackbarContainer, dismissToast } from '../../../../components';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof MDSSnackbarContainer> = {
  component: MDSSnackbarContainer,
  title: '2. Components/organisms/Snackbar',
  parameters: {
    docs: {
      story: {
        layout: 'center',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden' }}>
        <Story />
        <MDSSnackbarContainer />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MDSSnackbarContainer>;

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', overflow: 'hidden' }}>
      {children}
    </div>
  );
};

export const Preview: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>
        스낵바 알림 컴포넌트입니다.
        <br />
        버튼을 클릭하여 스낵바를 확인해보세요.
      </MDSTypography>
      <MDSButton
        onClick={() =>
          MDSSnackbar({
            type: 'success',
            title: 'Success Snackbar',
            message: '안녕하세요?',
          })
        }
      >
        Basic Snackbar
      </MDSButton>
    </Wrapper>
  ),
};

export const SnackbarTypes: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>스낵바의 다양한 타입을 확인할 수 있습니다.</MDSTypography>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <MDSButton
          onClick={() =>
            MDSSnackbar({
              type: 'success',
              title: 'Success',
              message: '성공 스낵바',
            })
          }
        >
          Success
        </MDSButton>
        <MDSButton
          onClick={() =>
            MDSSnackbar({
              type: 'error',
              title: 'Error',
              message: '오류 스낵바',
            })
          }
        >
          Error
        </MDSButton>
        <MDSButton
          onClick={() =>
            MDSSnackbar({
              type: 'warning',
              title: 'Warning',
              message: '워닝 스낵바',
            })
          }
        >
          Warning
        </MDSButton>
        <MDSButton
          onClick={() =>
            MDSSnackbar({
              title: 'Complete',
              message: '완료 스낵바',
            })
          }
        >
          Complete
        </MDSButton>
      </div>
    </Wrapper>
  ),
};

export const WithActionButton: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>액션 버튼이 포함된 스낵바입니다.</MDSTypography>
      <MDSButton
        onClick={() =>
          MDSSnackbar({
            type: 'success',
            title: 'File Deleted',
            message: 'Designer Gm Gentles, Designer 파일이 삭제되었습니다.',
            actionButton: {
              text: 'Undo',
              event: () => console.log('Undo action triggered'),
            },
            duration: 10000,
          })
        }
      >
        Snackbar with Action
      </MDSButton>
      <MDSButton
        onClick={() =>
          MDSSnackbar({
            type: 'success',
            title: 'File Deleted',
            message: 'Designer Gm Gentles, Designer 파일이 삭제되었습니다.',
            actionButton: {
              dismissBefore: true,
              text: 'Undo',
              event: () => console.log('Undo action triggered'),
            },
            duration: 10000,
          })
        }
      >
        Snackbar with Action + snackbar dismiss 기능
      </MDSButton>
    </Wrapper>
  ),
};

export const CustomDuration: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>
        스낵바의 표시 시간을 설정할 수 있습니다.
        <br />
        짧은 시간(2초)과 긴 시간(10초)을 비교해보세요.
      </MDSTypography>
      <div style={{ display: 'flex', gap: '12px' }}>
        <MDSButton
          onClick={() =>
            MDSSnackbar({
              type: 'success',
              title: 'Short Duration',
              message: '2초 후 자동으로 사라집니다.',
              duration: 2000,
            })
          }
        >
          2초 스낵바
        </MDSButton>
        <MDSButton
          onClick={() =>
            MDSSnackbar({
              type: 'warning',
              title: 'Long Duration',
              message: '10초 후 자동으로 사라집니다.',
              duration: 10000,
            })
          }
        >
          10초 스낵바
        </MDSButton>
      </div>
    </Wrapper>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>닫기 버튼이 숨겨지는 스낵바입니다.</MDSTypography>
      <MDSButton
        onClick={() =>
          MDSSnackbar({
            type: 'error',
            title: 'Critical Error',
            message: '닫기 버튼이 없는 스낵바입니다.',
            hideCloseButton: true,
            duration: 5000,
          })
        }
      >
        Display Close Button
      </MDSButton>
    </Wrapper>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>스낵바의 너비를 커스텀할 수 있습니다.</MDSTypography>
      <div style={{ display: 'flex', gap: '12px' }}>
        <MDSButton
          onClick={() =>
            MDSSnackbar({
              type: 'success',
              title: 'Small Width',
              message: '좁은 너비의 스낵바입니다.',
              width: 300,
            })
          }
        >
          좁은 스낵바
        </MDSButton>
        <MDSButton
          onClick={() =>
            MDSSnackbar({
              type: 'warning',
              title: 'Large Width Snackbar',
              message: '넓은 너비의 스낵바입니다. 긴 메시지도 잘 표시됩니다.',
              width: 700,
            })
          }
        >
          넓은 스낵바
        </MDSButton>
      </div>
    </Wrapper>
  ),
};

export const MultipleSnackbars: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>
        여러 개의 스낵바를 연속으로 표시할 수 있습니다.
        <br />
        스택 형태로 쌓이며, 가장 최근 스낵바가 맨 앞에 표시됩니다.
      </MDSTypography>
      <div style={{ display: 'flex', gap: '12px' }}>
        <MDSButton
          onClick={() => {
            MDSSnackbar({
              type: 'success',
              title: 'First Snackbar',
              message: '첫 번째 스낵바입니다.',
              duration: 5000,
            });
            setTimeout(() => {
              MDSSnackbar({
                type: 'warning',
                title: 'Second Snackbar',
                message: '조금 더 길어진 ------------------------------------------------ 두 번째 스낵바입니다.',
                duration: 5000,
                pushToEnd: true,
              });
            }, 500);
            setTimeout(() => {
              MDSSnackbar({
                type: 'error',
                title: 'Third Snackbar',
                message: '다시 작아진 세 번째 스낵바입니다.',
                duration: 5000,
              });
            }, 1000);
            setTimeout(() => {
              MDSSnackbar({
                title: 'Fourth Snackbar',
                message: '다시 작아진 네 번째 스낵바입니다.',
                duration: 5000,
                pushToEnd: true,
              });
            }, 1500);
          }}
        >
          Multiple Snackbars
        </MDSButton>
        <MDSButton
          onClick={() =>
            MDSSnackbar({
              type: 'success',
              title: 'Clear All',
              message: '기존 스낵바를 모두 제거하고 새로 표시합니다.',
              dismissAllPreviousSnackbar: true,
              duration: 5000,
            })
          }
        >
          Clear All Previous
        </MDSButton>
      </div>
    </Wrapper>
  ),
};

export const WithImages: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>이미지가 포함된 스낵바입니다.</MDSTypography>
      <MDSButton
        onClick={() =>
          MDSSnackbar({
            title: 'Images Uploaded',
            message: '이미지 list 입니다.',
            images: [
              'https://www.fordong.co.kr/_next/image?url=https%3A%2F%2Fcdn-fordong-prod.fordong.co.kr%2Fimages%2Fboard%2Ffbf7df9b-828f-4b46-9cae-28200520450c.jpg&w=3840&q=75',
              'https://www.fordong.co.kr/_next/image?url=https%3A%2F%2Fcdn-fordong-prod.fordong.co.kr%2Fimages%2Fboard%2F591cdf29-5613-449c-972d-fa0acc477727&w=3840&q=75',
              'https://cpbv-community.com2us.com/image/2024-05-22-5VNo8ySYlt7unKV.jpg',
              '1',
              '2',
            ],
            duration: 8000,
          })
        }
      >
        Snackbar with Images
      </MDSButton>
    </Wrapper>
  ),
};

export const DismissToastInAction: Story = {
  render: () => (
    <Wrapper>
      <MDSTypography>
        dismissToast() 함수를 사용하여 화면에 렌더링된 모든 스낵바를 제거할 수 있습니다.
        <br />
        먼저 Create Multiple Toasts 버튼 클릭후 "Dismiss All Toasts" 버튼을 클릭해보세요.
      </MDSTypography>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <MDSButton
          onClick={() => {
            MDSSnackbar({
              type: 'success',
              title: 'Success Toast',
              message: '성공 메시지입니다.',
              duration: 15000,
            });
            setTimeout(() => {
              MDSSnackbar({
                type: 'warning',
                title: 'Warning Toast',
                message: '경고 메시지입니다.',
                duration: 15000,
              });
            }, 300);
            setTimeout(() => {
              MDSSnackbar({
                type: 'error',
                title: 'Error Toast',
                message: '오류 메시지입니다.',
                duration: 15000,
              });
            }, 600);
            setTimeout(() => {
              MDSSnackbar({
                title: 'Complete Toast',
                message: '완료 메시지입니다.',
                duration: 15000,
              });
            }, 900);
          }}
        >
          Create Multiple Toasts
        </MDSButton>
        <MDSButton
          onClick={() => {
            dismissToast();
          }}
        >
          Dismiss All Toasts
        </MDSButton>
      </div>
    </Wrapper>
  ),
};
