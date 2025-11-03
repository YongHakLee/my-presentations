'use client';

import {
  Hero,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardImage,
  Typography,
  Badge,
  Footer,
  Input,
  Button,
} from '@/lib/ui';
import Link from 'next/link';
import { useState, useMemo } from 'react';

// basePath를 고려한 경로 헬퍼
// Link 컴포넌트는 basePath를 자동으로 추가하지만, img src는 수동으로 추가해야 함
const basePath = process.env.NODE_ENV === 'production' ? '/my-presentations' : '';

// 프레젠테이션 데이터
const presentations = [
  {
    id: 'aiv-2025-0926',
    title: 'AI 바우처 현장방문',
    date: '2025-09-29',
    category: 'AI 바우처',
    description: 'PointNet과 Point2CAD를 활용한 3D 데이터 수집 및 정제 작업',
    topics: [
      'PointNet 핵심 아이디어와 아키텍처',
      'Point2CAD 파이프라인 및 워크플로우',
      '성능 지표 및 정확도 평가',
    ],
    path: '/aiv-2025/0926/index.html', // Link는 basePath 자동 추가
    thumbnail: `${basePath}/aiv-2025/0926/imgs/pointnet-01.png`, // img는 수동 추가
    color: 'indigo' as const,
  },
  {
    id: 'lab-meeting-250917',
    title: 'Camera Matrix',
    date: '2025-09-17',
    category: 'Lab Meeting',
    description: '카메라 행렬과 핀홀 카메라 모델에 대한 이해',
    topics: [
      'Intrinsic Matrix 개념 및 수식',
      'Extrinsic Matrix와 좌표 변환',
      '동차 좌표계 활용',
    ],
    path: '/lab-meetings/250917/index.html', // Link는 basePath 자동 추가
    thumbnail: `${basePath}/lab-meetings/250917/imgs/pinhole_camera.png`, // img는 수동 추가
    color: 'green' as const,
  },
];

const categories = ['전체', ...Array.from(new Set(presentations.map((p) => p.category)))];

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  // 필터링 및 정렬된 프레젠테이션
  const filteredAndSortedPresentations = useMemo(() => {
    let filtered = presentations;

    // 카테고리 필터
    if (selectedCategory !== '전체') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // 검색 필터
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.topics.some((topic) => topic.toLowerCase().includes(query))
      );
    }

    // 정렬
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-bg to-secondary-bg">
      {/* Hero Section */}
      <Hero
        title="My Presentations"
        subtitle="프레젠테이션 모음집"
        description="연구 발표 및 학습 자료를 한곳에서 확인하세요"
        size="large"
        align="center"
      />

      {/* Presentations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter Controls */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <Input
              type="search"
              placeholder="프레젠테이션 검색... (제목, 설명, 주요 내용)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />
          </div>

          {/* Category Filter and Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Typography variant="small" weight="semibold" color="muted">
                카테고리:
              </Typography>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-accent text-white'
                      : 'bg-secondary-bg text-secondary-text hover:bg-tertiary-bg'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <Typography variant="small" weight="semibold" color="muted">
                정렬:
              </Typography>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none px-4 py-2 pr-10 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-accent transition-all cursor-pointer"
                  style={{
                    backgroundColor: 'rgb(31, 33, 36)',
                    borderColor: 'rgb(55, 58, 64)',
                    color: 'rgb(220, 225, 230)',
                  }}
                >
                  <option 
                    value="date-desc"
                    style={{
                      backgroundColor: 'rgb(31, 33, 36)',
                      color: 'rgb(220, 225, 230)',
                    }}
                  >
                    최신순
                  </option>
                  <option 
                    value="date-asc"
                    style={{
                      backgroundColor: 'rgb(31, 33, 36)',
                      color: 'rgb(220, 225, 230)',
                    }}
                  >
                    오래된순
                  </option>
                  <option 
                    value="title-asc"
                    style={{
                      backgroundColor: 'rgb(31, 33, 36)',
                      color: 'rgb(220, 225, 230)',
                    }}
                  >
                    제목순 (A-Z)
                  </option>
                  <option 
                    value="title-desc"
                    style={{
                      backgroundColor: 'rgb(31, 33, 36)',
                      color: 'rgb(220, 225, 230)',
                    }}
                  >
                    제목순 (Z-A)
                  </option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center">
            <Typography variant="regular" color="muted">
              {filteredAndSortedPresentations.length}개의 프레젠테이션
              {searchQuery && ` (검색: "${searchQuery}")`}
            </Typography>
          </div>
        </div>

        {/* Presentations Grid */}
        {filteredAndSortedPresentations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAndSortedPresentations.map((presentation) => (
              <Link
                key={presentation.id}
                href={presentation.path}
                className="group animate-fade-in-up"
              >
                <Card
                  variant="outlined"
                  padding="none"
                  className="h-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-primary-accent overflow-hidden"
                >
                  {/* Thumbnail Image */}
                  <CardImage
                    src={presentation.thumbnail}
                    alt={presentation.title}
                    aspectRatio="video"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Content */}
                  <div className="p-6">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <CardTitle as="h3" className="group-hover:text-primary-accent transition-colors">
                          {presentation.title}
                        </CardTitle>
                        <Badge variant={presentation.color} dot>
                          {presentation.category}
                        </Badge>
                      </div>
                      <Typography variant="small" color="muted">
                        📅 {presentation.date}
                      </Typography>
                    </CardHeader>

                    <CardContent>
                      <Typography variant="regular" className="mb-4 line-clamp-2">
                        {presentation.description}
                      </Typography>

                      <div className="space-y-2">
                        <Typography
                          variant="small"
                          weight="semibold"
                          color="muted"
                        >
                          📌 주요 내용:
                        </Typography>
                        <ul className="space-y-1.5">
                          {presentation.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary-accent mt-1 flex-shrink-0">•</span>
                              <Typography variant="small" color="muted" className="line-clamp-1">
                                {topic}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex items-center gap-2 text-primary-accent group-hover:gap-3 transition-all">
                        <Typography
                          variant="small"
                          weight="semibold"
                          color="accent"
                        >
                          프레젠테이션 보기
                        </Typography>
                        <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <Typography variant="title6" weight="semibold" className="mb-2">
              검색 결과가 없습니다
            </Typography>
            <Typography variant="regular" color="muted">
              다른 키워드로 검색해보세요
            </Typography>
            {(searchQuery || selectedCategory !== '전체') && (
              <Button
                variant="outline"
                size="medium"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('전체');
                }}
                className="mt-4"
              >
                필터 초기화
              </Button>
            )}
          </div>
        )}
      </section>

      {/* Footer */}
      <Footer
        logo={null}
        description="연구 발표 및 학습 자료 아카이브"
        copyright="© 2025 All rights reserved."
      />
    </main>
  );
}

