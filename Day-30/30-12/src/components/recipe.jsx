export default function Recipe({title, img, type}){
    return(
        <div className="recipe">
            <div className="img-cont">
                <img src={img} alt="" />
            </div>
            <h3 className="title">{title}</h3>
            <p>{type}</p>
        </div>
    )
}