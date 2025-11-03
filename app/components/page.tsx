'use client';

import React, { useState } from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardImage,
  Badge,
  Typography,
  Carousel,
  Navbar,
  Footer,
  Hero,
} from '@/lib/ui';

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 10) {
      setInputError('10자 이하로 입력해주세요');
    } else {
      setInputError('');
    }
  };

  return (
    <div className="min-h-screen bg-primary-background p-[var(--spacing-page-padding-inline)] py-[var(--spacing-page-padding-block)]">
      <div className="max-w-[var(--layout-page-max-width)] mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <Typography as="h1" variant="title4" weight="bold">
            컴포넌트 라이브러리
          </Typography>
          <Typography variant="regular" color="muted">
            프로젝트 전반에서 사용할 재사용 가능한 컴포넌트들의 데모입니다.
          </Typography>
        </div>

        {/* Typography Section */}
        <section className="space-y-6">
          <Card variant="outlined" padding="large">
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Typography variant="title9" weight="bold">
                    Title 9 - 4.5rem
                  </Typography>
                  <Typography variant="title8" weight="bold">
                    Title 8 - 4rem
                  </Typography>
                  <Typography variant="title7" weight="bold">
                    Title 7 - 3.5rem
                  </Typography>
                  <Typography variant="title6" weight="bold">
                    Title 6 - 3rem
                  </Typography>
                  <Typography variant="title5" weight="bold">
                    Title 5 - 2.5rem
                  </Typography>
                  <Typography variant="title4" weight="bold">
                    Title 4 - 2rem
                  </Typography>
                  <Typography variant="title3" weight="semibold">
                    Title 3 - 1.5rem
                  </Typography>
                  <Typography variant="title2" weight="semibold">
                    Title 2 - 1.3125rem
                  </Typography>
                  <Typography variant="title1" weight="semibold">
                    Title 1 - 1.0625rem
                  </Typography>
                  <Typography variant="large">Large - 1.125rem</Typography>
                  <Typography variant="regular">Regular - 0.9375rem</Typography>
                  <Typography variant="small">Small - 0.8125rem</Typography>
                  <Typography variant="mini">Mini - 0.75rem</Typography>
                  <Typography variant="micro">Micro - 0.6875rem</Typography>
                  <Typography variant="tiny">Tiny - 0.625rem</Typography>
                </div>
                <div className="space-y-2 pt-4 border-t border-primary-text/10">
                  <Typography variant="regular" weight="light">
                    Light Weight
                  </Typography>
                  <Typography variant="regular" weight="normal">
                    Normal Weight
                  </Typography>
                  <Typography variant="regular" weight="medium">
                    Medium Weight
                  </Typography>
                  <Typography variant="regular" weight="semibold">
                    Semibold Weight
                  </Typography>
                  <Typography variant="regular" weight="bold">
                    Bold Weight
                  </Typography>
                </div>
                <div className="space-y-2 pt-4 border-t border-primary-text/10">
                  <Typography variant="regular" color="default">
                    Default Color
                  </Typography>
                  <Typography variant="regular" color="muted">
                    Muted Color
                  </Typography>
                  <Typography variant="regular" color="accent">
                    Accent Color
                  </Typography>
                </div>
                <div className="space-y-2 pt-4 border-t border-primary-text/10">
                  <Typography variant="regular" fontFamily="regular">
                    Regular Font Family
                  </Typography>
                  <Typography variant="regular" fontFamily="mono">
                    Mono Font Family
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Button Section */}
        <section className="space-y-6">
          <Card variant="outlined" padding="large">
            <CardHeader>
              <CardTitle>Button</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Typography variant="small" weight="semibold" color="muted">
                    Variants
                  </Typography>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <Typography variant="small" weight="semibold" color="muted">
                    Sizes
                  </Typography>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="small">Small</Button>
                    <Button size="medium">Medium</Button>
                    <Button size="large">Large</Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <Typography variant="small" weight="semibold" color="muted">
                    States
                  </Typography>
                  <div className="flex flex-wrap gap-3">
                    <Button disabled>Disabled</Button>
                    <Button isLoading>Loading</Button>
                    <Button fullWidth>Full Width</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Input Section */}
        <section className="space-y-6">
          <Card variant="outlined" padding="large">
            <CardHeader>
              <CardTitle>Input</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 max-w-md">
                <Input
                  label="Default Input"
                  placeholder="Placeholder text"
                  fullWidth
                />
                <Input
                  label="With Helper Text"
                  placeholder="Enter your email"
                  helperText="We'll never share your email"
                  fullWidth
                />
                <Input
                  label="With Error"
                  placeholder="Enter value"
                  value={inputValue}
                  onChange={handleInputChange}
                  error={inputError}
                  fullWidth
                />
                <Input
                  label="Disabled Input"
                  placeholder="Disabled input"
                  disabled
                  fullWidth
                />
                <Input
                  type="password"
                  label="Password Input"
                  placeholder="Enter password"
                  fullWidth
                />
                <Input
                  type="email"
                  label="Email Input"
                  placeholder="example@email.com"
                  fullWidth
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badge Section */}
        <section className="space-y-6">
          <Card variant="outlined" padding="large">
            <CardHeader>
              <CardTitle>Badge</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Typography variant="small" weight="semibold" color="muted">
                    Variants
                  </Typography>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="blue">Blue</Badge>
                    <Badge variant="green">Green</Badge>
                    <Badge variant="red">Red</Badge>
                    <Badge variant="orange">Orange</Badge>
                    <Badge variant="yellow">Yellow</Badge>
                    <Badge variant="indigo">Indigo</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <Typography variant="small" weight="semibold" color="muted">
                    With Dot
                  </Typography>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="blue" dot>New</Badge>
                    <Badge variant="green" dot>Active</Badge>
                    <Badge variant="red" dot>Urgent</Badge>
                    <Badge variant="orange" dot>Pending</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <Typography variant="small" weight="semibold" color="muted">
                    Sizes
                  </Typography>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge size="small">Small</Badge>
                    <Badge size="medium">Medium</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Card Section */}
        <section className="space-y-6">
          <Card variant="outlined" padding="large">
            <CardHeader>
              <CardTitle>Card</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card variant="default" padding="medium">
                    <CardHeader>
                      <CardTitle>Default Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      This is a default card with default variant and medium padding.
                    </CardContent>
                  </Card>
                  <Card variant="outlined" padding="medium">
                    <CardHeader>
                      <CardTitle>Outlined Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      This is an outlined card with more visible borders.
                    </CardContent>
                  </Card>
                  <Card variant="elevated" padding="large">
                    <CardHeader>
                      <CardTitle>Elevated Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      This is an elevated card with shadow effect.
                    </CardContent>
                  </Card>
                  <Card variant="default" padding="small">
                    <CardHeader>
                      <CardTitle>Small Padding</CardTitle>
                    </CardHeader>
                    <CardContent>
                      Card with small padding for compact layouts.
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-3 pt-6 border-t border-primary-text/10">
                  <Typography variant="small" weight="semibold" color="muted">
                    Cards with Images
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card variant="outlined" padding="none" className="overflow-hidden">
                      <CardImage
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
                        alt="Code"
                        aspectRatio="video"
                      />
                      <div className="p-4">
                        <CardHeader>
                          <CardTitle>Technology</CardTitle>
                        </CardHeader>
                        <CardContent>
                          Modern technology card with image at the top.
                        </CardContent>
                      </div>
                    </Card>
                    
                    <Card variant="outlined" padding="none" className="overflow-hidden">
                      <CardImage
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop"
                        alt="Design"
                        aspectRatio="video"
                      />
                      <div className="p-4">
                        <CardHeader>
                          <CardTitle>Design</CardTitle>
                        </CardHeader>
                        <CardContent>
                          Beautiful design card showcasing visual content.
                        </CardContent>
                      </div>
                    </Card>
                    
                    <Card variant="outlined" padding="none" className="overflow-hidden">
                      <CardImage
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
                        alt="Innovation"
                        aspectRatio="video"
                      />
                      <div className="p-4">
                        <CardHeader>
                          <CardTitle>Innovation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          Innovation card with square aspect ratio image.
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Card variant="outlined" padding="none" className="overflow-hidden">
                      <CardImage
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
                        alt="Wide Image"
                        aspectRatio="wide"
                      />
                      <div className="p-4">
                        <CardHeader>
                          <CardTitle>Wide Format</CardTitle>
                        </CardHeader>
                        <CardContent>
                          Card with wide aspect ratio image for hero sections.
                        </CardContent>
                      </div>
                    </Card>
                    
                    <Card variant="outlined" padding="none" className="overflow-hidden">
                      <CardImage
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop"
                        alt="Square Image"
                        aspectRatio="square"
                      />
                      <div className="p-4">
                        <CardHeader>
                          <CardTitle>Square Format</CardTitle>
                        </CardHeader>
                        <CardContent>
                          Card with square aspect ratio for profile cards.
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Carousel Section */}
        <section className="space-y-6">
          <Card variant="outlined" padding="large">
            <CardHeader>
              <CardTitle>Carousel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Typography variant="small" weight="semibold" color="muted">
                    Basic Carousel
                  </Typography>
                  <div className="w-full h-[400px]">
                    <Carousel
                      items={[
                        <div
                          key="1"
                          className="w-full h-full bg-gradient-to-br from-semantic-blue/20 to-semantic-indigo/20 flex items-center justify-center"
                        >
                          <div className="text-center space-y-4">
                            <Typography variant="title3" weight="bold">
                              Slide 1
                            </Typography>
                            <Typography variant="regular" color="muted">
                              First carousel slide
                            </Typography>
                          </div>
                        </div>,
                        <div
                          key="2"
                          className="w-full h-full bg-gradient-to-br from-semantic-green/20 to-semantic-linearPlan/20 flex items-center justify-center"
                        >
                          <div className="text-center space-y-4">
                            <Typography variant="title3" weight="bold">
                              Slide 2
                            </Typography>
                            <Typography variant="regular" color="muted">
                              Second carousel slide
                            </Typography>
                          </div>
                        </div>,
                        <div
                          key="3"
                          className="w-full h-full bg-gradient-to-br from-semantic-orange/20 to-semantic-red/20 flex items-center justify-center"
                        >
                          <div className="text-center space-y-4">
                            <Typography variant="title3" weight="bold">
                              Slide 3
                            </Typography>
                            <Typography variant="regular" color="muted">
                              Third carousel slide
                            </Typography>
                          </div>
                        </div>,
                      ]}
                      showIndicators={true}
                      showArrows={true}
                      loop={true}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-primary-text/10">
                  <Typography variant="small" weight="semibold" color="muted">
                    Auto Play Carousel
                  </Typography>
                  <div className="w-full h-[400px]">
                    <Carousel
                      items={[
                        <div
                          key="1"
                          className="w-full h-full bg-gradient-to-br from-semantic-indigo/30 to-semantic-blue/30 flex items-center justify-center"
                        >
                          <div className="text-center space-y-4">
                            <Typography variant="title4" weight="bold">
                              Auto Play Enabled
                            </Typography>
                            <Typography variant="large" color="muted">
                              This carousel automatically advances slides
                            </Typography>
                          </div>
                        </div>,
                        <div
                          key="2"
                          className="w-full h-full bg-gradient-to-br from-semantic-linearPlan/30 to-semantic-green/30 flex items-center justify-center"
                        >
                          <div className="text-center space-y-4">
                            <Typography variant="title4" weight="bold">
                              Every 3 Seconds
                            </Typography>
                            <Typography variant="large" color="muted">
                              Slides change automatically
                            </Typography>
                          </div>
                        </div>,
                        <div
                          key="3"
                          className="w-full h-full bg-gradient-to-br from-semantic-linearBuild/30 to-semantic-yellow/30 flex items-center justify-center"
                        >
                          <div className="text-center space-y-4">
                            <Typography variant="title4" weight="bold">
                              With Indicators
                            </Typography>
                            <Typography variant="large" color="muted">
                              You can see which slide is active
                            </Typography>
                          </div>
                        </div>,
                      ]}
                      autoPlay={true}
                      autoPlayInterval={3000}
                      showIndicators={true}
                      showArrows={true}
                      loop={true}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-primary-text/10">
                  <Typography variant="small" weight="semibold" color="muted">
                    Carousel with Image Cards
                  </Typography>
                  <div className="w-full h-[650px] mb-12">
                    <Carousel
                      items={[
                        <Card
                          key="1"
                          variant="outlined"
                          padding="none"
                          className="h-[600px] mx-4 my-8 overflow-hidden"
                        >
                          <CardImage
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop"
                            alt="Technology"
                            aspectRatio="video"
                          />
                          <div className="p-6">
                            <CardHeader>
                              <CardTitle>Modern Technology</CardTitle>
                            </CardHeader>
                            <CardContent>
                              Building the future with cutting-edge technology and innovative solutions.
                            </CardContent>
                            <div className="mt-4">
                              <Button variant="primary">Learn More</Button>
                            </div>
                          </div>
                        </Card>,
                        <Card
                          key="2"
                          variant="outlined"
                          padding="none"
                          className="h-[600px] mx-4 my-8 overflow-hidden"
                        >
                          <CardImage
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop"
                            alt="Innovation"
                            aspectRatio="video"
                          />
                          <div className="p-6">
                            <CardHeader>
                              <CardTitle>Creative Innovation</CardTitle>
                            </CardHeader>
                            <CardContent>
                              Exploring new possibilities and pushing boundaries in design and development.
                            </CardContent>
                            <div className="mt-4">
                              <Button variant="primary">Explore</Button>
                            </div>
                          </div>
                        </Card>,
                        <Card
                          key="3"
                          variant="outlined"
                          padding="none"
                          className="h-[600px] mx-4 my-8 overflow-hidden"
                        >
                          <CardImage
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
                            alt="Design"
                            aspectRatio="video"
                          />
                          <div className="p-6">
                            <CardHeader>
                              <CardTitle>Beautiful Design</CardTitle>
                            </CardHeader>
                            <CardContent>
                              Creating elegant and functional designs that enhance user experience.
                            </CardContent>
                            <div className="mt-4">
                              <Button variant="primary">View Design</Button>
                            </div>
                          </div>
                        </Card>,
                      ]}
                      showIndicators={true}
                      showArrows={true}
                      loop={true}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Combined Example Section */}
        <section className="space-y-6">
          <Card variant="outlined" padding="large">
            <CardHeader>
              <CardTitle>Combined Example</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 max-w-lg">
                <div className="space-y-4">
                  <Typography variant="title3" weight="semibold">
                    사용자 프로필
                  </Typography>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-semantic-indigo flex items-center justify-center">
                      <Typography variant="title2" weight="bold" color="default">
                        U
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <Typography variant="regular" weight="semibold">
                        사용자 이름
                      </Typography>
                      <Typography variant="small" color="muted">
                        user@example.com
                      </Typography>
                    </div>
                    <Badge variant="green" dot>
                      Active
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-primary-text/10">
                  <Input
                    label="이름"
                    placeholder="이름을 입력하세요"
                    fullWidth
                  />
                  <Input
                    label="이메일"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    fullWidth
                  />
                  <div className="flex gap-3">
                    <Button variant="primary" fullWidth>
                      저장하기
                    </Button>
                    <Button variant="ghost" fullWidth>
                      취소
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navbar Section */}
        <section className="space-y-6">
          <Card variant="outlined" padding="large">
            <CardHeader>
              <CardTitle>Navbar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Typography variant="small" weight="semibold" color="muted">
                    Basic Navbar
                  </Typography>
                  <div className="-mx-6 overflow-hidden">
                    <Navbar
                      links={[
                        { label: 'Home', href: '/' },
                        { label: 'About', href: '/about' },
                        { label: 'Services', href: '/services' },
                        { label: 'Contact', href: '/contact' },
                      ]}
                      cta={{ label: 'Get Started', href: '/signup', variant: 'primary' }}
                      sticky={false}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-primary-text/10">
                  <Typography variant="small" weight="semibold" color="muted">
                    Transparent Navbar
                  </Typography>
                  <div className="-mx-6 overflow-hidden">
                    <Navbar
                      links={[
                        { label: 'Home', href: '/' },
                        { label: 'Products', href: '/products' },
                        { label: 'Pricing', href: '/pricing' },
                      ]}
                      cta={{ label: 'Sign In', href: '/login', variant: 'outline' }}
                      transparent={true}
                      sticky={false}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Hero Section */}
        <section className="space-y-6">
          <Card variant="outlined" padding="large">
            <CardHeader>
              <CardTitle>Hero</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Typography variant="small" weight="semibold" color="muted">
                    Center Aligned Hero
                  </Typography>
                  <div className="-mx-6 overflow-hidden">
                    <Hero
                      title="Build Amazing Products"
                      subtitle="Welcome"
                      description="Create beautiful, functional, and scalable applications with our modern component library. Start building your next project today."
                      primaryAction={{ label: 'Get Started', href: '/signup' }}
                      secondaryAction={{ label: 'Learn More', href: '/docs' }}
                      size="large"
                      align="center"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-primary-text/10">
                  <Typography variant="small" weight="semibold" color="muted">
                    Left Aligned Hero
                  </Typography>
                  <div className="-mx-6 overflow-hidden">
                    <Hero
                      title="Innovation Starts Here"
                      subtitle="Technology"
                      description="Discover cutting-edge solutions that transform the way you work. Experience the future of development."
                      primaryAction={{ label: 'Explore', href: '/explore' }}
                      size="medium"
                      align="left"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-primary-text/10">
                  <Typography variant="small" weight="semibold" color="muted">
                    Hero with Background Image
                  </Typography>
                  <div className="-mx-6 overflow-hidden">
                    <Hero
                      title="Transform Your Ideas"
                      subtitle="Creative"
                      description="Turn your vision into reality with powerful tools and intuitive design. Join thousands of developers building the future."
                      primaryAction={{ label: 'Start Building', href: '/start' }}
                      secondaryAction={{ label: 'View Examples', href: '/examples' }}
                      backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop"
                      overlay={true}
                      size="large"
                      align="center"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-primary-text/10">
                  <Typography variant="small" weight="semibold" color="muted">
                    Fullscreen Hero
                  </Typography>
                  <div className="-mx-6 overflow-hidden">
                    <Hero
                      title="Welcome to CodeFactory"
                      subtitle="Premium Design System"
                      description="A comprehensive collection of reusable components built with Linear theme. Perfect for modern web applications."
                      primaryAction={{ label: 'Documentation', href: '/docs' }}
                      size="fullscreen"
                      align="center"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer Section */}
        <section className="space-y-6">
          <Card variant="outlined" padding="large">
            <CardHeader>
              <CardTitle>Footer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Typography variant="small" weight="semibold" color="muted">
                    Basic Footer
                  </Typography>
                  <div className="border border-primary-text/10 rounded-large overflow-hidden">
                    <Footer
                      description="Building modern web applications with beautiful, reusable components and consistent design patterns."
                      sections={[
                        {
                          title: 'Product',
                          links: [
                            { label: 'Features', href: '/features' },
                            { label: 'Pricing', href: '/pricing' },
                            { label: 'Documentation', href: '/docs' },
                            { label: 'Updates', href: '/updates' },
                          ],
                        },
                        {
                          title: 'Company',
                          links: [
                            { label: 'About', href: '/about' },
                            { label: 'Blog', href: '/blog' },
                            { label: 'Careers', href: '/careers' },
                            { label: 'Contact', href: '/contact' },
                          ],
                        },
                        {
                          title: 'Resources',
                          links: [
                            { label: 'Community', href: '/community' },
                            { label: 'Support', href: '/support' },
                            { label: 'Guides', href: '/guides' },
                            { label: 'API Reference', href: '/api' },
                          ],
                        },
                      ]}
                      socialLinks={[
                        { label: 'GitHub', href: 'https://github.com' },
                        { label: 'Twitter', href: 'https://twitter.com' },
                        { label: 'LinkedIn', href: 'https://linkedin.com' },
                      ]}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-primary-text/10">
                  <Typography variant="small" weight="semibold" color="muted">
                    Minimal Footer
                  </Typography>
                  <div className="border border-primary-text/10 rounded-large overflow-hidden">
                    <Footer
                      description="Simple and elegant footer for minimalist designs."
                      copyright="© 2024 CodeFactory. All rights reserved."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
