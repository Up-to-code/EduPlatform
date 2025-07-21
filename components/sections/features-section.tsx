import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, Clock, Smartphone, HeadphonesIcon, Globe, TrendingUp, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description:
      "Learn from industry professionals with real-world experience and proven track records in their fields.",
  },
  {
    icon: Clock,
    title: "Learn at Your Pace",
    description: "Access courses 24/7 and learn on your schedule with lifetime access to all course materials.",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description: "Earn industry-recognized certificates upon completion to showcase your new skills to employers.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a vibrant community of learners and get help from peers, instructors, and mentors.",
  },
  {
    icon: Smartphone,
    title: "Mobile Learning",
    description: "Download courses and learn offline on any device, anywhere, anytime with our mobile app.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Get help whenever you need it with our dedicated customer support team and help center.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Access courses from anywhere in the world with subtitles in multiple languages.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Advance your career with in-demand skills and industry-recognized certifications.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "All courses are reviewed by experts and come with a 30-day money-back guarantee.",
  },
  {
    icon: Zap,
    title: "Interactive Learning",
    description: "Engage with quizzes, assignments, and hands-on projects for better learning outcomes.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">Why Choose EduPlatform?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide everything you need to succeed in your learning journey with cutting-edge features and support
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-background/50"
            >
              <CardHeader className="pb-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 pt-16 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2M+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Course Library</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Expert Instructors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
