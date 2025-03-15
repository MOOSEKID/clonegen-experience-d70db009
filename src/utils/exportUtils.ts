
// This is a new file to define interfaces for export utilities

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
