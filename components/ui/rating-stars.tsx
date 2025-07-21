"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  interactive = false,
  onRatingChange,
  className,
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating)
    }
  }

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, index) => {
          const starRating = index + 1
          const isFilled = starRating <= rating
          const isHalfFilled = starRating - 0.5 <= rating && starRating > rating

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => handleStarClick(starRating)}
              className={cn(
                "relative",
                interactive && "hover:scale-110 transition-transform cursor-pointer",
                !interactive && "cursor-default",
              )}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  isFilled
                    ? "fill-yellow-400 text-yellow-400"
                    : isHalfFilled
                      ? "fill-yellow-400/50 text-yellow-400"
                      : "fill-none text-gray-300",
                )}
              />
            </button>
          )
        })}
      </div>
      {showValue && <span className="text-sm font-medium ml-2">{rating.toFixed(1)}</span>}
    </div>
  )
}
