'use client';

import { motion } from 'framer-motion';
import { CourseModule, UserProgress } from '@/types';
import { ModuleListItem } from './module-list-item';

interface ModuleListProps {
  modules: CourseModule[];
  progress: UserProgress[];
}

export function ModuleList({ modules, progress }: ModuleListProps) {
  return (
    <div className="space-y-4">
      {modules.map((module, index) => {
        const moduleProgress = progress.find(p => p.module_id === module.id);
        
        return (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ModuleListItem module={module} progress={moduleProgress} />
          </motion.div>
        );
      })}
    </div>
  );
}