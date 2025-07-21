"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RatingStars } from "@/components/ui/rating-stars"
import { Progress } from "@/components/ui/progress"
import { Play, Clock, Users, Heart, BookOpen, TrendingUp, Globe, Star, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Course } from "@/lib/mock-data"

interface EnhancedCourseThumbnailProps {
  course: Course
  variant?: "default" | "compact" | "featured" | "enrolled"
  showProgress?: boolean
  className?: string
  onWishlistToggle?: (courseId: string) => void
  onPreview?: (courseId: string) => void
}

export function EnhancedCourseThumbnail({
  course,
  variant = "default",
  showProgress = false,
  className,
  onWishlistToggle,
  onPreview,
}: EnhancedCourseThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(course.isWishlisted || false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const isCompact = variant === "compact"
  const isFeatured = variant === "featured"
  const isEnrolled = variant === "enrolled"

  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    onWishlistToggle?.(course.id)
  }

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onPreview?.(course.id)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800"
    }
  }

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300",
        isFeatured && "ring-2 ring-primary/20 shadow-2xl",
        className,
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      layout
    >
      {/* Thumbnail Container */}
      <div className="relative overflow-hidden">
        <div className={cn("relative bg-muted", isCompact ? "aspect-[16/9]" : "aspect-[16/10]")}>
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
          )}

          {/* Course Image */}
          <Image
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            fill
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Interactive Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <EnhancedButton
                    variant="glass"
                    size="lg"
                    className="gap-3 text-white border-white/30"
                    onClick={handlePreviewClick}
                  >
                    <Play className="w-5 h-5" />
                    Preview Course
                  </EnhancedButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white shadow-lg">{discount}% OFF</Badge>
            )}
            {course.studentCount > 30000 && (
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg">
                <TrendingUp className="w-3 h-3 mr-1" />
                Bestseller
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          {/* Top Right Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <EnhancedButton
                variant="glass"
                size="icon-sm"
                className="text-white border-white/30 shadow-lg"
                onClick={handleWishlistClick}
              >
                <Heart className={cn("w-4 h-4 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "")} />
              </EnhancedButton>
            </motion.div>
          </div>

          {/* Bottom Badges */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <Badge variant="outline" className={cn("shadow-lg backdrop-blur-sm", getLevelColor(course.level))}>
              {course.level}
            </Badge>
            <Badge variant="outline" className="bg-white/90 dark:bg-black/90 shadow-lg backdrop-blur-sm">
              <Globe className="w-3 h-3 mr-1" />
              {course.language}
            </Badge>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3">
            <Badge variant="outline" className="bg-black/80 text-white border-white/30 shadow-lg backdrop-blur-sm">
              <Clock className="w-3 h-3 mr-1" />
              {course.duration}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={cn("p-5", isCompact && "p-4")}>
        <div className="space-y-4">
          {/* Category */}
          <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20">
            {course.category}
          </Badge>

          {/* Title */}
          <h3
            className={cn(
              "font-bold line-clamp-2 group-hover:text-primary transition-colors leading-tight",
              isCompact ? "text-base" : "text-lg",
            )}
          >
            {course.title}
          </h3>

          {/* Description */}
          {!isCompact && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{course.description}</p>
          )}

          {/* Instructor */}
          <div className="flex items-center space-x-3">
            <Avatar className={cn(isCompact ? "h-6 w-6" : "h-8 w-8")}>
              <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                {course.instructor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className={cn("font-medium truncate", isCompact ? "text-xs" : "text-sm")}>{course.instructor.name}</p>
              {!isCompact && <p className="text-xs text-muted-foreground truncate">{course.instructor.bio}</p>}
            </div>
          </div>

          {/* Rating & Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <RatingStars rating={course.rating} size="sm" />
              <span className={cn("font-semibold", isCompact ? "text-xs" : "text-sm")}>{course.rating}</span>
              <span className={cn("text-muted-foreground", isCompact ? "text-xs" : "text-sm")}>
                ({course.reviewCount.toLocaleString()})
              </span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Users className={cn(isCompact ? "w-3 h-3" : "w-4 h-4")} />
                <span className={cn(isCompact ? "text-xs" : "text-sm")}>{course.studentCount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Progress (for enrolled courses) */}
          {showProgress && course.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Progress</span>
                <span className="text-primary font-semibold">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}

          {/* Tags */}
          {!isCompact && course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {course.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs px-2 py-0 bg-muted/50">
                  {tag}
                </Badge>
              ))}
              {course.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0 bg-muted/50">
                  +{course.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={cn("px-5 pb-5", isCompact && "px-4 pb-4")}>
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className={cn("font-bold text-primary", isCompact ? "text-lg" : "text-xl")}>${course.price}</span>
            {course.originalPrice && (
              <span className={cn("text-muted-foreground line-through", isCompact ? "text-sm" : "text-base")}>
                ${course.originalPrice}
              </span>
            )}
          </div>

          {/* Action Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {isEnrolled ? (
              <EnhancedButton variant="success" size={isCompact ? "sm" : "default"}>
                <BookOpen className="w-4 h-4 mr-2" />
                Continue
              </EnhancedButton>
            ) : (
              <EnhancedButton variant="default" size={isCompact ? "sm" : "default"}>
                View Course
                <ChevronRight className="w-4 h-4 ml-1" />
              </EnhancedButton>
            )}
          </motion.div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}
