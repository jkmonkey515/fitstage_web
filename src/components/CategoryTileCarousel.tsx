import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface CategoryTile {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  participants: number;
}

interface CategoryTileCarouselProps {
  categories: CategoryTile[];
  onCategoryClick: (categoryId: string) => void;
}

export default function CategoryTileCarousel({ categories, onCategoryClick }: CategoryTileCarouselProps) {
  return (
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
      {categories.map((category) => (
        <SwiperSlide key={category.id}>
          <button
            onClick={() => onCategoryClick(category.id)}
            className="group relative h-80 w-full overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow"
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-200 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {category.participants} participants
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    Vote Now
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}