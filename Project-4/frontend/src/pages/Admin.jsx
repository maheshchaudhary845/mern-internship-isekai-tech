import { useEffect, useState } from "react";
import { Link } from 'react-router';

function Admin() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productForm, setProductForm] = useState({ title: '', description: '', price: '', category: '', image: '' });
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [modalId, setModalId] = useState('');
    const [userForm, setUserForm] = useState({ name: '', email: '', role: '', password: ''});
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    async function handleProductDelete(id) {
        const userResponse = confirm("Do you really want to delete this product?");
        if (userResponse) {
            const res = await fetch(`http://localhost:3000/products/${id}`, {
                method: "DELETE"
            })
            const data = await res.json();
            const productRes = data.data;
            if(data.success){
                setProducts(prevProducts =>{
                    return prevProducts.filter(product=>{
                        return product.id != productRes.id
                    })
                })
            }
        }
    }

    async function handleUserDelete(id) {
        const userResponse = confirm("Do you really want to delete this product?");
        if (userResponse) {
            const res = await fetch(`http://localhost:3000/users/${id}`, {
                method: "DELETE"
            })
            const data = await res.json();
            const userRes = data.data;
            if(data.success){
                setUsers(prevUsers =>{
                    return prevUsers.filter(user=>{
                        return user.id != userRes.id
                    })
                })
            }
        }
    }

    function openProductModal(product) {
        setModalId(product.id);
        setIsProductModalOpen(true);
        setProductForm({
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image
        })
    }

    function openUserModal(user) {
        setModalId(user.id);
        setIsUserModalOpen(true);
        setUserForm({
            name: user.name,
            email: user.email,
            role: user.role,
            password: user.password
        })
    }

    async function updateProduct(e) {
        try {
            const res = await fetch(`http://localhost:3000/products/${modalId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productForm)
            });
            const data = await res.json();

            if (data.success) {
                setProducts(data.data);
            }
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setModalId('')
            setIsProductModalOpen(false);
            setProductForm({ title: '', description: '', price: '', category: '', image: '' })
        }
    }

    async function updateUser() {
        try {
            const res = await fetch(`http://localhost:3000/users/${modalId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userForm)
            });
            const data = await res.json();
            const {user} = data;

            if (data.success) {
                setUsers(prevUsers=>{
                    return prevUsers.map(u=>{
                        if(u.id == user.id){
                            return{
                                ...u,
                                ...user
                            }
                        }
                        return u;
                    })
                });
            }
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setModalId('')
            setIsUserModalOpen(false);
            setUserForm({ name: '', email: '', role: '', password: ''})
        }
    }

    function handleProductForm(e) {
        setProductForm({
            ...productForm,
            [e.target.name]: e.target.value
        })
    }

    function handleUserForm(e) {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchData() {
            try {
                setLoading(true);
                const [usersRes, productsRes] = await Promise.all([
                    fetch("http://localhost:3000/users/", { signal }),
                    fetch("http://localhost:3000/products/", { signal })
                ])

                const [usersData, productsData] = await Promise.all([
                    usersRes.json(),
                    productsRes.json()
                ])

                if (usersData.success) setUsers(usersData.users);
                if (productsData.success) setProducts(productsData.products);
            }
            catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();

        return () => {
            controller.abort();
        }
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }
    console.log(users)
    return (
        <>
            <h1>Admin Panel</h1>

            <div className="users-manage admin-table">
                <h2>Users Management</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            return <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.password}</td>
                                <td>
                                    <div className="actions">
                                        <Link to={''} onClick={()=>openUserModal(user)}>Edit</Link>
                                        <Link to={''} onClick={()=>handleUserDelete(user.id)}>Delete</Link>
                                    </div>
                                </td>

                            </tr>
                        })}
                    </tbody>

                </table>
            </div>

            <div className="products-manage admin-table">
                <h2>Products Management</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            return <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>
                                    <div className="img-cont">
                                        <img src={product.image} alt="product image" />
                                    </div>
                                </td>
                                <td>
                                    <div className="actions">
                                        <Link to={``} onClick={() => openProductModal(product)}>Edit</Link>
                                        <Link to={``} onClick={() => handleProductDelete(product.id)}>Delete</Link>
                                    </div>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            {isProductModalOpen &&
                <div className="modal-container">
                    <div className="modal">
                        <div className="modal-form">
                            <input className="modal-input" type="text" name="title" placeholder="Title" value={productForm.title} onChange={handleProductForm} />
                            <input className="modal-input" type="text" name="description" placeholder="Description" value={productForm.description} onChange={handleProductForm} />
                            <input className="modal-input" type="number" name="price" placeholder="Price" value={productForm.price} onChange={handleProductForm} />
                            <input className="modal-input" type="text" name="category" placeholder="Category" value={productForm.category} onChange={handleProductForm} />
                            <input className="modal-input" type="text" name="image" placeholder="Image URL" value={productForm.image} onChange={handleProductForm} />
                            <button className="btn-update" onClick={updateProduct} >Update</button>
                            <button className="btn-cancel" onClick={() => {
                                setModalId('')
                                setIsProductModalOpen(false);
                                setProductForm({ title: '', description: '', price: '', category: '', image: '' })
                            }}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
            {isUserModalOpen &&
                <div className="modal-container">
                    <div className="modal">
                        <div className="modal-form">
                            <input className="modal-input" type="text" name="name" placeholder="Full Name" value={userForm.name} onChange={handleUserForm} />
                            <input className="modal-input" type="text" name="email" placeholder="Email" value={userForm.email} onChange={handleUserForm} />
                            <input className="modal-input" type="text" name="role" placeholder="Role" value={userForm.role} onChange={handleUserForm} />
                            <input className="modal-input" type="password" name="password" placeholder="password" value={userForm.password} onChange={handleUserForm} />
                            <button className="btn-update" onClick={updateUser} >Update</button>
                            <button className="btn-cancel" onClick={() => {
                                setModalId('')
                                setIsUserModalOpen(false);
                                setUserForm({ name: '', email: '', role: '', password: '' })
                            }}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Admin;