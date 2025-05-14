// src/types/clientSessionTypes.ts

export type SessionStatus = "Scheduled" | "Completed" | "Cancelled" | "Missed";
export type SessionType = "Private" | "Group" | "Consultation" | "Other";

export interface ClientSession {
  id: string;
  clientId: string;
  trainerId: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  status: SessionStatus;
  notes: string | null;
  focusAreas: string[];
  achievements: string[];
  sessionType: SessionType;
  location: string;
  createdAt: string;
  updatedAt: string;
}