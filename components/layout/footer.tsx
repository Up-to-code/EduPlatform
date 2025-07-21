import Link from "next/link"
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">EduPlatform</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Empowering learners worldwide with quality education and expert instruction. Join millions of students and
              instructors in our global learning community.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Stay Updated</h4>
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" className="max-w-xs" />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h3 className="font-semibold">Courses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/courses?category=programming"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Programming
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=design"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Design
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=business"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=marketing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/courses?category=data-science"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Data Science
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-primary hover:underline">
                  View All Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/instructor/signup" className="text-muted-foreground hover:text-primary transition-colors">
                  Become Instructor
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-muted-foreground hover:text-primary transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@eduplatform.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} EduPlatform. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>🌍 English</span>
              <span>💰 USD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
