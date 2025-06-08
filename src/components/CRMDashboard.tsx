
import { useState } from "react"
import { Users, Plus, Phone, Mail, Building, DollarSign, Calendar, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  role: string
  status: "hot" | "warm" | "cold"
  lastContact: string
  source: string
}

interface Opportunity {
  id: string
  title: string
  contactId: string
  value: number
  stage: "prospecting" | "qualification" | "proposal" | "negotiation" | "closed-won" | "closed-lost"
  probability: number
  closeDate: string
}

export function CRMDashboard() {
  const [activeTab, setActiveTab] = useState<"contacts" | "opportunities">("contacts")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@techcorp.com",
      phone: "+1-555-0123",
      company: "TechCorp Inc",
      role: "Marketing Director",
      status: "hot",
      lastContact: "2024-01-15",
      source: "LinkedIn"
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike@startupx.com",
      phone: "+1-555-0124",
      company: "StartupX",
      role: "CEO",
      status: "warm",
      lastContact: "2024-01-12",
      source: "Referral"
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily@bigbrand.com",
      phone: "+1-555-0125",
      company: "BigBrand Corp",
      role: "CMO",
      status: "cold",
      lastContact: "2024-01-08",
      source: "Website"
    }
  ]

  const opportunities: Opportunity[] = [
    {
      id: "1",
      title: "Enterprise License - TechCorp",
      contactId: "1",
      value: 50000,
      stage: "proposal",
      probability: 75,
      closeDate: "2024-02-15"
    },
    {
      id: "2",
      title: "Startup Package - StartupX",
      contactId: "2",
      value: 15000,
      stage: "qualification",
      probability: 60,
      closeDate: "2024-03-01"
    },
    {
      id: "3",
      title: "Custom Solution - BigBrand",
      contactId: "3",
      value: 75000,
      stage: "prospecting",
      probability: 25,
      closeDate: "2024-04-30"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot": return "bg-red-500/20 text-red-400"
      case "warm": return "bg-yellow-500/20 text-yellow-400"
      case "cold": return "bg-blue-500/20 text-blue-400"
      default: return "bg-muted"
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "prospecting": return "bg-gray-500/20 text-gray-400"
      case "qualification": return "bg-blue-500/20 text-blue-400"
      case "proposal": return "bg-yellow-500/20 text-yellow-400"
      case "negotiation": return "bg-orange-500/20 text-orange-400"
      case "closed-won": return "bg-green-500/20 text-green-400"
      case "closed-lost": return "bg-red-500/20 text-red-400"
      default: return "bg-muted"
    }
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalOpportunityValue = opportunities.reduce((sum, opp) => sum + opp.value, 0)
  const avgProbability = opportunities.reduce((sum, opp) => sum + opp.probability, 0) / opportunities.length

  return (
    <div className="space-y-6">
      {/* CRM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-muted-foreground">Total Contacts</span>
            </div>
            <div className="text-2xl font-bold mt-1">{contacts.length}</div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-sm text-muted-foreground">Pipeline Value</span>
            </div>
            <div className="text-2xl font-bold mt-1">${totalOpportunityValue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-muted-foreground">Opportunities</span>
            </div>
            <div className="text-2xl font-bold mt-1">{opportunities.length}</div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-muted-foreground">Avg Probability</span>
            </div>
            <div className="text-2xl font-bold mt-1">{Math.round(avgProbability)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Main CRM Interface */}
      <Card className="glass">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              CRM Dashboard
            </CardTitle>
            <Button className="gradient-primary text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <Button
              variant={activeTab === "contacts" ? "default" : "ghost"}
              onClick={() => setActiveTab("contacts")}
            >
              Contacts
            </Button>
            <Button
              variant={activeTab === "opportunities" ? "default" : "ghost"}
              onClick={() => setActiveTab("opportunities")}
            >
              Opportunities
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search contacts or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            {activeTab === "contacts" && (
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Contacts Tab */}
          {activeTab === "contacts" && (
            <div className="space-y-3">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="p-4 bg-card/50 rounded-lg border border-border/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{contact.name}</h4>
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                        <Badge variant="outline">{contact.source}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {contact.role} at {contact.company}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {contact.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {contact.phone}
                        </div>
                        <span>Last contact: {contact.lastContact}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Opportunities Tab */}
          {activeTab === "opportunities" && (
            <div className="space-y-3">
              {opportunities.map((opportunity) => {
                const contact = contacts.find(c => c.id === opportunity.contactId)
                return (
                  <div key={opportunity.id} className="p-4 bg-card/50 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{opportunity.title}</h4>
                          <Badge className={getStageColor(opportunity.stage)}>
                            {opportunity.stage}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {contact?.name} - {contact?.company}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium text-green-400">
                            ${opportunity.value.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground">
                            {opportunity.probability}% probability
                          </span>
                          <span className="text-muted-foreground">
                            Close: {opportunity.closeDate}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Update
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
