"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  VideoPlayerSkeleton,
  PlaylistSkeleton,
  NotesSkeleton,
  ResourcesSkeleton,
  DiscussionSkeleton,
  ErrorState,
} from "@/components/ui/loading-states"
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
      title: "Note Added",
      description: "Your note has been saved successfully.",
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
      title: "Discussion Posted",
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
      <div className="min-h-screen flex items-center justify-center">
        <ErrorState title="Failed to Load Course" description={error} onRetry={retryFetch} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="font-semibold truncate max-w-md">
                {isLoading ? <div className="h-5 w-48 bg-muted animate-pulse rounded" /> : playerData?.course.title}
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

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="bg-black">
            {isLoading ? (
              <VideoPlayerSkeleton className="aspect-video" />
            ) : (
              playerData && (
                <div className="relative aspect-video">
                  <iframe
                    ref={videoRef}
                    src={playerData.currentLecture.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title={playerData.currentLecture.title}
                  />
                </div>
              )
            )}
          </div>

          {/* Lecture Info */}
          <div className="p-6 border-b">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
              </div>
            ) : (
              playerData && (
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold">{playerData.currentLecture.title}</h2>
                  <p className="text-muted-foreground">{playerData.currentLecture.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{playerData.currentLecture.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{playerData.course.instructor.name}</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Navigation */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <Button variant="outline" className="gap-2 bg-transparent">
                <ChevronLeft className="w-4 h-4" />
                Previous Lecture
              </Button>
              <Button className="gap-2">
                Next Lecture
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? "w-96" : "w-0"} transition-all duration-300 overflow-hidden border-l bg-background/50 backdrop-blur`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="playlist" className="text-xs">
                    Playlist
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="text-xs">
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="text-xs">
                    Resources
                  </TabsTrigger>
                  <TabsTrigger value="discussion" className="text-xs">
                    Discussion
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4">
                <Tabs value={activeTab}>
                  {/* Playlist Tab */}
                  <TabsContent value="playlist" className="mt-0">
                    {isLoading ? (
                      <PlaylistSkeleton />
                    ) : (
                      playerData && (
                        <div className="space-y-2">
                          {playerData.playlist.map((item, index) => (
                            <div
                              key={item.id}
                              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${
                                item.id === playerData.currentLecture.id ? "bg-primary/10 border-primary" : ""
                              }`}
                            >
                              <div className="w-6 h-6 flex items-center justify-center">
                                {item.isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : item.isLocked ? (
                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <PlayCircle className="w-4 h-4 text-blue-500" />
                                )}
                              </div>
                              <div className="w-16 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
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
                                <p className="text-xs text-muted-foreground">{item.duration}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">{index + 1}</span>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </TabsContent>

                  {/* Notes Tab */}
                  <TabsContent value="notes" className="mt-0">
                    {isLoading ? (
                      <NotesSkeleton />
                    ) : (
                      playerData && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Add a note at current timestamp..."
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              className="min-h-[80px]"
                            />
                            <Button onClick={handleAddNote} size="sm" className="w-full">
                              <Plus className="w-4 h-4 mr-2" />
                              Add Note
                            </Button>
                          </div>

                          <Separator />

                          <div className="space-y-3">
                            {playerData.userProgress.notes.map((note) => (
                              <Card key={note.id} className="p-3">
                                <div className="flex items-start justify-between mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    {Math.floor(note.timestamp / 60)}:
                                    {(note.timestamp % 60).toString().padStart(2, "0")}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(note.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm">{note.content}</p>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </TabsContent>

                  {/* Resources Tab */}
                  <TabsContent value="resources" className="mt-0">
                    {isLoading ? (
                      <ResourcesSkeleton />
                    ) : (
                      playerData && (
                        <div className="space-y-3">
                          <h3 className="font-semibold">Lecture Resources</h3>
                          {playerData.currentLecture.resources.map((resource) => (
                            <div
                              key={resource.id}
                              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                                <FileText className="w-4 h-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{resource.title}</p>
                                <p className="text-xs text-muted-foreground">{resource.size}</p>
                              </div>
                              <Button size="icon" variant="ghost">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </TabsContent>

                  {/* Discussion Tab */}
                  <TabsContent value="discussion" className="mt-0">
                    {isLoading ? (
                      <DiscussionSkeleton />
                    ) : (
                      playerData && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Ask a question or share your thoughts..."
                              value={newDiscussion}
                              onChange={(e) => setNewDiscussion(e.target.value)}
                              className="min-h-[80px]"
                            />
                            <Button onClick={handleAddDiscussion} size="sm" className="w-full">
                              <Send className="w-4 h-4 mr-2" />
                              Post Comment
                            </Button>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            {playerData.discussions.map((discussion) => (
                              <div key={discussion.id} className="space-y-3">
                                <div className="flex items-start space-x-3">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={discussion.user.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs">
                                      {discussion.user.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium text-sm">{discussion.user.name}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(discussion.createdAt).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <p className="text-sm">{discussion.content}</p>
                                    <div className="flex items-center space-x-4">
                                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                        <ThumbsUp className="w-3 h-3 mr-1" />
                                        Like
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                        <Reply className="w-3 h-3 mr-1" />
                                        Reply
                                      </Button>
                                    </div>
                                  </div>
                                </div>

                                {discussion.replies.length > 0 && (
                                  <div className="ml-11 space-y-3">
                                    {discussion.replies.map((reply) => (
                                      <div key={reply.id} className="flex items-start space-x-3">
                                        <Avatar className="w-6 h-6">
                                          <AvatarImage src={reply.user.avatar || "/placeholder.svg"} />
                                          <AvatarFallback className="text-xs">
                                            {reply.user.name.charAt(0)}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                          <div className="flex items-center space-x-2">
                                            <span className="font-medium text-xs">{reply.user.name}</span>
                                          </div>
                                          <p className="text-xs text-muted-foreground mt-1">{reply.content}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
