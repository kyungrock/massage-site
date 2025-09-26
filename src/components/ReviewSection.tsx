'use client';

import { useState } from 'react';
import { Star, User, Calendar } from 'lucide-react';

interface ReviewSectionProps {
  shopId: string;
}

// Mock reviews data
const mockReviews = [
  {
    _id: '1',
    shopId: '1',
    userId: '1',
    userName: '김민수',
    rating: 5,
    comment: '정말 편안하고 좋았습니다. 마사지사분이 전문적이시고 시설도 깔끔했어요. 다음에도 꼭 이용하고 싶습니다.',
    images: [],
    createdAt: new Date('2024-01-15'),
  },
  {
    _id: '2',
    shopId: '1',
    userId: '2',
    userName: '이영희',
    rating: 4,
    comment: '아로마 마사지가 정말 좋았어요. 향도 좋고 분위기도 편안했습니다. 가격이 조금 비싸긴 하지만 만족스러웠습니다.',
    images: [],
    createdAt: new Date('2024-01-10'),
  },
  {
    _id: '3',
    shopId: '1',
    userId: '3',
    userName: '박철수',
    rating: 5,
    comment: '스파 패키지를 이용했는데 정말 휴식이 되었습니다. 직원분들도 친절하시고 시설도 최고예요.',
    images: [],
    createdAt: new Date('2024-01-08'),
  },
];

export default function ReviewSection({ shopId }: ReviewSectionProps) {
  const [reviews] = useState(mockReviews);
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">리뷰</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="text-sm text-gray-600">
            {averageRating.toFixed(1)} ({reviews.length}개 리뷰)
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-900">{review.userName}</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {review.createdAt.toLocaleDateString('ko-KR')}
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                
                {review.images && review.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`리뷰 이미지 ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn-secondary"
          >
            {showAll ? '리뷰 접기' : `리뷰 ${reviews.length - 3}개 더 보기`}
          </button>
        </div>
      )}

      {reviews.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            아직 리뷰가 없습니다
          </h4>
          <p className="text-gray-600">
            첫 번째 리뷰를 작성해보세요!
          </p>
        </div>
      )}
    </div>
  );
}




