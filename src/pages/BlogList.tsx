/** @format */

import { fetchBlogs } from '../api/blogApi';
import BlogCard from '../components/BlogCard';
import BlogListSkeleton from '../components/skeletons/BlogListSkeleton';
import { Blog } from '../types/Blog';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

	useEffect(() => {
		const getBlogs = async () => {
			try {
				const data = await fetchBlogs();
				setBlogs(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		getBlogs();
	}, []);

	const handleSort = () => {
		setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
		// sort blogs state
		setBlogs((prevBlogs) =>
			[...prevBlogs].sort((a, b) =>
				sortOrder === 'asc'
					? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					: new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			)
		);
	};

	return (
		<div className='bg-gray-900 text-gray-200 min-h-screen'>
			<div className='container mx-auto p-6'>
				{/* Header */}
				<div className='flex justify-between items-center mb-8'>
					<h1 className='text-3xl text-[#ffd700] font-bold border-b-2 border-gray-700 pb-2'>
						Latest Blogs
					</h1>
					<Link
						className='bg-[#ffd700] hover:bg-[#bea201] text-black font-semibold px-6 py-2 rounded shadow trasition duration-300'
						to={'/create'}>
						Create Blog
					</Link>
				</div>

				{/* Sort Button */}
				<div className='flex justify-between items-center mb-6'>
					<p className='text-gray-600'>
						Sort by Date: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
					</p>
					<button
						onClick={handleSort}
						className='bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium px-6 py-2 rounded transition duration-300'>
						Sort
					</button>
				</div>

        {/* Skeleton Loader */}
        {loading && <BlogListSkeleton/>}


				{/* Blog Cards */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{blogs.map((blog) => (
						<Link
							key={blog.id}
							to={`/blog/${blog.id}`}>
							<BlogCard blog={blog} />
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default BlogList;
