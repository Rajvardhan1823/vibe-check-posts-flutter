
import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingCard = () => {
  return (
    <Card className="mb-6 overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        
        <div className="flex space-x-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-8" />
          </div>
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </Card>
  );
};

export default LoadingCard;
