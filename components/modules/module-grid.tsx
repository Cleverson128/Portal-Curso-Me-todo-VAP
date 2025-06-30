'use client';

import { motion } from 'framer-motion';
import { CourseModule, UserProgress } from '@/types';
import { ModuleCard } from './module-card';

interface ModuleGridProps {
  modules: CourseModule[];
  progress: UserProgress[];
}

export function ModuleGrid({ modules, progress }: ModuleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module, index) => {
        const moduleProgress = progress.find(p => p.module_id === module.id);
        
        return (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ModuleCard module={module} progress={moduleProgress} />
          </motion.div>
        );
      })}
    </div>
  );
}