import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AddDealForm } from "@/components/forms/AddDealForm";
import { 
  DollarSign, 
  Calendar, 
  User, 
  Building, 
  TrendingUp,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2
} from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  probability: number;
  closeDate: string;
  contact: string;
  stage?: string;
  description?: string;
  notes?: string;
}

const initialPipelineData = {
  'qualified': {
    id: 'qualified',
    title: 'Qualified',
    color: 'bg-crm-blue',
    deals: [
      {
        id: '1',
        title: 'Enterprise Software License',
        company: 'TechCorp Inc',
        value: 85000,
        probability: 40,
        closeDate: '2024-02-15',
        contact: 'Sarah Johnson',
        description: 'Large enterprise looking for comprehensive software solution',
        notes: 'Decision maker identified, budget confirmed'
      },
      {
        id: '2',
        title: 'Cloud Migration Project',
        company: 'Global Systems',
        value: 120000,
        probability: 35,
        closeDate: '2024-03-01',
        contact: 'Michael Chen',
        description: 'Full cloud migration and infrastructure setup',
        notes: 'Multiple stakeholders involved, technical evaluation in progress'
      },
      {
        id: '3',
        title: 'Digital Transformation',
        company: 'Manufacturing Pro',
        value: 95000,
        probability: 45,
        closeDate: '2024-02-20',
        contact: 'Robert Thompson',
        description: 'Modernizing legacy systems and processes',
        notes: 'Strong interest, waiting for board approval'
      }
    ]
  },
  'proposal': {
    id: 'proposal',
    title: 'Proposal',
    color: 'bg-crm-purple',
    deals: [
      {
        id: '4',
        title: 'CRM Implementation',
        company: 'StartupXYZ',
        value: 45000,
        probability: 60,
        closeDate: '2024-01-30',
        contact: 'Emily Rodriguez',
        description: 'Complete CRM setup and team training',
        notes: 'Proposal submitted, positive feedback received'
      },
      {
        id: '5',
        title: 'Data Analytics Platform',
        company: 'Innovation Labs',
        value: 95000,
        probability: 65,
        closeDate: '2024-02-10',
        contact: 'David Park',
        description: 'Advanced analytics and reporting solution',
        notes: 'Demo completed successfully, negotiating terms'
      },
      {
        id: '6',
        title: 'E-commerce Platform',
        company: 'Retail Solutions',
        value: 75000,
        probability: 55,
        closeDate: '2024-02-25',
        contact: 'Jessica Brown',
        description: 'Custom e-commerce platform development',
        notes: 'Proposal under review, awaiting feedback'
      }
    ]
  },
  'negotiation': {
    id: 'negotiation',
    title: 'Negotiation',
    color: 'bg-crm-orange',
    deals: [
      {
        id: '7',
        title: 'Security Audit Service',
        company: 'FinTech Solutions',
        value: 32000,
        probability: 80,
        closeDate: '2024-01-25',
        contact: 'Lisa Wang',
        description: 'Comprehensive security assessment and remediation',
        notes: 'Price negotiation in progress, timeline agreed'
      },
      {
        id: '8',
        title: 'Mobile App Development',
        company: 'Health Solutions',
        value: 65000,
        probability: 75,
        closeDate: '2024-02-05',
        contact: 'Dr. Martinez',
        description: 'Patient management mobile application',
        notes: 'Contract terms being finalized'
      }
    ]
  },
  'closed': {
    id: 'closed',
    title: 'Closed Won',
    color: 'bg-crm-green',
    deals: [
      {
        id: '9',
        title: 'Website Redesign',
        company: 'Creative Agency',
        value: 28000,
        probability: 100,
        closeDate: '2024-01-15',
        contact: 'James Miller',
        description: 'Complete website redesign and optimization',
        notes: 'Project completed successfully, client very satisfied'
      },
      {
        id: '10',
        title: 'Process Automation',
        company: 'LogisticsPro',
        value: 55000,
        probability: 100,
        closeDate: '2024-01-10',
        contact: 'Mark Johnson',
        description: 'Automated workflow and inventory management',
        notes: 'Closed deal, implementation started'
      }
    ]
  }
};

