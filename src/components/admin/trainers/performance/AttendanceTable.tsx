
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClassAttendance } from "@/hooks/trainers/useTrainerPerformance";
import { Skeleton } from "@/components/ui/skeleton";

interface AttendanceTableProps {
  data: ClassAttendance[];
  isLoading: boolean;
}

const AttendanceTable = ({ data, isLoading }: AttendanceTableProps) => {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Class Attendance</CardTitle>
        <CardDescription>Recent class attendance records</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center text-gray-500 text-center p-8 border border-dashed rounded-md">
            <div>
              <p>No attendance records found.</p>
              <p className="text-sm mt-1">Records will appear once classes are conducted.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead className="text-center">Enrolled</TableHead>
                  <TableHead className="text-center">Attended</TableHead>
                  <TableHead className="text-center">Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.class_name}</TableCell>
                    <TableCell>{item.class_date}</TableCell>
                    <TableCell className="text-center">{item.enrolled_count}</TableCell>
                    <TableCell className="text-center">{item.attended_count}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getRateVariant(item.attendance_rate)}>
                        {item.attendance_rate.toFixed(0)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function getRateVariant(rate: number) {
  if (rate >= 80) return "success";
  if (rate >= 60) return "default";
  if (rate >= 40) return "warning";
  return "destructive";
}

export default AttendanceTable;
