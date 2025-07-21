import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Award, ArrowRight, Star, TrendingUp, Shield } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Learners */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">For Learners</h3>
                </div>

                <p className="text-muted-foreground text-lg">
                  Start your learning journey today and unlock your potential with our comprehensive courses and expert
                  guidance.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span>Earn verified certificates upon completion</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Join a community of 2M+ active learners</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>Access 10,000+ high-quality courses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-primary" />
                    <span>Learn from industry experts and professionals</span>
                  </li>
                </ul>

                <Button size="lg" className="w-full group" asChild>
                  <Link href="/courses">
                    Browse Courses
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* For Instructors */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">For Instructors</h3>
                </div>

                <p className="text-muted-foreground text-lg">
                  Share your expertise with millions of students worldwide and build a thriving teaching business on our
                  platform.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-secondary-foreground" />
                    <span>Earn money teaching what you love</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-secondary-foreground" />
                    <span>Reach students in 190+ countries</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-secondary-foreground" />
                    <span>Easy-to-use course creation tools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-secondary-foreground" />
                    <span>Marketing and student support included</span>
                  </li>
                </ul>

                <Button size="lg" variant="secondary" className="w-full group" asChild>
                  <Link href="/instructor/signup">
                    Become Instructor
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join millions of learners and instructors who are already part of our global community. Start learning or
            teaching today and transform your future!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
