import React, { useState } from 'react';
import { Image, Video, FileText, X, Upload, Camera } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface CreatePostProps {
  onPost: (post: {
    type: 'status' | 'media' | 'article';
    content: string;
    media?: File[];
    tags: string[];
  }) => void;
}

export default function CreatePost({ onPost }: CreatePostProps) {
  const { getThemeColor } = useTheme();
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [postType, setPostType] = useState<'status' | 'media' | 'article'>('status');
  const [tagInput, setTagInput] = useState('');

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setMediaFiles([...mediaFiles, ...Array.from(files)]);
      setPostType('media');
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
    if (mediaFiles.length === 1) {
      setPostType('status');
    }
  };

  const handleAddTag = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && tagInput.trim()) {
      event.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (content.trim() || mediaFiles.length > 0) {
      onPost({
        type: postType,
        content,
        media: mediaFiles,
        tags
      });
      setContent('');
      setMediaFiles([]);
      setTags([]);
      setPostType('status');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="space-y-4">
        <textarea
          placeholder="Share your fitness journey, tips, or achievements..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 resize-none rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />

        {/* Media Preview */}
        {mediaFiles.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mediaFiles.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeMedia(index)}
                  className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tags Input */}
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-800"
              >
                #{tag}
                <button onClick={() => removeTag(tag)}>
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add tags (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex gap-4">
            <label className="cursor-pointer text-gray-500 hover:text-purple-600">
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleMediaUpload}
              />
              <Camera className="w-6 h-6" />
            </label>
            <button 
              onClick={() => setPostType('article')}
              className={`text-gray-500 hover:text-purple-600 ${postType === 'article' ? 'text-purple-600' : ''}`}
            >
              <FileText className="w-6 h-6" />
            </button>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!content.trim() && mediaFiles.length === 0}
            className={`${getThemeColor('bg')} text-white px-6 py-2 rounded-lg flex items-center gap-2 ${getThemeColor('hover')} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Share Post
          </button>
        </div>
      </div>
    </div>
  );
}