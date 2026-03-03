import Post from "@/components/Post";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

function Search(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    const query = searchParams.get('query');


    useEffect(()=>{
        async function fetchPostsBySearchQuery(){
            try{
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts?search=${query}`);
                const {data, success, message} = await res.json();
                if(!success){
                   return setError(message);
                }
                setPosts(data);
            }catch(err){
                console.error(err)
            }
        }
        fetchPostsBySearchQuery();
    }, [query])
    if(error){
        return <p className="text-center text-gray-400">{error}</p>
    }
    return(
        <>
            <div className="posts">
                {posts?.map(post=>(
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </>
    )
}

export default Search;