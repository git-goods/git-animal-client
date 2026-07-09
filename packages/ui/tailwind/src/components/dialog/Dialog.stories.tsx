import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../ui/button';

import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Content,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'screen', 'hero'],
      description: 'size 하나로 폭·패딩·타이포·Footer 정렬·권장 버튼 크기까지 recipe로 결정',
    },
  },
} satisfies Meta<typeof Dialog.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

function Preview({ children }: { children: (open: boolean, setOpen: (o: boolean) => void) => React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Button variant="secondary" size="m" onClick={() => setOpen(true)}>
        다시 열기
      </Button>
      {children(open, setOpen)}
    </div>
  );
}

/**
 * 기본 md — 폼/정보 다이얼로그. Title/Description/Footer 는 size context에서 자동 스타일링.
 */
export const Basic: Story = {
  args: { size: 'md' },
  render: ({ size }) => (
    <Preview>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Content size={size}>
            <Dialog.Title>다이얼로그 제목</Dialog.Title>
            <Dialog.Description>
              size 를 바꾸면 Title/Description/Footer 정렬·타이포가 recipe에 맞춰 자동으로 조정됩니다.
            </Dialog.Description>
            <Dialog.Footer>
              <Button variant="secondary" size="m" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button variant="primary" size="m" onClick={() => setOpen(false)}>
                확인
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      )}
    </Preview>
  ),
};

/**
 * sm — confirm/alert 용. glyph16-bold title + glyph14 description + Button size 's' 권장.
 */
export const Small: Story = {
  args: { size: 'sm' },
  render: Basic.render,
};

/**
 * lg — 큰 폼/리스트 (MergePersona, PersonaSearch 등).
 */
export const Large: Story = {
  args: { size: 'lg' },
  render: Basic.render,
};

/**
 * screen — 풀뷰포트 + 플레인 타이포. mobile에서 화면 차지하는 폼/리스트 용.
 */
export const Screen: Story = {
  args: { size: 'screen' },
  render: Basic.render,
};

/**
 * hero — 풀뷰포트 + 축하/결과 (glyph48 히어로 title, Footer 중앙 정렬, Button size 'l').
 */
export const Hero: Story = {
  args: { size: 'hero' },
  render: ({ size }) => (
    <Preview>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Content size={size} className="items-center justify-center">
            <Dialog.Title>축하합니다!</Dialog.Title>
            <Dialog.Description>새로운 펫을 얻었습니다.</Dialog.Description>
            <Dialog.Footer>
              <Button variant="primary" size="l" onClick={() => setOpen(false)}>
                확인
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      )}
    </Preview>
  ),
};

/**
 * Dialog.Alert sugar — size별 recipe와 Button 크기 자동 배정.
 */
export const AlertSugar: Story = {
  args: { size: 'sm' },
  render: ({ size }) => (
    <Preview>
      {(open, setOpen) => (
        <Dialog.Alert
          open={open}
          onOpenChange={setOpen}
          title="알림"
          description="작업이 완료되었습니다."
          confirmText="확인"
          size={size}
        />
      )}
    </Preview>
  ),
};

/**
 * Dialog.Confirm sugar — Promise onConfirm 지원, 로딩 상태 자체 관리.
 */
export const ConfirmSugar: Story = {
  args: { size: 'sm' },
  render: ({ size }) => (
    <Preview>
      {(open, setOpen) => (
        <Dialog.Confirm
          open={open}
          onOpenChange={setOpen}
          title="정말 진행할까요?"
          description="이 작업은 되돌릴 수 없습니다."
          confirmText="진행"
          cancelText="취소"
          onConfirm={async () => {
            await new Promise((r) => setTimeout(r, 1200));
          }}
          size={size}
        />
      )}
    </Preview>
  ),
};

/**
 * 도메인 override 예 (MergePersona 패턴): lg + Footer 중앙정렬 override 유지.
 */
export const DomainOverride: Story = {
  args: { size: 'lg' },
  render: () => (
    <Preview>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Content size="lg">
            <Dialog.Title>Merge to Level Up</Dialog.Title>
            <Dialog.Description>재료 펫을 선택하세요.</Dialog.Description>
            <div className="min-h-[200px] flex items-center justify-center rounded-lg border border-gray-800 text-white-50">
              (여기에 SelectPersonaList 등의 리스트 슬롯)
            </div>
            <Dialog.Footer className="justify-center gap-3">
              <Button variant="secondary" size="m" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button variant="primary" size="m" onClick={() => setOpen(false)}>
                Merge
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      )}
    </Preview>
  ),
};
