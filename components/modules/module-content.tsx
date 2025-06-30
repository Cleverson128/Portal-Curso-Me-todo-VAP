'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CourseModule } from '@/types';

interface ModuleContentProps {
  module: CourseModule;
}

export function ModuleContent({ module }: ModuleContentProps) {
  return (
    <div className="space-y-8">
      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Badge className="mb-4 bg-purple-100 text-purple-800">
          Módulo {module.order_index}
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {module.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {module.description}
        </p>
      </motion.div>

      {/* Module Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center gap-8"
      >
        <div className="flex items-center gap-2 text-gray-600">
          <BookOpen className="w-5 h-5" />
          <span>Conteúdo Teórico</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-5 h-5" />
          <span>15-20 min</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5" />
          <span>Para todos os níveis</span>
        </div>
      </motion.div>

      {/* Módulo Embed (iframe do Gamma) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo do Módulo</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: module.embed_html || '' }}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
