

function Card({title,img,desc}){

    return(
         <div className="card">
                <div className="img-cont">
                    <img src={img} alt="camping image" />
                </div>
                <h3 className="title">{title}</h3>
                <p>{desc}</p>
            </div>

    )
}

export default Card;