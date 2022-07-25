import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';




const Home = ()=>{

const products = useSelector((state)=>state.products.products);

const showItems = products.map((product)=>{
    return(
    <div className="card col-3 p-0 mx-5 my-3">
        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
            <img src={"http://localhost:8000/productImage/" + product.image} className="img-fluid"/>
            <NavLink to='/'>
            <div className="mask" style={{"background-color": "rgba(251, 251, 251, 0.15)"}}></div>
            </NavLink>
        </div>
        <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description}</p>
            <NavLink to='/productList' className="btn btn-primary">All Products</NavLink>
        </div>
    </div>
    )
});

    return(
    <div className="row container-fluid m-3">
        {showItems}
    </div>
    )
}

export default Home;