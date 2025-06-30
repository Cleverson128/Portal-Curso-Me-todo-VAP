'use client';

import { motion } from 'framer-motion';
import { Trophy, Clock, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UserStats } from '@/types';

interface ProgressOverviewProps {
  completedModules: number;
  totalModules: number;
  progressPercentage: number;
  stats: UserStats | null;
}

export function ProgressOverview({
  completedModules,
  totalModules,
  progressPercentage,
  stats,
}: ProgressOverviewProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const statsCards = [
    {
      title: 'Progresso do Curso',
      value: `${completedModules}/${totalModules}`,
      subtitle: `${Math.round(progressPercentage)}% concluído`,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Tempo Estudado',
      value: formatTime(stats?.total_time_studied || 0),
      subtitle: 'Total de horas',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Nível Atual',
      value: `Nível ${stats?.level || 1}`,
      subtitle: `${stats?.points || 0} pontos`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Conquistas',
      value: stats?.achievements?.length || 0,
      subtitle: 'Badges desbloqueadas',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Seu Progresso no Método VAP</CardTitle>
            <p className="text-purple-100">
              Continue sua jornada para se tornar um Vendedor de Alta Performance
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">
                  {completedModules} de {totalModules} módulos concluídos
                </span>
                <span className="text-2xl font-bold">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress 
                value={progressPercentage} 
                className="h-3 bg-purple-700"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500">
                      {stat.subtitle}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}