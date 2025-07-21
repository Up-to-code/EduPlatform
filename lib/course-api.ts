import type { Course } from "./mock-data"

// Extended types for enhanced course details
export interface CourseDetails extends Course {
  promoVideoUrl?: string
  whatYouWillLearn: string[]
  requirements: string[]
  downloadableResources: number
  enrollmentCount: number
  lastUpdated: string
  syllabus: CourseSyllabus[]
  reviews: CourseReview[]
  relatedCourses: Course[]
}

export interface CourseSyllabus {
  id: string
  title: string
  duration: string
  lectures: CourseLecture[]
}

export interface CourseLecture {
  id: string
  title: string
  duration: string
  type: "video" | "quiz" | "assignment" | "reading"
  isPreview?: boolean
}

export interface CourseReview {
  id: string
  user: {
    name: string
    avatar?: string
  }
  rating: number
  comment: string
  date: string
  helpful: number
}

// Course Player Data Types
export interface CoursePlayerData {
  course: {
    id: string
    title: string
    instructor: {
      name: string
      avatar?: string
    }
  }
  currentLecture: {
    id: string
    title: string
    description: string
    duration: string
    videoUrl: string
    resources: LectureResource[]
    transcript?: string
    quiz?: Quiz
  }
  playlist: PlaylistItem[]
  userProgress: {
    completedLectures: string[]
    currentTime: number
    notes: Note[]
    bookmarks: Bookmark[]
  }
  discussions: Discussion[]
  nextLecture?: PlaylistItem
  previousLecture?: PlaylistItem
}

export interface PlaylistItem {
  id: string
  title: string
  duration: string
  type: "video" | "quiz" | "assignment"
  isCompleted: boolean
  isLocked: boolean
  thumbnail?: string
  sectionTitle: string
}

export interface LectureResource {
  id: string
  title: string
  type: "pdf" | "zip" | "link" | "code"
  size?: string
  url: string
}

export interface Note {
  id: string
  timestamp: number
  content: string
  createdAt: string
}

export interface Bookmark {
  id: string
  timestamp: number
  title: string
  createdAt: string
}

export interface Discussion {
  id: string
  user: {
    name: string
    avatar?: string
  }
  content: string
  timestamp: number
  replies: Reply[]
  createdAt: string
  likes: number
}

export interface Reply {
  id: string
  user: {
    name: string
    avatar?: string
  }
  content: string
  createdAt: string
}

export interface Quiz {
  id: string
  title: string
  questions: QuizQuestion[]
  timeLimit?: number
  passingScore: number
}

export interface QuizQuestion {
  id: string
  question: string
  type: "multiple-choice" | "true-false" | "fill-blank"
  options?: string[]
  correctAnswer: string | number
  explanation?: string
}

// Mock API functions
export async function getCourseById(id: string): Promise<CourseDetails> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (Math.random() < 0.1) {
    throw new Error("Course not found")
  }

  return {
    id,
    title: "Complete React Development Bootcamp 2024",
    description:
      "Master React from basics to advanced concepts including hooks, context, Redux, and modern development practices. Build real-world projects and become a professional React developer.",
    thumbnail: "/placeholder.svg?height=400&width=600&text=React+Course",
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 12847,
    studentCount: 45623,
    duration: "42 hours",
    level: "Intermediate",
    category: "Web Development",
    language: "English",
    instructor: {
      name: "Sarah Johnson",
      bio: "Senior Full-Stack Developer with 8+ years of experience",
      avatar: "/placeholder.svg?height=100&width=100&text=SJ",
      rating: 4.9,
      studentsCount: 125000,
      coursesCount: 12,
    },
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    promoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    whatYouWillLearn: [
      "Build modern React applications from scratch",
      "Master React Hooks and functional components",
      "Implement state management with Redux and Context API",
      "Create responsive and interactive user interfaces",
      "Deploy React applications to production",
      "Write clean, maintainable, and scalable code",
    ],
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Familiarity with ES6+ features",
      "A computer with internet connection",
      "Code editor (VS Code recommended)",
    ],
    downloadableResources: 25,
    enrollmentCount: 45623,
    lastUpdated: "2024-01-15",
    syllabus: [
      {
        id: "section-1",
        title: "Getting Started with React",
        duration: "3h 45m",
        lectures: [
          { id: "1", title: "Introduction to React", duration: "15:30", type: "video", isPreview: true },
          { id: "2", title: "Setting up Development Environment", duration: "22:15", type: "video" },
          { id: "3", title: "Your First React Component", duration: "18:45", type: "video" },
          { id: "4", title: "Knowledge Check", duration: "10:00", type: "quiz" },
        ],
      },
      {
        id: "section-2",
        title: "React Fundamentals",
        duration: "8h 20m",
        lectures: [
          { id: "5", title: "JSX and Components", duration: "25:30", type: "video" },
          { id: "6", title: "Props and State", duration: "32:15", type: "video" },
          { id: "7", title: "Event Handling", duration: "28:45", type: "video" },
          { id: "8", title: "Conditional Rendering", duration: "20:30", type: "video" },
          { id: "9", title: "Lists and Keys", duration: "24:15", type: "video" },
          { id: "10", title: "Build a Todo App", duration: "45:00", type: "assignment" },
        ],
      },
    ],
    reviews: [
      {
        id: "1",
        user: { name: "Alex Chen", avatar: "/placeholder.svg?height=40&width=40&text=AC" },
        rating: 5,
        comment:
          "Excellent course! Sarah explains everything clearly and the projects are very practical. Highly recommended for anyone wanting to learn React.",
        date: "2024-01-10",
        helpful: 24,
      },
      {
        id: "2",
        user: { name: "Maria Rodriguez", avatar: "/placeholder.svg?height=40&width=40&text=MR" },
        rating: 4,
        comment:
          "Great content and well-structured. The pace is perfect for beginners. Would love to see more advanced topics covered.",
        date: "2024-01-08",
        helpful: 18,
      },
    ],
    relatedCourses: [],
  }
}

