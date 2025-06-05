
import React from 'react';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/PostCard';
import LoadingCard from '@/components/LoadingCard';
import Header from '@/components/Header';
import { AlertCircle, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { data: posts, isLoading, error, refetch } = usePosts();

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">We couldn't load the posts. Check your connection and try again.</p>
            <Button 
              onClick={() => refetch()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-full transition-all hover:scale-105"
            >
              <Wifi className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Welcome Message */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Vibes</span>
          </h2>
          <p className="text-gray-600">Discover amazing content from the community ✨</p>
        </div>

        {/* Posts Feed */}
        <div className="space-y-1">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 5 }).map((_, index) => (
              <LoadingCard key={index} />
            ))
          ) : (
            // Actual posts
            posts?.map((post, index) => (
              <div
                key={post.id}
                className="animate-fadeIn"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>

        {/* Load More Button */}
        {posts && posts.length > 0 && (
          <div className="text-center py-8">
            <Button
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:scale-105 transition-all duration-200 font-semibold"
            >
              Load More Posts
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
