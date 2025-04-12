
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, MessageSquare, Trophy, BarChart, Library, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const AppSidebar: React.FC = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl text-primary">Prompt Mastery</span>
        </div>
        <div className="ml-auto md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )
                    }
                    end
                  >
                    <Home size={18} />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/courses"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )
                    }
                  >
                    <BookOpen size={18} />
                    <span>Courses</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/practice"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )
                    }
                  >
                    <MessageSquare size={18} />
                    <span>Practice Lab</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/challenges"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )
                    }
                  >
                    <Trophy size={18} />
                    <span>Challenges</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/reference"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )
                    }
                  >
                    <Library size={18} />
                    <span>Reference Library</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/progress"
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )
                    }
                  >
                    <BarChart size={18} />
                    <span>Progress</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full justify-start" asChild>
          <NavLink to="/settings" className="flex items-center gap-3">
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
