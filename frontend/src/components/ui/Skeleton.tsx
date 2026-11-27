export function SkeletonCard() {
  return (
    <div className="border border-hairline bg-surface p-4">
      <div className="aspect-video w-full animate-pulse bg-paper-tonal" />
      <div className="mt-4 space-y-3 p-1">
        <div className="flex justify-between">
          <div className="h-4 w-16 animate-pulse bg-paper-tonal" />
          <div className="h-4 w-24 animate-pulse bg-paper-tonal" />
        </div>
        <div className="h-5 w-3/4 animate-pulse bg-paper-tonal" />
        <div className="h-4 w-full animate-pulse bg-paper-tonal" />
        <div className="h-4 w-2/3 animate-pulse bg-paper-tonal" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="grid grid-cols-1 gap-4 border-b border-hairline py-6 md:grid-cols-12 md:items-center">
      <div className="space-y-2 md:col-span-3">
        <div className="h-4 w-24 animate-pulse bg-paper-tonal" />
        <div className="h-3 w-20 animate-pulse bg-paper-tonal" />
      </div>
      <div className="space-y-2 md:col-span-6">
        <div className="h-4 w-32 animate-pulse bg-paper-tonal" />
        <div className="h-5 w-2/3 animate-pulse bg-paper-tonal" />
        <div className="h-4 w-full animate-pulse bg-paper-tonal" />
      </div>
      <div className="flex justify-end md:col-span-3">
        <div className="h-8 w-20 animate-pulse bg-paper-tonal" />
      </div>
    </div>
  );
}

export function SkeletonMemberCard() {
  return (
    <div className="space-y-3 border border-hairline bg-surface p-5">
      <div className="flex justify-between">
        <div className="h-4 w-20 animate-pulse bg-paper-tonal" />
        <div className="h-4 w-14 animate-pulse bg-paper-tonal" />
      </div>
      <div className="h-5 w-1/2 animate-pulse bg-paper-tonal" />
      <div className="h-3 w-1/3 animate-pulse bg-paper-tonal" />
      <div className="h-12 w-full animate-pulse bg-paper-tonal" />
    </div>
  );
}
