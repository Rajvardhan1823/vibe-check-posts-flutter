
import { useQuery } from '@tanstack/react-query';
import { Post, User } from '@/types/Post';

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://dummyjson.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await response.json();
  return data.posts;
};

const fetchUser = async (userId: number): Promise<User> => {
  const response = await fetch(`https://dummyjson.com/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
};

export const useUser = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });
};
