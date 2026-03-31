import { CheckCircle, Mail, Plus, Save, Search, User } from "lucide-react";

import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  ProgressBar,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from "@/components/ds";

export default function DesignSystemPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-slate-900 mb-1">디자인 시스템</h1>
        <p className="text-sm text-slate-600">
          프로젝트 전체에서 사용하는 UI 컴포넌트 라이브러리
        </p>
      </div>

      {/* Buttons */}
      <Card title="Buttons" subtitle="다양한 크기와 스타일의 버튼 컴포넌트">
        <div className="space-y-4">
          {/* Variants */}
          <div>
            <h3 className="text-sm text-slate-700 mb-2">Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-sm text-slate-700 mb-2">Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* With Icons */}
          <div>
            <h3 className="text-sm text-slate-700 mb-2">With Icons</h3>
            <div className="flex flex-wrap gap-2">
              <Button icon={Plus} variant="primary">
                추가하기
              </Button>
              <Button icon={Save} variant="success">
                저장하기
              </Button>
              <Button icon={Search} variant="outline">
                검색하기
              </Button>
            </div>
          </div>

          {/* States */}
          <div>
            <h3 className="text-sm text-slate-700 mb-2">States</h3>
            <div className="flex flex-wrap gap-2">
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Inputs */}
      <Card title="Inputs" subtitle="폼 입력 컴포넌트">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="기본 입력" placeholder="텍스트를 입력하세요" fullWidth />
          <Input label="필수 입력" placeholder="필수 입력" required fullWidth />
          <Input label="아이콘 포함" icon={User} placeholder="사용자명" fullWidth />
          <Input
            label="에러 상태"
            placeholder="이메일"
            error="올바른 이메일을 입력하세요"
            fullWidth
          />
          <Input
            label="도움말 포함"
            placeholder="비밀번호"
            helperText="최소 8자 이상 입력하세요"
            fullWidth
          />
          <Input label="비활성화" placeholder="비활성화 상태" disabled fullWidth />
        </div>
      </Card>

      {/* Textarea */}
      <Card title="Textarea" subtitle="여러 줄 텍스트 입력">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea label="기본 텍스트" placeholder="내용을 입력하세요" rows={4} fullWidth />
          <Textarea
            label="필수 입력"
            placeholder="필수 내용"
            helperText="최소 10자 이상 입력하세요"
            required
            rows={4}
            fullWidth
          />
        </div>
      </Card>

      {/* Stat Cards */}
      <Card title="Stat Cards" subtitle="통계 카드 컴포넌트">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard title="총 사용자" value="2,847" icon={User} color="blue" trend="+12.5%" />
          <StatCard
            title="완료된 작업"
            value="156"
            icon={CheckCircle}
            color="green"
            trend="+8.2%"
          />
          <StatCard title="이메일" value="1,234" icon={Mail} color="cyan" trend="+24" />
          <StatCard title="신규 가입" value="89" icon={Plus} color="indigo" trend="+15.3%" />
        </div>
      </Card>

      {/* Badges */}
      <Card title="Badges" subtitle="상태 및 분류 표시 배지">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-slate-700 mb-2">Colors</h3>
            <div className="flex flex-wrap gap-2">
              <Badge color="blue">진행 중</Badge>
              <Badge color="cyan">완료</Badge>
              <Badge color="yellow">검토</Badge>
              <Badge color="red">긴급</Badge>
              <Badge color="orange">높음</Badge>
              <Badge color="slate">계획</Badge>
              <Badge color="green">승인</Badge>
              <Badge color="indigo">신규</Badge>
              <Badge color="sky">정보</Badge>
              <Badge color="amber">경고</Badge>
              <Badge color="purple">백엔드</Badge>
            </div>
          </div>
          <div>
            <h3 className="text-sm text-slate-700 mb-2">Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="sm" color="blue">
                Small
              </Badge>
              <Badge size="md" color="blue">
                Medium
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Progress Bar */}
      <Card title="Progress Bar" subtitle="진행률 표시 바">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-slate-700 mb-2">Colors</h3>
            <div className="space-y-3 max-w-md">
              <ProgressBar value={75} />
              <ProgressBar value={45} color="cyan" />
              <ProgressBar value={90} color="green" />
              <ProgressBar value={30} color="red" />
              <ProgressBar value={60} color="amber" />
              <ProgressBar value={55} color="indigo" />
            </div>
          </div>
          <div>
            <h3 className="text-sm text-slate-700 mb-2">Sizes</h3>
            <div className="space-y-3 max-w-md">
              <ProgressBar value={60} size="sm" />
              <ProgressBar value={60} size="md" />
              <ProgressBar value={60} size="lg" />
            </div>
          </div>
          <div>
            <h3 className="text-sm text-slate-700 mb-2">Without Label</h3>
            <div className="space-y-3 max-w-md">
              <ProgressBar value={70} showLabel={false} />
            </div>
          </div>
        </div>
      </Card>

      {/* Avatar */}
      <Card title="Avatar" subtitle="사용자 아바타 컴포넌트">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-slate-700 mb-2">Sizes</h3>
            <div className="flex items-center gap-3">
              <Avatar name="김철수" size="sm" />
              <Avatar name="이영희" size="md" />
              <Avatar name="박민수" size="lg" />
            </div>
          </div>
          <div>
            <h3 className="text-sm text-slate-700 mb-2">Colors</h3>
            <div className="flex items-center gap-3">
              <Avatar name="김철수" color="blue" />
              <Avatar name="이영희" color="cyan" />
              <Avatar name="박민수" color="green" />
              <Avatar name="정수현" color="red" />
              <Avatar name="최지은" color="indigo" />
              <Avatar name="강동훈" color="sky" />
              <Avatar name="윤서연" color="amber" />
              <Avatar name="한지우" color="slate" />
            </div>
          </div>
          <div>
            <h3 className="text-sm text-slate-700 mb-2">With Name</h3>
            <div className="flex items-center gap-4">
              <Avatar name="김철수" showName />
              <Avatar name="이영희" showName color="cyan" />
              <Avatar name="박민수" showName color="green" />
            </div>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card title="Table" subtitle="데이터 테이블 컴포넌트">
        <div className="rounded-lg border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>역할</TableHead>
                <TableHead className="text-right">포인트</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-sm font-medium text-slate-900">김철수</TableCell>
                <TableCell>
                  <Badge color="green">활성</Badge>
                </TableCell>
                <TableCell className="text-sm text-slate-600">관리자</TableCell>
                <TableCell className="text-sm text-right text-slate-600">1,200P</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm font-medium text-slate-900">이영희</TableCell>
                <TableCell>
                  <Badge color="blue">진행 중</Badge>
                </TableCell>
                <TableCell className="text-sm text-slate-600">편집자</TableCell>
                <TableCell className="text-sm text-right text-slate-600">850P</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-sm font-medium text-slate-900">박민수</TableCell>
                <TableCell>
                  <Badge color="slate">비활성</Badge>
                </TableCell>
                <TableCell className="text-sm text-slate-600">뷰어</TableCell>
                <TableCell className="text-sm text-right text-slate-600">320P</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Alerts */}
      <Card title="Alerts" subtitle="알림 및 메시지 컴포넌트">
        <div className="space-y-3">
          <Alert variant="info" title="정보">
            이것은 정보성 알림 메시지입니다.
          </Alert>
          <Alert variant="success" title="성공">
            작업이 성공적으로 완료되었습니다.
          </Alert>
          <Alert variant="warning" title="경고">
            주의가 필요한 사항이 있습니다.
          </Alert>
          <Alert variant="error" title="오류">
            오류가 발생했습니다. 다시 시도해주세요.
          </Alert>
        </div>
      </Card>

      {/* Cards */}
      <Card title="Cards" subtitle="카드 컨테이너 컴포넌트">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card padding="sm">
            <h3 className="text-sm text-slate-900 mb-1">Small Padding</h3>
            <p className="text-xs text-slate-600">작은 패딩을 가진 카드입니다.</p>
          </Card>
          <Card padding="md">
            <h3 className="text-sm text-slate-900 mb-1">Medium Padding</h3>
            <p className="text-xs text-slate-600">중간 패딩을 가진 카드입니다.</p>
          </Card>
          <Card padding="lg">
            <h3 className="text-sm text-slate-900 mb-1">Large Padding</h3>
            <p className="text-xs text-slate-600">큰 패딩을 가진 카드입니다.</p>
          </Card>
        </div>
      </Card>

      {/* Color Palette */}
      <Card title="Color Palette" subtitle="프로젝트에서 사용하는 색상 팔레트">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm text-slate-700 mb-2">Primary Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="space-y-1">
                <div className="h-16 bg-blue-600 rounded-lg"></div>
                <p className="text-xs text-slate-600">Blue 600</p>
              </div>
              <div className="space-y-1">
                <div className="h-16 bg-cyan-600 rounded-lg"></div>
                <p className="text-xs text-slate-600">Cyan 600</p>
              </div>
              <div className="space-y-1">
                <div className="h-16 bg-indigo-600 rounded-lg"></div>
                <p className="text-xs text-slate-600">Indigo 600</p>
              </div>
              <div className="space-y-1">
                <div className="h-16 bg-sky-600 rounded-lg"></div>
                <p className="text-xs text-slate-600">Sky 600</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm text-slate-700 mb-2">Status Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="space-y-1">
                <div className="h-16 bg-green-600 rounded-lg"></div>
                <p className="text-xs text-slate-600">Success</p>
              </div>
              <div className="space-y-1">
                <div className="h-16 bg-red-600 rounded-lg"></div>
                <p className="text-xs text-slate-600">Danger</p>
              </div>
              <div className="space-y-1">
                <div className="h-16 bg-amber-600 rounded-lg"></div>
                <p className="text-xs text-slate-600">Warning</p>
              </div>
              <div className="space-y-1">
                <div className="h-16 bg-slate-600 rounded-lg"></div>
                <p className="text-xs text-slate-600">Neutral</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