export async function getCoursePlayerData(courseId: string): Promise<CoursePlayerData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  if (Math.random() < 0.05) {
    throw new Error("Failed to load course player data")
  }

  return {
    course: {
      id: courseId,
      title: "Complete React Development Bootcamp 2024",
      instructor: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=SJ",
      },
    },
    currentLecture: {
      id: "1",
      title: "Introduction to React",
      description:
        "Learn the fundamentals of React and understand why it's one of the most popular JavaScript libraries for building user interfaces.",
      duration: "15:30",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      resources: [
        { id: "1", title: "React Documentation", type: "link", url: "https://react.dev" },
        { id: "2", title: "Course Slides", type: "pdf", size: "2.5 MB", url: "/slides.pdf" },
        { id: "3", title: "Starter Code", type: "zip", size: "1.2 MB", url: "/starter-code.zip" },
      ],
      transcript: "Welcome to the Complete React Development Bootcamp...",
      quiz: {
        id: "quiz-1",
        title: "React Basics Quiz",
        questions: [
          {
            id: "q1",
            question: "What is React?",
            type: "multiple-choice",
            options: ["A JavaScript library", "A programming language", "A database", "A web server"],
            correctAnswer: 0,
            explanation: "React is a JavaScript library for building user interfaces.",
          },
        ],
        timeLimit: 300,
        passingScore: 80,
      },
    },
    playlist: [
      {
        id: "1",
        title: "Introduction to React",
        duration: "15:30",
        type: "video",
        isCompleted: true,
        isLocked: false,
        thumbnail: "/placeholder.svg?height=60&width=100&text=Intro",
        sectionTitle: "Getting Started",
      },
      {
        id: "2",
        title: "Setting up Development Environment",
        duration: "22:15",
        type: "video",
        isCompleted: false,
        isLocked: false,
        thumbnail: "/placeholder.svg?height=60&width=100&text=Setup",
        sectionTitle: "Getting Started",
      },
      {
        id: "3",
        title: "Your First React Component",
        duration: "18:45",
        type: "video",
        isCompleted: false,
        isLocked: true,
        thumbnail: "/placeholder.svg?height=60&width=100&text=Component",
        sectionTitle: "Getting Started",
      },
    ],
    userProgress: {
      completedLectures: ["1"],
      currentTime: 0,
      notes: [
        {
          id: "note-1",
          timestamp: 120,
          content: "React is a declarative library - we describe what we want, not how to do it",
          createdAt: "2024-01-15T10:30:00Z",
        },
      ],
      bookmarks: [
        {
          id: "bookmark-1",
          timestamp: 300,
          title: "Key React Concepts",
          createdAt: "2024-01-15T10:35:00Z",
        },
      ],
    },
    discussions: [
      {
        id: "1",
        user: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32&text=JD" },
        content: "Great introduction! Can you explain more about virtual DOM?",
        timestamp: 180,
        replies: [
          {
            id: "1-1",
            user: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32&text=SJ" },
            content: "Great question! I'll cover virtual DOM in detail in the next lecture.",
            createdAt: "2024-01-15T11:00:00Z",
          },
        ],
        createdAt: "2024-01-15T10:45:00Z",
        likes: 5,
      },
    ],
    nextLecture: {
      id: "2",
      title: "Setting up Development Environment",
      duration: "22:15",
      type: "video",
      isCompleted: false,
      isLocked: false,
      sectionTitle: "Getting Started",
    },
  }
}
