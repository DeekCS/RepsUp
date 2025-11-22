// Common types for the application

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  date: Date;
  duration?: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  notes?: string;
}

export interface Set {
  id: string;
  reps: number;
  weight?: number;
  completed: boolean;
}
