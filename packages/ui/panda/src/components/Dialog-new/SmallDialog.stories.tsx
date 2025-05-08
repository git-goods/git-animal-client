import type { Meta, StoryObj } from '@storybook/react';
import {
  SmallDialog,
  SmallDialogTrigger,
  SmallDialogContent,
  SmallDialogHeader,
  SmallDialogFooter,
  SmallDialogTitle,
  SmallDialogDescription,
  BasicSmallDialog,
} from './SmallDialog';
import { Button } from '../Button';

const meta: Meta<typeof SmallDialog> = {
  title: 'Components/SmallDialog',
  component: SmallDialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SmallDialog>;

export const Default: Story = {
  render: () => (
    <BasicSmallDialog
      title="작은 대화상자 제목"
      description="이것은 작은 대화상자입니다. 간단한 알림이나 확인에 적합합니다."
      leftButtonText="취소"
      rightButtonText="확인"
      leftButtonAction={() => {}}
      rightButtonAction={() => {}}
      triggerElement={<Button>작은 대화상자 열기</Button>}
    />
  ),
};

export const Alert: Story = {
  render: () => (
    <SmallDialog>
      <SmallDialogTrigger asChild>
        <Button>알림 대화상자</Button>
      </SmallDialogTrigger>
      <SmallDialogContent>
        <SmallDialogHeader>
          <SmallDialogTitle>중요 알림</SmallDialogTitle>
          <SmallDialogDescription>이것은 중요한 알림 메시지입니다.</SmallDialogDescription>
        </SmallDialogHeader>
        <div className="py-4">
          <p>작업이 완료되었습니다.</p>
        </div>
        <SmallDialogFooter>
          <Button>확인</Button>
        </SmallDialogFooter>
      </SmallDialogContent>
    </SmallDialog>
  ),
};
