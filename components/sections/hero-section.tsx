import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Users, BookOpen, Award, Star, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="w-fit bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100">
                🎉 New courses added weekly
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Learn Without <span className="text-primary">Limits</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Access thousands of courses from expert instructors and advance your career with skills that matter in
                today's world.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">2M+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">10K+</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Expert</div>
                  <div className="text-sm text-muted-foreground">Instructors</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/courses">Browse Courses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent">
                <Link href="/instructor/signup">
                  <Play className="mr-2 h-5 w-5" />
                  Become Instructor
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-4">Trusted by learners at</p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="text-2xl font-bold">Google</div>
                <div className="text-2xl font-bold">Microsoft</div>
                <div className="text-2xl font-bold">Amazon</div>
                <div className="text-2xl font-bold">Meta</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/placeholder.svg?height=600&width=600&text=Online Learning Hero"
                alt="Online Learning"
                width={600}
                height={600}
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 bg-white dark:bg-card p-4 rounded-lg shadow-lg animate-bounce border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Classes</span>
              </div>
            </div>

            <div className="absolute bottom-10 left-10 bg-white dark:bg-card p-4 rounded-lg shadow-lg animate-pulse border">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">Certificates</span>
              </div>
            </div>

            <div className="absolute top-1/2 -left-4 bg-white dark:bg-card p-3 rounded-lg shadow-lg border">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <div>
                  <div className="text-sm font-semibold">4.9/5</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/3 -right-4 bg-white dark:bg-card p-3 rounded-lg shadow-lg border">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-sm font-semibold">95%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
