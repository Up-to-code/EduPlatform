"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, BookOpen, RefreshCw } from "lucide-react"

interface EmptyStateProps {
  type: "no-results" | "no-courses" | "error"
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ type, title, description, action, className }: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case "no-results":
        return <Search className="h-12 w-12 text-muted-foreground/50" />
      case "no-courses":
        return <BookOpen className="h-12 w-12 text-muted-foreground/50" />
      case "error":
        return <RefreshCw className="h-12 w-12 text-muted-foreground/50" />
      default:
        return <Search className="h-12 w-12 text-muted-foreground/50" />
    }
  }

  const getSuggestions = () => {
    switch (type) {
      case "no-results":
        return ["Try different keywords", "Remove some filters", "Check your spelling", "Browse popular categories"]
      case "no-courses":
        return [
          "Check back later for new courses",
          "Browse other categories",
          "Sign up for notifications",
          "Suggest a course topic",
        ]
      case "error":
        return [
          "Check your internet connection",
          "Refresh the page",
          "Try again later",
          "Contact support if the problem persists",
        ]
      default:
        return []
    }
  }

  return (
    <Card className={`border-0 bg-muted/30 ${className}`}>
      <CardContent className="flex flex-col items-center justify-center text-center py-16 px-6">
        <div className="mb-6">{getIcon()}</div>

        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">{description}</p>

        {/* Suggestions */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3">Try these suggestions:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {getSuggestions().map((suggestion, index) => (
              <li key={index} className="flex items-center justify-center">
                <span className="w-1 h-1 bg-muted-foreground rounded-full mr-2" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        {action && (
          <Button onClick={action.onClick} className="mt-4">
            {action.label}
          </Button>
        )}

        {/* Popular Categories */}
        {type === "no-results" && (
          <div className="mt-8 pt-8 border-t w-full max-w-md">
            <p className="text-sm font-medium mb-3">Popular Categories:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Programming", "Design", "Business", "Data Science"].map((category) => (
                <Button key={category} variant="outline" size="sm">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
