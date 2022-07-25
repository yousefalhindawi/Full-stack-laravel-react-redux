import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import axios from 'axios';

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_,thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
     const response = await fetch('http://127.0.0.1:8000/api/products');
  const products = await response.json();
  return products;
  }catch (error){
    console.error(error);
    return rejectWithValue(error.message);
  }
 

});


export const addProduct = createAsyncThunk("products/addProduct", async (productData,thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/products',productData);
//  const response = await fetch('http://127.0.0.1:8000/api/products', {
//     method: "POST",
//     body: JSON.stringify(productData),
//       headers: { "Content-Type": "application/json" },
//   });
  const products = await response.data;
  if(response.status === 200){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product Has been Added Successfully',
      showConfirmButton: false,
      timer: 1500
    })}
  return products;
     }catch(error){
      console.error(error);
      return rejectWithValue(error.message);
     }
 
});
export const updateProduct = createAsyncThunk("products/updateProduct", async (productData,thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
 const response = await fetch(`http://127.0.0.1:8000/api/products/${productData.id}`, {
    method: "PUT",
    body: JSON.stringify(productData),
      headers: { "Content-Type": "application/json" },
  });
  const product = await response.json();
  if(response.status === 200){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product Has been updated Successfully',
      showConfirmButton: false,
      timer: 1500
    })}
  return product;
     }catch(error){
      console.error(error);
      return rejectWithValue(error.message);
     }
 
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (productId,thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  // console.log(productId)
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`, {
    method: "DELETE",
      headers: { "Content-Type": "application/json" },
  });
  const product = await response.json();
  // console.log(response);
  if(response.status === 200){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product Has been deleted Successfully',
      showConfirmButton: false,
      timer: 1500
    })}
// console.log(product)
  return product;
  }catch(error) {
    console.error(error);
    return rejectWithValue(error.message);
  }
  
});




// export const updateProduct = createAsyncThunk("users/fetchProducts", async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = await response.json();
//   return users;
// });
// export const deleteProduct = createAsyncThunk("users/fetchProducts", async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = await response.json();
//   return users;
// });

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  extraReducers: {

    // Fetching the products
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
      state.error =null;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = [...action.payload];
      state.error = null;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Adding a product
    [addProduct.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log(action.payload);
      state.products= [action.payload, ...state.products]; 
      state.error = null;
    },
    [addProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // updating a product
    [updateProduct.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log(action);
      const { id } = action.payload;
          const existingUser = state.products.find((product) => product.id === id);
          // console.log(existingUser)
          // console.log(action.payload)
          if (existingUser) {
            existingUser.title = action.payload.title;
            existingUser.price = action.payload.price;
            existingUser.description = action.payload.description;
            existingUser.image = action.payload.image;
            existingUser.category = action.payload.category;
          }
      state.error = null;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete a product
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = state.products.filter((product)=> product.id !== action.payload.id);
      state.error = null;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

// export const { userAdded, userUpdated, userDeleted } = productsSlice.actions;

export default productsSlice.reducer;
