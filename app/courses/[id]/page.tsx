"use client"

import { Skeleton } from "@/components/ui/skeleton"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { RatingStars } from "@/components/ui/rating-stars"
import {
  CourseHeroSkeleton,
  InstructorProfileSkeleton,
  SyllabusSkeleton,
  ReviewsSkeleton,
  ErrorState,
  LoadingSpinner,
} from "@/components/ui/loading-states"
import { getCourseById, type CourseDetails } from "@/lib/course-api"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import {
  Play,
  Clock,
  Users,
  Globe,
  Award,
  Download,
  Share2,
  Heart,
  ChevronRight,
  PlayCircle,
  FileText,
  CheckCircle,
  Lock,
  Star,
  Calendar,
  Infinity,
  Shield,
} from "lucide-react"

export default function CourseDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const [course, setCourse] = useState<CourseDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const courseId = params.id as string

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const courseData = await getCourseById(courseId)
        setCourse(courseData)
        // Expand first section by default
        if (courseData.syllabus.length > 0) {
          setExpandedSections([courseData.syllabus[0].id])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load course")
      } finally {
        setIsLoading(false)
      }
    }

    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  const handleEnroll = async () => {
    if (!user) {
      router.push("/auth/signin")
      return
    }

    setIsEnrolling(true)
    try {
      // Simulate enrollment API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Successfully Enrolled!",
        description: "You can now access all course content.",
      })

      // Redirect to course player
      router.push(`/courses/${courseId}/learn`)
    } catch (error) {
      toast({
        title: "Enrollment Failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsEnrolling(false)
    }
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted ? "Course removed from your wishlist." : "Course added to your wishlist.",
    })
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const retryFetch = () => {
    setError(null)
    const fetchCourse = async () => {
      try {
        setIsLoading(true)
        const courseData = await getCourseById(courseId)
        setCourse(courseData)
        if (courseData.syllabus.length > 0) {
          setExpandedSections([courseData.syllabus[0].id])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load course")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourse()
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <ErrorState title="Course Not Found" description={error} onRetry={retryFetch} />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        {isLoading ? (
          <CourseHeroSkeleton />
        ) : (
          course && (
            <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
              <div className="container">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Course Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{course.category}</Badge>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>

                      <h1 className="text-4xl font-bold leading-tight">{course.title}</h1>
                      <p className="text-xl text-muted-foreground leading-relaxed">{course.description}</p>
                    </div>

                    {/* Instructor & Rating */}
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{course.instructor.name}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RatingStars rating={course.rating} size="sm" />
                        <span className="font-medium">{course.rating}</span>
                        <span className="text-muted-foreground">({course.reviewCount.toLocaleString()} reviews)</span>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{course.enrollmentCount.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span>{course.language}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Updated {new Date(course.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* What you'll learn */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Award className="w-5 h-5" />
                          <span>What you'll learn</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-3">
                          {course.whatYouWillLearn.map((item, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Course Preview & Enrollment */}
                  <div className="space-y-6">
                    {/* Video Preview */}
                    <div className="relative">
                      {course.promoVideoUrl ? (
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                          <iframe
                            src={course.promoVideoUrl}
                            className="w-full h-full"
                            allowFullScreen
                            title="Course Preview"
                          />
                        </div>
                      ) : (
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <Button size="lg" variant="secondary" className="gap-2">
                              <Play className="w-5 h-5" />
                              Preview Course
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Enrollment Card */}
                    <Card className="sticky top-20">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-3xl font-bold">${course.price}</span>
                              {course.originalPrice && (
                                <span className="text-lg text-muted-foreground line-through">
                                  ${course.originalPrice}
                                </span>
                              )}
                            </div>
                            {course.originalPrice && (
                              <Badge variant="destructive" className="text-xs">
                                {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Button className="w-full h-12 text-lg" onClick={handleEnroll} disabled={isEnrolling}>
                          {isEnrolling ? (
                            <>
                              <LoadingSpinner size="sm" className="mr-2" />
                              Enrolling...
                            </>
                          ) : (
                            "Enroll Now"
                          )}
                        </Button>

                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1 bg-transparent" onClick={handleWishlist}>
                            <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                            Wishlist
                          </Button>
                          <Button variant="outline" size="icon">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Course Features */}
                        <div className="space-y-3 pt-4 border-t">
                          <div className="flex items-center space-x-2 text-sm">
                            <Infinity className="w-4 h-4 text-green-500" />
                            <span>Lifetime access</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Download className="w-4 h-4 text-blue-500" />
                            <span>{course.downloadableResources} downloadable resources</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Award className="w-4 h-4 text-yellow-500" />
                            <span>Certificate of completion</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Shield className="w-4 h-4 text-purple-500" />
                            <span>30-day money-back guarantee</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>
          )
        )}

        {/* Course Content */}
        <section className="py-12">
          <div className="container">
            <Tabs defaultValue="curriculum" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
              </TabsList>

              {/* Curriculum Tab */}
              <TabsContent value="curriculum" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Course Curriculum</h2>
                  {course && (
                    <div className="text-sm text-muted-foreground">
                      {course.syllabus.length} sections •{" "}
                      {course.syllabus.reduce((acc, section) => acc + section.lectures.length, 0)} lectures
                    </div>
                  )}
                </div>

                {isLoading ? (
                  <SyllabusSkeleton />
                ) : (
                  course && (
                    <div className="space-y-4">
                      {course.syllabus.map((section) => (
                        <Card key={section.id}>
                          <Collapsible
                            open={expandedSections.includes(section.id)}
                            onOpenChange={() => toggleSection(section.id)}
                          >
                            <CollapsibleTrigger asChild>
                              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <ChevronRight
                                      className={`w-4 h-4 transition-transform ${expandedSections.includes(section.id) ? "rotate-90" : ""}`}
                                    />
                                    <div>
                                      <CardTitle className="text-lg">{section.title}</CardTitle>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {section.lectures.length} lectures • {section.duration}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <CardContent className="pt-0">
                                <div className="space-y-3">
                                  {section.lectures.map((lecture) => (
                                    <div
                                      key={lecture.id}
                                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                      <div className="w-6 h-6 flex items-center justify-center">
                                        {lecture.type === "video" && <PlayCircle className="w-4 h-4 text-blue-500" />}
                                        {lecture.type === "quiz" && <FileText className="w-4 h-4 text-green-500" />}
                                        {lecture.type === "assignment" && (
                                          <FileText className="w-4 h-4 text-orange-500" />
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-medium">{lecture.title}</p>
                                      </div>
                                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        <span>{lecture.duration}</span>
                                      </div>
                                      {!user && <Lock className="w-4 h-4 text-muted-foreground" />}
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </CollapsibleContent>
                          </Collapsible>
                        </Card>
                      ))}
                    </div>
                  )
                )}
              </TabsContent>

              {/* Instructor Tab */}
              <TabsContent value="instructor">
                {isLoading ? (
                  <InstructorProfileSkeleton />
                ) : (
                  course && (
                    <Card>
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-6">
                          <Avatar className="w-24 h-24">
                            <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-2xl">{course.instructor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-4">
                            <div>
                              <h3 className="text-2xl font-bold">{course.instructor.name}</h3>
                              <p className="text-muted-foreground">{course.instructor.bio}</p>
                            </div>

                            <div className="flex items-center space-x-6">
                              <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="font-medium">{course.instructor.rating}</span>
                                <span className="text-muted-foreground">Instructor Rating</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-blue-500" />
                                <span className="font-medium">{course.instructor.studentsCount.toLocaleString()}</span>
                                <span className="text-muted-foreground">Students</span>
                              </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                              {course.instructor.bio} With years of industry experience, they bring real-world knowledge
                              and practical insights to help students master the subject matter effectively.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Student Reviews</h2>
                  {course && (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RatingStars rating={course.rating} />
                        <span className="text-2xl font-bold">{course.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{course.reviewCount.toLocaleString()} reviews</div>
                    </div>
                  )}
                </div>

                {isLoading ? (
                  <ReviewsSkeleton />
                ) : (
                  course && (
                    <div className="space-y-6">
                      {course.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{review.user.name}</span>
                                <RatingStars rating={review.rating} size="sm" />
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(review.date).toLocaleDateString()}
                              </p>
                              <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </TabsContent>

              {/* Requirements Tab */}
              <TabsContent value="requirements" className="space-y-6">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-48" />
                    <div className="space-y-2">
                      {Array.from({ length: 3 }, (_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                      ))}
                    </div>
                  </div>
                ) : (
                  course && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                        <ul className="space-y-2">
                          {course.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
