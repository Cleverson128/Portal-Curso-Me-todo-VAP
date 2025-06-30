'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { getCourseModules, getUserProgress, getUserStats } from '@/lib/supabase';
import { CourseModule, UserProgress, UserStats } from '@/types';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { ProgressOverview } from '@/components/dashboard/progress-overview';
import { AchievementSection } from '@/components/dashboard/achievement-section';
import { ModuleGrid } from '@/components/modules/module-grid';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user) {
      loadDashboardData();
    }
  }, [user, authLoading, router]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const [modulesResult, progressResult, statsResult] = await Promise.all([
        getCourseModules(),
        getUserProgress(user.id),
        getUserStats(user.id),
      ]);

      if (modulesResult.data) setModules(modulesResult.data);
      if (progressResult.data) setProgress(progressResult.data);
      if (statsResult.data) setStats(statsResult.data);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const completedModules = progress.filter(p => p.completed).length;
  const totalModules = modules.length;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
  
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <ProgressOverview
            completedModules={completedModules}
            totalModules={totalModules}
            progressPercentage={progressPercentage}
            stats={stats}
          />

          <AchievementSection
            modulesCompleted={completedModules}
            achievements={stats?.achievements || []}
          />

          <div>
            <h2 className="text-2xl font-bold mb-6">📚 Módulos do Curso</h2>
            <ModuleGrid modules={modules} progress={progress} />
          </div>
        </motion.div>
      </main>
    </div>
  );
}