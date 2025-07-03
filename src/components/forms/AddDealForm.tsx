import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, X, Calendar } from "lucide-react";

interface Deal {
  id?: string;
  title: string;
  company: string;
  value: number;
  probability: number;
  closeDate: string;
  contact: string;
  stage: string;
  description?: string;
  notes?: string;
}

interface AddDealFormProps {
  onDealAdded: (deal: Deal) => void;
  editDeal?: Deal | null;
  onDealUpdated?: (deal: Deal) => void;
}

const dealStages = [
  'qualified',
  'proposal',
  'negotiation',
  'closed'
];

const stageLabels = {
  qualified: 'Qualified',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  closed: 'Closed Won'
};

export function AddDealForm({ onDealAdded, editDeal, onDealUpdated }: AddDealFormProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Deal>({
    title: editDeal?.title || '',
    company: editDeal?.company || '',
    value: editDeal?.value || 0,
    probability: editDeal?.probability || 50,
    closeDate: editDeal?.closeDate || '',
    contact: editDeal?.contact || '',
    stage: editDeal?.stage || 'qualified',
    description: editDeal?.description || '',
    notes: editDeal?.notes || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Deal title is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.value || formData.value <= 0) newErrors.value = 'Deal value must be greater than 0';
    if (!formData.closeDate) newErrors.closeDate = 'Close date is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact person is required';
    if (formData.probability < 0 || formData.probability > 100) {
      newErrors.probability = 'Probability must be between 0 and 100';
    }
    
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
      const dealData = {
        ...formData,
        id: editDeal?.id || Date.now().toString(),
      };
      
      if (editDeal && onDealUpdated) {
        onDealUpdated(dealData);
        toast({
          title: "Success!",
          description: "Deal updated successfully.",
        });
      } else {
        onDealAdded(dealData);
        toast({
          title: "Success!",
          description: "New deal added successfully.",
        });
      }
      
      setOpen(false);
      setFormData({
        title: '',
        company: '',
        value: 0,
        probability: 50,
        closeDate: '',
        contact: '',
        stage: 'qualified',
        description: '',
        notes: ''
      });
      setErrors({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save deal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Deal, value: string | number) => {
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
          {editDeal ? 'Edit Deal' : 'Add Deal'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editDeal ? 'Edit Deal' : 'Add New Deal'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Deal Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enterprise Software License"
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
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
              <Label htmlFor="value">Deal Value ($) *</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => handleInputChange('value', parseFloat(e.target.value) || 0)}
                placeholder="50000"
                className={errors.value ? 'border-destructive' : ''}
              />
              {errors.value && <p className="text-sm text-destructive">{errors.value}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="probability">Probability (%) *</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => handleInputChange('probability', parseInt(e.target.value) || 0)}
                placeholder="75"
                className={errors.probability ? 'border-destructive' : ''}
              />
              {errors.probability && <p className="text-sm text-destructive">{errors.probability}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Person *</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                placeholder="John Smith"
                className={errors.contact ? 'border-destructive' : ''}
              />
              {errors.contact && <p className="text-sm text-destructive">{errors.contact}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="closeDate">Expected Close Date *</Label>
              <Input
                id="closeDate"
                type="date"
                value={formData.closeDate}
                onChange={(e) => handleInputChange('closeDate', e.target.value)}
                className={errors.closeDate ? 'border-destructive' : ''}
              />
              {errors.closeDate && <p className="text-sm text-destructive">{errors.closeDate}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage">Deal Stage</Label>
            <Select value={formData.stage} onValueChange={(value) => handleInputChange('stage', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dealStages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stageLabels[stage as keyof typeof stageLabels]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the deal..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes about this deal..."
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
                  {editDeal ? 'Update Deal' : 'Save Deal'}
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