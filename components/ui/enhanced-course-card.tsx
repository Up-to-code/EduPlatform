"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RatingStars } from "@/components/ui/rating-stars"
import { Clock, Users, Heart, Play, BookOpen, Globe, TrendingUp, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Course } from "@/lib/mock-data"

interface EnhancedCourseCardProps {
  course: Course
  variant?: "default" | "enrolled" | "compact"
  showProgress?: boolean
  className?: string
  searchTerm?: string
  onWishlistToggle?: (courseId: string) => void
}

export function EnhancedCourseCard({
  course,
  variant = "default",
  showProgress = false,
  className,
  searchTerm = "",
  onWishlistToggle,
}: EnhancedCourseCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(course.isWishlisted || false)

  const isEnrolled = variant === "enrolled"
  const isCompact = variant === "compact"

  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    onWishlistToggle?.(course.id)
  }

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text

    const regex = new RegExp(`(${searchTerm})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 bg-background/50 backdrop-blur-sm",
        isCompact ? "h-auto" : "h-full",
        className,
      )}
    >
      <div className="relative">
        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <div className={cn("relative bg-muted", isCompact ? "h-32" : "h-48")}>
            <Image
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button size="sm" variant="secondary" className="gap-2 shadow-lg">
              <Play className="h-4 w-4" />
              Preview Course
            </Button>
          </div>

          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 shadow-md"
            onClick={handleWishlistClick}
          >
            <Heart className={cn("h-4 w-4 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "")} />
          </Button>

          {/* Discount Badge */}
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white shadow-md">
              {discount}% OFF
            </Badge>
          )}

          {/* Bestseller Badge */}
          {course.studentCount > 30000 && (
            <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600 text-white shadow-md">
              <TrendingUp className="h-3 w-3 mr-1" />
              Bestseller
            </Badge>
          )}

          {/* Level Badge */}
          <Badge variant="secondary" className={cn("absolute bottom-2 left-2 shadow-md", getLevelColor(course.level))}>
            {course.level}
          </Badge>

          {/* Language Badge */}
          <Badge variant="outline" className="absolute bottom-2 right-2 bg-white/90 shadow-md">
            <Globe className="h-3 w-3 mr-1" />
            {course.language}
          </Badge>
        </div>
      </div>

      <CardContent className={cn("p-4", isCompact ? "p-3" : "p-4")}>
        <div className="space-y-3">
          {/* Category */}
          <Badge variant="outline" className="text-xs w-fit">
            {course.category}
          </Badge>

          {/* Title */}
          <h3
            className={cn(
              "font-semibold line-clamp-2 group-hover:text-primary transition-colors",
              isCompact ? "text-base" : "text-lg",
            )}
          >
            <Link href={`/courses/${course.id}`}>{highlightText(course.title, searchTerm)}</Link>
          </h3>

          {/* Description */}
          {!isCompact && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {highlightText(course.description, searchTerm)}
            </p>
          )}

          {/* Instructor */}
          <div className="flex items-center space-x-2">
            <Avatar className={cn(isCompact ? "h-5 w-5" : "h-6 w-6")}>
              <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">{course.instructor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className={cn("text-muted-foreground truncate", isCompact ? "text-xs" : "text-sm")}>
              {highlightText(course.instructor.name, searchTerm)}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <RatingStars rating={course.rating} size={isCompact ? "sm" : "sm"} />
            <span className={cn("font-medium", isCompact ? "text-xs" : "text-sm")}>{course.rating}</span>
            <span className={cn("text-muted-foreground", isCompact ? "text-xs" : "text-sm")}>
              ({course.reviewCount.toLocaleString()})
            </span>
          </div>

          {/* Course Stats */}
          <div
            className={cn(
              "flex items-center text-muted-foreground",
              isCompact ? "space-x-3 text-xs" : "space-x-4 text-sm",
            )}
          >
            <div className="flex items-center space-x-1">
              <Clock className={cn(isCompact ? "h-3 w-3" : "h-4 w-4")} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className={cn(isCompact ? "h-3 w-3" : "h-4 w-4")} />
              <span>{course.studentCount.toLocaleString()}</span>
            </div>
            {course.studentCount > 50000 && (
              <div className="flex items-center space-x-1">
                <Award className={cn(isCompact ? "h-3 w-3" : "h-4 w-4", "text-yellow-500")} />
                <span className="text-yellow-600 dark:text-yellow-400">Popular</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {!isCompact && course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {course.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                  {tag}
                </Badge>
              ))}
              {course.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  +{course.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Progress Bar (for enrolled courses) */}
          {showProgress && course.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className={cn("p-4 pt-0", isCompact ? "p-3 pt-0" : "p-4 pt-0")}>
        <div className="flex items-center justify-between w-full">
          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className={cn("font-bold text-primary", isCompact ? "text-base" : "text-lg")}>${course.price}</span>
            {course.originalPrice && (
              <span className={cn("text-muted-foreground line-through", isCompact ? "text-xs" : "text-sm")}>
                ${course.originalPrice}
              </span>
            )}
          </div>

          {/* Action Button */}
          {isEnrolled ? (
            <Button size={isCompact ? "sm" : "default"} asChild>
              <Link href={`/dashboard/courses/${course.id}`}>
                <BookOpen className="mr-2 h-4 w-4" />
                Continue
              </Link>
            </Button>
          ) : (
            <Button size={isCompact ? "sm" : "default"} asChild>
              <Link href={`/courses/${course.id}`}>View Course</Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
