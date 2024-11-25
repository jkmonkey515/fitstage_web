import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, MessageCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { usePosts } from '../contexts/PostContext';

export default function CommunityPreview() {
  const { posts } = usePosts();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Highlights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our thriving fitness community. Share your journey, learn from others, and stay motivated together.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="competition-carousel"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {post.media && post.media.length > 0 && (
                  <div className="aspect-video">
                    <img
                      src={post.media[0].url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                      <p className="text-sm text-gray-500">@{post.author.username}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 line-clamp-3 mb-4">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Heart className="w-5 h-5" />
                        {post.stats.likes}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <MessageCircle className="w-5 h-5" />
                        {post.stats.comments}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{post.timestamp}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-12">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700"
          >
            <span>Join the Community</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}