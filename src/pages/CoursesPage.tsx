
import React from 'react';
import CourseCard from '@/components/courses/CourseCard';
import { courses } from '@/data/courses';

const CoursesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground mt-2">
          Learn prompt engineering through structured courses at your own pace
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
