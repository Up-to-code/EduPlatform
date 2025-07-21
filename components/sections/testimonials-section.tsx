"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { RatingStars } from "@/components/ui/rating-stars"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { testimonials } from "@/lib/mock-data"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonialsPerPage = 3

  const nextTestimonials = () => {
    setCurrentIndex((prev) => (prev + testimonialsPerPage >= testimonials.length ? 0 : prev + testimonialsPerPage))
  }

  const prevTestimonials = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - testimonialsPerPage) : prev - testimonialsPerPage,
    )
  }

  const currentTestimonials = testimonials.slice(currentIndex, currentIndex + testimonialsPerPage)

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">What Our Students Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful learners who have transformed their careers with EduPlatform
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow border-0 bg-background/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Quote className="h-8 w-8 text-primary/20" />

                    <div className="space-y-2">
                      <RatingStars rating={testimonial.rating} />
                      <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                    </div>

                    <div className="flex items-center space-x-3 pt-4 border-t">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4">
            <Button variant="outline" size="icon" onClick={prevTestimonials}>
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(testimonials.length / testimonialsPerPage) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * testimonialsPerPage)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(currentIndex / testimonialsPerPage) === index ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonials}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2M+</div>
            <div className="text-muted-foreground">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground">Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">85%</div>
            <div className="text-muted-foreground">Career Advancement</div>
          </div>
        </div>
      </div>
    </section>
  )
}
