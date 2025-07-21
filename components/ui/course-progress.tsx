"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CourseProgressProps {
  totalLectures: number
  completedLectures: number
  currentLecture?: string
  className?: string
}

export function CourseProgress({ totalLectures, completedLectures, currentLecture, className }: CourseProgressProps) {
  const progressPercentage = (completedLectures / totalLectures) * 100

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Course Progress</span>
        <Badge variant="secondary">
          {completedLectures}/{totalLectures} completed
        </Badge>
      </div>

      <Progress value={progressPercentage} className="h-2" />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{Math.round(progressPercentage)}% complete</span>
        <span>{totalLectures - completedLectures} lectures remaining</span>
      </div>
    </div>
  )
}

interface LectureProgressProps {
  lectures: {
    id: string
    title: string
    duration: string
    isCompleted: boolean
    isCurrent?: boolean
  }[]
  onLectureClick?: (lectureId: string) => void
  className?: string
}

export function LectureProgress({ lectures, onLectureClick, className }: LectureProgressProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {lectures.map((lecture) => (
        <div
          key={lecture.id}
          className={cn(
            "flex items-center space-x-3 p-2 rounded-lg transition-colors",
            lecture.isCurrent && "bg-primary/10 border border-primary/20",
            onLectureClick && "cursor-pointer hover:bg-muted/50",
          )}
          onClick={() => onLectureClick?.(lecture.id)}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {lecture.isCompleted ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : lecture.isCurrent ? (
              <PlayCircle className="w-4 h-4 text-primary" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn("text-sm truncate", lecture.isCurrent && "font-medium text-primary")}>{lecture.title}</p>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{lecture.duration}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
