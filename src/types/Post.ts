
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  image: string;
}
