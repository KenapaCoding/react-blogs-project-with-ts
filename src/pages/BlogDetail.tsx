/** @format */

import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Blog } from '../types/Blog';
import { deleteBlog, fetchBlog } from '../api/blogApi';
import { toast } from 'react-toastify';
import BlogDetailSkeleton from '../components/skeletons/BlogDetailSkeleton';
import Modal from '../components/Modal';

const BlogDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [blog, setBlog] = useState<Blog | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		const getBlog = async () => {
			try {
				if (id) {
					const data = await fetchBlog(id);
					setBlog(data);
				}
			} catch (error: any) {
				toast.error(error.message);
				navigate('/');
			}
		};
		getBlog();
	}, [id]);

  const handleDelete = async() => {
    if(id) {
      try {
        await deleteBlog(id)
        toast.success('Successfully deleted the blog')
        navigate('/')
      } catch (error:any) {
        setIsModalOpen(false)
        toast.error(error.message)
      }
    }
  }

	return (
		<div className='container mx-auto p-6 font-sans min-h-screen bg-gray-900 text-gray-200'>
			{/* Header Navigation */}
			<div className='flex items-center justify-between mb-8'>
				<button
					onClick={() => navigate('/')}
					className='bg-[#ffd900] hover:bg-[#bea201] text-gray-100 font-medium px-4 py-2 rounded shadow transition duration-300'>
					Back to Blog List
				</button>
				<h1 className='text-xl font-bold border-b-2 border-gray-700 pb-2'>
					Blog Detail
				</h1>
			</div>

			{/* Blog Content */}
			{!blog && <BlogDetailSkeleton />}
			{blog && (
				<>
					<div className='bg-gray-800 text-gray-300 rounded shadow-md p-6'>
						<img
							src={blog.image}
							alt={blog.title}
							className='w-full h-64 object-cover rounded mb-4'
						/>
						<h1 className='text-3xl font-bold text-gray-100 mb-4'>
							{blog.title}
						</h1>
						<p className='text-sm text-gray-400 mb-4'>
							{new Date(blog.createdAt).toLocaleDateString()}
						</p>
						<p className='text-gray-300 leading-relaxed'>{blog.description}</p>
					</div>
					<div className='flex gap-4 mt-6'>
						<button onClick={() => navigate(`/blog/${id}/edit`)} className='bg-green-700 hover:bg-green-600 text-gray-100 font-medium px-4 py-2 rounded shadow transition duration-300'>
							Edit
						</button>
						<button
							onClick={() => setIsModalOpen(true)}
							className='bg-red-700 hover:bg-red-600 text-gray-100 font-medium px-4 py-2 rounded shadow transition duration-300'>
							Delete
						</button>
					</div>
				</>
			)}

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title='Confirm Delete'
        description='Are you sure you want to delete this blog? This action cannot be undone'
			/>
		</div>
	);
};

export default BlogDetail;
