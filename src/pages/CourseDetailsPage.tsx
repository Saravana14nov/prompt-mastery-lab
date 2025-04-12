
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { courses } from '@/data/courses';
import { modules } from '@/data/modules';
import ModuleCard from '@/components/courses/ModuleCard';
import { cn } from '@/lib/utils';

const CourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  
  // Find the course
  const course = courses.find(c => c.id === courseId);
  
  // Get modules for this course
  const courseModules = modules
    .filter(m => m.courseId === courseId)
    .sort((a, b) => a.order - b.order);
  
  // Handle case where course isn't found
  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Course not found</h2>
        <p className="mt-2 text-muted-foreground">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="mt-4">
          <Link to="/courses">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  // Function to get the difficulty color
  const getDifficultyColor = (level: 'basic' | 'intermediate' | 'advanced') => {
    switch (level) {
      case 'basic':
        return 'bg-difficulty-basic text-white';
      case 'intermediate':
        return 'bg-difficulty-intermediate text-white';
      case 'advanced':
        return 'bg-difficulty-advanced text-white';
      default:
        return 'bg-primary text-white';
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to="/courses">
            <ArrowLeft size={16} className="mr-2" />
            Back to Courses
          </Link>
        </Button>
      </div>

      {/* Course header */}
      <div>
        <Badge className={cn("mb-4", getDifficultyColor(course.level))}>
          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
        <p className="mt-2 text-muted-foreground">{course.description}</p>
        
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={16} />
            <span>{course.modules} modules, {course.lessons} lessons</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Course Progress</span>
          <span>{course.progress}%</span>
        </div>
        <Progress value={course.progress} className="h-2" />
      </div>
      
      <Separator />

      {/* Modules list */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Course Content</h2>
        <div className="grid gap-6">
          {courseModules.map(module => (
            <ModuleCard key={module.id} module={{...module, progress: 0}} courseId={course.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
