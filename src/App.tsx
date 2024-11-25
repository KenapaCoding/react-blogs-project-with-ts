/** @format */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogCreateEdit from './pages/BlogCreateEdit';
import BlogDetail from './pages/BlogDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <BlogList />,
	},
	{
		path: '/create',
		element: <BlogCreateEdit mode='create' />,
	},
	{
		path: '/blog/:id',
		element: <BlogDetail />,
	},
	{
		path: '/blog/:id/edit',
		element: <BlogCreateEdit mode='edit' />,
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</>
	);
}

export default App;
