const BlogListSkeleton = () => {
  return <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
    {Array.from({length:6}).map((_, index) => (
        <div className="bg-white shadow rounded p-4 animate-pulse flex flex-col gap-3" key={index}>
            <div className="w-full h-48 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
        </div>
    ))}
  </div>;
};

export default BlogListSkeleton;
