// components/TableSkeleton.tsx

export function TableSkeleton() {
  return (
    <div className="glass-card animate-pulse overflow-hidden">
      <div className="w-full">
        {/* Table Header Skeleton */}
        <div className="flex border-b border-border/50">
          <div className="px-4 py-4 flex-1">
            <div className="h-4 bg-zinc-700 rounded w-1/4"></div>
          </div>
          <div className="px-4 py-4 flex-1">
            <div className="h-4 bg-zinc-700 rounded w-1/4"></div>
          </div>
          <div className="px-4 py-4 flex-1 text-center">
            <div className="h-4 bg-zinc-700 rounded w-1/4 mx-auto"></div>
          </div>
          <div className="px-4 py-4 flex-1 text-center">
            <div className="h-4 bg-zinc-700 rounded w-1/4 mx-auto"></div>
          </div>
        </div>
        
        {/* Table Body Skeleton (3 rows) */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`flex ${i < 2 ? 'border-b border-border/30' : ''}`}>
            <div className="px-4 py-6 flex-1">
              <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
            </div>
            <div className="px-4 py-6 flex-1">
              <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
            </div>
            <div className="px-4 py-6 flex-1 flex justify-center">
              <div className="h-6 bg-zinc-800 rounded-full w-11"></div>
            </div>
            <div className="px-4 py-6 flex-1 flex justify-center">
              <div className="h-8 bg-zinc-800 rounded-lg w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}