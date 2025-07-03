import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, X } from "lucide-react";

interface Lead {
  id?: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  score: number;
  source: string;
  value: string;
  notes?: string;
  lastContact?: string;
}

interface AddLeadFormProps {
  onLeadAdded: (lead: Lead) => void;
  editLead?: Lead | null;
  onLeadUpdated?: (lead: Lead) => void;
}

const leadSources = [
  'Website',
  'LinkedIn',
  'Cold Email',
  'Referral',
  'Social Media',
  'Phone Call',
  'Event',
  'Advertisement',
  'Partner'
];

const leadStatuses = [
  'new',
  'contacted',
  'qualified',
  'unqualified',
  'converted'
];

export function AddLeadForm({ onLeadAdded, editLead, onLeadUpdated }: AddLeadFormProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Lead>({
    name: editLead?.name || '',
    company: editLead?.company || '',
    email: editLead?.email || '',
    phone: editLead?.phone || '',
    location: editLead?.location || '',
    status: editLead?.status || 'new',
    score: editLead?.score || 50,
    source: editLead?.source || 'Website',
    value: editLead?.value || '',
    notes: editLead?.notes || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.value.trim()) newErrors.value = 'Deal value is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const leadData = {
        ...formData,
        id: editLead?.id || Date.now(),
        lastContact: editLead ? editLead.lastContact : 'Just now'
      };
      
      if (editLead && onLeadUpdated) {
        onLeadUpdated(leadData);
        toast({
          title: "Success!",
          description: "Lead updated successfully.",
        });
      } else {
        onLeadAdded(leadData);
        toast({
          title: "Success!",
          description: "New lead added successfully.",
        });
      }
      
      setOpen(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        location: '',
        status: 'new',
        score: 50,
        source: 'Website',
        value: '',
        notes: ''
      });
      setErrors({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save lead. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Lead, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          {editLead ? 'Edit Lead' : 'Add Lead'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editLead ? 'Edit Lead' : 'Add New Lead'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Acme Corp"
                className={errors.company ? 'border-destructive' : ''}
              />
              {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@acme.com"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="San Francisco, CA"
                className={errors.location ? 'border-destructive' : ''}
              />
              {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="value">Deal Value *</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) => handleInputChange('value', e.target.value)}
                placeholder="$50,000"
                className={errors.value ? 'border-destructive' : ''}
              />
              {errors.value && <p className="text-sm text-destructive">{errors.value}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {leadStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="source">Lead Source</Label>
              <Select value={formData.source} onValueChange={(value) => handleInputChange('source', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {leadSources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="score">Lead Score (0-100)</Label>
              <Input
                id="score"
                type="number"
                min="0"
                max="100"
                value={formData.score}
                onChange={(e) => handleInputChange('score', parseInt(e.target.value) || 0)}
                placeholder="75"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes about this lead..."
              rows={3}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 bg-gradient-primary hover:bg-primary-hover"
            >
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {editLead ? 'Update Lead' : 'Save Lead'}
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}