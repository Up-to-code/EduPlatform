"use client"

import { useState, useEffect, useMemo } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { EnhancedCourseCard } from "@/components/ui/enhanced-course-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { CourseCardSkeleton } from "@/components/ui/loading-skeleton"
import { mockCourses, searchCourses, filterCourses, sortCourses, categories } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { Grid, List, X, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"

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

export default function CoursesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)
  const { toast } = useToast()

  const [filters, setFilters] = useState({
    category: "All",
    level: "All",
    priceRange: [0, 200] as [number, number],
    rating: 0,
    language: "All",
    search: "",
  })

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let result = mockCourses

    // Apply search
    if (filters.search) {
      result = searchCourses(result, filters.search)
    }

    // Apply filters
    result = filterCourses(result, {
      category: filters.category,
      level: filters.level,
      priceRange: filters.priceRange,
      rating: filters.rating,
      language: filters.language,
    })

    // Apply sorting
    result = sortCourses(result, sortBy)

    return result
  }, [filters, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCourses = filteredAndSortedCourses.slice(startIndex, startIndex + itemsPerPage)

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, sortBy])

  const handleWishlistToggle = (courseId: string) => {
    toast({
      title: "Wishlist Updated",
      description: "Course has been added to your wishlist.",
    })
  }

  const clearAllFilters = () => {
    setFilters({
      category: "All",
      level: "All",
      priceRange: [0, 200],
      rating: 0,
      language: "All",
      search: "",
    })
  }

  const activeFiltersCount = [
    filters.category !== "All",
    filters.level !== "All",
    filters.priceRange[0] > 0 || filters.priceRange[1] < 200,
    filters.rating > 0,
    filters.language !== "All",
    filters.search !== "",
  ].filter(Boolean).length

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 border-b">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl font-bold">Explore Our Course Catalog</h1>
              <p className="text-xl text-muted-foreground">
                Discover thousands of courses from expert instructors and advance your skills
              </p>

              {/* Enhanced Search */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for courses, instructors, or topics..."
                    value={filters.search}
                    onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    className="pl-10 pr-10 h-12 text-base"
                  />
                  {filters.search && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {filters.category !== "All" && (
                    <Badge variant="secondary" className="gap-1">
                      Category: {filters.category}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setFilters((prev) => ({ ...prev, category: "All" }))}
                      />
                    </Badge>
                  )}
                  {filters.level !== "All" && (
                    <Badge variant="secondary" className="gap-1">
                      Level: {filters.level}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setFilters((prev) => ({ ...prev, level: "All" }))}
                      />
                    </Badge>
                  )}
                  {filters.rating > 0 && (
                    <Badge variant="secondary" className="gap-1">
                      {filters.rating}+ Stars
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setFilters((prev) => ({ ...prev, rating: 0 }))}
                      />
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="container py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-20">
                <div className="bg-background/50 backdrop-blur-sm border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
                  </div>

                  <div className="space-y-6">
                    {/* Category Filter */}
                    <div>
                      <h3 className="font-semibold mb-3">Category</h3>
                      <div className="space-y-2">
                        {["All", ...categories.map((c) => c.name)].map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={category}
                              checked={filters.category === category}
                              onCheckedChange={() => setFilters((prev) => ({ ...prev, category }))}
                            />
                            <label htmlFor={category} className="text-sm cursor-pointer flex-1">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Level Filter */}
                    <div>
                      <h3 className="font-semibold mb-3">Level</h3>
                      <div className="space-y-2">
                        {levels.map((level) => (
                          <div key={level} className="flex items-center space-x-2">
                            <Checkbox
                              id={level}
                              checked={filters.level === level}
                              onCheckedChange={() => setFilters((prev) => ({ ...prev, level }))}
                            />
                            <label htmlFor={level} className="text-sm cursor-pointer">
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="font-semibold mb-3">Price Range</h3>
                      <div className="space-y-4">
                        <Slider
                          value={filters.priceRange}
                          onValueChange={(value) =>
                            setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))
                          }
                          max={200}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>${filters.priceRange[0]}</span>
                          <span>${filters.priceRange[1]}+</span>
                        </div>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {activeFiltersCount > 0 && (
                      <Button variant="outline" onClick={clearAllFilters} className="w-full bg-transparent">
                        <X className="mr-2 h-4 w-4" />
                        Clear All Filters ({activeFiltersCount})
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  {/* Mobile Filters Button */}
                  <Button
                    variant="outline"
                    className="lg:hidden relative bg-transparent"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    {filteredAndSortedCourses.length.toLocaleString()} courses found
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
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

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                  }`}
                >
                  {Array.from({ length: itemsPerPage }, (_, i) => (
                    <CourseCardSkeleton key={i} />
                  ))}
                </div>
              )}

              {/* No Results */}
              {!isLoading && filteredAndSortedCourses.length === 0 && (
                <div className="text-center py-16">
                  <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any courses matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button onClick={clearAllFilters}>Clear All Filters</Button>
                </div>
              )}

              {/* Course Grid */}
              {!isLoading && paginatedCourses.length > 0 && (
                <>
                  <div
                    className={`grid gap-6 ${
                      viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                    }`}
                  >
                    {paginatedCourses.map((course) => (
                      <EnhancedCourseCard
                        key={course.id}
                        course={course}
                        variant={viewMode === "list" ? "compact" : "default"}
                        searchTerm={filters.search}
                        onWishlistToggle={handleWishlistToggle}
                      />
                    ))}
                  </div>

                  {/* Simple Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-12">
                      <p className="text-sm text-muted-foreground">
                        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedCourses.length)}{" "}
                        of {filteredAndSortedCourses.length} results
                      </p>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>

                        <span className="text-sm">
                          Page {currentPage} of {totalPages}
                        </span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
