import type { Course } from "@/lib/mock-data"
import { mockCourses } from "@/lib/mock-data"

// Simulate API delays and potential errors
const simulateDelay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))
const simulateError = (probability = 0.1) => Math.random() < probability

export interface CourseDetails extends Course {
  syllabus: {
    id: string
    title: string
    duration: string
    lectures: {
      id: string
      title: string
      duration: string
      type: "video" | "quiz" | "assignment"
      isCompleted?: boolean
      videoUrl?: string
      description?: string
    }[]
  }[]
  reviews: {
    id: string
    user: {
      name: string
      avatar: string
    }
    rating: number
    comment: string
    date: string
  }[]
  promoVideoUrl?: string
  enrollmentCount: number
  lastUpdated: string
  certificate: boolean
  downloadableResources: number
  lifetimeAccess: boolean
}

export interface CoursePlayerData {
  course: CourseDetails
  currentLecture: {
    id: string
    title: string
    videoUrl: string
    duration: string
    description: string
    resources: {
      id: string
      title: string
      type: string
      url: string
      size?: string
    }[]
  }
  playlist: {
    id: string
    title: string
    duration: string
    type: "video" | "quiz" | "assignment"
    isCompleted: boolean
    isLocked: boolean
    thumbnail?: string
  }[]
  userProgress: {
    completedLectures: string[]
    currentTime: number
    notes: {
      id: string
      timestamp: number
      content: string
      createdAt: string
    }[]
    bookmarks: {
      id: string
      timestamp: number
      title: string
      createdAt: string
    }[]
  }
  discussions: {
    id: string
    user: {
      name: string
      avatar: string
    }
    content: string
    timestamp: number
    replies: {
      id: string
      user: {
        name: string
        avatar: string
      }
      content: string
      timestamp: number
    }[]
    createdAt: string
  }[]
}

// Mock detailed course data
const createDetailedCourse = (baseCourse: Course): CourseDetails => ({
  ...baseCourse,
  syllabus: [
    {
      id: "s1",
      title: "Introduction to React",
      duration: "2 hours",
      lectures: [
        {
          id: "l1",
          title: "What is React?",
          duration: "15 min",
          type: "video",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: "Learn the fundamentals of React and why it's popular",
        },
        {
          id: "l2",
          title: "Setting up the Environment",
          duration: "20 min",
          type: "video",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: "Set up your development environment for React",
        },
        { id: "l3", title: "Your First Component", duration: "25 min", type: "video" },
        { id: "l4", title: "Quiz: React Basics", duration: "10 min", type: "quiz" },
      ],
    },
    {
      id: "s2",
      title: "Components and Props",
      duration: "3 hours",
      lectures: [
        { id: "l5", title: "Understanding Components", duration: "30 min", type: "video" },
        { id: "l6", title: "Props and Data Flow", duration: "25 min", type: "video" },
        { id: "l7", title: "Component Composition", duration: "35 min", type: "video" },
        { id: "l8", title: "Assignment: Build a Card Component", duration: "45 min", type: "assignment" },
      ],
    },
    {
      id: "s3",
      title: "State and Lifecycle",
      duration: "4 hours",
      lectures: [
        { id: "l9", title: "Understanding State", duration: "40 min", type: "video" },
        { id: "l10", title: "useState Hook", duration: "35 min", type: "video" },
        { id: "l11", title: "useEffect Hook", duration: "45 min", type: "video" },
        { id: "l12", title: "Quiz: Hooks", duration: "15 min", type: "quiz" },
      ],
    },
  ],
  reviews: [
    {
      id: "r1",
      user: { name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32&text=AJ" },
      rating: 5,
      comment:
        "Excellent course! Very comprehensive and well-structured. The instructor explains complex concepts in a simple way.",
      date: "2024-01-10",
    },
    {
      id: "r2",
      user: { name: "Bob Wilson", avatar: "/placeholder.svg?height=32&width=32&text=BW" },
      rating: 4,
      comment:
        "Great content, but could use more practical examples. Overall very satisfied with the learning experience.",
      date: "2024-01-08",
    },
    {
      id: "r3",
      user: { name: "Carol Davis", avatar: "/placeholder.svg?height=32&width=32&text=CD" },
      rating: 5,
      comment:
        "This course transformed my understanding of React. Highly recommend to anyone starting with React development.",
      date: "2024-01-05",
    },
  ],
  promoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  enrollmentCount: 45000,
  certificate: true,
  downloadableResources: 25,
  lifetimeAccess: true,
})

export async function getCourseById(id: string): Promise<CourseDetails> {
  await simulateDelay(1500)

  if (simulateError(0.05)) {
    throw new Error("Failed to fetch course data")
  }

  const baseCourse = mockCourses.find((course) => course.id === id)
  if (!baseCourse) {
    throw new Error("Course not found")
  }

  return createDetailedCourse(baseCourse)
}

export async function getCoursePlayerData(courseId: string, lectureId?: string): Promise<CoursePlayerData> {
  await simulateDelay(2000)

  if (simulateError(0.05)) {
    throw new Error("Failed to fetch course player data")
  }

  const course = await getCourseById(courseId)
  const firstLecture = course.syllabus[0]?.lectures[0]

  if (!firstLecture) {
    throw new Error("No lectures found for this course")
  }

  const currentLecture = {
    id: firstLecture.id,
    title: firstLecture.title,
    videoUrl: firstLecture.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: firstLecture.duration,
    description: firstLecture.description || "Course lecture content",
    resources: [
      {
        id: "r1",
        title: "Lecture Slides.pdf",
        type: "pdf",
        url: "#",
        size: "2.5 MB",
      },
      {
        id: "r2",
        title: "Source Code.zip",
        type: "zip",
        url: "#",
        size: "1.2 MB",
      },
      {
        id: "r3",
        title: "Additional Reading.docx",
        type: "docx",
        url: "#",
        size: "856 KB",
      },
    ],
  }

  const playlist = course.syllabus.flatMap((section) =>
    section.lectures.map((lecture) => ({
      id: lecture.id,
      title: lecture.title,
      duration: lecture.duration,
      type: lecture.type,
      isCompleted: Math.random() > 0.7,
      isLocked: false,
      thumbnail: "/placeholder.svg?height=60&width=100&text=Video",
    })),
  )

  const userProgress = {
    completedLectures: playlist.filter((item) => item.isCompleted).map((item) => item.id),
    currentTime: 0,
    notes: [
      {
        id: "n1",
        timestamp: 120,
        content: "Important concept about React components",
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        id: "n2",
        timestamp: 300,
        content: "Remember to use useState for state management",
        createdAt: "2024-01-15T10:35:00Z",
      },
    ],
    bookmarks: [
      {
        id: "b1",
        timestamp: 180,
        title: "Component Definition",
        createdAt: "2024-01-15T10:32:00Z",
      },
    ],
  }

  const discussions = [
    {
      id: "d1",
      user: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32&text=JD" },
      content: "Great explanation of React components! Can you provide more examples?",
      timestamp: 240,
      replies: [
        {
          id: "r1",
          user: { name: "Instructor", avatar: "/placeholder.svg?height=32&width=32&text=IN" },
          content: "I'll add more examples in the next lecture.",
          timestamp: 0,
        },
      ],
      createdAt: "2024-01-15T11:00:00Z",
    },
    {
      id: "d2",
      user: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32&text=JS" },
      content: "Having trouble with the useState hook. Any tips?",
      timestamp: 420,
      replies: [],
      createdAt: "2024-01-15T11:15:00Z",
    },
  ]

  return {
    course,
    currentLecture,
    playlist,
    userProgress,
    discussions,
  }
}
