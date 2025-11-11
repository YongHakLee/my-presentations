"use client";

import { Hero, Typography, Footer } from "@/lib/ui";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CardImage } from "@/components/ui/card-image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState, useMemo } from "react";

// basePath를 고려한 경로 헬퍼
// Link 컴포넌트는 basePath를 자동으로 추가하지만, img src는 수동으로 추가해야 함
const basePath =
  process.env.NODE_ENV === "production" ? "/my-presentations" : "";

// 프레젠테이션 데이터
const presentations = [
  {
    id: "251113-ansan-connect",
    title: "SqueezeFace: 3D LiDAR 기반 얼굴 인식",
    date: "2025-11-13",
    category: "안산 커넥트",
    description: "3D LiDAR 센서와 딥러닝을 활용한 스푸핑 방지 얼굴 인식 기술",
    topics: [
      "2D 얼굴 인식의 스푸핑 공격 문제",
      "3D LiDAR 센서를 통한 근본적 해결",
      "SAC 블록 기반 네트워크 아키텍처",
    ],
    path: "/251113-ansan-connect/index.html",
    thumbnail: `${basePath}/251113-ansan-connect/thumbnail.png`, // 임시 썸네일 - 프로젝트 루트 이미지 사용
    color: "purple" as const,
  },
  {
    id: "lab-meeting-251112",
    title: "MCP (Model Context Protocol) and TIPS",
    date: "2025-11-12",
    category: "Lab Meeting",
    description: "AI 에이전트와 외부 도구를 연결하는 MCP 도구 생태계 소개",
    topics: [
      "Sequential-Thinking: 단계별 사고 보조 도구",
      "Playwright: 웹 브라우저 자동화",
      "Context7: 최신 기술 문서 실시간 제공",
      "MagicUI: UI 컴포넌트 탐색 및 코드 생성",
      "Chrome DevTools: 디버깅 및 성능 분석",
    ],
    path: "/lab-meetings/251112/index.html",
    thumbnail: `${basePath}/lab-meetings/251112/thumbnail.png`,
    color: "blue" as const,
  },
  {
    id: "aiv-2025-0926",
    title: "AI 바우처 현장방문",
    date: "2025-09-29",
    category: "AI 바우처",
    description: "PointNet과 Point2CAD를 활용한 3D 데이터 수집 및 정제 작업",
    topics: [
      "PointNet 핵심 아이디어와 아키텍처",
      "Point2CAD 파이프라인 및 워크플로우",
      "성능 지표 및 정확도 평가",
    ],
    path: "/aiv-2025/0926/index.html", // Link는 basePath 자동 추가
    thumbnail: `${basePath}/aiv-2025/0926/thumbnail.png`, // img는 수동 추가
    color: "indigo" as const,
  },
  {
    id: "lab-meeting-250917",
    title: "Camera Matrix",
    date: "2025-09-17",
    category: "Lab Meeting",
    description: "카메라 행렬과 핀홀 카메라 모델에 대한 이해",
    topics: [
      "Intrinsic Matrix 개념 및 수식",
      "Extrinsic Matrix와 좌표 변환",
      "동차 좌표계 활용",
    ],
    path: "/lab-meetings/250917/index.html", // Link는 basePath 자동 추가
    thumbnail: `${basePath}/lab-meetings/250917/thumbnail.png`, // img는 수동 추가
    color: "green" as const,
  },
];

const categories = [
  "전체",
  ...Array.from(new Set(presentations.map((p) => p.category))),
];

type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");

  // 필터링 및 정렬된 프레젠테이션
  const filteredAndSortedPresentations = useMemo(() => {
    let filtered = presentations;

    // 카테고리 필터
    if (selectedCategory !== "전체") {
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
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
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
        title="YongHakLee's Presentations"
        subtitle=""
        description=""
        size="large"
        align="center"
        titleClassName="text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem]"
        primaryAction={{
          label: "프레젠테이션 보기",
          onClick: () =>
            document
              .getElementById("presentations")
              ?.scrollIntoView({ behavior: "smooth" }),
        }}
        secondaryAction={{
          label: "최신 발표",
          href: presentations[0].path,
        }}
        className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-shift"
      />

      {/* Presentations Section */}
      <section
        id="presentations"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* Search and Filter Controls */}
        <Card className="mb-12 p-6 shadow-lg border-primary/20 bg-card/50 backdrop-blur-sm">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Input
                type="search"
                placeholder="프레젠테이션 검색... (제목, 설명, 주요 내용)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 text-base"
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
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-primary-accent text-white shadow-md scale-105"
                        : "bg-secondary-bg text-secondary-text hover:bg-tertiary-bg hover:scale-105 hover:shadow"
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
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="정렬 방식" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">최신순</SelectItem>
                    <SelectItem value="date-asc">오래된순</SelectItem>
                    <SelectItem value="title-asc">제목순 (A-Z)</SelectItem>
                    <SelectItem value="title-desc">제목순 (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
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
        </Card>

        {/* Presentations Grid */}
        {filteredAndSortedPresentations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAndSortedPresentations.map((presentation) => (
              <Link
                key={presentation.id}
                href={presentation.path}
                className="group animate-fade-in-up"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-primary overflow-hidden">
                  {/* Thumbnail Image */}
                  <CardImage
                    src={presentation.thumbnail}
                    alt={presentation.title}
                    aspectRatio="video"
                  />

                  {/* Content */}
                  <div className="p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {presentation.title}
                        </CardTitle>
                        <Badge variant={presentation.color as any}>
                          {presentation.category}
                        </Badge>
                      </div>
                      <Typography variant="small" color="muted">
                        📅 {presentation.date}
                      </Typography>
                    </CardHeader>

                    <CardContent className="p-0">
                      <Typography
                        variant="regular"
                        className="mb-4 line-clamp-2"
                      >
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
                              <span className="text-primary-accent mt-1 flex-shrink-0">
                                •
                              </span>
                              <Typography
                                variant="small"
                                color="muted"
                                className="line-clamp-1"
                              >
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
                        <span className="text-lg group-hover:translate-x-1 transition-transform">
                          →
                        </span>
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
            {(searchQuery || selectedCategory !== "전체") && (
              <Button
                variant="outline"
                size="default"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("전체");
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
        description="YongHakLee's Presentations"
        copyright="© 2025 All rights reserved."
      />
    </main>
  );
}
