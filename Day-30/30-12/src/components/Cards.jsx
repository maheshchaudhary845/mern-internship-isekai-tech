import Card from "./card"
import "./Cards.css"

export default function Cards(){
    const data=[
        {
            id:1,
            title:'ashgds',
            img:'https://i.pinimg.com/736x/5f/34/ca/5f34ca9cf3247bee31d42c487b6546b9.jpg',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, reprehenderit!'
        },
         {
            id:2,
            title:'asdjhasjdhka',
            img:'https://i.pinimg.com/736x/5f/34/ca/5f34ca9cf3247bee31d42c487b6546b9.jpg',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, reprehenderit!'
        }
        ,
         {
            id:3,
            title:'asdjhasjdhka',
            img:'https://i.pinimg.com/736x/5f/34/ca/5f34ca9cf3247bee31d42c487b6546b9.jpg',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, reprehenderit!'
        }
        ,
         {
            id:4,
            title:'asdjhasjdhka',
            img:'https://i.pinimg.com/736x/5f/34/ca/5f34ca9cf3247bee31d42c487b6546b9.jpg',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, reprehenderit!'
        }
        ,
         {
            id:5,
            title:'asdjhasjdhka',
            img:'https://i.pinimg.com/736x/5f/34/ca/5f34ca9cf3247bee31d42c487b6546b9.jpg',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, reprehenderit!'
        }
        ,
         {
            id:6,
            title:'asdjhasjdhka',
            img:'https://i.pinimg.com/736x/5f/34/ca/5f34ca9cf3247bee31d42c487b6546b9.jpg',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, reprehenderit!'
        }
        ,
         {
            id:7,
            title:'asdjhasjdhka',
            img:'https://i.pinimg.com/736x/5f/34/ca/5f34ca9cf3247bee31d42c487b6546b9.jpg',
            desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, reprehenderit!'
        }
    ]
    return(
        <section className="cards">
           <Card 
           title='ahasgdhsaj' 
           img='https://i.pinimg.com/736x/5f/34/ca/5f34ca9cf3247bee31d42c487b6546b9.jpg' 
           desc='orem ipsum dolor sit amet consectetur adipisicing elit. Magni, reprehenderit!' />

            <Card 
           title='ahasgdhsaj' 
           img='https://i.pinimg.com/736x/5f/34/ca/5f34ca9cf3247bee31d42c487b6546b9.jpg' 
           desc='orem ipsum dolor sit amet consectetur adipisicing elit. Magni, reprehenderit!' />

           {
            data.map(d=>{
                return(
                     <Card 
                        key={d.id}
                        title={d.title} 
                        img={d.img} 
                        desc={d.desc} />
                );
            })
           }
        </section>
    )
}