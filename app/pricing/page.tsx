"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Check,
  X,
  Star,
  Zap,
  Crown,
  Shield,
  Users,
  BookOpen,
  Award,
  Headphones,
  Download,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  MessageCircle,
  Video,
  FileText,
  Target,
  BarChart3,
} from "lucide-react"

const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for getting started with learning",
    price: { monthly: 0, yearly: 0 },
    badge: null,
    color: "from-gray-500 to-gray-600",
    features: [
      { name: "Access to free courses", included: true, icon: BookOpen },
      { name: "Basic video quality", included: true, icon: Video },
      { name: "Community forums", included: true, icon: MessageCircle },
      { name: "Mobile app access", included: true, icon: Smartphone },
      { name: "Course certificates", included: false, icon: Award },
      { name: "Offline downloads", included: false, icon: Download },
      { name: "Priority support", included: false, icon: Headphones },
      { name: "Advanced analytics", included: false, icon: BarChart3 },
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Ideal for serious learners and professionals",
    price: { monthly: 29, yearly: 290 },
    badge: "Most Popular",
    color: "from-blue-500 to-blue-600",
    features: [
      { name: "Access to all courses", included: true, icon: BookOpen },
      { name: "HD video quality", included: true, icon: Video },
      { name: "Offline downloads", included: true, icon: Download },
      { name: "Course certificates", included: true, icon: Award },
      { name: "Priority support", included: true, icon: Headphones },
      { name: "Mobile & desktop apps", included: true, icon: Monitor },
      { name: "Progress tracking", included: true, icon: Target },
      { name: "Advanced analytics", included: false, icon: BarChart3 },
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "For teams and organizations seeking excellence",
    price: { monthly: 99, yearly: 990 },
    badge: "Best Value",
    color: "from-purple-500 to-purple-600",
    features: [
      { name: "Everything in Pro", included: true, icon: Crown },
      { name: "Team management", included: true, icon: Users },
      { name: "Advanced analytics", included: true, icon: BarChart3 },
      { name: "Custom learning paths", included: true, icon: Target },
      { name: "White-label options", included: true, icon: Globe },
      { name: "API access", included: true, icon: Zap },
      { name: "Dedicated support", included: true, icon: Shield },
      { name: "Custom integrations", included: true, icon: FileText },
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial for Pro and Premium plans. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "Do you offer student discounts?",
    answer: "Yes, we offer a 50% discount for students with a valid .edu email address. Contact support to apply.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.",
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const { toast } = useToast()

  const handlePlanSelect = (planId: string, planName: string) => {
    setSelectedPlan(planId)
    toast({
      title: `${planName} Plan Selected`,
      description: "Redirecting to checkout...",
    })

    // Simulate redirect delay
    setTimeout(() => {
      setSelectedPlan(null)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          </div>

          <div className="container relative">
            <motion.div
              className="text-center space-y-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                  <Star className="w-4 h-4 mr-2" />
                  Choose Your Learning Journey
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Simple, Transparent Pricing
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Choose the perfect plan for your learning goals. Start free and upgrade as you grow.
                </p>
              </div>

              {/* Billing Toggle */}
              <motion.div
                className="flex items-center justify-center space-x-4 p-2 bg-muted/50 rounded-2xl backdrop-blur-sm w-fit mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span
                  className={`text-sm font-medium transition-colors ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}
                >
                  Monthly
                </span>
                <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-primary" />
                <span
                  className={`text-sm font-medium transition-colors ${isYearly ? "text-foreground" : "text-muted-foreground"}`}
                >
                  Yearly
                </span>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                >
                  Save 17%
                </Badge>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card
                    className={`
                    relative overflow-hidden border-0 shadow-2xl transition-all duration-300 hover:shadow-3xl
                    ${plan.popular ? "ring-2 ring-primary/20 scale-105" : ""}
                    bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm
                  `}
                  >
                    {/* Popular Badge */}
                    {plan.badge && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Badge
                          className={`
                          px-6 py-2 text-white shadow-lg
                          ${plan.popular ? "bg-gradient-to-r from-primary to-primary/90" : "bg-gradient-to-r from-purple-500 to-purple-600"}
                        `}
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          {plan.badge}
                        </Badge>
                      </div>
                    )}

                    {/* Gradient Header */}
                    <div className={`h-2 bg-gradient-to-r ${plan.color}`} />

                    <CardHeader className="text-center pb-8 pt-8">
                      <div className="space-y-4">
                        <div
                          className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center shadow-lg`}
                        >
                          {plan.id === "free" && <BookOpen className="w-8 h-8 text-white" />}
                          {plan.id === "pro" && <Zap className="w-8 h-8 text-white" />}
                          {plan.id === "premium" && <Crown className="w-8 h-8 text-white" />}
                        </div>

                        <div>
                          <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                          <p className="text-muted-foreground mt-2">{plan.description}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-baseline justify-center space-x-2">
                            <span className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                              ${isYearly ? plan.price.yearly : plan.price.monthly}
                            </span>
                            {plan.price.monthly > 0 && (
                              <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                            )}
                          </div>
                          {isYearly && plan.price.monthly > 0 && (
                            <p className="text-sm text-muted-foreground">
                              ${(plan.price.monthly * 12).toFixed(0)} billed annually
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Features List */}
                      <div className="space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.05 }}
                          >
                            <div
                              className={`
                              w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                              ${
                                feature.included
                                  ? "bg-green-100 dark:bg-green-900/30"
                                  : "bg-gray-100 dark:bg-gray-900/30"
                              }
                            `}
                            >
                              {feature.included ? (
                                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                              ) : (
                                <X className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2 flex-1">
                              <feature.icon
                                className={`
                                w-4 h-4 flex-shrink-0
                                ${feature.included ? "text-foreground" : "text-muted-foreground"}
                              `}
                              />
                              <span
                                className={`
                                text-sm
                                ${feature.included ? "text-foreground" : "text-muted-foreground"}
                              `}
                              >
                                {feature.name}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <Separator />

                      {/* CTA Button */}
                      <EnhancedButton
                        variant={plan.popular ? "default" : plan.id === "premium" ? "premium" : "outline"}
                        size="lg"
                        className="w-full"
                        loading={selectedPlan === plan.id}
                        onClick={() => handlePlanSelect(plan.id, plan.name)}
                      >
                        {plan.cta}
                      </EnhancedButton>

                      {plan.id !== "free" && (
                        <p className="text-xs text-center text-muted-foreground">
                          14-day free trial • No credit card required
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16 bg-muted/20">
          <div className="container">
            <motion.div
              className="text-center space-y-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold">Compare All Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See exactly what's included in each plan to make the best choice for your learning journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl bg-background/50 backdrop-blur-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-6 font-semibold">Features</th>
                        {pricingPlans.map((plan) => (
                          <th key={plan.id} className="text-center p-6 font-semibold min-w-[150px]">
                            <div className="space-y-2">
                              <div
                                className={`w-8 h-8 mx-auto rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                              >
                                {plan.id === "free" && <BookOpen className="w-4 h-4 text-white" />}
                                {plan.id === "pro" && <Zap className="w-4 h-4 text-white" />}
                                {plan.id === "premium" && <Crown className="w-4 h-4 text-white" />}
                              </div>
                              <div className="font-semibold">{plan.name}</div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Course Access",
                          free: "Free courses only",
                          pro: "All courses",
                          premium: "All courses + exclusive content",
                        },
                        { name: "Video Quality", free: "720p", pro: "1080p HD", premium: "4K Ultra HD" },
                        { name: "Offline Downloads", free: false, pro: true, premium: true },
                        { name: "Certificates", free: false, pro: true, premium: true },
                        { name: "Support", free: "Community", pro: "Priority email", premium: "Dedicated support" },
                        { name: "Analytics", free: false, pro: "Basic", premium: "Advanced" },
                        { name: "Team Features", free: false, pro: false, premium: true },
                        { name: "API Access", free: false, pro: false, premium: true },
                      ].map((feature, index) => (
                        <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-6 font-medium">{feature.name}</td>
                          {pricingPlans.map((plan) => (
                            <td key={plan.id} className="p-6 text-center">
                              {typeof feature[plan.id as keyof typeof feature] === "boolean" ? (
                                feature[plan.id as keyof typeof feature] ? (
                                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                                ) : (
                                  <X className="w-5 h-5 text-gray-400 mx-auto" />
                                )
                              ) : (
                                <span className="text-sm">{feature[plan.id as keyof typeof feature]}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container">
            <motion.div
              className="text-center space-y-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Got questions? We've got answers. If you can't find what you're looking for, contact our support team.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg bg-background/50 backdrop-blur-sm h-full">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
          <div className="container">
            <motion.div
              className="text-center space-y-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Ready to Start Learning?</h2>
                <p className="text-xl text-muted-foreground">
                  Join thousands of learners who are already advancing their careers with our platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <EnhancedButton variant="default" size="xl" className="gap-3">
                  <Zap className="w-5 h-5" />
                  Start Free Trial
                </EnhancedButton>
                <EnhancedButton variant="outline" size="xl" className="gap-3">
                  <MessageCircle className="w-5 h-5" />
                  Contact Sales
                </EnhancedButton>
              </div>

              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>30-day money back</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-purple-500" />
                  <span>No setup fees</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
