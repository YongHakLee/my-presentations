import type { Metadata } from 'next';
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
  color?: string;
}

// 프레젠테이션 목록
const presentations: Presentation[] = [
  {
    id: 'aiv-2025-0926',
    title: '2025-09-29 AI 바우처 현장방문',
    date: '2025-09-29',
    category: 'aiv-2025',
    path: '/my-presentations/aiv-2025/0926/index.html',
    description: '데이터 수집 및 정제 작업, PointNet과 Point2CAD에 관한 프레젠테이션',
    color: 'indigo',
  },
  {
    id: 'lab-meeting-250917',
    title: '2025-09-17 Lab Meeting: Camera Matrix',
    date: '2025-09-17',
    category: 'lab-meetings',
    path: '/my-presentations/lab-meetings/250917/index.html',
    description: '카메라 행렬(Camera Matrix)에 관한 프레젠테이션',
    color: 'blue',
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const categoryLabels: Record<string, string> = {
  'aiv-2025': 'AI 바우처',
  'lab-meetings': 'Lab Meetings',
};

const badgeVariants: Record<string, 'indigo' | 'blue' | 'green' | 'orange'> = {
  'aiv-2025': 'indigo',
  'lab-meetings': 'blue',
};

// 페이지 메타데이터 설정
export const metadata: Metadata = {
  title: 'My Presentations | 프레젠테이션 라이브러리',
  description: '연구 및 프로젝트 프레젠테이션 컬렉션을 한눈에 확인하세요',
  openGraph: {
    title: 'My Presentations',
    description: '연구 및 프로젝트 프레젠테이션 컬렉션을 한눈에 확인하세요',
    type: 'website',
  },
};

export default function HomePage() {
  // 날짜별로 그룹화
  const groupedByDate = presentations.reduce(
    (acc, presentation) => {
      const yearMonth = presentation.date.substring(0, 7); // YYYY-MM
      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(presentation);
      return acc;
    },
    {} as Record<string, Presentation[]>
  );

  const sortedDates = Object.keys(groupedByDate).sort().reverse();

  return (
    <div className="min-h-screen bg-primary-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-primary-text/10 bg-primary-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <Typography as="h1" variant="title3" weight="bold" className="mb-2">
                My Presentations
              </Typography>
              <Typography variant="regular" color="muted">
                연구 및 프로젝트 프레젠테이션 컬렉션
              </Typography>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <Typography variant="title5" weight="bold">
                  {presentations.length}
                </Typography>
                <Typography variant="mini" color="muted">
                  프레젠테이션
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Timeline Style */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-semantic-indigo/20 via-semantic-blue/20 to-transparent hidden md:block" />

          {/* Presentations by Date */}
          <div className="space-y-16">
            {sortedDates.map((yearMonth, dateIndex) => {
              const monthPresentations = groupedByDate[yearMonth];
              const [year, month] = yearMonth.split('-');
              const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ];
              const monthName = monthNames[parseInt(month) - 1];

              return (
                <div key={yearMonth} className="relative">
                  {/* Date Header */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-semantic-indigo/20 to-semantic-blue/20 border-2 border-semantic-indigo/30 flex items-center justify-center backdrop-blur-sm hidden md:flex">
                      <div className="w-3 h-3 rounded-full bg-semantic-indigo" />
                    </div>
                    <div>
                      <Typography variant="title4" weight="bold" className="mb-1">
                        {monthName} {year}
                      </Typography>
                      <Typography variant="small" color="muted">
                        {monthPresentations.length} presentation{monthPresentations.length > 1 ? 's' : ''}
                      </Typography>
                    </div>
                  </div>

                  {/* Presentations List */}
                  <div className="space-y-6 ml-0 md:ml-24">
                    {monthPresentations.map((presentation, index) => (
                      <div
                        key={presentation.id}
                        className={cn(
                          'group relative',
                          'transition-all duration-300',
                          'hover:translate-x-2'
                        )}
                      >
                        <Card
                          variant="outlined"
                          padding="large"
                          className={cn(
                            'relative overflow-hidden',
                            'border-primary-text/10',
                            'hover:border-primary-text/20',
                            'transition-all duration-300',
                            'bg-primary-background/50 backdrop-blur-sm',
                            'hover:shadow-xl hover:shadow-semantic-indigo/10'
                          )}
                        >
                          {/* Left Border Accent */}
                          <div
                            className={cn(
                              'absolute left-0 top-0 bottom-0 w-1',
                              'opacity-60 group-hover:opacity-100',
                              'transition-opacity duration-300',
                              presentation.category === 'aiv-2025' && 'bg-semantic-indigo',
                              presentation.category === 'lab-meetings' && 'bg-semantic-blue'
                            )}
                          />

                          {/* Content */}
                          <div className="pl-6">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <Badge
                                      variant={badgeVariants[presentation.category] || 'indigo'}
                                      size="small"
                                    >
                                      {categoryLabels[presentation.category]}
                                    </Badge>
                                    <Typography variant="mini" color="muted">
                                      {presentation.date}
                                    </Typography>
                                  </div>
                                  <CardTitle className="text-left leading-tight mb-2 group-hover:text-semantic-indigo transition-colors duration-300">
                                    {presentation.title}
                                  </CardTitle>
                                </div>
                              </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                              {presentation.description && (
                                <Typography
                                  variant="regular"
                                  color="muted"
                                  className="leading-relaxed"
                                >
                                  {presentation.description}
                                </Typography>
                              )}

                              <div className="flex items-center gap-3 pt-2">
                                <a
                                  href={presentation.path}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn(
                                    'group/btn inline-flex items-center gap-2',
                                    'font-regular font-medium',
                                    'px-6 py-3 rounded-lg',
                                    'bg-semantic-indigo text-primary-white',
                                    'hover:opacity-90 active:opacity-80',
                                    'transition-all duration-200',
                                    'focus-visible:outline-none focus-visible:ring-2',
                                    'focus-visible:ring-semantic-indigo focus-visible:ring-offset-2',
                                    'shadow-lg shadow-semantic-indigo/20 hover:shadow-xl hover:shadow-semantic-indigo/30'
                                  )}
                                >
                                  <span>View Presentation</span>
                                  <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                  </svg>
                                </a>
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Empty State (if no presentations) */}
        {presentations.length === 0 && (
          <div className="text-center py-24">
            <Typography variant="title5" weight="medium" color="muted" className="mb-4">
              No presentations yet
            </Typography>
            <Typography variant="regular" color="muted">
              Presentations will appear here when added.
            </Typography>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-primary-text/10">
          <div>
            <Typography variant="regular" weight="semibold" className="mb-1">
              총 {presentations.length}개의 프레젠테이션
            </Typography>
            <Typography variant="small" color="muted">
              지속적으로 업데이트 중
            </Typography>
          </div>
        </footer>
      </main>
    </div>
  );
}

