export default function BannerSkeleton() {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] bg-gray-200 animate-pulse overflow-hidden">
       {/* Shimmer Effect */}
       <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_2s_infinite]"></div>
       
       {/* Text Placeholders - Positioned to match your real Hero text */}
       <div className="absolute top-1/2 left-4 md:left-20 transform -translate-y-1/2 space-y-6 max-w-2xl w-full px-4 z-10">
          {/* Title Lines */}
          <div className="h-8 md:h-16 bg-gray-300 rounded-lg w-3/4"></div>
          <div className="h-8 md:h-16 bg-gray-300 rounded-lg w-1/2"></div>
          
          {/* Subtitle */}
          <div className="h-4 md:h-6 bg-gray-300 rounded w-2/3 mt-4"></div>
          <div className="h-4 md:h-6 bg-gray-300 rounded w-1/2"></div>
          
          {/* Button */}
          <div className="h-12 w-48 bg-gray-300 rounded-full mt-8"></div>
       </div>
    </div>
  );
}