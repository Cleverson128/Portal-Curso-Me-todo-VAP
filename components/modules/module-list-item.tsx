'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { PlayCircle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CourseModule, UserProgress } from '@/types';

interface ModuleListItemProps {
  module: CourseModule;
  progress?: UserProgress;
}

export function ModuleListItem({ module, progress }: ModuleListItemProps) {
  const router = useRouter();
  const isCompleted = progress?.completed || false;

  const handleClick = () => {
    router.push(`/modules/${module.id}`);
  };

  return (
    <Card className="hover:shadow-md transition-all duration-300 cursor-pointer group bg-[#272525] border border-zinc-700">
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={handleClick}
      >
        <CardContent className="p-6 text-white">
          <div className="flex items-center gap-6">
            {/* Module Number */}
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
              ${isCompleted 
                ? 'bg-green-100 text-green-800' 
                : 'bg-[#0AFF0F]/20 text-[#0AFF0F]'
              }
            `}>
              {isCompleted ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                module.order_index
              )}
            </div>

            {/* Module Info */}
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 group-hover:text-[#0AFF0F] transition-colors">
                {module.title}
              </h3>
              <p className="text-gray-200 mb-2">
                {module.description}
              </p>
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <Badge className="bg-green-600 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Concluído
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-gray-400 text-gray-300">
                    <Clock className="w-3 h-3 mr-1" />
                    Pendente
                  </Badge>
                )}
                {progress?.time_spent && progress.time_spent > 0 && (
                  <span className="text-sm text-gray-400">
                    {Math.round(progress.time_spent)} min estudados
                  </span>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center gap-3">
              <Button 
                className="bg-[#0AFF0F] hover:bg-[#0acc0c] text-black font-semibold shadow"
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                {isCompleted ? 'Revisar' : 'Iniciar'}
              </Button>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#0AFF0F] transition-colors" />
            </div>
          </div>
        </CardContent>
      </motion.div>
    </Card>
  );
}
