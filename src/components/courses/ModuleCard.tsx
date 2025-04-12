
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Module } from '@/types';
import { Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: Module;
  courseId: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, courseId }) => {
  const isCompleted = module.progress === 100;

  return (
    <Card className={cn(
      "overflow-hidden transition-shadow hover:shadow-lg",
      isCompleted && "border-green-500 border-2"
    )}>
      <Link to={`/courses/${courseId}/modules/${module.id}`}>
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <div>
            <CardTitle className="text-lg font-bold">{module.title}</CardTitle>
            <CardDescription className="mt-1">{module.description}</CardDescription>
          </div>
          {isCompleted && (
            <CheckCircle2 className="text-green-500" size={24} />
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{module.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>{module.lessons} lessons</span>
            </div>
          </div>
          {module.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{module.progress}%</span>
              </div>
              <Progress value={module.progress || 0} className="h-2" />
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default ModuleCard;
