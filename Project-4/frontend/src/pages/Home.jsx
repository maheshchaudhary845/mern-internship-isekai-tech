import { useEffect, useState } from "react";

function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("http://localhost:3000/users", {
                method: "GET"
            })
            const data = await res.json();
            setUsers(data.users);
        }
        fetchProducts();
    }, [])
    console.log(users);
    return (
        <>
            <h1>Home Page</h1>
            <h2>Products</h2>
            <div>
                {users.map(user => {
                    return <p>{user.name}</p>;
                })}
            </div>

        </>
    )
}

export default Home;