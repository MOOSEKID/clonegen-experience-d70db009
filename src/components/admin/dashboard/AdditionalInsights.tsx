
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClassAttendanceData } from '@/utils/exportUtils';

interface AdditionalInsightsProps {
  classAttendanceData?: ClassAttendanceData[];
}

const AdditionalInsights: React.FC<AdditionalInsightsProps> = ({ classAttendanceData = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {classAttendanceData.length > 0 ? (
            <ul className="space-y-2">
              {classAttendanceData.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span>{item.value}/{item.capacity} ({Math.round((item.value / item.capacity) * 100)}%)</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No class attendance data available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInsights;
