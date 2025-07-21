"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
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
  EnhancedCourseHeroSkeleton,
  EnhancedSyllabusSkeleton,
  EnhancedErrorState,
  LoadingSpinner,
} from "@/components/ui/enhanced-loading-states"
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
  BookOpen,
  TrendingUp,
  Zap,
  Target,
  MessageCircle,
  ThumbsUp,
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
  const [activeTab, setActiveTab] = useState("curriculum")

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
        title: "🎉 Successfully Enrolled!",
        description: "You can now access all course content. Happy learning!",
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
      title: isWishlisted ? "💔 Removed from Wishlist" : "❤️ Added to Wishlist",
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
          <EnhancedErrorState title="Course Not Found" description={error} onRetry={retryFetch} />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        {isLoading ? (
          <EnhancedCourseHeroSkeleton />
        ) : (
          course && (
            <motion.section
              className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Background decorations */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
              </div>

              <div className="container relative">
                <div className="grid lg:grid-cols-3 gap-12">
                  {/* Course Info */}
                  <motion.div
                    className="lg:col-span-2 space-y-8"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Courses</span>
                      <ChevronRight className="w-4 h-4" />
                      <Badge variant="secondary" className="font-medium">
                        {course.category}
                      </Badge>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {course.category}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`${
                            course.level === "Beginner"
                              ? "border-green-200 text-green-700 bg-green-50"
                              : course.level === "Intermediate"
                                ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                                : "border-red-200 text-red-700 bg-red-50"
                          }`}
                        >
                          {course.level}
                        </Badge>
                        {course.studentCount > 30000 && (
                          <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Bestseller
                          </Badge>
                        )}
                      </div>

                      <motion.h1
                        className="text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {course.title}
                      </motion.h1>

                      <motion.p
                        className="text-xl text-muted-foreground leading-relaxed max-w-3xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {course.description}
                      </motion.p>
                    </div>

                    {/* Instructor & Rating */}
                    <motion.div
                      className="flex flex-wrap items-center gap-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                          <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {course.instructor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{course.instructor.name}</p>
                          <p className="text-sm text-muted-foreground">{course.instructor.bio}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <RatingStars rating={course.rating} size="sm" />
                        <span className="font-semibold text-lg">{course.rating}</span>
                        <span className="text-muted-foreground">({course.reviewCount.toLocaleString()} reviews)</span>
                      </div>
                    </motion.div>

                    {/* Course Stats */}
                    <motion.div
                      className="grid grid-cols-2 md:grid-cols-4 gap-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <div className="flex items-center space-x-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm border">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-semibold">{course.enrollmentCount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Students</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm border">
                        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-semibold">{course.duration}</p>
                          <p className="text-sm text-muted-foreground">Duration</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm border">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="font-semibold">{course.language}</p>
                          <p className="text-sm text-muted-foreground">Language</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm border">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <p className="font-semibold">
                            {new Date(course.lastUpdated).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">Updated</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* What you'll learn */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <Card className="border-0 shadow-xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center space-x-3 text-xl">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Target className="w-5 h-5 text-primary" />
                            </div>
                            <span>What you'll learn</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            {course.whatYouWillLearn.map((item, index) => (
                              <motion.div
                                key={index}
                                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                              >
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm leading-relaxed">{item}</span>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>

                  {/* Course Preview & Enrollment */}
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {/* Video Preview */}
                    <div className="relative group">
                      {course.promoVideoUrl ? (
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
                          <iframe
                            src={course.promoVideoUrl}
                            className="w-full h-full"
                            allowFullScreen
                            title="Course Preview"
                          />
                        </div>
                      ) : (
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
                          <Image
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                              <Button size="lg" variant="secondary" className="gap-3 shadow-lg backdrop-blur-sm">
                                <Play className="w-6 h-6" />
                                Preview Course
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Enrollment Card */}
                    <Card className="border-0 shadow-2xl bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-sm sticky top-24">
                      <CardContent className="p-8 space-y-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                              ${course.price}
                            </span>
                            {course.originalPrice && (
                              <div className="space-y-1">
                                <span className="text-xl text-muted-foreground line-through">
                                  ${course.originalPrice}
                                </span>
                                <Badge variant="destructive" className="text-xs">
                                  {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                                  OFF
                                </Badge>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">💰 30-day money-back guarantee</p>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
                            onClick={handleEnroll}
                            disabled={isEnrolling}
                          >
                            {isEnrolling ? (
                              <>
                                <LoadingSpinner size="sm" className="mr-3" />
                                Enrolling...
                              </>
                            ) : (
                              <>
                                <Zap className="w-5 h-5 mr-2" />
                                Enroll Now
                              </>
                            )}
                          </Button>
                        </motion.div>

                        <div className="flex space-x-3">
                          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              variant="outline"
                              className="w-full h-12 rounded-xl bg-background/50 backdrop-blur-sm border-2"
                              onClick={handleWishlist}
                            >
                              <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                              Wishlist
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl bg-transparent">
                              <Share2 className="w-5 h-5" />
                            </Button>
                          </motion.div>
                        </div>

                        {/* Course Features */}
                        <div className="space-y-4 pt-6 border-t">
                          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                            This course includes:
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-sm">
                              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <Infinity className="w-4 h-4 text-green-600 dark:text-green-400" />
                              </div>
                              <span>Lifetime access</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <span>{course.downloadableResources} downloadable resources</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                              <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                              </div>
                              <span>Certificate of completion</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              </div>
                              <span>30-day money-back guarantee</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )
        )}

        {/* Course Content */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/10">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                <TabsList className="grid w-full grid-cols-4 h-14 p-1 bg-muted/50 backdrop-blur-sm rounded-2xl">
                  <TabsTrigger value="curriculum" className="rounded-xl font-medium">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger value="instructor" className="rounded-xl font-medium">
                    <Users className="w-4 h-4 mr-2" />
                    Instructor
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-xl font-medium">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value="requirements" className="rounded-xl font-medium">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Requirements
                  </TabsTrigger>
                </TabsList>

                {/* Curriculum Tab */}
                <TabsContent value="curriculum" className="space-y-8">
                  <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div>
                      <h2 className="text-3xl font-bold mb-2">Course Curriculum</h2>
                      {course && (
                        <p className="text-muted-foreground">
                          {course.syllabus.length} sections •{" "}
                          {course.syllabus.reduce((acc, section) => acc + section.lectures.length, 0)} lectures •{" "}
                          {course.duration} total length
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {isLoading ? (
                    <EnhancedSyllabusSkeleton />
                  ) : (
                    course && (
                      <div className="space-y-6">
                        {course.syllabus.map((section, sectionIndex) => (
                          <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                          >
                            <Card className="border-0 shadow-lg bg-background/50 backdrop-blur-sm overflow-hidden">
                              <Collapsible
                                open={expandedSections.includes(section.id)}
                                onOpenChange={() => toggleSection(section.id)}
                              >
                                <CollapsibleTrigger asChild>
                                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-4">
                                        <motion.div
                                          animate={{ rotate: expandedSections.includes(section.id) ? 90 : 0 }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                        </motion.div>
                                        <div>
                                          <CardTitle className="text-xl font-semibold">{section.title}</CardTitle>
                                          <p className="text-sm text-muted-foreground mt-1">
                                            {section.lectures.length} lectures • {section.duration}
                                          </p>
                                        </div>
                                      </div>
                                      <Badge variant="secondary" className="bg-background/50">
                                        Section {sectionIndex + 1}
                                      </Badge>
                                    </div>
                                  </CardHeader>
                                </CollapsibleTrigger>
                                <AnimatePresence>
                                  {expandedSections.includes(section.id) && (
                                    <CollapsibleContent forceMount>
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        <CardContent className="pt-0 pb-6">
                                          <div className="space-y-3">
                                            {section.lectures.map((lecture, lectureIndex) => (
                                              <motion.div
                                                key={lecture.id}
                                                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: lectureIndex * 0.05 }}
                                              >
                                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                                                  {lecture.type === "video" && (
                                                    <PlayCircle className="w-5 h-5 text-blue-500" />
                                                  )}
                                                  {lecture.type === "quiz" && (
                                                    <FileText className="w-5 h-5 text-green-500" />
                                                  )}
                                                  {lecture.type === "assignment" && (
                                                    <FileText className="w-5 h-5 text-orange-500" />
                                                  )}
                                                  {lecture.type === "reading" && (
                                                    <BookOpen className="w-5 h-5 text-purple-500" />
                                                  )}
                                                </div>
                                                <div className="flex-1">
                                                  <p className="font-medium group-hover:text-primary transition-colors">
                                                    {lecture.title}
                                                  </p>
                                                  <div className="flex items-center space-x-3 mt-1">
                                                    <span className="text-sm text-muted-foreground capitalize">
                                                      {lecture.type}
                                                    </span>
                                                    {lecture.isPreview && (
                                                      <Badge variant="outline" className="text-xs">
                                                        Preview
                                                      </Badge>
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                                  <Clock className="w-4 h-4" />
                                                  <span>{lecture.duration}</span>
                                                </div>
                                                {!user && !lecture.isPreview && (
                                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                                )}
                                              </motion.div>
                                            ))}
                                          </div>
                                        </CardContent>
                                      </motion.div>
                                    </CollapsibleContent>
                                  )}
                                </AnimatePresence>
                              </Collapsible>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )
                  )}
                </TabsContent>

                {/* Instructor Tab */}
                <TabsContent value="instructor">
                  {isLoading ? (
                    <div className="space-y-6">
                      <Card className="border-0 shadow-lg bg-background/50 backdrop-blur-sm">
                        <CardContent className="p-8">
                          <div className="flex items-start space-x-6">
                            <div className="w-32 h-32 bg-muted rounded-2xl animate-pulse" />
                            <div className="flex-1 space-y-4">
                              <div className="space-y-2">
                                <div className="h-8 w-48 bg-muted rounded animate-pulse" />
                                <div className="h-5 w-64 bg-muted rounded animate-pulse" />
                              </div>
                              <div className="flex items-center space-x-6">
                                <div className="h-6 w-32 bg-muted rounded animate-pulse" />
                                <div className="h-6 w-24 bg-muted rounded animate-pulse" />
                              </div>
                              <div className="space-y-2">
                                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    course && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="border-0 shadow-xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm">
                          <CardContent className="p-10">
                            <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
                              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <Avatar className="w-32 h-32 ring-4 ring-primary/20 shadow-xl">
                                  <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-4xl bg-primary/10 text-primary font-bold">
                                    {course.instructor.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              </motion.div>

                              <div className="flex-1 space-y-6">
                                <div>
                                  <h3 className="text-3xl font-bold mb-2">{course.instructor.name}</h3>
                                  <p className="text-lg text-muted-foreground">{course.instructor.bio}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                                    <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                      <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <div>
                                      <p className="font-bold text-lg">{course.instructor.rating}</p>
                                      <p className="text-sm text-muted-foreground">Instructor Rating</p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                      <p className="font-bold text-lg">
                                        {course.instructor.studentsCount.toLocaleString()}
                                      </p>
                                      <p className="text-sm text-muted-foreground">Students</p>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                      <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                      <p className="font-bold text-lg">{course.instructor.coursesCount}</p>
                                      <p className="text-sm text-muted-foreground">Courses</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                  <p className="text-muted-foreground leading-relaxed text-lg">
                                    {course.instructor.bio} With years of industry experience, they bring real-world
                                    knowledge and practical insights to help students master the subject matter
                                    effectively. Their teaching approach focuses on hands-on learning and building
                                    practical skills that students can immediately apply in their careers.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  )}
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-8">
                  <motion.div
                    className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div>
                      <h2 className="text-3xl font-bold mb-2">Student Reviews</h2>
                      <p className="text-muted-foreground">See what our students are saying about this course</p>
                    </div>
                    {course && (
                      <div className="flex items-center space-x-6 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border">
                        <div className="text-center">
                          <div className="flex items-center space-x-2 mb-2">
                            <RatingStars rating={course.rating} size="lg" />
                          </div>
                          <div className="text-4xl font-bold">{course.rating}</div>
                          <div className="text-sm text-muted-foreground">Course Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{course.reviewCount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Reviews</div>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {isLoading ? (
                    <div className="space-y-6">
                      {Array.from({ length: 3 }, (_, i) => (
                        <div key={i} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-muted rounded-full animate-pulse" />
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="h-5 w-32 bg-muted rounded animate-pulse" />
                                <div className="flex space-x-1">
                                  {Array.from({ length: 5 }, (_, j) => (
                                    <div key={j} className="w-4 h-4 bg-muted rounded animate-pulse" />
                                  ))}
                                </div>
                              </div>
                              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                              <div className="space-y-2">
                                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    course && (
                      <div className="space-y-6">
                        {course.reviews.map((review, index) => (
                          <motion.div
                            key={review.id}
                            className="p-6 rounded-2xl border bg-background/50 backdrop-blur-sm hover:shadow-lg transition-shadow"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <div className="flex items-start space-x-4">
                              <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                                <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                  {review.user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-3">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                                  <div className="flex items-center space-x-3">
                                    <span className="font-semibold text-lg">{review.user.name}</span>
                                    <RatingStars rating={review.rating} size="sm" />
                                  </div>
                                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                    <span>{new Date(review.date).toLocaleDateString()}</span>
                                    <div className="flex items-center space-x-1">
                                      <ThumbsUp className="w-4 h-4" />
                                      <span>{review.helpful}</span>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed text-lg">{review.comment}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )
                  )}
                </TabsContent>

                {/* Requirements Tab */}
                <TabsContent value="requirements" className="space-y-8">
                  {isLoading ? (
                    <div className="space-y-6">
                      <div className="h-8 w-48 bg-muted rounded animate-pulse" />
                      <div className="space-y-3">
                        {Array.from({ length: 4 }, (_, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <div className="w-5 h-5 bg-muted rounded-full animate-pulse mt-0.5" />
                            <div className="h-4 w-full bg-muted rounded animate-pulse" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    course && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="border-0 shadow-xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm">
                          <CardContent className="p-8">
                            <div className="space-y-6">
                              <div>
                                <h2 className="text-3xl font-bold mb-4 flex items-center space-x-3">
                                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                  </div>
                                  <span>Requirements</span>
                                </h2>
                                <p className="text-muted-foreground text-lg">
                                  Here's what you need to get started with this course
                                </p>
                              </div>

                              <div className="grid gap-4">
                                {course.requirements.map((requirement, index) => (
                                  <motion.div
                                    key={index}
                                    className="flex items-start space-x-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                  >
                                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-lg leading-relaxed">{requirement}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
