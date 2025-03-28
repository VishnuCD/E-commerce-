import { useEffect, useState } from 'react';
import './Listproduct.css';
import cross_icon from '../../assets/cross_icon.png'
function Listproduct(){
    const [allproducts,setAllproducts]= useState([])

    const fetchInfo = async ()=>{
        await fetch("http://localhost:9000/allproducts").then((res)=>res.json())
        .then((data)=>{setAllproducts(data)})
    }
    useEffect(()=>{
        fetchInfo();
    },[])
    const remove_product = async(id)=>{
        await fetch("http://localhost:9000/removeproduct",{
            method:"POST",
            headers:{
                Accept:"application/json",
                'Content-type':"application/json"
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }
    return(<>
    <div className="list-product">
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
            <hr />
            {
                allproducts.map((product,index)=>{
                    return(<>
                    <div key={index} className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>{product.old_price}Rs</p>
                        <p>{product.new_price}Rs</p>
                        <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
                    </div>
                    </>)
                })
            }
        </div>
    </div>
    </>)
}
export default Listproduct;