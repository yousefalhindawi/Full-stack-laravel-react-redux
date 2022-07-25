import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useState } from "react";
import { updateProduct } from "./productsSlice";
import { useParams } from "react-router-dom";

export function EditProduct() {
  // const { pathname } = useLocation();
  const {id} = useParams();
  // console.log(id)
  // const userId = parseInt(pathname.replace("/edit-user/", ""));

  const product = useSelector((state) =>
  // console.log(state.products.products)
    state.products.products.find((product) => product.id === +id)
  );
  // console.log(product)

  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);

//   const handleName = (e) => setName(e.target.value);
//   const handleEmail = (e) => setEmail(e.target.value);

  // const usersAmount = useSelector((state) => state.users.products.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData =  {
      id: +id,
      title: title,
      price: price,
      description: description,
      image: 'https://i.pravatar.cc',
      category: category
      }
      dispatch(
        updateProduct(productData)
      );

    //   setError(null);
      history.push("/productList");
   

      setTitle("");
      setPrice(0);
      setDescription('');
      setCategory('');
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add product</h1>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit} className="three columns">
          <label htmlFor="title">Title</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="title"
            id="title"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="price">Price</label>
          <input
            className="u-full-width"
            type="number"
            placeholder=""
            id="price"
            min="0.0"
            step='0.01'
            onChange={(e)=>setPrice(e.target.value)}
            value={price}
          />
          <label htmlFor="description">Description</label>
          <input
            className="u-full-width"
            type="text"
            placeholder=""
            id="description"
            onChange={(e)=>setDescription(e.target.value)}
            value={description}
          />
          <label htmlFor="category">Category</label>
          <input
            className="u-full-width"
            type="text"
            placeholder=""
            id="category"
            onChange={(e)=>setCategory(e.target.value)}
            value={category}
          />
          {/* {error && error} */}
          <button className="button-primary">
            update product
          </button>
        </form>
      </div>
    </div>
  );
}
