
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { courses } from '@/data/courses';
import { modules } from '@/data/modules';
import { lessons } from '@/data/lessons';

const ModuleDetailsPage: React.FC = () => {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  
  // Find the course and module
  const course = courses.find(c => c.id === courseId);
  const module = modules.find(m => m.id === moduleId && m.courseId === courseId);
  
  // Get lessons for this module
  const moduleLessons = lessons
    .filter(l => l.moduleId === moduleId)
    .sort((a, b) => a.order - b.order);
  
  // Handle case where course or module isn't found
  if (!course || !module) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Module not found</h2>
        <p className="mt-2 text-muted-foreground">
          The module you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="mt-4">
          <Link to="/courses">Browse Courses</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to={`/courses/${courseId}`}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Course
          </Link>
        </Button>
      </div>

      {/* Module header */}
      <div>
        <p className="text-sm text-muted-foreground">
          {course.title} • Module {module.order} of {course.modules}
        </p>
        <h1 className="text-3xl font-bold tracking-tight mt-2">{module.title}</h1>
        <p className="mt-3 text-gray-600">{module.description}</p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Module Progress</span>
          <span>{module.progress || 0}%</span>
        </div>
        <Progress value={module.progress || 0} className="h-2" />
      </div>

      {/* Lessons list */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Lessons</h2>
        <div className="space-y-4">
          {moduleLessons.length > 0 ? (
            moduleLessons.map((lesson, index) => (
              <Card key={lesson.id} className="overflow-hidden transition-shadow hover:shadow-md">
                <Link to={`/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center">
                      <span className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      {lesson.title}
                      {lesson.completed && (
                        <CheckCircle size={16} className="text-green-500 ml-2" />
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center pt-0">
                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                    <ArrowRight size={16} className="text-primary" />
                  </CardContent>
                </Link>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No lessons available for this module yet. Check back soon!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailsPage;
