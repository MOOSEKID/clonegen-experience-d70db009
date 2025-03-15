import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Function to export data as PDF
export const exportToPDF = (
  title: string,
  data: Array<Record<string, any>>,
  columns: Array<{ label: string; key: string }>
) => {
  const doc = new jsPDF();
  const tableColumn = columns.map(col => col.label);
  const tableRows = data.map(item => 
    columns.map(col => item[col.key] !== undefined ? item[col.key].toString() : '')
  );

  // Add title to PDF
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  // Add table to PDF
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 35,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [52, 73, 94] }
  });

  // Save PDF
  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);
};

// Define types for dashboard data
export type MembershipData = {
  name: string;
  members: number;
};

export type RevenueData = {
  name: string;
  revenue: number;
};

export interface ClassAttendanceData {
  name: string;
  value: number;
  total: number; // Adding the missing total property
}

// Define columns for CSV export
export const membershipColumns = [
  { label: 'Month', key: 'name' },
  { label: 'Members', key: 'members' }
];

export const revenueColumns = [
  { label: 'Month', key: 'name' },
  { label: 'Revenue ($)', key: 'revenue' }
];

export const classAttendanceColumns = [
  { label: 'Class Type', key: 'name' },
  { label: 'Attendance', key: 'value' }
];
