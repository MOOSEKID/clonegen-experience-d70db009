
import React from 'react';
import { 
  User, Activity, Star, Calendar, Shield, MapPin, History, Users, 
  ClipboardList, CalendarDays, ListTodo, Clock, FileText 
} from 'lucide-react';
import StaffFunctionCard from './StaffFunctionCard';

// Define the structure for card data
export interface StaffFunctionCardData {
  title: string;
  subtitle: string;
  link: string;
  icon: React.ReactNode;
  implemented?: boolean;
}

// Cards for trainers
const trainerCards: StaffFunctionCardData[] = [
  {
    title: "Trainer Profiles",
    subtitle: "Manage profiles, specialties, and certifications",
    link: "/admin/staff/trainers/profiles",
    icon: <User size={20} />,
    implemented: true
  },
  {
    title: "Performance Tracking",
    subtitle: "Analyze attendance and feedback metrics",
    link: "/admin/staff/trainers/performance",
    icon: <Activity size={20} />
  },
  {
    title: "Ratings & Reviews",
    subtitle: "View ratings, respond to feedback",
    link: "/admin/staff/trainers/ratings",
    icon: <Star size={20} />
  },
  {
    title: "Scheduling",
    subtitle: "Manage classes, availability, time-off",
    link: "/admin/staff/trainers/scheduling",
    icon: <Calendar size={20} />
  }
];

// Cards for managers
const managerCards: StaffFunctionCardData[] = [
  {
    title: "Admin Roles & Permissions",
    subtitle: "Set access levels and manage roles",
    link: "/admin/staff/managers/permissions",
    icon: <Shield size={20} />
  },
  {
    title: "Branch Assignments",
    subtitle: "Assign branch responsibilities",
    link: "/admin/staff/managers/branches",
    icon: <MapPin size={20} />
  },
  {
    title: "Activity Logs",
    subtitle: "View login history and key actions",
    link: "/admin/staff/managers/activity",
    icon: <History size={20} />
  }
];

// Cards for reception and sales
const receptionSalesCards: StaffFunctionCardData[] = [
  {
    title: "Lead Management",
    subtitle: "Track and assign gym leads",
    link: "/admin/staff/reception-sales/leads",
    icon: <Users size={20} />
  },
  {
    title: "Onboarding History",
    subtitle: "Review new member registrations",
    link: "/admin/staff/reception-sales/onboarding",
    icon: <ClipboardList size={20} />
  },
  {
    title: "Shift Planner",
    subtitle: "View shift schedule for front desk",
    link: "/admin/staff/reception-sales/shifts",
    icon: <CalendarDays size={20} />
  }
];

// Cards for support staff
const supportCards: StaffFunctionCardData[] = [
  {
    title: "Task Assignment",
    subtitle: "Assign daily duties and maintenance tasks",
    link: "/admin/staff/support/tasks",
    icon: <ListTodo size={20} />
  },
  {
    title: "Attendance Tracker",
    subtitle: "Monitor check-in/out records",
    link: "/admin/staff/support/attendance",
    icon: <Clock size={20} />,
    implemented: true
  },
  {
    title: "Duty Schedule",
    subtitle: "Weekly calendar of responsibilities",
    link: "/admin/staff/support/schedule",
    icon: <Calendar size={20} />
  }
];

// Cards for wellness staff
const wellnessCards: StaffFunctionCardData[] = [
  {
    title: "Massage Therapist Roster",
    subtitle: "Manage therapist availability and logs",
    link: "/admin/staff/wellness/massage",
    icon: <Users size={20} />
  },
  {
    title: "Sauna Schedule",
    subtitle: "Assign attendants to sauna shifts",
    link: "/admin/staff/wellness/sauna",
    icon: <Clock size={20} />
  },
  {
    title: "Client Logs",
    subtitle: "View internal notes for wellness sessions",
    link: "/admin/staff/wellness/notes",
    icon: <FileText size={20} />
  }
];

interface RoleSpecificCardsProps {
  role: string;
}

const RoleSpecificCards: React.FC<RoleSpecificCardsProps> = ({ role }) => {
  let cards: StaffFunctionCardData[] = [];
  
  // Select cards based on role
  switch (role) {
    case 'trainer':
      cards = trainerCards;
      break;
    case 'manager':
      cards = managerCards;
      break;
    case 'reception':
    case 'sales':
      cards = receptionSalesCards;
      break;
    case 'support':
      cards = supportCards;
      break;
    case 'wellness':
      cards = wellnessCards;
      break;
    default:
      return null;
  }
  
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <StaffFunctionCard
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            link={card.link}
            icon={card.icon}
            implemented={card.implemented}
          />
        ))}
      </div>
    </div>
  );
};

export default RoleSpecificCards;
export { 
  trainerCards, 
  managerCards, 
  receptionSalesCards, 
  supportCards, 
  wellnessCards 
};
