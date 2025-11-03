import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Typography,
  Badge,
} from '@/lib/ui';
import { cn } from '@/lib/utils/cn';

// 프레젠테이션 데이터 구조
interface Presentation {
  id: string;
  title: string;
  date: string;
  category: string;
  path: string;
  description?: string;
}

// 프레젠테이션 목록
const presentations: Presentation[] = [
  {
    id: 'aiv-2025-0926',
    title: 'AI 바우처 현장방문',
    date: '2025-09-29',
    category: 'aiv-2025',
    path: '/my-presentations/aiv-2025/0926/index.html',
    description: '데이터 수집 및 정제 작업, PointNet과 Point2CAD에 관한 프레젠테이션',
  },
  {
    id: 'lab-meeting-250917',
    title: 'Lab Meeting - Camera Matrix',
    date: '2025-09-17',
    category: 'lab-meetings',
    path: '/my-presentations/lab-meetings/250917/index.html',
    description: '카메라 행렬(Camera Matrix)에 관한 프레젠테이션',
  },
];

// 카테고리별로 그룹화
const groupedPresentations = presentations.reduce(
  (acc, presentation) => {
    if (!acc[presentation.category]) {
      acc[presentation.category] = [];
    }
    acc[presentation.category].push(presentation);
    return acc;
  },
  {} as Record<string, Presentation[]>
);

const categoryLabels: Record<string, string> = {
  'aiv-2025': 'AI 바우처',
  'lab-meetings': 'Lab Meetings',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary-background">
      <div className="max-w-[var(--layout-page-max-width)] mx-auto p-[var(--spacing-page-padding-inline)] py-[var(--spacing-page-padding-block)]">
        {/* Header */}
        <div className="space-y-4 mb-12">
          <Typography as="h1" variant="title4" weight="bold">
            My Presentations
          </Typography>
          <Typography variant="regular" color="muted">
            프레젠테이션 바로가기 모음
          </Typography>
        </div>

        {/* 프레젠테이션 목록 */}
        <div className="space-y-10">
          {Object.entries(groupedPresentations).map(([category, items]) => (
            <section key={category} className="space-y-4">
              <Typography as="h2" variant="title2" weight="semibold">
                {categoryLabels[category] || category}
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((presentation) => (
                  <Card
                    key={presentation.id}
                    variant="outlined"
                    padding="large"
                    className="hover:border-semantic-indigo transition-colors"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="flex-1">
                          {presentation.title}
                        </CardTitle>
                        <Badge variant="blue" size="small">
                          {presentation.date}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {presentation.description && (
                        <Typography variant="small" color="muted">
                          {presentation.description}
                        </Typography>
                      )}
                      <a
                        href={presentation.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'font-regular font-medium border-0 cursor-pointer',
                          'transition-all duration-150 ease-out',
                          'inline-flex items-center justify-center gap-2',
                          'focus-visible:outline-none focus-visible:ring-2',
                          'focus-visible:ring-semantic-indigo focus-visible:ring-offset-2',
                          'bg-semantic-indigo text-primary-white',
                          'hover:opacity-90 active:opacity-80',
                          'px-4 py-2 text-regular rounded-medium min-h-[44px] w-full'
                        )}
                      >
                        프레젠테이션 보기
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

