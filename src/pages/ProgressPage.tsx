
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { BarChart3, BookOpen, CheckCircle, Clock, Trophy } from 'lucide-react';
import { courses } from '@/data/courses';

const ProgressPage: React.FC = () => {
  // Mock progress data
  const overallProgress = 15;
  const totalLessonsCompleted = 5;
  const totalChallengesCompleted = 2;
  const timeSpent = "4h 30m";

  // Recent activity data
  const recentActivity = [
    {
      type: "lesson",
      title: "What is Prompt Engineering?",
      course: "Basic Prompt Engineering",
      timestamp: "2 days ago",
      status: "completed"
    },
    {
      type: "lesson",
      title: "The Anatomy of an Effective Prompt",
      course: "Basic Prompt Engineering",
      timestamp: "2 days ago",
      status: "completed"
    },
    {
      type: "challenge",
      title: "Data Extraction Challenge",
      course: null,
      timestamp: "1 day ago",
      status: "completed"
    },
    {
      type: "lesson",
      title: "Chain-of-Thought Prompting",
      course: "Intermediate Prompt Techniques",
      timestamp: "10 hours ago",
      status: "in-progress"
    }
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
        <p className="text-muted-foreground mt-2">
          Track your learning journey and see how far you've come
        </p>
      </div>

      {/* Progress overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen size={20} />
              <CardTitle className="text-base">Overall Progress</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Course Completion</span>
                <span>{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                You're making steady progress!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle size={20} />
              <CardTitle className="text-base">Lessons Completed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{totalLessonsCompleted}</p>
              <p className="text-sm text-muted-foreground">of 45 lessons</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
              <Trophy size={20} />
              <CardTitle className="text-base">Challenges Completed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{totalChallengesCompleted}</p>
              <p className="text-sm text-muted-foreground">of 12 challenges</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
              <Clock size={20} />
              <CardTitle className="text-base">Time Spent</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold">{timeSpent}</p>
              <p className="text-sm text-muted-foreground">learning</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course progress */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Course Progress</h2>
        <div className="grid gap-6">
          {courses.map(course => (
            <Card key={course.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/courses/${course.id}`}>Continue</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Recent Activity</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity Timeline</CardTitle>
            <CardDescription>Your learning activities over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className={`rounded-full p-1 ${
                      activity.type === 'lesson' ? 'bg-primary/20' : 'bg-warning/20'
                    }`}>
                      {activity.type === 'lesson' ? (
                        <BookOpen size={16} className="text-primary" />
                      ) : (
                        <Trophy size={16} className="text-warning" />
                      )}
                    </div>
                    {index < recentActivity.length - 1 && (
                      <div className="h-full w-px bg-border mt-1" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {activity.course && (
                        <>
                          <span>{activity.course}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>{activity.timestamp}</span>
                      <span>•</span>
                      <span className="capitalize">{activity.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;
