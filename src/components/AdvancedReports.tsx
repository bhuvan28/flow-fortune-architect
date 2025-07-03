import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
  Area,
  AreaChart
} from 'recharts';
import {
  Download,
  Calendar,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Activity,
  Filter
} from "lucide-react";

const salesData = [
  { month: 'Jan', revenue: 65000, deals: 15, leads: 120, conversion: 12.5 },
  { month: 'Feb', revenue: 59000, deals: 12, leads: 98, conversion: 12.2 },
  { month: 'Mar', revenue: 80000, deals: 18, leads: 156, conversion: 11.5 },
  { month: 'Apr', revenue: 81000, deals: 19, leads: 143, conversion: 13.3 },
  { month: 'May', revenue: 96000, deals: 22, leads: 167, conversion: 13.2 },
  { month: 'Jun', revenue: 105000, deals: 25, leads: 189, conversion: 13.2 },
];

const funnelData = [
  { name: 'Visitors', value: 10000, fill: '#3b82f6' },
  { name: 'Leads', value: 3500, fill: '#8b5cf6' },
  { name: 'Qualified', value: 1200, fill: '#f59e0b' },
  { name: 'Proposals', value: 450, fill: '#10b981' },
  { name: 'Closed Won', value: 180, fill: '#ef4444' },
];

const teamPerformance = [
  { name: 'Sarah Johnson', deals: 28, revenue: 340000, conversion: 15.2 },
  { name: 'Michael Chen', deals: 22, revenue: 280000, conversion: 12.8 },
  { name: 'Emily Rodriguez', deals: 25, revenue: 315000, conversion: 14.1 },
  { name: 'David Park', deals: 18, revenue: 225000, conversion: 11.5 },
  { name: 'Lisa Wang', deals: 20, revenue: 250000, conversion: 13.0 },
];

const sourceAnalysis = [
  { name: 'Website', leads: 450, conversion: 12.5, revenue: 125000 },
  { name: 'LinkedIn', leads: 320, conversion: 15.2, revenue: 180000 },
  { name: 'Referrals', leads: 280, conversion: 18.8, revenue: 210000 },
  { name: 'Cold Email', leads: 180, conversion: 8.2, revenue: 65000 },
  { name: 'Events', leads: 150, conversion: 22.5, revenue: 95000 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

export function AdvancedReports() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Advanced Reports</h1>
          <p className="text-muted-foreground">Comprehensive analytics and insights</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="last-6-months">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-3-months">Last 3 months</SelectItem>
              <SelectItem value="last-6-months">Last 6 months</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-gradient-primary hover:bg-primary-hover">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-crm-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">$486,000</p>
                <div className="flex items-center text-xs text-crm-green">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5% vs last period
                </div>
              </div>
              <div className="w-12 h-12 bg-crm-green/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-crm-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-crm-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Deals Closed</p>
                <p className="text-2xl font-bold text-foreground">111</p>
                <div className="flex items-center text-xs text-crm-green">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.2% vs last period
                </div>
              </div>
              <div className="w-12 h-12 bg-crm-blue/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-crm-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-crm-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lead Conversion</p>
                <p className="text-2xl font-bold text-foreground">12.8%</p>
                <div className="flex items-center text-xs text-crm-orange">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +0.5% vs last period
                </div>
              </div>
              <div className="w-12 h-12 bg-crm-orange/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-crm-orange" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-crm-md">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Deal Size</p>
                <p className="text-2xl font-bold text-foreground">$4,378</p>
                <div className="flex items-center text-xs text-crm-green">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15.3% vs last period
                </div>
              </div>
              <div className="w-12 h-12 bg-crm-purple/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-crm-purple" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Reports */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="funnel">Sales Funnel</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="sources">Lead Sources</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-crm-md">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--crm-blue))" 
                      fill="hsl(var(--crm-blue))"
                      fillOpacity={0.1}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-crm-md">
              <CardHeader>
                <CardTitle>Conversion Rate Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="conversion" 
                      stroke="hsl(var(--crm-green))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--crm-green))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sales Funnel Tab */}
        <TabsContent value="funnel" className="space-y-6">
          <Card className="shadow-crm-md">
            <CardHeader>
              <CardTitle>Sales Funnel Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={400}>
                  <FunnelChart>
                    <Funnel
                      dataKey="value"
                      data={funnelData}
                      isAnimationActive
                    >
                      <LabelList position="center" fill="#fff" stroke="none" />
                    </Funnel>
                    <Tooltip />
                  </FunnelChart>
                </ResponsiveContainer>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Conversion Rates</h3>
                  {funnelData.map((stage, index) => {
                    const nextStage = funnelData[index + 1];
                    const conversionRate = nextStage 
                      ? ((nextStage.value / stage.value) * 100).toFixed(1)
                      : null;
                    
                    return (
                      <div key={stage.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: stage.fill }}
                          />
                          <span className="font-medium text-foreground">{stage.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">
                            {stage.value.toLocaleString()}
                          </div>
                          {conversionRate && (
                            <div className="text-xs text-muted-foreground">
                              {conversionRate}% conversion
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Performance Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="shadow-crm-md">
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div key={member.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">Sales Representative</p>
                      </div>
                    </div>
                    <div className="flex gap-8 text-center">
                      <div>
                        <div className="font-semibold text-foreground">{member.deals}</div>
                        <div className="text-xs text-muted-foreground">Deals</div>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          ${member.revenue.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{member.conversion}%</div>
                        <div className="text-xs text-muted-foreground">Conversion</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lead Sources Tab */}
        <TabsContent value="sources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-crm-md">
              <CardHeader>
                <CardTitle>Lead Sources Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourceAnalysis}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="leads"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {sourceAnalysis.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-crm-md">
              <CardHeader>
                <CardTitle>Source Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sourceAnalysis.map((source, index) => (
                    <div key={source.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{source.name}</span>
                        <Badge variant="outline">{source.conversion}% conversion</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>Leads: {source.leads}</div>
                        <div>Revenue: ${source.revenue.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card className="shadow-crm-md">
            <CardHeader>
              <CardTitle>Sales & Leads Correlation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--crm-blue))" name="Revenue" />
                  <Bar dataKey="leads" fill="hsl(var(--crm-orange))" name="Leads" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}