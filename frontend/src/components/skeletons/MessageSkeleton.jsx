import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MessageSkeleton = () => {
  const containerRef = useRef(null);
  const skeletonMessages = Array(6).fill(null);

  useEffect(() => {
    const skeletonElements = containerRef.current?.querySelectorAll('.skeleton-message');
    if (skeletonElements) {
      gsap.fromTo(
        skeletonElements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-black/5">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`skeleton-message chat ${idx % 2 === 0 ? 'chat-start' : 'chat-end'}`}>
          <div className="chat-image avatar">
            <div className="size-12 rounded-full">
              <div className="skeleton w-full h-full rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse" />
            </div>
          </div>

          <div className="chat-header mb-2">
            <div className="skeleton h-4 w-20 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded-full" />
          </div>

          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-20 w-[280px] bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded-2xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
