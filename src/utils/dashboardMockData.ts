
// Mock data generation for the dashboard

export interface LocalMembershipData {
  month: string;
  active: number;
  canceled: number;
  total: number;
}

export interface LocalRevenueData {
  month: string;
  memberships: number;
  classes: number;
  other: number;
  total: number;
}

export interface LocalClassAttendanceData {
  className: string;
  attendance: number;
  capacity: number;
}

// Mock data generation functions
export const generateMockMembershipData = (): LocalMembershipData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    active: Math.floor(Math.random() * 50) + 50, // 50-100
    canceled: Math.floor(Math.random() * 10) + 5, // 5-15
    total: Math.floor(Math.random() * 70) + 60 // 60-130
  }));
};

export const generateMockRevenueData = (): LocalRevenueData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => {
    const memberships = Math.floor(Math.random() * 500000) + 1000000; // 1M-1.5M
    const classes = Math.floor(Math.random() * 300000) + 500000; // 500K-800K
    const other = Math.floor(Math.random() * 200000) + 100000; // 100K-300K
    return {
      month,
      memberships,
      classes,
      other,
      total: memberships + classes + other
    };
  });
};

export const generateMockClassAttendanceData = (): LocalClassAttendanceData[] => {
  const classes = ['HIIT', 'Yoga', 'Zumba', 'Spin', 'Pilates', 'Boxing', 'Strength'];
  return classes.map(className => ({
    className,
    attendance: Math.floor(Math.random() * 30) + 10, // 10-40
    capacity: 40
  }));
};
