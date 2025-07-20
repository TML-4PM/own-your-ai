
import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

interface LazyRouteProps {
  children: React.ReactNode;
}

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const LazyRoute: React.FC<LazyRouteProps> = ({ children }) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
};

export default LazyRoute;
