import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import {
  FullDialog,
  FullDialogContent,
  FullDialogDescription,
  FullDialogFooter,
  FullDialogHeader,
  FullDialogTitle,
  FullDialogTrigger,
} from './FullDialog';

const meta: Meta<typeof FullDialog> = {
  title: 'Components/Dialog/FullDialog',
  component: FullDialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FullDialog>;

export const Default: Story = {
  render: () => (
    <FullDialog>
      <FullDialogTrigger asChild>
        <Button>대화상자 열기</Button>
      </FullDialogTrigger>
      <FullDialogContent>
        <FullDialogHeader>
          <FullDialogTitle>대화상자 제목</FullDialogTitle>
          <FullDialogDescription>
            이것은 기본 대화상자입니다. 여기에 설명 텍스트를 추가할 수 있습니다.
          </FullDialogDescription>
        </FullDialogHeader>
        <div className="py-4">
          <p>대화상자의 본문 내용입니다.</p>
        </div>
        <FullDialogFooter>
          <Button variant="secondary">취소</Button>
          <Button>확인</Button>
        </FullDialogFooter>
      </FullDialogContent>
    </FullDialog>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <FullDialog>
      <FullDialogTrigger asChild>
        <Button>푸터 없는 대화상자</Button>
      </FullDialogTrigger>
      <FullDialogContent>
        <FullDialogHeader>
          <FullDialogTitle>푸터 없는 대화상자</FullDialogTitle>
          <FullDialogDescription>푸터가 없는 대화상자 예시입니다.</FullDialogDescription>
        </FullDialogHeader>
        <div className="py-4">
          <p>대화상자의 본문 내용입니다.</p>
        </div>
      </FullDialogContent>
    </FullDialog>
  ),
};

export const LongContent: Story = {
  render: () => (
    <FullDialog>
      <FullDialogTrigger asChild>
        <Button>긴 내용의 대화상자</Button>
      </FullDialogTrigger>
      <FullDialogContent>
        <FullDialogHeader>
          <FullDialogTitle>긴 내용의 대화상자</FullDialogTitle>
          <FullDialogDescription>스크롤이 필요한 긴 내용의 대화상자 예시입니다.</FullDialogDescription>
        </FullDialogHeader>
        <div className="py-4 space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i}>
              이것은 대화상자의 긴 내용입니다. {i + 1}번째 문단입니다. 스크롤이 필요한 경우 자동으로 스크롤바가
              표시됩니다.
            </p>
          ))}
        </div>
        <FullDialogFooter>
          <Button variant="secondary">취소</Button>
          <Button>확인</Button>
        </FullDialogFooter>
      </FullDialogContent>
    </FullDialog>
  ),
};
