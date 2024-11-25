import { Blog } from "../types/Blog";

const BASE_URL = 'http://localhost:5000'

// helper check response
const checkResponse = async (response:Response) => {
    if(!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to fetch Resource')
       } 
       return response.json()
}

// fetch semua blog
export const fetchBlogs = async():Promise<Blog[]> => {
    try {
       const response = await fetch(`${BASE_URL}/blogs`)
       return checkResponse(response)
    } catch (error:any) {
        console.error(error)
        throw new Error(error.message || 'Failed to fetch Blogs')
    }
}

// buat blog baru
export const createBlog = async(blog:Blog):Promise<void> => {
    try {
        const response = await fetch(`${BASE_URL}/blogs`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(blog)
        })
        await checkResponse(response)
    } catch (error:any) {
        console.error(error)
        throw new Error(error.message || 'Failed to create Blog')
    }
}
// buat blog baru
export const updateBlog = async(id:string, blog:Blog):Promise<void> => {
    try {
        const response = await fetch(`${BASE_URL}/blogs/${id}`, {
            method : 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(blog)
        })
        await checkResponse(response)
    } catch (error:any) {
        console.error(error)
        throw new Error(error.message || 'Failed to update Blog')
    }
}

// fetch semua blog
export const fetchBlog = async(id:string):Promise<Blog> => {
    try {
       const response = await fetch(`${BASE_URL}/blogs/${id}`)
       return checkResponse(response)
    } catch (error:any) {
        console.error(error)
        throw new Error(error.message || 'Failed to fetch Blog')
    }
}

// delete blog berdasarkan id
export const deleteBlog = async(id:string):Promise<void> => {
    try {
        const response = await fetch(`${BASE_URL}/blogs/${id}`, {
            method: 'DELETE'
        })
        await checkResponse(response)
    } catch (error:any) {
        console.error(error)
        throw new Error(error.message || 'Failed to delete Resource')
    }
}