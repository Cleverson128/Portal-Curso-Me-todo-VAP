export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseModule {
  id: number;
  title: string;
  description: string;
  content_url?: string;
  content_html?: string;
  embed_html?: string; // ✅ Adicionado aqui
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: number;
  user_id: string;
  module_id: number;
  completed: boolean;
  completed_at?: string;
  time_spent: number;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  id: number;
  user_id: string;
  total_time_studied: number;
  modules_completed: number;
  achievements: string[];
  level: number;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface ModuleWithProgress extends CourseModule {
  progress?: UserProgress;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
}