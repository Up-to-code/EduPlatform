"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  VideoPlayerSkeleton,
  EnhancedPlaylistSkeleton,
  EnhancedNotesSkeleton,
  EnhancedResourcesSkeleton,
  EnhancedDiscussionSkeleton,
  EnhancedErrorState,
} from "@/components/ui/enhanced-loading-states"
import { getCoursePlayerData, type CoursePlayerData } from "@/lib/course-api"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import {
  PlayCircle,
  CheckCircle,
  Lock,
  FileText,
  Download,
  Plus,
  Send,
  Clock,
  User,
  ThumbsUp,
  Reply,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Settings,
  Maximize,
  Volume2,
  SkipBack,
  SkipForward,
  Pause,
  Play,
  MessageSquare,
  FileDown,
  Lightbulb,
  Target,
  Star,
  MoreVertical,
} from "lucide-react"

export default function CoursePlayerPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const [playerData, setPlayerData] = useState<CoursePlayerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("playlist")
  const [newNote, setNewNote] = useState("")
  const [newDiscussion, setNewDiscussion] = useState("")
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)

  const courseId = params.id as string
  const videoRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getCoursePlayerData(courseId)
        setPlayerData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load course player")
      } finally {
        setIsLoading(false)
      }
    }

    if (courseId) {
      fetchPlayerData()
    }
  }, [courseId])

  const handleAddNote = () => {
    if (!newNote.trim() || !playerData) return

    const note = {
      id: Date.now().toString(),
      timestamp: currentTime,
      content: newNote,
      createdAt: new Date().toISOString(),
    }

    setPlayerData((prev) =>
      prev
        ? {
            ...prev,
            userProgress: {
              ...prev.userProgress,
              notes: [...prev.userProgress.notes, note],
            },
          }
        : null,
    )

    setNewNote("")
    toast({
      title: "📝 Note Added",
      description: "Your note has been saved successfully.",
    })
  }

  const handleAddBookmark = () => {
    if (!playerData) return

    const bookmark = {
      id: Date.now().toString(),
      timestamp: currentTime,
      title: `Bookmark at ${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, "0")}`,
      createdAt: new Date().toISOString(),
    }

    setPlayerData((prev) =>
      prev
        ? {
            ...prev,
            userProgress: {
              ...prev.userProgress,
              bookmarks: [...prev.userProgress.bookmarks, bookmark],
            },
          }
        : null,
    )

    toast({
      title: "🔖 Bookmark Added",
      description: "Bookmark saved at current timestamp.",
    })
  }

  const handleAddDiscussion = () => {
    if (!newDiscussion.trim() || !playerData) return

    const discussion = {
      id: Date.now().toString(),
      user: {
        name: user?.name || "Anonymous",
        avatar: user?.avatar || "/placeholder.svg?height=32&width=32&text=U",
      },
      content: newDiscussion,
      timestamp: currentTime,
      replies: [],
      createdAt: new Date().toISOString(),
      likes: 0,
    }

    setPlayerData((prev) =>
      prev
        ? {
            ...prev,
            discussions: [discussion, ...prev.discussions],
          }
        : null,
    )

    setNewDiscussion("")
    toast({
      title: "💬 Discussion Posted",
      description: "Your comment has been added to the discussion.",
    })
  }

  const retryFetch = () => {
    setError(null)
    const fetchPlayerData = async () => {
      try {
        setIsLoading(true)
        const data = await getCoursePlayerData(courseId)
        setPlayerData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load course player")
      } finally {
        setIsLoading(false)
      }
    }
    fetchPlayerData()
  }

  if (!user) {
    router.push("/auth/signin")
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <EnhancedErrorState title="Failed to Load Course" description={error} onRetry={retryFetch} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 flex flex-col">
      {/* Enhanced Header */}
      <motion.header
        className="border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </motion.div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-lg truncate max-w-md">
                  {isLoading ? <div className="h-6 w-48 bg-muted animate-pulse rounded" /> : playerData?.course.title}
                </h1>
                <p className="text-sm text-muted-foreground truncate max-w-md">
                  {isLoading ? (
                    <div className="h-4 w-32 bg-muted animate-pulse rounded mt-1" />
                  ) : (
                    playerData?.currentLecture.title
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Progress indicator */}
            {!isLoading && playerData && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-sm text-muted-foreground">Progress: {Math.round(progress)}%</div>
                <div className="w-24">
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-xl lg:hidden"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Enhanced Video Player */}
          <div className="bg-black relative">
            {isLoading ? (
              <VideoPlayerSkeleton className="aspect-video" />
            ) : (
              playerData && (
                <motion.div
                  className="relative aspect-video group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <iframe
                    ref={videoRef}
                    src={playerData.currentLecture.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title={playerData.currentLecture.title}
                  />

                  {/* Custom Video Controls Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl">
                            <SkipBack className="w-5 h-5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl">
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl">
                            <SkipForward className="w-5 h-5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl">
                            <Volume2 className="w-5 h-5" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20 rounded-xl"
                            onClick={handleAddBookmark}
                          >
                            <Bookmark className="w-5 h-5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl">
                            <Settings className="w-5 h-5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl">
                            <Maximize className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>

          {/* Enhanced Lecture Info */}
          <motion.div
            className="p-8 border-b bg-gradient-to-r from-background to-muted/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-muted animate-pulse rounded-lg" />
                <div className="h-5 w-full bg-muted animate-pulse rounded" />
                <div className="h-5 w-2/3 bg-muted animate-pulse rounded" />
                <div className="flex items-center space-x-6 mt-4">
                  <div className="h-5 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-5 w-32 bg-muted animate-pulse rounded" />
                </div>
              </div>
            ) : (
              playerData && (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-3">{playerData.currentLecture.title}</h2>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {playerData.currentLecture.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-6">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Lecture 1
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium">{playerData.currentLecture.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="font-medium">{playerData.course.instructor.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="font-medium">Beginner Level</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </motion.div>

          {/* Enhanced Navigation */}
          <motion.div
            className="p-8 border-b bg-gradient-to-r from-muted/20 to-background"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="gap-3 h-12 px-6 rounded-xl bg-background/50 backdrop-blur-sm">
                  <ChevronLeft className="w-5 h-5" />
                  Previous Lecture
                </Button>
              </motion.div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Star className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="gap-3 h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-primary/90">
                  Next Lecture
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="w-96 border-l bg-gradient-to-b from-background/95 to-muted/20 backdrop-blur-md"
              initial={{ x: 384, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 384, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="h-full flex flex-col">
                <div className="p-6 border-b">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4 h-12 p-1 bg-muted/50 backdrop-blur-sm rounded-xl">
                      <TabsTrigger value="playlist" className="rounded-lg text-xs font-medium">
                        <PlayCircle className="w-4 h-4 mb-1" />
                        Playlist
                      </TabsTrigger>
                      <TabsTrigger value="notes" className="rounded-lg text-xs font-medium">
                        <FileText className="w-4 h-4 mb-1" />
                        Notes
                      </TabsTrigger>
                      <TabsTrigger value="resources" className="rounded-lg text-xs font-medium">
                        <FileDown className="w-4 h-4 mb-1" />
                        Resources
                      </TabsTrigger>
                      <TabsTrigger value="discussion" className="rounded-lg text-xs font-medium">
                        <MessageSquare className="w-4 h-4 mb-1" />
                        Discussion
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-6">
                    <Tabs value={activeTab}>
                      {/* Enhanced Playlist Tab */}
                      <TabsContent value="playlist" className="mt-0">
                        {isLoading ? (
                          <EnhancedPlaylistSkeleton />
                        ) : (
                          playerData && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-lg">Course Content</h3>
                                <Badge variant="secondary" className="bg-primary/10 text-primary">
                                  {playerData.playlist.length} lectures
                                </Badge>
                              </div>

                              {playerData.playlist.map((item, index) => (
                                <motion.div
                                  key={item.id}
                                  className={`flex items-center space-x-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                                    item.id === playerData.currentLecture.id
                                      ? "bg-primary/10 border-primary shadow-md"
                                      : "bg-background/50 backdrop-blur-sm hover:bg-muted/50 hover:shadow-md"
                                  }`}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted">
                                    {item.isCompleted ? (
                                      <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : item.isLocked ? (
                                      <Lock className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                      <PlayCircle className="w-5 h-5 text-primary" />
                                    )}
                                  </div>

                                  <div className="w-20 h-14 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                    {item.thumbnail && (
                                      <img
                                        src={item.thumbnail || "/placeholder.svg"}
                                        alt=""
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{item.title}</p>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <Badge variant="outline" className="text-xs">
                                        {item.sectionTitle}
                                      </Badge>
                                      <span className="text-xs text-muted-foreground">{item.duration}</span>
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <span className="text-xs text-muted-foreground font-medium">{index + 1}</span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )
                        )}
                      </TabsContent>

                      {/* Enhanced Notes Tab */}
                      <TabsContent value="notes" className="mt-0">
                        {isLoading ? (
                          <EnhancedNotesSkeleton />
                        ) : (
                          playerData && (
                            <div className="space-y-6">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold text-lg flex items-center space-x-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                                    <span>My Notes</span>
                                  </h3>
                                  <Badge variant="secondary">{playerData.userProgress.notes.length}</Badge>
                                </div>

                                <div className="space-y-3">
                                  <Textarea
                                    placeholder="Add a note at current timestamp..."
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    className="min-h-[100px] rounded-xl border-2 focus:border-primary/50 bg-background/50 backdrop-blur-sm"
                                  />
                                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                      onClick={handleAddNote}
                                      className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/90"
                                    >
                                      <Plus className="w-5 h-5 mr-2" />
                                      Add Note
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>

                              <Separator />

                              <div className="space-y-4">
                                {playerData.userProgress.notes.map((note, index) => (
                                  <motion.div
                                    key={note.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                  >
                                    <Card className="border-0 shadow-md bg-background/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                                      <CardContent className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                          <Badge
                                            variant="outline"
                                            className="text-xs bg-primary/10 text-primary border-primary/20"
                                          >
                                            {Math.floor(note.timestamp / 60)}:
                                            {(note.timestamp % 60).toString().padStart(2, "0")}
                                          </Badge>
                                          <span className="text-xs text-muted-foreground">
                                            {new Date(note.createdAt).toLocaleDateString()}
                                          </span>
                                        </div>
                                        <p className="text-sm leading-relaxed">{note.content}</p>
                                      </CardContent>
                                    </Card>
                                  </motion.div>
                                ))}

                                {playerData.userProgress.notes.length === 0 && (
                                  <div className="text-center py-8 text-muted-foreground">
                                    <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p>No notes yet. Start taking notes to remember key points!</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </TabsContent>

                      {/* Enhanced Resources Tab */}
                      <TabsContent value="resources" className="mt-0">
                        {isLoading ? (
                          <EnhancedResourcesSkeleton />
                        ) : (
                          playerData && (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg flex items-center space-x-2">
                                  <FileDown className="w-5 h-5 text-blue-500" />
                                  <span>Lecture Resources</span>
                                </h3>
                                <Badge variant="secondary">{playerData.currentLecture.resources.length}</Badge>
                              </div>

                              <div className="space-y-3">
                                {playerData.currentLecture.resources.map((resource, index) => (
                                  <motion.div
                                    key={resource.id}
                                    className="flex items-center space-x-4 p-4 border rounded-xl bg-background/50 backdrop-blur-sm hover:bg-muted/50 hover:shadow-md transition-all cursor-pointer group"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                      <FileText className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-medium text-sm">{resource.title}</p>
                                      <div className="flex items-center space-x-2 mt-1">
                                        <Badge variant="outline" className="text-xs">
                                          {resource.type.toUpperCase()}
                                        </Badge>
                                        {resource.size && (
                                          <span className="text-xs text-muted-foreground">{resource.size}</span>
                                        )}
                                      </div>
                                    </div>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="rounded-xl group-hover:bg-primary/10"
                                    >
                                      <Download className="w-5 h-5" />
                                    </Button>
                                  </motion.div>
                                ))}

                                {playerData.currentLecture.resources.length === 0 && (
                                  <div className="text-center py-8 text-muted-foreground">
                                    <FileDown className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p>No resources available for this lecture.</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </TabsContent>

                      {/* Enhanced Discussion Tab */}
                      <TabsContent value="discussion" className="mt-0">
                        {isLoading ? (
                          <EnhancedDiscussionSkeleton />
                        ) : (
                          playerData && (
                            <div className="space-y-6">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold text-lg flex items-center space-x-2">
                                    <MessageSquare className="w-5 h-5 text-green-500" />
                                    <span>Discussion</span>
                                  </h3>
                                  <Badge variant="secondary">{playerData.discussions.length}</Badge>
                                </div>

                                <div className="space-y-3">
                                  <Textarea
                                    placeholder="Ask a question or share your thoughts..."
                                    value={newDiscussion}
                                    onChange={(e) => setNewDiscussion(e.target.value)}
                                    className="min-h-[100px] rounded-xl border-2 focus:border-primary/50 bg-background/50 backdrop-blur-sm"
                                  />
                                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                      onClick={handleAddDiscussion}
                                      className="w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                                    >
                                      <Send className="w-5 h-5 mr-2" />
                                      Post Comment
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>

                              <Separator />

                              <div className="space-y-6">
                                {playerData.discussions.map((discussion, index) => (
                                  <motion.div
                                    key={discussion.id}
                                    className="space-y-4"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                  >
                                    <Card className="border-0 shadow-md bg-background/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
                                      <CardContent className="p-4">
                                        <div className="flex items-start space-x-3">
                                          <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                                            <AvatarImage src={discussion.user.avatar || "/placeholder.svg"} />
                                            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                                              {discussion.user.name.charAt(0)}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1 space-y-3">
                                            <div className="flex items-center space-x-3">
                                              <span className="font-semibold text-sm">{discussion.user.name}</span>
                                              <span className="text-xs text-muted-foreground">
                                                {new Date(discussion.createdAt).toLocaleDateString()}
                                              </span>
                                            </div>
                                            <p className="text-sm leading-relaxed">{discussion.content}</p>
                                            <div className="flex items-center space-x-4">
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 px-3 text-xs rounded-lg hover:bg-primary/10"
                                              >
                                                <ThumbsUp className="w-3 h-3 mr-1" />
                                                Like ({discussion.likes})
                                              </Button>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 px-3 text-xs rounded-lg hover:bg-primary/10"
                                              >
                                                <Reply className="w-3 h-3 mr-1" />
                                                Reply
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    {discussion.replies.length > 0 && (
                                      <div className="ml-12 space-y-3">
                                        {discussion.replies.map((reply) => (
                                          <Card key={reply.id} className="border-0 bg-muted/30 backdrop-blur-sm">
                                            <CardContent className="p-3">
                                              <div className="flex items-start space-x-3">
                                                <Avatar className="w-8 h-8">
                                                  <AvatarImage src={reply.user.avatar || "/placeholder.svg"} />
                                                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                                                    {reply.user.name.charAt(0)}
                                                  </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                  <div className="flex items-center space-x-2 mb-1">
                                                    <span className="font-medium text-xs">{reply.user.name}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                      {new Date(reply.createdAt).toLocaleDateString()}
                                                    </span>
                                                  </div>
                                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                                    {reply.content}
                                                  </p>
                                                </div>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        ))}
                                      </div>
                                    )}
                                  </motion.div>
                                ))}

                                {playerData.discussions.length === 0 && (
                                  <div className="text-center py-8 text-muted-foreground">
                                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p>No discussions yet. Be the first to ask a question!</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                </ScrollArea>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
