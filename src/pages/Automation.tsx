
import { Zap } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { WorkflowBuilder } from "@/components/WorkflowBuilder"

const Automation = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-secondary rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Automation Studio</h1>
                <p className="text-muted-foreground">Create custom workflows to automate your social media monitoring</p>
              </div>
            </div>
            
            <WorkflowBuilder />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Automation
