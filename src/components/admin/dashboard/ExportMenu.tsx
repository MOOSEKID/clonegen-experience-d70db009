
import { FileDown } from 'lucide-react';
import { CSVLink } from 'react-csv';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  exportToPDF,
  membershipColumns,
  revenueColumns,
  classAttendanceColumns,
  type MembershipData,
  type RevenueData,
  type ClassAttendanceData
} from '@/utils/exportUtils';

interface ExportMenuProps {
  membershipData: MembershipData[];
  revenueData: RevenueData[];
  classAttendanceData: ClassAttendanceData[];
}

const ExportMenu = ({ membershipData, revenueData, classAttendanceData }: ExportMenuProps) => {
  // For CSV exports, we'll use CSVLink from react-csv
  // For PDF exports, we'll use our exportToPDF utility function
  
  const handlePDFExport = (type: 'membership' | 'revenue' | 'classes' | 'all') => {
    switch (type) {
      case 'membership':
        exportToPDF('Membership Growth', membershipData, membershipColumns);
        break;
      case 'revenue':
        exportToPDF('Revenue Overview', revenueData, revenueColumns);
        break;
      case 'classes':
        exportToPDF('Class Attendance', classAttendanceData, classAttendanceColumns);
        break;
      case 'all':
        // Export all data to a single PDF
        const doc = new jsPDF();
        let yPos = 15;
        
        // Add title
        doc.setFontSize(20);
        doc.text("Dashboard Export - Complete Report", 14, yPos);
        yPos += 10;
        
        doc.setFontSize(14);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, yPos);
        yPos += 15;
        
        // Add membership data
        doc.setFontSize(16);
        doc.text("Membership Growth", 14, yPos);
        yPos += 10;
        
        autoTable(doc, {
          head: [membershipColumns.map(col => col.label)],
          body: membershipData.map(item => 
            membershipColumns.map(col => item[col.key as keyof MembershipData]?.toString() || '')
          ),
          startY: yPos,
        });
        
        yPos = (doc as any).lastAutoTable.finalY + 15;
        
        // Add revenue data
        doc.setFontSize(16);
        doc.text("Revenue Overview", 14, yPos);
        yPos += 10;
        
        autoTable(doc, {
          head: [revenueColumns.map(col => col.label)],
          body: revenueData.map(item => 
            revenueColumns.map(col => item[col.key as keyof RevenueData]?.toString() || '')
          ),
          startY: yPos,
        });
        
        yPos = (doc as any).lastAutoTable.finalY + 15;
        
        // Add class attendance data
        doc.setFontSize(16);
        doc.text("Class Attendance", 14, yPos);
        yPos += 10;
        
        autoTable(doc, {
          head: [classAttendanceColumns.map(col => col.label)],
          body: classAttendanceData.map(item => 
            classAttendanceColumns.map(col => item[col.key as keyof ClassAttendanceData]?.toString() || '')
          ),
          startY: yPos,
        });
        
        // Save PDF
        doc.save(`dashboard-export-${new Date().toISOString().split('T')[0]}.pdf`);
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileDown size={16} />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="font-semibold">Export as CSV</DropdownMenuItem>
        <CSVLink
          data={membershipData}
          headers={membershipColumns}
          filename={`membership-data-${new Date().toISOString().split('T')[0]}.csv`}
          className="block px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground w-full cursor-default"
        >
          Membership Data
        </CSVLink>
        <CSVLink
          data={revenueData}
          headers={revenueColumns}
          filename={`revenue-data-${new Date().toISOString().split('T')[0]}.csv`}
          className="block px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground w-full cursor-default"
        >
          Revenue Data
        </CSVLink>
        <CSVLink
          data={classAttendanceData}
          headers={classAttendanceColumns}
          filename={`class-attendance-${new Date().toISOString().split('T')[0]}.csv`}
          className="block px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground w-full cursor-default"
        >
          Class Attendance
        </CSVLink>
        
        <DropdownMenuItem className="font-semibold mt-2">Export as PDF</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handlePDFExport('membership')}>
          Membership Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handlePDFExport('revenue')}>
          Revenue Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handlePDFExport('classes')}>
          Class Attendance
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handlePDFExport('all')}>
          Complete Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportMenu;
