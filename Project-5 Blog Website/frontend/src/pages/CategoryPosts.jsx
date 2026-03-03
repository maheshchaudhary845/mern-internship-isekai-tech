import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function CategoryPosts(){
    const {slug} = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        async function fetchPostsByCategory(){
            try{
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts?category=Programming`);
                const {data} = await res.json();

                setPosts(data);
            }catch(err){
                console.error(err)
            }
        }
        fetchPostsByCategory();
    }, [])
    console.log(posts)
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