'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Play, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CourseModule, UserProgress } from '@/types';

interface ModuleCardProps {
  module: CourseModule;
  progress?: UserProgress;
}

export function ModuleCard({ module, progress }: ModuleCardProps) {
  const router = useRouter();
  const isCompleted = progress?.completed || false;

  const handleClick = () => {
    router.push(`/modules/${module.id}`);
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <motion.div
        whileHover={{ y: -4 }}
        onClick={handleClick}
        className="h-full flex flex-col"
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight mb-2 group-hover:text-purple-600 transition-colors">
                {module.title}
              </CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">
                {module.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              {isCompleted ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Concluído
                </Badge>
              ) : (
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  Pendente
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-end">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Módulo {module.order_index}
            </span>
            <Button 
              size="sm" 
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Play className="w-4 h-4 mr-2" />
              {isCompleted ? 'Revisar' : 'Iniciar'}
            </Button>
          </div>
        </CardContent>
      </motion.div>
    </Card>
  );
}