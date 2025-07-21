import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl font-bold">About EduPlatform</h1>
              <p className="text-xl text-muted-foreground">
                We're on a mission to make quality education accessible to everyone, everywhere.
              </p>
              <div className="prose prose-lg mx-auto">
                <p>
                  EduPlatform was founded with the belief that everyone deserves access to high-quality education. Our
                  platform connects learners with expert instructors from around the world, offering courses in
                  programming, design, business, and many other fields.
                </p>
                <p>
                  Whether you're looking to advance your career, learn a new skill, or share your expertise with others,
                  EduPlatform provides the tools and community you need to succeed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
