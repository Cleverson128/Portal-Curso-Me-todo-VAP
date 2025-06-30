'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getUnlockedAchievements } from '@/lib/achievements';

interface AchievementSectionProps {
  modulesCompleted: number;
  achievements: string[];
}

export function AchievementSection({ modulesCompleted, achievements }: AchievementSectionProps) {
  const allAchievements = getUnlockedAchievements(modulesCompleted, achievements);
  const unlockedCount = allAchievements.filter(a => a.unlocked).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Conquistas</span>
            <Badge variant="secondary">
              {unlockedCount}/{allAchievements.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {allAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`
                  p-4 rounded-lg border-2 text-center transition-all
                  ${achievement.unlocked 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                  }
                `}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h4 className={`
                  font-semibold text-sm mb-1
                  ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}
                `}>
                  {achievement.title}
                </h4>
                <p className={`
                  text-xs
                  ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}
                `}>
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <Badge className="mt-2 bg-green-100 text-green-800 text-xs">
                    Desbloqueada
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}