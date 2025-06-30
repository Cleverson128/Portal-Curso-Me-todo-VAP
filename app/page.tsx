'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { getCourseModules, getUserProgress } from '@/lib/supabase';
import { CourseModule, UserProgress } from '@/types';
import { ModuleGrid } from '@/components/modules/module-grid';
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
      loadModulesData();
    }
  }, [user, authLoading, router]);

  const loadModulesData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const [modulesResult, progressResult] = await Promise.all([
        getCourseModules(),
        getUserProgress(user.id),
      ]);

      if (modulesResult.data) setModules(modulesResult.data);
      if (progressResult.data) setProgress(progressResult.data);
    } catch (error) {
      console.error('Erro ao carregar os módulos:', error);
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
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6 text-primary"
        >
          Todos os Módulos
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ModuleGrid modules={modules} progress={progress} />
        </motion.div>
      </main>
    </div>
  );
}
