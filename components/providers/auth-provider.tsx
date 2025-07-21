"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "learner" | "instructor" | "admin"
  isOnboarded: boolean
  interests?: string[]
  bio?: string
  enrolledCourses?: string[]
  createdCourses?: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string, role: "learner" | "instructor") => Promise<void>
  updateUser: (updates: Partial<User>) => void
  completeOnboarding: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email,
      avatar: "/placeholder.svg?height=40&width=40",
      role: email.includes("instructor") ? "instructor" : email.includes("admin") ? "admin" : "learner",
      isOnboarded: true,
      interests: ["programming", "design"],
      bio: "Passionate learner and developer",
      enrolledCourses: ["1", "2", "3"],
      createdCourses: email.includes("instructor") ? ["1", "2"] : [],
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const register = async (email: string, password: string, name: string, role: "learner" | "instructor") => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      avatar: "/placeholder.svg?height=40&width=40",
      role,
      isOnboarded: false,
      interests: [],
      enrolledCourses: [],
      createdCourses: [],
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const completeOnboarding = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data, isOnboarded: true }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        updateUser,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
