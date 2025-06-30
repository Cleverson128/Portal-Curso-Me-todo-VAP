import { Achievement } from '@/types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_login',
    title: 'Bem-vindo!',
    description: 'Fez o primeiro login no portal',
    icon: '🎯',
    color: 'text-blue-500',
    unlocked: false,
  },
  {
    id: 'first_module',
    title: 'Primeira Lição',
    description: 'Completou o primeiro módulo',
    icon: '🎓',
    color: 'text-green-500',
    unlocked: false,
  },
  {
    id: 'five_modules',
    title: 'Em Progresso',
    description: 'Completou 5 módulos',
    icon: '🚀',
    color: 'text-purple-500',
    unlocked: false,
  },
  {
    id: 'half_course',
    title: 'Meio Caminho',
    description: 'Completou 50% do curso',
    icon: '⭐',
    color: 'text-yellow-500',
    unlocked: false,
  },
  {
    id: 'almost_there',
    title: 'Quase Lá!',
    description: 'Completou 8 módulos',
    icon: '🔥',
    color: 'text-orange-500',
    unlocked: false,
  },
  {
    id: 'course_completed',
    title: 'VAP Master',
    description: 'Completou todos os módulos!',
    icon: '👑',
    color: 'text-gold-500',
    unlocked: false,
  },
];

export const getUnlockedAchievements = (modulesCompleted: number, achievements: string[] = []): Achievement[] => {
  return ACHIEVEMENTS.map(achievement => {
    let unlocked = achievements.includes(achievement.id);

    if (!unlocked) {
      switch (achievement.id) {
        case 'first_login':
          unlocked = true; // Always unlocked after first login
          break;
        case 'first_module':
          unlocked = modulesCompleted >= 1;
          break;
        case 'five_modules':
          unlocked = modulesCompleted >= 5;
          break;
        case 'half_course':
          unlocked = modulesCompleted >= 6; // 11 modules, so 6 is roughly half
          break;
        case 'almost_there':
          unlocked = modulesCompleted >= 8;
          break;
        case 'course_completed':
          unlocked = modulesCompleted >= 11;
          break;
      }
    }

    return { ...achievement, unlocked };
  });
};