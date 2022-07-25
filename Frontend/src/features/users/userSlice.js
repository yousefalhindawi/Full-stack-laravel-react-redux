import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";



const usersSlice = createSlice({
    name:'users',
    initialState:{
        email:"yousefalhindawe@gmail.com" ,
        password:"yousef123" ,
        isLogged:false},

    reducers:{
        login:(state , action)=>{
            console.log(action);
            if(state.email===action.payload.email  && state.password=== action.payload.password ){

                state.isLogged = true;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'logged in Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })

            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'somthing went wrong',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        },
        logout:(state)=>{
            state.isLogged = false;
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'logged out Successfully',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }
});
export const {login , logout} = usersSlice.actions;
export default usersSlice.reducer;