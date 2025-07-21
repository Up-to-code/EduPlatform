import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { RatingStars } from "@/components/ui/rating-stars"
import { Clock, Users, Heart, Play } from "lucide-react"
import type { Course } from "@/lib/mock-data"

interface CourseCardProps {
  course: Course
  variant?: "default" | "enrolled"
  showProgress?: boolean
  className?: string
}

export function CourseCard({ course, variant = "default", showProgress = false, className }: CourseCardProps) {
  const isEnrolled = variant === "enrolled"
  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="relative">
        <Image
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          width={400}
          height={225}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button size="sm" variant="secondary" className="gap-2">
            <Play className="h-4 w-4" />
            Preview
          </Button>
        </div>

        {/* Wishlist Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
        >
          <Heart className={`h-4 w-4 ${course.isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </Button>

        {/* Discount Badge */}
        {discount > 0 && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">{discount}% OFF</Badge>}

        {/* Level Badge */}
        <Badge variant="secondary" className="absolute bottom-2 left-2">
          {course.level}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Category */}
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>

          {/* Title */}
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/courses/${course.id}`}>{course.title}</Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

          {/* Instructor */}
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
              <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <RatingStars rating={course.rating} size="sm" />
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-sm text-muted-foreground">({course.reviewCount.toLocaleString()})</span>
          </div>

          {/* Course Stats */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.studentCount.toLocaleString()}</span>
            </div>
          </div>

          {/* Progress Bar (for enrolled courses) */}
          {showProgress && course.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">${course.price}</span>
            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
            )}
          </div>

          {/* Action Button */}
          {isEnrolled ? (
            <Button asChild>
              <Link href={`/dashboard/courses/${course.id}`}>Continue Learning</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={`/courses/${course.id}`}>View Course</Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
