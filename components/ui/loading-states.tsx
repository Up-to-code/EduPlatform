"use client"

import { Skeleton } from "@/components/ui/loading-skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Generic Loading Components
export function VideoPlayerSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-video bg-muted rounded-lg overflow-hidden", className)}>
      <Skeleton className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-background/20 flex items-center justify-center">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
      {/* Controls skeleton */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="flex-1 h-2 rounded" />
          <Skeleton className="w-12 h-4 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
        </div>
      </div>
    </div>
  )
}

export function InstructorProfileSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="w-8 h-4" />
              </div>
              <div className="flex items-center space-x-1">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="w-12 h-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  )
}

export function SyllabusSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }, (_, i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {Array.from({ length: 3 }, (_, j) => (
                <div key={j} className="flex items-center space-x-3">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function ReviewsSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="border-b pb-6 last:border-b-0">
          <div className="flex items-start space-x-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-24" />
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Skeleton key={j} className="w-4 h-4" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-4 w-16" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function PlaylistSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="flex items-center space-x-3 p-3 rounded-lg border">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="w-16 h-12 rounded" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="w-4 h-4" />
        </div>
      ))}
    </div>
  )
}

export function NotesSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="p-3 border rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ResourcesSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="flex items-center space-x-3 p-3 border rounded-lg">
          <Skeleton className="w-8 h-8" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="w-8 h-8" />
        </div>
      ))}
    </div>
  )
}

export function DiscussionSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Skeleton className="flex-1 h-10" />
        <Skeleton className="w-20 h-10" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-start space-x-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-6 w-12" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function QuizSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <div className="space-y-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Course Details Page Skeletons
export function CourseHeroSkeleton() {
  return (
    <div className="bg-muted/30 py-12">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Skeleton key={i} className="w-4 h-4" />
                ))}
                <Skeleton className="h-4 w-16 ml-2" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>

          <div className="space-y-4">
            <VideoPlayerSkeleton />
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-12 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Error States
export function ErrorState({
  title = "Something went wrong",
  description = "We encountered an error while loading this content.",
  onRetry,
  className,
}: {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export function LoadingSpinner({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div
      className={cn("animate-spin rounded-full border-2 border-muted border-t-primary", sizeClasses[size], className)}
    />
  )
}
