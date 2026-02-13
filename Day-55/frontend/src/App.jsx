import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null)
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchProducts() {
      try{
        setLoading(true);
        
        const [res, allRes] = await Promise.all([
          fetch(`http://localhost:3000/products/?skip=${skip}&limit=${limit}`),
          fetch('http://localhost:3000/products')
        ]);
        
        const [resData, allResData] = await Promise.all([res.json(), allRes.json()]);
        
        if (resData.success && allResData.success) {
          setProducts(resData.products)
          setTotalPages(Math.ceil(allResData.products.length/limit));
        }
        setPage(Math.ceil((limit + skip)/limit));
      } catch(err){
        console.error(err.message);
      } finally{
        setLoading(false);
      }
    }
    fetchProducts();
  }, [skip, limit])

  useEffect(()=>{
    let pageArr = [];
    for(let i=1; i<=totalPages; i++){
      pageArr.push(i);
    }
    setPageNumbers(pageArr);
  }, [totalPages])

  console.log("current page: ", page);
  console.log("total pages: ", totalPages);

  if(loading) return <p>Loading...</p>

  return (
    <>
      <h1>Products</h1>
      <select name="limit" onChange={(e)=>setLimit(Number(e.target.value))}>
        <option>Products length</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>

      {products.map((product, index) => (
        <h2 key={product._id}>{index + skip + 1 + " " + product.title}</h2>
      ))}

      <button onClick={() => {
        let value = skip - limit;
        console.log(value)
        
        if(value <0){
          setSkip(0);
        }
        else if (page>1) {
          setSkip(value)
          // setPage(page-1);
        }
      }}>Previous</button>

      {pageNumbers.map(p=>(
        <button key={p} style={{
          backgroundColor: p==page ? "cyan" : "",
          color: p==page ? "black" : ""
        }} onClick={()=>{
          setSkip(limit * (p-1));
        }}>{p}</button>
      ))}


      <button onClick={() => {
        if (page < totalPages){
          setSkip(skip + limit)
        }
      }}>Next</button>
    </>
  )
}

export default App