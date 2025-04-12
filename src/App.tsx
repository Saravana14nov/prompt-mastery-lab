
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import ModuleDetailsPage from "./pages/ModuleDetailsPage";
import LessonPage from "./pages/LessonPage";
import PracticePage from "./pages/PracticePage";
import ChallengesPage from "./pages/ChallengesPage";
import ReferencePage from "./pages/ReferencePage";
import ProgressPage from "./pages/ProgressPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          } />
          <Route path="/courses" element={
            <AppLayout>
              <CoursesPage />
            </AppLayout>
          } />
          <Route path="/courses/:courseId" element={
            <AppLayout>
              <CourseDetailsPage />
            </AppLayout>
          } />
          <Route path="/courses/:courseId/modules/:moduleId" element={
            <AppLayout>
              <ModuleDetailsPage />
            </AppLayout>
          } />
          <Route path="/courses/:courseId/modules/:moduleId/lessons/:lessonId" element={
            <AppLayout>
              <LessonPage />
            </AppLayout>
          } />
          <Route path="/practice" element={
            <AppLayout>
              <PracticePage />
            </AppLayout>
          } />
          <Route path="/challenges" element={
            <AppLayout>
              <ChallengesPage />
            </AppLayout>
          } />
          <Route path="/reference" element={
            <AppLayout>
              <ReferencePage />
            </AppLayout>
          } />
          <Route path="/progress" element={
            <AppLayout>
              <ProgressPage />
            </AppLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
