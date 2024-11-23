import { supabase } from './supabase';
import toast from 'react-hot-toast';

export const initDB = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('count');
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

export const createPost = async (postData: {
  id: string;
  userId: string;
  content: string;
  mediaUrls?: string[];
  tags?: string[];
}) => {
  try {
    const { error } = await supabase
      .from('posts')
      .insert([{
        id: postData.id,
        user_id: postData.userId,
        content: postData.content,
        media_urls: postData.mediaUrls,
        tags: postData.tags,
        type: 'photo'
      }]);

    if (error) throw error;
    toast.success('Post created successfully');
  } catch (error) {
    console.error('Error creating post:', error);
    toast.error('Failed to create post');
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id (
          role,
          full_name,
          username,
          avatar_url
        ),
        post_interactions (
          type,
          user_id
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return posts.map((post: any) => ({
      id: post.id,
      content: post.content,
      media: post.media_urls ? post.media_urls.map((url: string) => ({
        type: url.match(/\.(jpg|jpeg|png|gif)$/i) ? 'image' : 'video',
        url
      })) : [],
      tags: post.tags || [],
      createdAt: post.created_at,
      author: {
        name: post.profiles.full_name,
        username: post.profiles.username,
        avatar: post.profiles.avatar_url,
        isVerified: post.profiles.role === 'competitor'
      },
      stats: {
        likes: post.post_interactions.filter((i: any) => i.type === 'like').length,
        comments: post.post_interactions.filter((i: any) => i.type === 'comment').length,
        shares: post.post_interactions.filter((i: any) => i.type === 'share').length
      }
    }));
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
};