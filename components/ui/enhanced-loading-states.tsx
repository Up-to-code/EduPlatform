"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { AlertTriangle, RefreshCw, Loader2 } from "lucide-react"

export function EnhancedCourseHeroSkeleton() {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Course Info Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="p-4 rounded-xl border">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Skeleton className="w-5 h-5 rounded-full mt-0.5" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <Skeleton className="aspect-video rounded-2xl" />
            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-14 w-full rounded-xl" />
                <div className="flex space-x-3">
                  <Skeleton className="h-12 flex-1 rounded-xl" />
                  <Skeleton className="h-12 w-12 rounded-xl" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EnhancedSyllabusSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }, (_, i) => (
        <Card key={i} className="border-0 shadow-lg">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-5 h-5" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-64" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export function EnhancedErrorState({
  title = "Something went wrong",
  description = "We encountered an error while loading this content.",
  onRetry,
}: {
  title?: string
  description?: string
  onRetry?: () => void
}) {
  return (
    <motion.div
      className="text-center space-y-6 p-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
      </div>

      {onRetry && (
        <EnhancedButton variant="outline" onClick={onRetry} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </EnhancedButton>
      )}
    </motion.div>
  )
}

export function LoadingSpinner({
  size = "default",
  className = "",
}: {
  size?: "sm" | "default" | "lg"
  className?: string
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
}

export function EnhancedCourseThumbnailSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <Skeleton className="aspect-[16/10] w-full" />
      <CardContent className="p-5 space-y-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-3/4" />

        <div className="flex items-center space-x-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  )
}
