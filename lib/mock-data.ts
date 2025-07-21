export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  instructor: {
    id: string
    name: string
    avatar: string
    bio: string
    rating: number
    studentsCount: number
  }
  rating: number
  reviewCount: number
  price: number
  originalPrice?: number
  duration: string
  studentCount: number
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  language: string
  lastUpdated: string
  isWishlisted?: boolean
  progress?: number
  tags: string[]
  requirements: string[]
  whatYouWillLearn: string[]
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete React Developer Course",
    description: "Master React from basics to advanced concepts with hands-on projects and real-world applications",
    thumbnail: "/placeholder.svg?height=200&width=300&text=React Course",
    instructor: {
      id: "inst1",
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
      bio: "Senior React Developer with 8+ years of experience",
      rating: 4.8,
      studentsCount: 45000,
    },
    rating: 4.8,
    reviewCount: 12450,
    price: 89.99,
    originalPrice: 199.99,
    duration: "40 hours",
    studentCount: 45000,
    level: "Intermediate",
    category: "Programming",
    language: "English",
    lastUpdated: "2024-01-15",
    isWishlisted: false,
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    requirements: ["Basic JavaScript knowledge", "HTML & CSS fundamentals"],
    whatYouWillLearn: [
      "Build modern React applications",
      "Master React Hooks and Context API",
      "Implement state management with Redux",
      "Create responsive user interfaces",
    ],
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    description: "Learn modern design principles and create stunning user interfaces that users love",
    thumbnail: "/placeholder.svg?height=200&width=300&text=UI/UX Design",
    instructor: {
      id: "inst2",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
      bio: "Lead UX Designer at top tech companies",
      rating: 4.9,
      studentsCount: 32000,
    },
    rating: 4.9,
    reviewCount: 8900,
    price: 79.99,
    originalPrice: 149.99,
    duration: "35 hours",
    studentCount: 32000,
    level: "Beginner",
    category: "Design",
    language: "English",
    lastUpdated: "2024-01-12",
    isWishlisted: true,
    tags: ["UI Design", "UX Design", "Figma", "Design Systems"],
    requirements: ["No prior design experience needed"],
    whatYouWillLearn: ["Master design principles", "Create wireframes and prototypes"],
  },
  {
    id: "3",
    title: "Python for Data Science",
    description: "Analyze data and build machine learning models with Python programming language",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Python Data Science",
    instructor: {
      id: "inst3",
      name: "Dr. Emily Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=EC",
      bio: "Data Scientist and ML Engineer",
      rating: 4.8,
      studentsCount: 38000,
    },
    rating: 4.8,
    reviewCount: 9200,
    price: 94.99,
    originalPrice: 179.99,
    duration: "50 hours",
    studentCount: 38000,
    level: "Advanced",
    category: "Data Science",
    language: "English",
    lastUpdated: "2024-01-13",
    isWishlisted: false,
    tags: ["Python", "Data Science", "Machine Learning"],
    requirements: ["Basic Python knowledge"],
    whatYouWillLearn: ["Master Python for data analysis"],
  },
  {
    id: "4",
    title: "Digital Marketing Strategy",
    description: "Build effective marketing campaigns and grow your business online with proven strategies",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Digital Marketing",
    instructor: {
      id: "inst4",
      name: "Mike Davis",
      avatar: "/placeholder.svg?height=40&width=40&text=MD",
      bio: "Digital Marketing Expert",
      rating: 4.7,
      studentsCount: 28000,
    },
    rating: 4.7,
    reviewCount: 6700,
    price: 69.99,
    originalPrice: 129.99,
    duration: "25 hours",
    studentCount: 28000,
    level: "Intermediate",
    category: "Business",
    language: "English",
    lastUpdated: "2024-01-14",
    isWishlisted: false,
    tags: ["Digital Marketing", "SEO", "Social Media"],
    requirements: ["Basic business knowledge"],
    whatYouWillLearn: ["Create marketing strategies"],
  },
  {
    id: "5",
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js, Express, and MongoDB",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Node.js Backend",
    instructor: {
      id: "inst5",
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=AR",
      bio: "Full-stack Developer",
      rating: 4.6,
      studentsCount: 22000,
    },
    rating: 4.6,
    reviewCount: 5400,
    price: 84.99,
    originalPrice: 159.99,
    duration: "45 hours",
    studentCount: 22000,
    level: "Intermediate",
    category: "Programming",
    language: "English",
    lastUpdated: "2024-01-11",
    isWishlisted: true,
    tags: ["Node.js", "Express", "MongoDB", "Backend"],
    requirements: ["JavaScript fundamentals"],
    whatYouWillLearn: ["Build REST APIs", "Database integration"],
  },
  {
    id: "6",
    title: "Mobile App Development with Flutter",
    description: "Create beautiful cross-platform mobile apps with Flutter and Dart",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Flutter Mobile",
    instructor: {
      id: "inst6",
      name: "Lisa Park",
      avatar: "/placeholder.svg?height=40&width=40&text=LP",
      bio: "Mobile App Developer",
      rating: 4.5,
      studentsCount: 18000,
    },
    rating: 4.5,
    reviewCount: 4200,
    price: 79.99,
    originalPrice: 149.99,
    duration: "38 hours",
    studentCount: 18000,
    level: "Intermediate",
    category: "Programming",
    language: "English",
    lastUpdated: "2024-01-10",
    isWishlisted: false,
    tags: ["Flutter", "Dart", "Mobile", "Cross-platform"],
    requirements: ["Basic programming knowledge"],
    whatYouWillLearn: ["Build mobile apps", "Cross-platform development"],
  },
]

