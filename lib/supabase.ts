import { createClient } from '@supabase/supabase-js';
import { User as AppUser } from '../types/index';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("✅ SUPABASE URL:", supabaseUrl);
console.log("✅ SUPABASE KEY:", supabaseAnonKey ? "OK" : "MISSING");


if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables are missing. Check your .env.local file.');
  throw new Error('Supabase environment variables not found');
}

console.log('✅ Supabase URL:', supabaseUrl);
console.log('✅ Supabase Key:', supabaseAnonKey?.substring(0, 10) + '...');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// Auth helper functions
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (!error && data.user) {
    // Create user profile
    await supabase.from('users').insert({
      id: data.user.id,
      email: data.user.email!,
      full_name: fullName,
    });

    // Create initial user stats
    await supabase.from('user_stats').insert({
      user_id: data.user.id,
      total_time_studied: 0,
      modules_completed: 0,
      achievements: [],
      level: 1,
      points: 0,
    });
  }

  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Data fetching functions
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  return { data, error };
};

export const getCourseModules = async () => {
  const { data, error } = await supabase
    .from('course_modules')
    .select('*')
    .eq('is_active', true)
    .order('order_index');

  return { data, error };
};

export const getUserProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);

  return { data, error };
};

export const getUserStats = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
};

export const markModuleAsCompleted = async (userId: string, moduleId: number) => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      module_id: moduleId,
      completed: true,
      completed_at: new Date().toISOString(),
    });

  if (!error) {
    // Update user stats
    const { data: stats } = await getUserStats(userId);
    if (stats) {
      await supabase
        .from('user_stats')
        .update({
          modules_completed: stats.modules_completed + 1,
          points: stats.points + 100,
        })
        .eq('user_id', userId);
    }
  }

  return { data, error };
};

export const updateUserProfile = async (userId: string, updates: Partial<AppUser>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  return { data, error };
};
