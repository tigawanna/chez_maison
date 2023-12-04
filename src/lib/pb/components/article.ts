export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PostStatus = "DRAFT" | "SCHEDULED" | "PUBLISHED";
interface Post {
  content: string | null;
  created_at: string;
  devToArticleCoverImagePath: string | null;
  devToArticleId: string | null;
  devToBlogUrl: string | null;
  hashNodeArticleCoverImagePath: string | null;
  hashNodeArticleId: string | null;
  hashNodeBlogUrl: string | null;
  id: string;
  last_published_at: string | null;
  mediumArticleId: string | null;
  mediumBlogUrl: string | null;
  publishingDetails: Json | null;
  status: PostStatus;
  tags: Json | null;
  title: string;
  user_id: string;
}
