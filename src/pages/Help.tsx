
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  MessageSquare, 
  Video, 
  FileText, 
  Mail, 
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Users
} from "lucide-react"

const Help = () => {
  const faqs = [
    {
      question: "How do I connect my social media accounts?",
      answer: "Go to Settings > Connected Platforms and toggle on the platforms you want to monitor. You'll need to authenticate each platform separately."
    },
    {
      question: "What does the sentiment score mean?",
      answer: "The sentiment score shows how positive or negative mentions of your brand are across all platforms. It's calculated using AI analysis of comments, posts, and mentions."
    },
    {
      question: "How often is data updated?",
      answer: "Data is updated in real-time for most platforms. Some platforms may have slight delays (1-5 minutes) due to API limitations."
    },
    {
      question: "Can I export my analytics data?",
      answer: "Yes! You can export data from the Analytics section. Choose your date range and format (CSV, PDF, or Excel) and click Export."
    },
    {
      question: "How do crisis alerts work?",
      answer: "Crisis alerts are triggered when we detect unusual negative sentiment spikes, viral negative content, or potential PR issues. You'll get notifications via email, SMS, or in-app."
    },
    {
      question: "What's included in the influencer database?",
      answer: "Our database includes over 10M influencers across all major platforms, with real-time engagement metrics, audience demographics, and contact information."
    }
  ]

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Help & Support
              </h1>
              <p className="text-xl text-muted-foreground">
                Get the help you need to master Social Pulse 360
              </p>
            </div>

            {/* Search Help */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-2 items-center mb-4">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Search help articles, tutorials, and FAQs..." className="flex-1" />
                  <Button>Search</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Try searching for "sentiment analysis", "crisis alerts", or "influencer tracking"
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Video className="w-4 h-4 mr-2" />
                      Watch Tutorials
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="w-4 h-4 mr-2" />
                      User Guide
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Live Chat
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      API Documentation
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">support@socialpulse360.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">1-800-PULSE-360</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Platform API</span>
                      <Badge variant="outline" className="text-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Operational
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Processing</span>
                      <Badge variant="outline" className="text-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Operational
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Notifications</span>
                      <Badge variant="outline" className="text-yellow-600">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Degraded
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Status Page
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Getting Started */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Getting Started
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">1. Connect Platforms</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Link your social media accounts to start monitoring mentions and sentiment.
                        </p>
                        <Button size="sm" variant="outline">Learn More</Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">2. Set Up Alerts</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Configure crisis alerts and notifications to stay on top of your brand.
                        </p>
                        <Button size="sm" variant="outline">Learn More</Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">3. Explore Analytics</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Dive into detailed analytics and insights about your social presence.
                        </p>
                        <Button size="sm" variant="outline">Learn More</Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">4. Build Workflows</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Automate responses and actions based on social media triggers.
                        </p>
                        <Button size="sm" variant="outline">Learn More</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5" />
                      Frequently Asked Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Feature Guides */}
                <Card>
                  <CardHeader>
                    <CardTitle>Feature Guides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <Video className="w-6 h-6 text-blue-500 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium">Crisis Management Tutorial</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Learn how to set up and respond to crisis alerts effectively.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">5 min</Badge>
                            <Badge variant="outline">Beginner</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <FileText className="w-6 h-6 text-green-500 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium">Advanced Analytics Guide</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Master custom reports, data visualization, and trend analysis.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">15 min</Badge>
                            <Badge variant="outline">Advanced</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border rounded-lg">
                        <Users className="w-6 h-6 text-purple-500 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium">Influencer Outreach Best Practices</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Discover how to find, evaluate, and connect with the right influencers.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">10 min</Badge>
                            <Badge variant="outline">Intermediate</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Help
