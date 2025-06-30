'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { getCourseModules, getUserProgress } from '@/lib/supabase';
import { CourseModule, UserProgress } from '@/types';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { ModuleList } from '@/components/modules/module-list';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function ModulesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user) {
      loadData();
    }
  }, [user, authLoading, router]);

  const loadData = async () => {
    if (!user) return;

    try {
      const [modulesResult, progressResult] = await Promise.all([
        getCourseModules(),
        getUserProgress(user.id),
      ]);

      if (modulesResult.data) setModules(modulesResult.data);
      if (progressResult.data) setProgress(progressResult.data);
    } catch (error) {
      console.error('Error loading modules:', error);
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

  return (
    <div className="min-h-screen bg-gray-50">
            
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Módulos do Curso
            </h1>
            <p className="text-gray-600">
              Complete todos os módulos para se tornar um Vendedor de Alta Performance
            </p>
          </div>

          <ModuleList modules={modules} progress={progress} />
        </motion.div>
      </main>
    </div>
  );
}