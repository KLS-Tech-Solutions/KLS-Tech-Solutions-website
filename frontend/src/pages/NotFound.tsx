import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="section-padding min-h-[70vh] flex items-center">
        <div className="container-narrow mx-auto text-center">
          <div className="mb-8">
            <span className="text-8xl font-bold text-gradient">404</span>
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="body-large max-w-md mx-auto mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
