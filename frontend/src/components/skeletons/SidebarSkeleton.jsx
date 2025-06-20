import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Users } from 'lucide-react'; // Make sure this is installed or replace it

const SidebarSkeleton = () => {
  const sidebarRef = useRef(null);
  const skeletonContacts = Array(8).fill(null);

  useEffect(() => {
    const contactElements = sidebarRef.current?.querySelectorAll('.skeleton-contact');
    if (contactElements) {
      gsap.fromTo(
        contactElements,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className="h-full w-20 lg:w-80 border-r border-gray-700/50 backdrop-blur-xl
      bg-gradient-to-b from-gray-900/50 to-gray-800/30 
      flex flex-col transition-all duration-300 ease-out shadow-2xl"
    >
      {/* Header with glassmorphism */}
      <div className="border-b border-gray-700/50 w-full p-6 bg-gray-800/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20 backdrop-blur-sm border border-blue-400/30">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <span className="font-semibold hidden lg:block text-gray-100 text-lg">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-4 custom-scrollbar">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="skeleton-contact w-full p-4 flex items-center gap-4 hover:bg-gray-700/30 transition-all duration-200 cursor-pointer rounded-xl mx-2 mb-2"
          >
            {/* Avatar skeleton with glow effect */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-14 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse shadow-lg" />
              <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse" />
            </div>

            {/* User info skeleton */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-5 w-36 mb-3 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded-full" />
              <div className="skeleton h-4 w-20 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
