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
 * 콘텐츠 오버플로 처리 — `scrollable` prop + `Dialog.Body` 슬롯 조합.
 *
 * - `Dialog.Content scrollable` : 컨테이너 `overflow-hidden` + Title/Footer `shrink-0`
 * - `Dialog.Body` : `flex-1 overflow-y-auto` — 넘치는 콘텐츠만 이 슬롯 안에서 스크롤
 * - 결과: Title/Footer는 고정, Body만 스크롤
 *
 * ⚠ `md`/`lg` 는 데스크톱에서 max-height 를 자동으로 클램프하지 않음. 컨테이너가 뷰포트를
 * 넘길 만큼 길어질 여지가 있으면 `className="max-h-[80vh]"` 등을 함께 지정할 것.
 */
export const OverflowScrollable: Story = {
  args: { size: 'lg' },
  render: ({ size }) => (
    <Preview>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Content size={size} scrollable className="max-h-[80vh]">
            <Dialog.Title>긴 리스트</Dialog.Title>
            <Dialog.Description>Body 슬롯 안에서만 스크롤됩니다.</Dialog.Description>
            <Dialog.Body>
              <ul className="flex flex-col gap-2">
                {Array.from({ length: 40 }, (_, i) => (
                  <li key={i} className="rounded-lg border border-gray-800 p-3 text-white-75">
                    아이템 {i + 1}
                  </li>
                ))}
              </ul>
            </Dialog.Body>
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
 * 오버플로 미처리 (안티패턴) — `scrollable` / `Dialog.Body` 없이 긴 콘텐츠를 그대로 넣는 경우.
 *
 * 컨테이너가 콘텐츠 높이만큼 커지면서 뷰포트를 넘겨 Footer 가 화면 밖으로 밀림.
 * 실제 화면에서 이 상태가 되면 위 `OverflowScrollable` 패턴으로 전환할 것.
 */
export const OverflowUnmanaged: Story = {
  args: { size: 'md' },
  render: ({ size }) => (
    <Preview>
      {(open, setOpen) => (
        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Content size={size}>
            <Dialog.Title>긴 콘텐츠 (미처리)</Dialog.Title>
            <Dialog.Description>Body 슬롯 없이 넣은 상태.</Dialog.Description>
            <ul className="flex flex-col gap-2">
              {Array.from({ length: 40 }, (_, i) => (
                <li key={i} className="rounded-lg border border-gray-800 p-3 text-white-75">
                  아이템 {i + 1}
                </li>
              ))}
            </ul>
            <Dialog.Footer>
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