export const categories = [
  { id: "programming", name: "Programming", icon: "Code", courseCount: 1250, color: "bg-blue-500" },
  { id: "design", name: "Design", icon: "Palette", courseCount: 890, color: "bg-purple-500" },
  { id: "business", name: "Business", icon: "TrendingUp", courseCount: 670, color: "bg-green-500" },
  { id: "data-science", name: "Data Science", icon: "Calculator", courseCount: 580, color: "bg-indigo-500" },
  { id: "photography", name: "Photography", icon: "Camera", courseCount: 450, color: "bg-orange-500" },
  { id: "music", name: "Music", icon: "Music", courseCount: 320, color: "bg-pink-500" },
]

export const testimonials = [
  {
    id: 1,
    name: "Alex Rodriguez",
    role: "Software Developer",
    company: "Tech Corp",
    avatar: "/placeholder.svg?height=60&width=60&text=AR",
    rating: 5,
    content:
      "EduPlatform completely transformed my career. The React course was incredibly comprehensive and the instructor was always available to help. I landed my dream job within 3 months of completing the course!",
  },
  {
    id: 2,
    name: "Maria Chen",
    role: "UX Designer",
    company: "Design Studio",
    avatar: "/placeholder.svg?height=60&width=60&text=MC",
    rating: 5,
    content:
      "The UI/UX design course exceeded my expectations. The hands-on projects and real-world examples helped me build a portfolio that impressed employers. Highly recommended!",
  },
  {
    id: 3,
    name: "David Thompson",
    role: "Marketing Manager",
    company: "StartupXYZ",
    avatar: "/placeholder.svg?height=60&width=60&text=DT",
    rating: 5,
    content:
      "As someone with no prior marketing experience, the digital marketing course was perfect. The step-by-step approach and practical assignments made complex concepts easy to understand.",
  },
]

export const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Portuguese", "Russian"]

// Utility functions
export const searchCourses = (courses: Course[], query: string): Course[] => {
  if (!query.trim()) return courses

  const searchTerm = query.toLowerCase()
  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.instructor.name.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
  )
}

export const filterCourses = (
  courses: Course[],
  filters: {
    category?: string
    level?: string
    priceRange?: [number, number]
    rating?: number
    language?: string
  },
): Course[] => {
  return courses.filter((course) => {
    if (filters.category && filters.category !== "All" && course.category !== filters.category) {
      return false
    }
    if (filters.level && filters.level !== "All" && course.level !== filters.level) {
      return false
    }
    if (filters.priceRange && (course.price < filters.priceRange[0] || course.price > filters.priceRange[1])) {
      return false
    }
    if (filters.rating && course.rating < filters.rating) {
      return false
    }
    if (filters.language && filters.language !== "All" && course.language !== filters.language) {
      return false
    }
    return true
  })
}

export const sortCourses = (courses: Course[], sortBy: string): Course[] => {
  const sorted = [...courses]

  switch (sortBy) {
    case "popularity":
      return sorted.sort((a, b) => b.studentCount - a.studentCount)
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating)
    case "newest":
      return sorted.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price)
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price)
    case "title":
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
}
