import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddLeadForm } from "@/components/forms/AddLeadForm";
import { 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Star,
  Eye,
  Edit,
  MoreHorizontal,
  Trash2
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  score: number;
  source: string;
  value: string;
  lastContact: string;
  notes?: string;
}

const leadStatuses = {
  'new': { label: 'New', color: 'bg-crm-blue text-white' },
  'contacted': { label: 'Contacted', color: 'bg-crm-orange text-white' },
  'qualified': { label: 'Qualified', color: 'bg-crm-purple text-white' },
  'unqualified': { label: 'Unqualified', color: 'bg-crm-gray text-white' },
  'converted': { label: 'Converted', color: 'bg-crm-green text-white' }
};

const initialLeadsData: Lead[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'TechStart Inc',
    email: 'sarah@techstart.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    status: 'qualified',
    score: 85,
    source: 'Website',
    value: '$45,000',
    lastContact: '2 hours ago',
    notes: 'Interested in enterprise package. Follow up next week.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    company: 'Global Solutions',
    email: 'm.chen@globalsol.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    status: 'new',
    score: 70,
    source: 'LinkedIn',
    value: '$78,000',
    lastContact: '1 day ago',
    notes: 'CEO of mid-size company, looking for automation solutions.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    company: 'Innovation Labs',
    email: 'emily@innovationlabs.co',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    status: 'contacted',
    score: 92,
    source: 'Referral',
    value: '$32,000',
    lastContact: '3 hours ago',
    notes: 'Referred by John Smith. Very interested, schedule demo.'
  },
  {
    id: 4,
    name: 'David Park',
    company: 'Future Systems',
    email: 'david@futuresys.com',
    phone: '+1 (555) 321-9876',
    location: 'Seattle, WA',
    status: 'converted',
    score: 95,
    source: 'Cold Call',
    value: '$120,000',
    lastContact: '1 week ago',
    notes: 'Deal closed successfully. Great customer for case study.'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    company: 'Creative Agency Plus',
    email: 'lisa.wang@creativeplus.com',
    phone: '+1 (555) 789-0123',
    location: 'Los Angeles, CA',
    status: 'qualified',
    score: 88,
    source: 'Event',
    value: '$65,000',
    lastContact: '4 hours ago',
    notes: 'Met at tech conference. Needs solution for creative workflow.'
  },
  {
    id: 6,
    name: 'Robert Thompson',
    company: 'Manufacturing Pro',
    email: 'robert@manufacturingpro.com',
    phone: '+1 (555) 234-5678',
    location: 'Chicago, IL',
    status: 'contacted',
    score: 75,
    source: 'Website',
    value: '$90,000',
    lastContact: '6 hours ago',
    notes: 'Large manufacturing company. Interested in inventory management.'
  },
  {
    id: 7,
    name: 'Jennifer Martinez',
    company: 'Health Solutions Inc',
    email: 'j.martinez@healthsolutions.com',
    phone: '+1 (555) 345-6789',
    location: 'Miami, FL',
    status: 'new',
    score: 82,
    source: 'Referral',
    value: '$55,000',
    lastContact: '1 day ago',
    notes: 'Healthcare sector lead. Compliance requirements important.'
  },
  {
    id: 8,
    name: 'Alex Kumar',
    company: 'StartupXYZ',
    email: 'alex@startupxyz.io',
    phone: '+1 (555) 456-7890',
    location: 'Boston, MA',
    status: 'unqualified',
    score: 45,
    source: 'LinkedIn',
    value: '$15,000',
    lastContact: '3 days ago',
    notes: 'Small budget, not a good fit for current solutions.'
  }
];

export function LeadsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [leads, setLeads] = useState<Lead[]>(initialLeadsData);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const { toast } = useToast();

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddLead = (newLead: any) => {
    setLeads(prev => [...prev, { ...newLead, id: Date.now(), lastContact: 'Just now' }]);
  };

  const handleUpdateLead = (updatedLead: any) => {
    setLeads(prev => prev.map(lead => 
      lead.id === updatedLead.id ? { ...updatedLead, lastContact: 'Just updated' } : lead
    ));
    setEditingLead(null);
  };

  const handleDeleteLead = (leadId: number) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
    toast({
      title: "Lead Deleted",
      description: "The lead has been removed successfully.",
    });
  };

  const getLeadStats = () => {
    const total = leads.length;
    const qualified = leads.filter(l => l.status === 'qualified').length;
    const inProgress = leads.filter(l => ['contacted', 'new'].includes(l.status)).length;
    const avgScore = Math.round(leads.reduce((sum, l) => sum + l.score, 0) / total);
    
    return { total, qualified, inProgress, avgScore };
  };

  const stats = getLeadStats();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads Management</h1>
          <p className="text-muted-foreground">Manage and track your sales leads</p>
        </div>
        <AddLeadForm 
          onLeadAdded={handleAddLead}
          editLead={editingLead}
          onLeadUpdated={handleUpdateLead}
        />
      </div>

      {/* Filters */}
      <Card className="shadow-crm-md">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {Object.entries(leadStatuses).map(([key, status]) => (
                    <SelectItem key={key} value={key}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="shadow-crm-md hover:shadow-crm-lg transition-all duration-300 bg-gradient-card">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{lead.name}</h3>
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-warning fill-current" />
                  <span className="text-sm font-medium">{lead.score}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Status and Value */}
              <div className="flex items-center justify-between">
                <Badge className={leadStatuses[lead.status as keyof typeof leadStatuses].color}>
                  {leadStatuses[lead.status as keyof typeof leadStatuses].label}
                </Badge>
                <span className="font-semibold text-foreground">{lead.value}</span>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{lead.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{lead.location}</span>
                </div>
              </div>

              {/* Meta Info */}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Source: {lead.source}</span>
                  <span>Last contact: {lead.lastContact}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setEditingLead(lead)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDeleteLead(lead.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center shadow-crm-sm">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-crm-blue">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Leads</div>
          </CardContent>
        </Card>
        <Card className="text-center shadow-crm-sm">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-crm-green">{stats.qualified}</div>
            <div className="text-sm text-muted-foreground">Qualified</div>
          </CardContent>
        </Card>
        <Card className="text-center shadow-crm-sm">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-crm-orange">{stats.inProgress}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card className="text-center shadow-crm-sm">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-crm-purple">{stats.avgScore}</div>
            <div className="text-sm text-muted-foreground">Avg. Score</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}