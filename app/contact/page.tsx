import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h1 className="text-4xl font-bold">Contact Us</h1>
              <p className="text-xl text-muted-foreground">Have questions? We'd love to hear from you.</p>
              <div className="space-y-4">
                <p>Email: support@eduplatform.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Education St, Learning City, LC 12345</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
