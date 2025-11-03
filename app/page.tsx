import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Typography,
  Badge,
  Hero,
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
    title: 'AI 바우처 현장방문',
    date: '2025-09-29',
    category: 'aiv-2025',
    path: '/my-presentations/aiv-2025/0926/index.html',
    description: '데이터 수집 및 정제 작업, PointNet과 Point2CAD에 관한 프레젠테이션',
    color: 'indigo',
  },
  {
    id: 'lab-meeting-250917',
    title: 'Lab Meeting - Camera Matrix',
    date: '2025-09-17',
    category: 'lab-meetings',
    path: '/my-presentations/lab-meetings/250917/index.html',
    description: '카메라 행렬(Camera Matrix)에 관한 프레젠테이션',
    color: 'blue',
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

const categoryIcons: Record<string, string> = {
  'aiv-2025': '🤖',
  'lab-meetings': '🔬',
};

const colorStyles: Record<string, string> = {
  indigo: 'from-semantic-indigo/20 to-semantic-indigo/5',
  blue: 'from-semantic-blue/20 to-semantic-blue/5',
  green: 'from-semantic-green/20 to-semantic-green/5',
  orange: 'from-semantic-orange/20 to-semantic-orange/5',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-primary-background">
      {/* Hero Section */}
      <Hero
        title="My Presentations"
        subtitle="프레젠테이션 라이브러리"
        description="연구 및 프로젝트 프레젠테이션 컬렉션을 한눈에 확인하세요"
        size="medium"
        align="center"
        className="relative overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-semantic-indigo/10 via-primary-background to-semantic-blue/10 pointer-events-none" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>
      </Hero>

      {/* Main Content */}
      <div className="max-w-[var(--layout-page-max-width)] mx-auto p-[var(--spacing-page-padding-inline)] py-[var(--spacing-page-padding-block)]">
        {/* 프레젠테이션 목록 */}
        <div className="space-y-16">
          {Object.entries(groupedPresentations).map(([category, items], categoryIndex) => (
            <section 
              key={category} 
              className="space-y-6 animate-fade-in-up"
              style={{
                animationDelay: `${categoryIndex * 0.1}s`,
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <span className="text-4xl" role="img" aria-label={category}>
                  {categoryIcons[category] || '📄'}
                </span>
                <div>
                  <Typography as="h2" variant="title3" weight="bold">
                    {categoryLabels[category] || category}
                  </Typography>
                  <Typography variant="small" color="muted">
                    {items.length}개의 프레젠테이션
                  </Typography>
                </div>
              </div>

              {/* Presentation Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((presentation, index) => (
                  <Card
                    key={presentation.id}
                    variant="outlined"
                    padding="large"
                    className={cn(
                      'group relative overflow-hidden',
                      'hover:border-semantic-indigo/50',
                      'hover:shadow-lg hover:shadow-semantic-indigo/10',
                      'transition-all duration-300 ease-out',
                      'transform hover:-translate-y-1',
                      'animate-fade-in-up'
                    )}
                    style={{
                      animationDelay: `${(categoryIndex * 0.1) + (index * 0.1) + 0.2}s`,
                    }}
                  >
                    {/* Gradient Background */}
                    <div 
                      className={cn(
                        'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                        'bg-gradient-to-br',
                        colorStyles[presentation.color || 'indigo']
                      )}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <CardTitle className="flex-1 group-hover:text-semantic-indigo transition-colors">
                            {presentation.title}
                          </CardTitle>
                          <Badge 
                            variant={presentation.color === 'blue' ? 'blue' : 'indigo'} 
                            size="small"
                            className="shrink-0"
                          >
                            {presentation.date}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {presentation.description && (
                          <Typography 
                            variant="small" 
                            color="muted"
                            className="line-clamp-2"
                          >
                            {presentation.description}
                          </Typography>
                        )}
                        
                        {/* Button with Arrow */}
                        <a
                          href={presentation.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'group/button font-regular font-medium border-0 cursor-pointer',
                            'transition-all duration-200 ease-out',
                            'inline-flex items-center justify-center gap-2',
                            'focus-visible:outline-none focus-visible:ring-2',
                            'focus-visible:ring-semantic-indigo focus-visible:ring-offset-2',
                            'bg-semantic-indigo text-primary-white',
                            'hover:bg-semantic-indigo/90 hover:scale-105',
                            'active:scale-95 active:opacity-80',
                            'px-4 py-2 text-regular rounded-medium min-h-[44px] w-full',
                            'shadow-md shadow-semantic-indigo/20'
                          )}
                        >
                          프레젠테이션 보기
                          <svg 
                            className="w-4 h-4 transition-transform duration-200 group-hover/button:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M9 5l7 7-7 7" 
                            />
                          </svg>
                        </a>
                      </CardContent>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-semantic-indigo/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer Section */}
        <footer className="mt-20 pt-12 border-t border-primary-text/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Typography variant="small" color="muted">
              총 {presentations.length}개의 프레젠테이션
            </Typography>
            <Typography variant="small" color="muted">
              Powered by Next.js & Reveal.js
            </Typography>
          </div>
        </footer>
      </div>

    </div>
  );
}
