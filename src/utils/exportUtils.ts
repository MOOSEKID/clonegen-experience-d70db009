
// This is a new file to define interfaces for export utilities
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface MembershipData {
  name: string;
  members: number;
  month: string;
  active: number;
  canceled: number;
  total: number;
  value: number;
  capacity: number;
}

export interface RevenueData {
  name: string;
  revenue: number;
  month: string;
  memberships: number;
  classes: number;
  other: number;
  total: number;
  value: number;
  capacity: number;
}

export interface ClassAttendanceData {
  name: string;
  value: number;
  className: string;
  attendance: number;
  capacity: number;
  total: number;
}

export const membershipColumns = [
  { header: 'Month', dataKey: 'month' },
  { header: 'Active', dataKey: 'active' },
  { header: 'Canceled', dataKey: 'canceled' },
  { header: 'Total', dataKey: 'total' }
];

export const revenueColumns = [
  { header: 'Month', dataKey: 'month' },
  { header: 'Memberships', dataKey: 'memberships' },
  { header: 'Classes', dataKey: 'classes' },
  { header: 'Other', dataKey: 'other' },
  { header: 'Total', dataKey: 'total' }
];

export const classAttendanceColumns = [
  { header: 'Class Name', dataKey: 'className' },
  { header: 'Attendance', dataKey: 'attendance' },
  { header: 'Capacity', dataKey: 'capacity' },
  { header: 'Percentage', dataKey: 'percentage' }
];

export const exportToPDF = (
  data: any[],
  columns: any[],
  title: string,
  filename: string
) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);
  
  // Format data for autoTable if needed
  const formattedData = data.map(item => {
    const row: any = {};
    columns.forEach(col => {
      if (col.dataKey === 'percentage' && item.attendance && item.capacity) {
        row[col.dataKey] = `${Math.round((item.attendance / item.capacity) * 100)}%`;
      } else {
        row[col.dataKey] = item[col.dataKey];
      }
    });
    return row;
  });
  
  // Create the table
  autoTable(doc, {
    startY: 30,
    head: [columns.map(col => col.header)],
    body: formattedData.map(item => columns.map(col => item[col.dataKey])),
  });
  
  // Save the PDF
  doc.save(`${filename}.pdf`);
};
