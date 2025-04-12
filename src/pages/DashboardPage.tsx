
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CourseCard from '@/components/courses/CourseCard';
import { ArrowRight, BookOpen, Trophy, MessageSquare, BarChart2 } from 'lucide-react';
import { courses } from '@/data/courses';

const DashboardPage: React.FC = () => {
  // Mock progress data
  const overallProgress = 15;
  
  // Show a welcome message and last course accessed
  const lastCourse = courses[0]; // In a real app, this would be from user's history
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="space-x-2">
          <Button variant="outline" asChild>
            <Link to="/reference">Reference Library</Link>
          </Button>
          <Button asChild>
            <Link to="/practice">Practice Lab</Link>
          </Button>
        </div>
      </div>

      {/* Welcome Card */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Prompt Mastery</CardTitle>
          <CardDescription>
            Your AI learning companion for mastering prompt engineering
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Course Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" />
                  <span>3 Courses</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">
                  Basic, intermediate, and advanced levels
                </p>
                <Button variant="link" size="sm" asChild className="p-0 mt-2">
                  <Link to="/courses" className="flex items-center">
                    View all courses
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Trophy size={18} className="text-primary" />
                  <span>12 Challenges</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">
                  Test your skills with practical challenges
                </p>
                <Button variant="link" size="sm" asChild className="p-0 mt-2">
                  <Link to="/challenges" className="flex items-center">
                    View challenges
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare size={18} className="text-primary" />
                  <span>Practice Lab</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">
                  Practice prompt engineering with our AI assistant
                </p>
                <Button variant="link" size="sm" asChild className="p-0 mt-2">
                  <Link to="/practice" className="flex items-center">
                    Open lab
                    <ArrowRight size={14} className="ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Continue Learning */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold tracking-tight">Continue Learning</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/courses">View all courses</Link>
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{lastCourse.title}</CardTitle>
            <CardDescription>{lastCourse.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{lastCourse.progress}%</span>
              </div>
              <Progress value={lastCourse.progress} className="h-2" />
            </div>
            <Button className="mt-4" asChild>
              <Link to={`/courses/${lastCourse.id}`}>Continue</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Available Courses */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
