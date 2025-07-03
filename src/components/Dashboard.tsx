import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Activity, 
  DollarSign,
  ArrowUpRight,
  MoreHorizontal,
  Building
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 65000, leads: 120 },
  { month: 'Feb', sales: 59000, leads: 98 },
  { month: 'Mar', sales: 80000, leads: 156 },
  { month: 'Apr', sales: 81000, leads: 143 },
  { month: 'May', sales: 96000, leads: 167 },
  { month: 'Jun', sales: 105000, leads: 189 },
];

const pipelineData = [
  { name: 'Qualified', value: 35, color: '#3b82f6' },
  { name: 'Proposal', value: 25, color: '#8b5cf6' },
  { name: 'Negotiation', value: 20, color: '#f59e0b' },
  { name: 'Closed Won', value: 20, color: '#10b981' },
];

const recentDeals = [
  { company: 'Acme Corp', amount: '$45,000', stage: 'Negotiation', probability: 85 },
  { company: 'TechStart Inc', amount: '$32,000', stage: 'Proposal', probability: 60 },
  { company: 'Global Systems', amount: '$78,000', stage: 'Qualified', probability: 40 },
  { company: 'Innovation Lab', amount: '$28,000', stage: 'Closed Won', probability: 100 },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sales Dashboard</h1>
          <p className="text-muted-foreground">Track your sales performance and pipeline</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <ArrowUpRight className="w-4 h-4 mr-2" />
          Add Deal
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-crm-md hover:shadow-crm-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-crm-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$486,000</div>
            <div className="flex items-center text-xs text-crm-green">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-crm-md hover:shadow-crm-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Deals</CardTitle>
            <Activity className="h-4 w-4 text-crm-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">47</div>
            <div className="flex items-center text-xs text-crm-green">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8 new this week
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-crm-md hover:shadow-crm-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Leads</CardTitle>
            <Target className="h-4 w-4 text-crm-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">189</div>
            <div className="flex items-center text-xs text-crm-red">
              <TrendingDown className="w-3 h-3 mr-1" />
              -3.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-crm-md hover:shadow-crm-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            <Users className="h-4 w-4 text-crm-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24.8%</div>
            <div className="flex items-center text-xs text-crm-green">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card className="shadow-crm-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Sales Trend
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardTitle>
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
                  dataKey="sales" 
                  stroke="hsl(var(--crm-blue))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--crm-blue))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pipeline Status */}
        <Card className="shadow-crm-md">
          <CardHeader>
            <CardTitle>Pipeline Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pipelineData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Deals */}
      <Card className="shadow-crm-md">
        <CardHeader>
          <CardTitle>Recent Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDeals.map((deal, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{deal.company}</h4>
                    <p className="text-sm text-muted-foreground">{deal.stage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">{deal.amount}</div>
                  <div className="text-xs text-muted-foreground">{deal.probability}% probability</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
