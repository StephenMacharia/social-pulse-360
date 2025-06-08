
import { Building2, Target, TrendingUp } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { NPSSurvey } from "@/components/NPSSurvey"
import { CRMDashboard } from "@/components/CRMDashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const BusinessDevelopment = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-accent rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Business Development</h1>
                <p className="text-muted-foreground">Manage customer relationships and gather feedback</p>
              </div>
            </div>
            
            <Tabs defaultValue="crm" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="crm" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  CRM & Opportunities
                </TabsTrigger>
                <TabsTrigger value="nps" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  NPS & Feedback
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="crm">
                <CRMDashboard />
              </TabsContent>
              
              <TabsContent value="nps">
                <NPSSurvey />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default BusinessDevelopment
