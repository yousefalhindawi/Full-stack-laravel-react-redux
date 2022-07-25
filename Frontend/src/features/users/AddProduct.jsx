import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { addProduct } from "./productsSlice";

export function AddProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const state = useSelector((state) => state);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0.0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();
  const [category, setCategory] = useState('');

//   const handleName = (e) => setName(e.target.value);
//   const handleEmail = (e) => setEmail(e.target.value);

  // const usersAmount = useSelector((state) => state.users.products.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append('title', title)
    productData.append('price', price)
    productData.append('description', description)
    productData.append('image', image)
    productData.append('category', category)
    // const productData =  {
    //   title: title,
    //   price: price,
    //   description: description,
    //   image: 'https://i.pravatar.cc',
    //   category: category
    //   }
      dispatch(
        addProduct(productData)
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
           <label className="form-label" >Image</label>
                <input 
                    type="file" 
                    className="form-control" 
                    name="image" 
                    onChange={(e)=>setImage( e.target.files[0])}
                    multiple
                />
          {/* {error && error} */}
          <button className="button-primary">
            Add product
          </button>
        </form>
      </div>
    </div>
  );
}
