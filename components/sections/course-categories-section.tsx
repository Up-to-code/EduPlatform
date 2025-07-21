"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CourseCard } from "@/components/ui/course-card"
import { Code, Palette, TrendingUp, Camera, Music, Calculator, ChevronLeft, ChevronRight } from "lucide-react"
import { categories, mockCourses } from "@/lib/mock-data"

const iconMap = {
  Code,
  Palette,
  TrendingUp,
  Camera,
  Music,
  Calculator,
}

export function CourseCategoriesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const coursesPerSlide = 3
  const totalSlides = Math.ceil(mockCourses.length / coursesPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getCurrentCourses = () => {
    const start = currentSlide * coursesPerSlide
    return mockCourses.slice(start, start + coursesPerSlide)
  }

  return (
    <section className="py-20">
      <div className="container">
        {/* Categories */}
        <div className="space-y-8 mb-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">Explore Course Categories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover courses across various fields and find your passion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap]
              return (
                <Link key={category.id} href={`/courses?category=${category.id}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-background/50">
                    <CardContent className="p-6 text-center space-y-4">
                      <div
                        className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.courseCount.toLocaleString()} courses</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Featured Courses Carousel */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">Featured Courses</h2>
              <p className="text-muted-foreground">Hand-picked courses from our expert instructors</p>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentSlide === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentSlide === totalSlides - 1}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentCourses().map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
