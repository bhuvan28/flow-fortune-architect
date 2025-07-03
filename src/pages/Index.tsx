import { useState } from "react";
import { CRMSidebar } from "@/components/CRMSidebar";
import { Dashboard } from "@/components/Dashboard";
import { LeadsManagement } from "@/components/LeadsManagement";
import { SalesPipeline } from "@/components/SalesPipeline";
import { AdvancedReports } from "@/components/AdvancedReports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building, 
  Calendar, 
  Mail, 
  Settings,
  Bell,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Placeholder components for other sections
const ContactsManagement = () => (
  <div className="p-6">
    <div className="text-center py-20">
      <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-foreground mb-2">Contacts Management</h2>
      <p className="text-muted-foreground">Manage your customer contacts and relationships</p>
      <Button className="mt-4">Coming Soon</Button>
    </div>
  </div>
);

const CompaniesManagement = () => (
  <div className="p-6">
    <div className="text-center py-20">
      <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-foreground mb-2">Companies Management</h2>
      <p className="text-muted-foreground">Organize and track company information</p>
      <Button className="mt-4">Coming Soon</Button>
    </div>
  </div>
);

const CalendarView = () => (
  <div className="p-6">
    <div className="text-center py-20">
      <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-foreground mb-2">Calendar & Tasks</h2>
      <p className="text-muted-foreground">Schedule meetings and manage tasks</p>
      <Button className="mt-4">Coming Soon</Button>
    </div>
  </div>
);

const EmailManagement = () => (
  <div className="p-6">
    <div className="text-center py-20">
      <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-foreground mb-2">Email Integration</h2>
      <p className="text-muted-foreground">Manage email campaigns and communication</p>
      <Button className="mt-4">Coming Soon</Button>
    </div>
  </div>
);

const SettingsPanel = () => (
  <div className="p-6">
    <div className="text-center py-20">
      <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-foreground mb-2">Settings</h2>
      <p className="text-muted-foreground">Configure your CRM preferences</p>
      <Button className="mt-4">Coming Soon</Button>
    </div>
  </div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadsManagement />;
      case 'contacts':
        return <ContactsManagement />;
      case 'companies':
        return <CompaniesManagement />;
      case 'deals':
        return <SalesPipeline />;
      case 'calendar':
        return <CalendarView />;
      case 'reports':
        return <AdvancedReports />;
      case 'email':
        return <EmailManagement />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <CRMSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search CRM..."
                className="pl-10 w-80"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">JD</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
