
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, CheckCircle, Trophy } from 'lucide-react';
import { courses } from '@/data/courses';
import { modules } from '@/data/modules';
import { lessons } from '@/data/lessons';

const LessonPage: React.FC = () => {
  const { courseId, moduleId, lessonId } = useParams<{ 
    courseId: string; 
    moduleId: string; 
    lessonId: string 
  }>();
  
  // Find the course, module and lesson
  const course = courses.find(c => c.id === courseId);
  const module = modules.find(m => m.id === moduleId && m.courseId === courseId);
  const lesson = lessons.find(l => l.id === lessonId && l.moduleId === moduleId);
  
  // Get next and previous lesson
  const moduleLessons = lessons
    .filter(l => l.moduleId === moduleId)
    .sort((a, b) => a.order - b.order);
  
  const currentIndex = moduleLessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? moduleLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < moduleLessons.length - 1 ? moduleLessons[currentIndex + 1] : null;
  
  // Handle case where lesson isn't found
  if (!course || !module || !lesson) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Lesson not found</h2>
        <p className="mt-2 text-muted-foreground">
          The lesson you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="mt-4">
          <Link to={`/courses/${courseId}/modules/${moduleId}`}>Back to Module</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumbs / Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/courses/${courseId}/modules/${moduleId}`}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Module
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">
          Lesson {currentIndex + 1} of {moduleLessons.length}
        </div>
      </div>

      {/* Lesson header */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          {course.title} • {module.title}
        </p>
        <h1 className="text-3xl font-bold tracking-tight mt-1">{lesson.title}</h1>
        <p className="mt-2 text-muted-foreground">{lesson.description}</p>
      </div>

      {/* Lesson content */}
      <Card className="p-8 mb-8 shadow-md">
        <div className="prose max-w-none markdown-content">
          <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </div>
      </Card>

      {/* Lesson navigation */}
      <div className="flex items-center justify-between mt-8">
        {prevLesson ? (
          <Button variant="outline" asChild>
            <Link to={`/courses/${courseId}/modules/${moduleId}/lessons/${prevLesson.id}`} className="flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Previous Lesson
            </Link>
          </Button>
        ) : (
          <div /> /* Empty div to maintain the space */
        )}
        
        {nextLesson ? (
          <Button asChild>
            <Link to={`/courses/${courseId}/modules/${moduleId}/lessons/${nextLesson.id}`} className="flex items-center">
              Next Lesson
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to={`/courses/${courseId}/modules/${moduleId}`} className="flex items-center">
              Complete Module
              <CheckCircle size={16} className="ml-2" />
            </Link>
          </Button>
        )}
      </div>

      <Separator className="my-8" />

      {/* Challenge teaser */}
      <Card className="p-6 border-dashed bg-muted/50">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Ready to apply what you've learned?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try out a practice challenge related to this lesson
            </p>
          </div>
          <Button className="ml-auto" asChild>
            <Link to="/challenges">View Challenges</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LessonPage;
