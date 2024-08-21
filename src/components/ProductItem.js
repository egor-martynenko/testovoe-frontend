const ProductItem = ({description, image, price, rating, title}) => {

  return(
  <li className="flex flex-col mt-5 p-2">
    <span className="h-20 text-xl font-bold">{title}</span>

    <img className="pt-10 h-80 mx-auto" src={image} alt={title}/>
    <span className="pt-5">{
    description.length < 120 ? `${description}` : `${ description.slice(0, 120)}  ...` 
    }</span>

    <div className="mt-auto pt-3 flex justify-between text-xl">
       <span>Rated {rating.count}</span>
       <span>Rating {rating.rate}</span>  
    </div>
  
    <span className="text-xl font-bold pt-5">$ {price}</span>
    
  </li>
  )
}
export default ProductItem