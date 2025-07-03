import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  MoreHorizontal
} from "lucide-react";
import { useState } from "react";

const leadStatuses = {
  'new': { label: 'New', color: 'bg-crm-blue text-white' },
  'contacted': { label: 'Contacted', color: 'bg-crm-orange text-white' },
  'qualified': { label: 'Qualified', color: 'bg-crm-purple text-white' },
  'unqualified': { label: 'Unqualified', color: 'bg-crm-gray text-white' },
  'converted': { label: 'Converted', color: 'bg-crm-green text-white' }
};

const leadsData = [
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
    lastContact: '2 hours ago'
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
    lastContact: '1 day ago'
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
    lastContact: '3 hours ago'
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
    lastContact: '1 week ago'
  }
];

export function LeadsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLeads = leadsData.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads Management</h1>
          <p className="text-muted-foreground">Manage and track your sales leads</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
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
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="w-4 h-4" />
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
            <div className="text-2xl font-bold text-crm-blue">156</div>
            <div className="text-sm text-muted-foreground">Total Leads</div>
          </CardContent>
        </Card>
        <Card className="text-center shadow-crm-sm">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-crm-green">42</div>
            <div className="text-sm text-muted-foreground">Qualified</div>
          </CardContent>
        </Card>
        <Card className="text-center shadow-crm-sm">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-crm-orange">28</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card className="text-center shadow-crm-sm">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-crm-purple">86</div>
            <div className="text-sm text-muted-foreground">Avg. Score</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}