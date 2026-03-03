import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function CategoryPosts(){
    const {slug} = useParams();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(()=>{
        async function fetchPostsByCategory(){
            try{
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts?category=${slug}`);
                const {data, success, message} = await res.json();
                if(!success){
                   return setError(message);
                }
                setPosts(data);
            }catch(err){
                console.error(err)
            }
        }
        fetchPostsByCategory();
    }, [slug])
    if(error){
        return <p className="text-center text-gray-400">{error}</p>
    }
    return(
        <>
            <div className="posts">
                {posts?.map(post=>(
                    <Post post={post} />
                ))}
            </div>
        </>
    )
}

export default CategoryPosts;