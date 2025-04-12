
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">Oops! Page not found</p>
        <p className="max-w-md text-muted-foreground">
          The page you are looking for doesn't exist or might have been moved.
        </p>
        <Button asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
