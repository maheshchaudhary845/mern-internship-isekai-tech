import Recipe from "./recipe"
import './Recipes.css'

export default function Recipes(){
    fetch("https://dummyjson.com/recipes",{
        method: "GET",
    }).then((res)=> res.json())
    .then(data=> console.log(data))
    // const res = await req.json();
    // console.log(res)
    // const recipes = res.recipes;
    // console.log(recipes);
    
    return(
        <section className="recipes">
            <Recipe title="Pizza" img="null" type="Italian" />
        </section>
    )
}