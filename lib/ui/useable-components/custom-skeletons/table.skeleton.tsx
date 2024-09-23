import { Skeleton } from 'primereact/skeleton';

const TableSkeleton = () => {
  return (
    <div className="w-full space-y-3 mt-8">
      <Skeleton width="19%" height="2.65rem" />
      <div className="bg-[#f4f4f500] flex flex-col gap-2">
        <Skeleton width="100%" height="2.47rem" />
        <div className="flex flex-col  divide-y divide-[#cccccc9c]">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <div className="flex gap-2 h-10 items-center justify-between">
              {[1, 2, 3, 4, 5].map(() => {
                return <Skeleton key={colIndex} width="18%" height="1rem" />;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
