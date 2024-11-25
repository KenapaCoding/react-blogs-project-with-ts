/** @format */

import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Blog } from '../types/Blog';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema } from '../utils/validation';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createBlog, fetchBlog, updateBlog } from '../api/blogApi';
import { toast } from 'react-toastify';

type Props = {
	mode: 'create' | 'edit';
};

const BlogCreateEdit = ({ mode }: Props) => {
	const { id } = useParams();
  const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<Blog>({ resolver: zodResolver(blogSchema) });

	// todo untuk edit
	useEffect(() => {
    const getBlog = async() => {
      if(id && mode === 'edit'){
        try {
          const data = await fetchBlog(id)
          setValue('title', data.title)
          setValue('description', data.description)
          setValue('image', data.image)
          setValue('createdAt', data.createdAt)
        } catch (error:any) {
          toast.error(error.message)
          navigate('/')
        }
      }
    }
    getBlog()
  }, [id, mode]);

	const onSubmit = async (data: Blog) => {
    try {
      if(mode === 'create'){
        const newBlog = {
          ...data,
          id: uuidv4(),
          createdAt: new Date().toISOString()
        }
        await createBlog(newBlog)
        toast.success('Blog created successfully!')
      } else if (mode === 'edit' && id){
        await updateBlog(id,data)
        toast.success('Blog updated successfully!')
      }
      navigate('/')
    } catch (error) {
        toast.error('Failed to submit Form')
    }

    

  };

	return (
		<div className='container mx-auto p-6 font-sans bg-gray-900 min-h-screen text-gray-200'>
			<h1 className='text-3xl font-bold text-gray-100 mb-6 border-b-2 border-gray-700 pb-2'>
				{mode === 'create' ? 'Create Blog' : 'Edit Blog'}
			</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-2'>
						Title
					</label>
					<input
						type='text'
						{...register('title')}
						className='w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-300 focus:outline-none focus:ring focus:ring-amber-500'
					/>
					{errors.title && (
						<p className='text-red-500 text-sm'>{errors.title.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-2'>
						Description
					</label>
					<input
						type='text'
						{...register('description')}
						className='w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-300 focus:outline-none focus:ring focus:ring-amber-500'
					/>
					{errors.description && (
						<p className='text-red-500 text-sm'>{errors.description.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-2'>
						Image URL
					</label>
					<input
						type='text'
						{...register('image')}
						className='w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-gray-300 focus:outline-none focus:ring focus:ring-amber-500'
					/>
					{errors.image && (
						<p className='text-red-500 text-sm'>{errors.image.message}</p>
					)}
				</div>
				<button
					className='bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-6 py-2 rounded shadow transition duration -200'
					type='submit'>
					{mode === 'create' ? 'Create' : 'Save Changes'}
				</button>
			</form>
		</div>
	);
};

export default BlogCreateEdit;
