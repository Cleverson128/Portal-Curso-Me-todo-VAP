'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { getCourseModules, getUserProgress, markModuleAsCompleted } from '@/lib/supabase';
import { CourseModule, UserProgress } from '@/types';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { ModuleContent } from '@/components/modules/module-content';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function ModuleDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const moduleId = parseInt(params.id as string);

  const [module, setModule] = useState<CourseModule | null>(null);
  const [allModules, setAllModules] = useState<CourseModule[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user && moduleId) {
      loadModuleData();
    }
  }, [user, authLoading, router, moduleId]);

  const loadModuleData = async () => {
    if (!user) return;

    try {
      const [modulesResult, progressResult] = await Promise.all([
        getCourseModules(),
        getUserProgress(user.id),
      ]);

      if (modulesResult.data) {
        setAllModules(modulesResult.data);
        const currentModule = modulesResult.data.find(m => m.id === moduleId);
        setModule(currentModule || null);
      }
      
      if (progressResult.data) {
        setProgress(progressResult.data);
      }
    } catch (error) {
      console.error('Error loading module:', error);
      toast.error('Erro ao carregar módulo');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteModule = async () => {
    if (!user || !module) return;

    setCompleting(true);
    try {
      const { error } = await markModuleAsCompleted(user.id, module.id);
      
      if (error) {
        toast.error('Erro ao marcar módulo como concluído');
      } else {
        toast.success('Módulo concluído com sucesso! 🎉');
        // Reload progress
        const { data: newProgress } = await getUserProgress(user.id);
        if (newProgress) setProgress(newProgress);
      }
    } catch (error) {
      toast.error('Erro inesperado');
    } finally {
      setCompleting(false);
    }
  };

  const handleNextModule = () => {
    const currentIndex = allModules.findIndex(m => m.id === moduleId);
    const nextModule = allModules[currentIndex + 1];
    if (nextModule) {
      router.push(`/modules/${nextModule.id}`);
    }
  };

  const handlePreviousModule = () => {
    const currentIndex = allModules.findIndex(m => m.id === moduleId);
    const prevModule = allModules[currentIndex - 1];
    if (prevModule) {
      router.push(`/modules/${prevModule.id}`);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Módulo não encontrado
            </h1>
            <Button onClick={() => router.push('/modules')}>
              Voltar aos módulos
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const moduleProgress = progress.find(p => p.module_id === module.id);
  const isCompleted = moduleProgress?.completed || false;
  const currentIndex = allModules.findIndex(m => m.id === moduleId);
  const hasNext = currentIndex < allModules.length - 1;
  const hasPrevious = currentIndex > 0;

  return (
    <div className="min-h-screen bg-gray-50">
           
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push('/modules')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos módulos
            </Button>
            
            {isCompleted && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Concluído</span>
              </div>
            )}
          </div>

          {/* Module Content */}
          <ModuleContent module={module} />

          {/* Actions */}
          <div className="flex items-center justify-between py-6 border-t">
            <Button
              variant="outline"
              onClick={handlePreviousModule}
              disabled={!hasPrevious}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Módulo Anterior
            </Button>

            <div className="flex items-center gap-4">
              {!isCompleted && (
                <Button
                  onClick={handleCompleteModule}
                  disabled={completing}
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  {completing ? 'Concluindo...' : 'Marcar como Concluído'}
                </Button>
              )}

              <Button
                onClick={handleNextModule}
                disabled={!hasNext}
                className="flex items-center gap-2"
              >
                Próximo Módulo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}