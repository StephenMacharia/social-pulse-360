
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { CustomAnalytics } from "@/components/CustomAnalytics"

const Analytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <CustomAnalytics />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Analytics
