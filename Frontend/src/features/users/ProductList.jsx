import { fetchProducts, deleteProduct } from "./productsSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";


export function ProductList() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const  {loading}  = useSelector((state) => state.products);
  const  {error} = useSelector((state) => state.products);
  
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

 

  return (
    <div className="container">
      {error && <div className="alret alert-danger" role="alert">{error}</div>}
      <div className="row">
        <h1>Redux CRUD Products app</h1>
      </div>
      <div className="row">
        {/* <div className="two columns">
          <button
            onClick={() => dispatch(fetchProducts())}
            className="button-primary"
          >
            Load users
          </button>
        </div> */}
        <div className="two columns">
          <Link to="/add-product">
            <button className="button-primary">Add user</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          <span>Loading...</span> 
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                  <th>title</th>
                  <th>price</th>
                  <th>category</th>
                  <th>image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length &&
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td><img src={"http://localhost:8000/productImage/" + product.image} alt="" srcset="" width={100} /> </td>
                    <td>
                      <button onClick={() => handleDelete(product.id)}>Delete</button>
                      <Link to={`/edit-product/${product.id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
