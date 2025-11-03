import type { Metadata } from 'next';
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
  return (
    <div className="min-h-screen bg-primary-background relative">
      {/* Hero Section */}
      <Hero
        title="My Presentations"
        subtitle="프레젠테이션 라이브러리"
        description="연구 및 프로젝트 프레젠테이션 컬렉션을 한눈에 확인하세요"
        size="large"
        align="center"
        className="relative overflow-hidden"
      >
        {/* Enhanced Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-semantic-indigo/20 via-primary-background via-semantic-blue/10 to-primary-background pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-background/80 via-transparent to-transparent pointer-events-none" />
        
        {/* Animated Grid Pattern - 더 세밀하게 */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              animation: 'grid-move 20s linear infinite',
            }} 
          />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-semantic-indigo/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-semantic-blue/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
      </Hero>

      {/* Main Content */}
      <div className="max-w-[var(--layout-page-max-width)] mx-auto p-[var(--spacing-page-padding-inline)] py-[var(--spacing-page-padding-block)]">
        {/* Statistics Section */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative overflow-hidden rounded-lg border border-primary-text/10 bg-gradient-to-br from-semantic-indigo/5 to-semantic-indigo/0 p-6 backdrop-blur-sm transition-all hover:border-semantic-indigo/30 hover:shadow-lg hover:shadow-semantic-indigo/10">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-semantic-indigo/20 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <Typography variant="small" color="muted" className="mb-1">
                  총 프레젠테이션
                </Typography>
                <Typography variant="title4" weight="bold">
                  {presentations.length}개
                </Typography>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg border border-primary-text/10 bg-gradient-to-br from-semantic-blue/5 to-semantic-blue/0 p-6 backdrop-blur-sm transition-all hover:border-semantic-blue/30 hover:shadow-lg hover:shadow-semantic-blue/10">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-semantic-blue/20 flex items-center justify-center">
                <span className="text-2xl">📁</span>
              </div>
              <div>
                <Typography variant="small" color="muted" className="mb-1">
                  카테고리
                </Typography>
                <Typography variant="title4" weight="bold">
                  {Object.keys(groupedPresentations).length}개
                </Typography>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-lg border border-primary-text/10 bg-gradient-to-br from-semantic-green/5 to-semantic-green/0 p-6 backdrop-blur-sm transition-all hover:border-semantic-green/30 hover:shadow-lg hover:shadow-semantic-green/10">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-semantic-green/20 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <Typography variant="small" color="muted" className="mb-1">
                  최신 업데이트
                </Typography>
                <Typography variant="title4" weight="bold">
                  {presentations[0]?.date || 'N/A'}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* 프레젠테이션 목록 */}
        <div className="space-y-20">
          {Object.entries(groupedPresentations).map(([category, items], categoryIndex) => (
            <section 
              key={category} 
              className="space-y-8 animate-fade-in-up"
              style={{
                animationDelay: `${categoryIndex * 0.1}s`,
              }}
            >
              {/* Enhanced Category Header */}
              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-semantic-indigo/20 to-semantic-blue/20 rounded-xl blur-xl opacity-50" />
                    <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-semantic-indigo/10 to-semantic-blue/10 border border-semantic-indigo/20 flex items-center justify-center text-4xl backdrop-blur-sm">
                      {categoryIcons[category] || '📄'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <Typography as="h2" variant="title2" weight="bold" className="mb-1">
                        {categoryLabels[category] || category}
                      </Typography>
                      <Badge variant="indigo" size="small">
                        {items.length}개
                      </Badge>
                    </div>
                    <div className="h-1 w-20 bg-gradient-to-r from-semantic-indigo to-semantic-blue rounded-full mt-2" />
                  </div>
                </div>
              </div>

              {/* Enhanced Presentation Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {items.map((presentation, index) => (
                  <Card
                    key={presentation.id}
                    variant="outlined"
                    padding="large"
                    className={cn(
                      'group relative overflow-hidden',
                      'hover:border-semantic-indigo/50',
                      'hover:shadow-2xl hover:shadow-semantic-indigo/20',
                      'transition-all duration-500 ease-out',
                      'transform hover:-translate-y-2',
                      'backdrop-blur-sm',
                      'animate-fade-in-up',
                      'border-primary-text/10'
                    )}
                    style={{
                      animationDelay: `${(categoryIndex * 0.1) + (index * 0.1) + 0.2}s`,
                    }}
                  >
                    {/* Enhanced Gradient Background */}
                    <div 
                      className={cn(
                        'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                        'bg-gradient-to-br',
                        colorStyles[presentation.color || 'indigo']
                      )}
                    />
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <CardTitle className="flex-1 group-hover:text-semantic-indigo transition-colors duration-300 leading-tight">
                            {presentation.title}
                          </CardTitle>
                          <Badge 
                            variant={presentation.color === 'blue' ? 'blue' : 'indigo'} 
                            size="small"
                            className="shrink-0 shadow-lg"
                          >
                            {presentation.date}
                          </Badge>
                        </div>
                        {/* Category Indicator */}
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            'w-2 h-2 rounded-full',
                            presentation.color === 'blue' ? 'bg-semantic-blue' : 'bg-semantic-indigo'
                          )} />
                          <Typography variant="mini" color="muted">
                            {categoryLabels[presentation.category]}
                          </Typography>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        {presentation.description && (
                          <div className="relative">
                            <Typography 
                              variant="small" 
                              color="muted"
                              className="line-clamp-3 leading-relaxed"
                            >
                              {presentation.description}
                            </Typography>
                          </div>
                        )}
                        
                        {/* Enhanced Button with Arrow */}
                        <a
                          href={presentation.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'group/button relative overflow-hidden',
                            'font-regular font-medium border-0 cursor-pointer',
                            'transition-all duration-300 ease-out',
                            'inline-flex items-center justify-center gap-2',
                            'focus-visible:outline-none focus-visible:ring-2',
                            'focus-visible:ring-semantic-indigo focus-visible:ring-offset-2',
                            'bg-gradient-to-r from-semantic-indigo to-semantic-blue',
                            'text-primary-white',
                            'hover:from-semantic-indigo/90 hover:to-semantic-blue/90',
                            'hover:scale-[1.02] hover:shadow-xl hover:shadow-semantic-indigo/30',
                            'active:scale-98',
                            'px-6 py-3 text-regular rounded-lg min-h-[48px] w-full',
                            'shadow-lg shadow-semantic-indigo/20'
                          )}
                        >
                          {/* Button Shine Effect */}
                          <div className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover/button:translate-x-[200%] transition-transform duration-1000" />
                          <span className="relative z-10">프레젠테이션 보기</span>
                          <svg 
                            className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover/button:translate-x-1" 
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
                      </CardContent>
                    </div>

                    {/* Enhanced Decorative Corner */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-semantic-indigo/10 via-transparent to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-2 h-2 bg-semantic-indigo rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Enhanced Footer Section */}
        <footer className="mt-24 pt-12 border-t border-primary-text/10 relative">
          {/* Footer Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-background via-transparent to-transparent pointer-events-none opacity-50" />
          
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <Typography variant="regular" weight="semibold" className="mb-1">
                    총 {presentations.length}개의 프레젠테이션
                  </Typography>
                  <Typography variant="small" color="muted">
                    지속적으로 업데이트 중
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-text/5 border border-primary-text/10">
                  <Typography variant="small" color="muted">
                    Powered by
                  </Typography>
                  <div className="flex items-center gap-2">
                    <span className="text-semantic-indigo font-semibold">Next.js</span>
                    <span className="text-primary-text/30">•</span>
                    <span className="text-semantic-blue font-semibold">Reveal.js</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Line */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary-text/10 to-transparent" />
          </div>
        </footer>
      </div>

    </div>
  );
}
