
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Alert types
const alertCategories = [
  {
    id: 'attendance',
    name: 'Attendance Alerts',
    alerts: [
      { id: 'noshow', name: 'No-show for classes', enabled: true, threshold: 3, period: 'week' },
      { id: 'decreased', name: 'Decreased attendance', enabled: true, threshold: 50, period: 'month' },
      { id: 'novisit', name: 'No visits', enabled: true, threshold: 14, period: 'days' },
    ]
  },
  {
    id: 'financial',
    name: 'Financial Alerts',
    alerts: [
      { id: 'overdue', name: 'Payment overdue', enabled: true, threshold: 3, period: 'days' },
      { id: 'revenue', name: 'Revenue below target', enabled: false, threshold: 10, period: 'percent' },
      { id: 'expense', name: 'Expense overruns', enabled: true, threshold: 15, period: 'percent' },
    ]
  },
  {
    id: 'fitness',
    name: 'Fitness Goal Alerts',
    alerts: [
      { id: 'stagnation', name: 'Goal stagnation', enabled: true, threshold: 30, period: 'days' },
      { id: 'completion', name: 'Low completion rate', enabled: false, threshold: 40, period: 'percent' },
    ]
  },
  {
    id: 'membership',
    name: 'Membership Alerts',
    alerts: [
      { id: 'churn', name: 'High churn rate', enabled: true, threshold: 5, period: 'percent' },
      { id: 'renewal', name: 'Membership expiring', enabled: true, threshold: 7, period: 'days' },
    ]
  },
];

const AlertSettings = () => {
  const [categories, setCategories] = useState(alertCategories);
  const [activeTab, setActiveTab] = useState('attendance');

  const handleAlertToggle = (categoryId: string, alertId: string, enabled: boolean) => {
    setCategories(prevCategories => 
      prevCategories.map(category => 
        category.id === categoryId 
          ? {
              ...category,
              alerts: category.alerts.map(alert => 
                alert.id === alertId ? { ...alert, enabled } : alert
              )
            }
          : category
      )
    );
  };

  const handleThresholdChange = (categoryId: string, alertId: string, threshold: string) => {
    const numericThreshold = parseInt(threshold);
    
    if (!isNaN(numericThreshold)) {
      setCategories(prevCategories => 
        prevCategories.map(category => 
          category.id === categoryId 
            ? {
                ...category,
                alerts: category.alerts.map(alert => 
                  alert.id === alertId ? { ...alert, threshold: numericThreshold } : alert
                )
              }
            : category
        )
      );
    }
  };

  const renderPeriodLabel = (period: string) => {
    switch(period) {
      case 'days': return 'days';
      case 'week': return 'per week';
      case 'month': return 'per month';
      case 'percent': return '%';
      default: return period;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alert Settings</CardTitle>
          <CardDescription>
            Configure automatic alerts and notifications based on business metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="w-full flex overflow-auto">
              {categories.map(category => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex-1"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(category => (
              <TabsContent key={category.id} value={category.id} className="space-y-8">
                <div className="space-y-6">
                  {category.alerts.map(alert => (
                    <div key={alert.id} className="flex items-center justify-between pb-4 border-b">
                      <div className="space-y-0.5">
                        <Label className="text-base">{alert.name}</Label>
                        <p className="text-sm text-gray-500">
                          Alert when threshold exceeds {alert.threshold} {renderPeriodLabel(alert.period)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`threshold-${alert.id}`} className="text-sm whitespace-nowrap">Threshold:</Label>
                          <Input 
                            id={`threshold-${alert.id}`}
                            type="number" 
                            className="w-20 h-8" 
                            value={alert.threshold}
                            onChange={(e) => handleThresholdChange(category.id, alert.id, e.target.value)}
                            disabled={!alert.enabled}
                          />
                          <span className="text-sm">{renderPeriodLabel(alert.period)}</span>
                        </div>
                        <Switch 
                          checked={alert.enabled}
                          onCheckedChange={(checked) => handleAlertToggle(category.id, alert.id, checked)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Notification Recipients</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id={`email-${category.id}`} defaultChecked />
                      <Label htmlFor={`email-${category.id}`}>Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id={`sms-${category.id}`} />
                      <Label htmlFor={`sms-${category.id}`}>SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id={`dashboard-${category.id}`} defaultChecked />
                      <Label htmlFor={`dashboard-${category.id}`}>Dashboard</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Reset to Default</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AlertSettings;
