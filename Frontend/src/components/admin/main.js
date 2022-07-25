import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { deleteItem } from "../../features/itemSlice";


const Main = ()=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const allItems = useSelector((state)=>state.item.items);
    const showItems = allItems.map(item=>{
    return(
    <tr key={item.id}>
        <th className="p-3 text-center align-middle">{item.id}</th>
        <td className="p-3 text-center align-middle"><img src={ "http://localhost:8000/uploads/" + item.image } width="120px" /></td>
        <td className="p-3 text-center align-middle">{item.name}</td>
        <td className="p-3 text-center align-middle">{item.description}</td>
        <td className="p-3 text-center align-middle">
            <Link to={`/update/${item.id}`}  className="btn btn-primary mx-2">Update</Link>
            <Link onClick={()=>{
                dispatch(deleteItem(item.id))
                history.push("/main")
                // navigate('/main' , {replace:true})
            }
            } to='/main' className="btn btn-danger mx-2">Delete</Link>
        </td>
    </tr>
    )

    })
    return(
<div className='container m-5'>
    <NavLink to='/add' className="btn btn-secondary my-3">Add</NavLink>
    <table className="table">
        <thead>
            <tr>
                <th className="p-3 text-center">#</th>
                <th className="p-3 text-center">Photo</th>
                <th className="p-3 text-center">Name</th>
                <th className="p-3 text-center">Description</th>
                <th className="p-3 text-center">Action</th>
            </tr>
        </thead>
        <tbody>
        {showItems}

        </tbody>
    </table>
</div>
    )
}

export default Main;