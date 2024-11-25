/** @format */

import React from 'react';
import { Blog } from '../types/Blog';

type Props = {
	blog: Blog;
};

const BlogCard = ({ blog }: Props) => {
	return (
		<div className='bg-gray-800 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer group'>
			<img
				src={blog.image}
				alt={blog.title}
				className='w-full h-48 object-cover rounded-t-lg mb-4'
			/>
			<div>
				<h2 className='text-xl font-semibold group-hover:text-yellow-400 transition duration-300 '>
					{blog.title}
				</h2>
				<p className='text-sm text-gray-400 mt-1'>{new Date(blog.createdAt).toLocaleDateString()}</p>
                <p className="mt-2 text-gray-300 line-clamp-3">
                    {blog.description}
                </p>
			</div>
		</div>
	);
};

export default BlogCard;
