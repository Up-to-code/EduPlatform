"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { X, ChevronDown, Search, SlidersHorizontal } from "lucide-react"
import { categories, languages } from "@/lib/mock-data"
import { RatingStars } from "@/components/ui/rating-stars"

interface CourseFiltersProps {
  filters: {
    category: string
    level: string
    priceRange: [number, number]
    rating: number
    language: string
    search: string
  }
  onFiltersChange: (filters: any) => void
  totalCourses: number
  className?: string
}

const levels = ["All", "Beginner", "Intermediate", "Advanced"]
const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "popularity", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "title", label: "A-Z" },
]

export function CourseFilters({ filters, onFiltersChange, totalCourses, className }: CourseFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    level: true,
    price: true,
    rating: true,
    language: false,
  })

  const activeFiltersCount = [
    filters.category !== "All",
    filters.level !== "All",
    filters.priceRange[0] > 0 || filters.priceRange[1] < 200,
    filters.rating > 0,
    filters.language !== "All",
  ].filter(Boolean).length

  const clearFilters = () => {
    onFiltersChange({
      category: "All",
      level: "All",
      priceRange: [0, 200],
      rating: 0,
      language: "All",
      search: filters.search, // Keep search term
    })
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium">
          Search Courses
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search by title, instructor, or topic..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filter */}
      <Collapsible open={expandedSections.category} onOpenChange={() => toggleSection("category")}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <h3 className="font-semibold">Category</h3>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.category ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-3">
          <div className="space-y-2">
            {["All", ...categories.map((c) => c.name)].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.category === category}
                  onCheckedChange={() => onFiltersChange({ ...filters, category })}
                />
                <label htmlFor={category} className="text-sm cursor-pointer flex-1">
                  {category}
                  {category !== "All" && (
                    <span className="text-muted-foreground ml-1">
                      ({categories.find((c) => c.name === category)?.courseCount || 0})
                    </span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Level Filter */}
      <Collapsible open={expandedSections.level} onOpenChange={() => toggleSection("level")}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <h3 className="font-semibold">Level</h3>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.level ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-3">
          <div className="space-y-2">
            {levels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={level}
                  checked={filters.level === level}
                  onCheckedChange={() => onFiltersChange({ ...filters, level })}
                />
                <label htmlFor={level} className="text-sm cursor-pointer">
                  {level}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible open={expandedSections.price} onOpenChange={() => toggleSection("price")}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <h3 className="font-semibold">Price Range</h3>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.price ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-3">
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value as [number, number] })}
              max={200}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}+</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFiltersChange({ ...filters, priceRange: [0, 50] })}
                className="text-xs"
              >
                Under $50
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFiltersChange({ ...filters, priceRange: [0, 0] })}
                className="text-xs"
              >
                Free
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Rating Filter */}
      <Collapsible open={expandedSections.rating} onOpenChange={() => toggleSection("rating")}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <h3 className="font-semibold">Rating</h3>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.rating ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-3">
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onCheckedChange={() => onFiltersChange({ ...filters, rating })}
                />
                <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center space-x-2">
                  {rating > 0 ? (
                    <>
                      <RatingStars rating={rating} size="sm" />
                      <span>{rating} & up</span>
                    </>
                  ) : (
                    <span>All Ratings</span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Language Filter */}
      <Collapsible open={expandedSections.language} onOpenChange={() => toggleSection("language")}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <h3 className="font-semibold">Language</h3>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedSections.language ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mt-3">
          <div className="space-y-2">
            {["All", ...languages].map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={language}
                  checked={filters.language === language}
                  onCheckedChange={() => onFiltersChange({ ...filters, language })}
                />
                <label htmlFor={language} className="text-sm cursor-pointer">
                  {language}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
          <X className="mr-2 h-4 w-4" />
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className={`hidden lg:block ${className}`}>
        <div className="sticky top-20">
          <div className="bg-background/50 backdrop-blur-sm border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
            </div>
            <FilterContent />
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative bg-transparent">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filter Courses</SheetTitle>
              <SheetDescription>{totalCourses} courses available</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export function CourseSorting({
  sortBy,
  onSortChange,
  totalCourses,
}: {
  sortBy: string
  onSortChange: (sort: string) => void
  totalCourses: number
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">{totalCourses.toLocaleString()} courses found</p>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
