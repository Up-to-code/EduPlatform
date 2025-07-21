"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X, TrendingUp, Clock } from "lucide-react"
import { extendedMockCourses } from "@/lib/mock-data"

interface CourseSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function CourseSearch({
  value,
  onChange,
  placeholder = "Search for courses, instructors, or topics...",
  className,
}: CourseSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Popular search terms
  const popularSearches = [
    "React",
    "Python",
    "JavaScript",
    "UI/UX Design",
    "Data Science",
    "Node.js",
    "Machine Learning",
    "Digital Marketing",
    "Web Development",
  ]

  // Recent searches (mock data)
  const recentSearches = ["React Hooks", "Python Basics", "Design Systems"]

  useEffect(() => {
    if (value.length > 1) {
      // Generate suggestions based on course data
      const courseSuggestions = extendedMockCourses
        .filter(
          (course) =>
            course.title.toLowerCase().includes(value.toLowerCase()) ||
            course.instructor.name.toLowerCase().includes(value.toLowerCase()) ||
            course.category.toLowerCase().includes(value.toLowerCase()) ||
            course.tags.some((tag) => tag.toLowerCase().includes(value.toLowerCase())),
        )
        .slice(0, 5)
        .map((course) => course.title)

      const tagSuggestions = extendedMockCourses
        .flatMap((course) => course.tags)
        .filter((tag) => tag.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3)

      setSuggestions([...new Set([...courseSuggestions, ...tagSuggestions])])
      setIsOpen(true)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    onChange("")
    inputRef.current?.focus()
  }

  const handlePopularSearch = (term: string) => {
    onChange(term)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.length > 1 && setIsOpen(true)}
          className="pl-10 pr-10 h-12 text-base"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">Suggestions</div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 hover:bg-muted rounded-md text-sm transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span>{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {value.length === 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-1 px-2">
                {popularSearches.map((term, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handlePopularSearch(term)}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {value.length === 0 && recentSearches.length > 0 && (
            <div className="p-2 border-t">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                <Clock className="inline h-3 w-3 mr-1" />
                Recent Searches
              </div>
              {recentSearches.map((term, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 hover:bg-muted rounded-md text-sm transition-colors"
                  onClick={() => handlePopularSearch(term)}
                >
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{term}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {value.length > 1 && suggestions.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No suggestions found</p>
              <p className="text-xs">Try searching for courses, instructors, or topics</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