export function SalesPipeline() {
  const [pipelineData, setPipelineData] = useState(initialPipelineData);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const { toast } = useToast();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const sourceColumn = pipelineData[source.droppableId as keyof typeof pipelineData];
    const destinationColumn = pipelineData[destination.droppableId as keyof typeof pipelineData];

    const draggedDeal = sourceColumn.deals.find(deal => deal.id === draggableId);
    if (!draggedDeal) return;

    // Remove from source
    const newSourceDeals = sourceColumn.deals.filter(deal => deal.id !== draggableId);
    
    // Add to destination
    const newDestinationDeals = [...destinationColumn.deals];
    newDestinationDeals.splice(destination.index, 0, draggedDeal);

    setPipelineData({
      ...pipelineData,
      [source.droppableId]: {
        ...sourceColumn,
        deals: newSourceDeals
      },
      [destination.droppableId]: {
        ...destinationColumn,
        deals: newDestinationDeals
      }
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTotalValue = (deals: any[]) => {
    return deals.reduce((total, deal) => total + deal.value, 0);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sales Pipeline</h1>
          <p className="text-muted-foreground">Manage deals through your sales process</p>
        </div>
        <AddDealForm 
          onDealAdded={(deal) => {
            const newDeal = {
              id: Date.now().toString(),
              title: deal.title,
              company: deal.company,
              value: deal.value,
              probability: deal.probability,
              closeDate: deal.closeDate,
              contact: deal.contact,
              description: deal.description || '',
              notes: deal.notes || ''
            };
            setPipelineData(prev => ({
              ...prev,
              qualified: {
                ...prev.qualified,
                deals: [...prev.qualified.deals, newDeal]
              }
            }));
          }}
        />
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.values(pipelineData).map((stage) => (
          <Card key={stage.id} className="shadow-crm-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stage.title}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(getTotalValue(stage.deals))}
                  </p>
                  <p className="text-xs text-muted-foreground">{stage.deals.length} deals</p>
                </div>
                <div className={`w-12 h-12 ${stage.color} rounded-lg flex items-center justify-center`}>
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Drag and Drop Pipeline */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {Object.values(pipelineData).map((stage) => (
            <div key={stage.id} className="space-y-4">
              {/* Stage Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 ${stage.color} rounded-full`} />
                  <h3 className="font-semibold text-foreground">{stage.title}</h3>
                  <Badge variant="secondary">{stage.deals.length}</Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Droppable Area */}
              <Droppable droppableId={stage.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-96 p-2 rounded-lg transition-colors ${
                      snapshot.isDraggingOver ? 'bg-muted/50' : 'bg-transparent'
                    }`}
                  >
                    <div className="space-y-3">
                      {stage.deals.map((deal, index) => (
                        <Draggable key={deal.id} draggableId={deal.id} index={index}>
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`shadow-crm-md hover:shadow-crm-lg transition-all duration-300 cursor-move ${
                                snapshot.isDragging ? 'rotate-3 scale-105' : ''
                              }`}
                            >
                              <CardContent className="p-4 space-y-3">
                                {/* Deal Title */}
                                <div>
                                  <h4 className="font-medium text-foreground text-sm">{deal.title}</h4>
                                  <p className="text-xs text-muted-foreground">{deal.company}</p>
                                </div>

                                {/* Value */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="w-3 h-3 text-crm-green" />
                                    <span className="font-semibold text-sm text-foreground">
                                      {formatCurrency(deal.value)}
                                    </span>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {deal.probability}%
                                  </Badge>
                                </div>

                                {/* Progress */}
                                <Progress value={deal.probability} className="h-1" />

                                {/* Meta Info */}
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <User className="w-3 h-3" />
                                    <span>{deal.contact}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    <span>{new Date(deal.closeDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}