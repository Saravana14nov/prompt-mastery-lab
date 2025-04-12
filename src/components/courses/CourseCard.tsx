
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Course } from '@/types';
import { Clock, BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // Function to get the difficulty color
  const getDifficultyColor = (level: 'basic' | 'intermediate' | 'advanced') => {
    switch (level) {
      case 'basic':
        return 'bg-difficulty-basic';
      case 'intermediate':
        return 'bg-difficulty-intermediate';
      case 'advanced':
        return 'bg-difficulty-advanced';
      default:
        return 'bg-primary';
    }
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/courses/${course.id}`} className="block">
        <div className={`h-2 w-full ${getDifficultyColor(course.level)}`} />
        <CardHeader>
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="capitalize">
              {course.level}
            </Badge>
          </div>
          <CardTitle className="mt-2">{course.title}</CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>{course.modules} modules, {course.lessons} lessons</span>
            </div>
          </div>
          {course.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default CourseCard;
