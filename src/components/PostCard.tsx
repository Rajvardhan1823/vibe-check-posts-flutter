
import React, { useState } from 'react';
import { Post } from '@/types/Post';
import { useUser } from '@/hooks/usePosts';
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { data: user } = useUser(post.userId);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.reactions.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <Card className="mb-6 overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* User Header */}
      <div className="p-4 flex items-center space-x-3">
        <Avatar className="h-10 w-10 ring-2 ring-gradient-to-r from-pink-500 to-purple-500">
          <AvatarImage src={user?.image} alt={user?.username} />
          <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-sm text-gray-500">@{user?.username}</p>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
          •••
        </Button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <h2 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {post.title}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          {post.body}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs font-medium rounded-full hover:scale-105 transition-transform cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`hover:scale-110 transition-all duration-200 ${
                liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`h-5 w-5 mr-1 ${liked ? 'fill-current' : ''}`} />
              {likeCount}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-blue-500 hover:scale-110 transition-all duration-200"
            >
              <MessageCircle className="h-5 w-5 mr-1" />
              {Math.floor(Math.random() * 20) + 5}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-green-500 hover:scale-110 transition-all duration-200"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={`hover:scale-110 transition-all duration-200 ${
              saved ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'
            }`}
          >
            <Bookmark className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
