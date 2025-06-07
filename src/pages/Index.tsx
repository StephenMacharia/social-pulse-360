
import { Brain, TrendingUp, Users, MessageCircle, Target, Zap } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { AIInsightCard } from "@/components/AIInsightCard"
import { SentimentChart } from "@/components/SentimentChart"
import { PlatformFeed } from "@/components/PlatformFeed"
import { InfluencerHub } from "@/components/InfluencerHub"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main 
            id="main-content" 
            className="flex-1 p-6 space-y-6"
            role="main"
            tabIndex={-1}
          >
            {/* Hero Section */}
            <section className="text-center mb-8" aria-labelledby="hero-title">
              <h1 
                id="hero-title"
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent"
              >
                AI-Powered Social Intelligence
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Monitor, analyze, and amplify your brand across all social platforms with advanced AI insights
              </p>
            </section>

            {/* AI Insights Grid */}
            <section aria-labelledby="insights-title">
              <h2 id="insights-title" className="sr-only">Key Performance Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="region" aria-label="Performance metrics">
                <AIInsightCard
                  title="Total Mentions"
                  value="24,891"
                  change="+12.5% from last week"
                  changeType="positive"
                  icon={<MessageCircle className="w-4 h-4 text-white" aria-hidden="true" />}
                  gradient="primary"
                />
                <AIInsightCard
                  title="Sentiment Score"
                  value="84%"
                  change="+8.2% improvement"
                  changeType="positive"
                  icon={<Brain className="w-4 h-4 text-white" aria-hidden="true" />}
                  gradient="secondary"
                />
                <AIInsightCard
                  title="Influencer Reach"
                  value="2.3M"
                  change="+15.8% growth"
                  changeType="positive"
                  icon={<Users className="w-4 h-4 text-white" aria-hidden="true" />}
                  gradient="accent"
                />
                <AIInsightCard
                  title="Campaign ROI"
                  value="340%"
                  change="+24% this month"
                  changeType="positive"
                  icon={<Target className="w-4 h-4 text-white" aria-hidden="true" />}
                  gradient="primary"
                />
              </div>
            </section>

            {/* Sentiment Analysis */}
            <section aria-labelledby="sentiment-title">
              <SentimentChart />
            </section>

            {/* Main Content Grid */}
            <section aria-labelledby="content-title">
              <h2 id="content-title" className="sr-only">Platform Feed and Influencer Information</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PlatformFeed />
                <InfluencerHub />
              </div>
            </section>

            {/* AI Predictions Card */}
            <section 
              className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 rounded-xl p-6 border border-primary/20"
              aria-labelledby="predictions-title"
              role="region"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 gradient-primary rounded-lg animate-glow">
                  <Zap className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <h3 id="predictions-title" className="text-xl font-semibold">AI Predictions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <article className="p-4 bg-card/50 rounded-lg border border-border">
                  <h4 className="font-medium mb-2 text-green-400">Trending Topic</h4>
                  <p className="text-sm text-muted-foreground">"Sustainable Tech" will peak in 3 days with 85% confidence</p>
                </article>
                <article className="p-4 bg-card/50 rounded-lg border border-border">
                  <h4 className="font-medium mb-2 text-blue-400">Optimal Posting</h4>
                  <p className="text-sm text-muted-foreground">Best engagement window: Today 2-4 PM (+34% reach)</p>
                </article>
                <article className="p-4 bg-card/50 rounded-lg border border-border">
                  <h4 className="font-medium mb-2 text-purple-400">Risk Alert</h4>
                  <p className="text-sm text-muted-foreground">Monitor competitor campaign launching tomorrow</p>
                </article>
              </div>
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
