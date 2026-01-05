import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [pages, setPages] = useState([]);
  const [pageLength, setPageLength] = useState("");

  function handleSearch(e) {
    setSearch(e.target.value);
  }
  // useEffect(()=>{
  //   setIsLoading(true);
  //   async function fetchWithLimit(){
  //     try{
  //       // const skip = page==1 ? 0 : page.toString()+0;
  //       const res = await fetch("https://dummyjson.com/products?limit=30&skip="+skip);
  //       // console.log("https://dummyjson.com/products?limit=10&skip="+skip)
  //       const data= await res.json();
  //       setProducts(data.products);
  //     } catch(err){
  //       console.error(err);
  //     } finally{
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchWithLimit();
  // },[page]);

  useEffect(() => {
    setIsLoading(true);
    try {
      fetch(`https://dummyjson.com/products/search?limit=30&skip=${skip}&q=${search}`, {
        method: "GET",
      }).then((res) => res.json())
        .then(data => {
          setProducts(data.products);
          setPageLength(Math.ceil(data.total / 30));
        });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [search, page])

  useEffect(() => {
    const arr = []
    for(let i=1; i<=pageLength; i++){
      arr.push(i);
    }
    setPages(arr);
  }, [pageLength])

  // useEffect(() => {
  //   // async function fetchData(){
  //   setIsLoading(true)
  //   try {
  //     const res = fetch("https://dummyjson.com/products", {
  //       method: "GET",
  //     }).then((res) => res.json())
  //       .then(data => setProducts(data.products));
  //     // const data =  res.json();
  //     // setProducts(data);
  //     // setProducts(await res.json()); // working
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  //   // }
  //   // fetchData();
  // }, [])


  return (
    <>
      {isLoading ? <p>Loading...</p> :
        <div>
          <div className='searchbar'>
            <input placeholder='Search' type="text" onChange={handleSearch} value={search} />
          </div>
          <div className="cards">
            {isLoading ? <p>Loading...</p> : products?.map(product => (
              <div className="card" key={product.id}>
                <div className="img-cont">
                  <img src={product.thumbnail} alt="" />
                </div>
                <p>{product.id}</p>
                <h3>{product.title}</h3>
                <p className="description">{product.description}</p>
                <p className='price'>$ {product.price}</p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button onClick={() => {
              if (page > 1) {
                setPage(page - 1);
                setSkip(skip - 30);
              }
            }}>Prev</button>
            <p className='pages'> {pages.map((p)=>{return(
              <button className={p === page ? "activated-page": ""} key={p} onClick={()=>{
                setPage(p);
                setSkip((p*30)-30);
              }}>{p}</button>
            )})}</p>
            <button onClick={() => {
              if (page < pageLength) {
                setPage(page + 1);
                setSkip(skip + 30);
              }
            }}>Next</button>
          </div>
        </div>
      }
    </>
  )
}

export default App
