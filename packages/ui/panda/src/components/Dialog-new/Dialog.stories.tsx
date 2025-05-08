import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './Dialog';
import { Button } from '../Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>대화상자 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>대화상자 제목</DialogTitle>
          <DialogDescription>이것은 기본 대화상자입니다. 여기에 설명 텍스트를 추가할 수 있습니다.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>대화상자의 본문 내용입니다.</p>
        </div>
        <DialogFooter>
          <Button variant="secondary">취소</Button>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>푸터 없는 대화상자</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>푸터 없는 대화상자</DialogTitle>
          <DialogDescription>푸터가 없는 대화상자 예시입니다.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>대화상자의 본문 내용입니다.</p>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>긴 내용의 대화상자</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>긴 내용의 대화상자</DialogTitle>
          <DialogDescription>스크롤이 필요한 긴 내용의 대화상자 예시입니다.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i}>
              이것은 대화상자의 긴 내용입니다. {i + 1}번째 문단입니다. 스크롤이 필요한 경우 자동으로 스크롤바가
              표시됩니다.
            </p>
          ))}
        </div>
        <DialogFooter>
          <Button variant="secondary">취소</Button>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
