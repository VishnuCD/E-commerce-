import { useState } from 'react';

function Login(){
  const [state,setState] = useState("Login");
  const [formData,setFormData]= useState({
    username:"",
    password:"",
    email:""
    
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () =>{
    console.log("Login",formData)
    let responseData;
    
    await fetch('http://localhost:9000/login',{
      method:"POST",
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/");
    }
    else{
      alert(responseData.error)
    }
  }

  const signup = async () =>{
    console.log("signup",formData)
    let responseData;
    var password  = formData.password;
    var email = formData.email;
    var username = formData.username;
    if(username ==""){
      document.getElementById("error").innerHTML=null;
    }else if (email == "") {
      document.getElementById("error").innerHTML=null;
    }else if(password ==""){
      document.getElementById("error").innerHTML=null;
    }
    else{
    await fetch('http://localhost:9000/signup',{
      method:"POST",
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/");
    }
    else{
      alert(responseData.error)
    }
  }
  }

    return(<>
  {/* Page Header Start */}
  <div className="container-fluid bg-secondary mb-5">
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: 300 }}
    >
      <h1 className="font-weight-semi-bold text-uppercase mb-3">Our Shop</h1>
      <div className="d-inline-flex">
        <p className="m-0">
          <a href="/" className="text-decoration-none">Home</a>
        </p>
        <p className="m-0 px-2">-</p>
        <p className="m-0">{state}</p>
      </div>
    </div>
  </div>
  {/* Page Header End */}
  {/* Login Start */}
  <div className="container-fluid pt-5">
    <div className="text-center mb-4">
      <h2 className="section-title px-5">
        <span className="px-2">{state}</span>
      </h2>
    </div>
    <div className="row px-xl-5">
        <div className='col-lg-3'>
        </div>
      <div className="col-lg-7 mb-5 px-2 ">
        <form>
        <div className="form">
          <div id="success" />
            <div className="control-group">
            <p id='error' />
              {state === "Sign Up" ?
            <input
            value={formData.username} onChange={changeHandler}
            type="text"
            className="form-control"
            name="username"
            placeholder="Your Name"
            required
            data-validation-required-message="Please enter your name"
          />:<></>  
            }
              
            </div>
            <div  className="control-group">
              <input
              value={formData.email} onChange={changeHandler}
                type="email"
                className="form-control"
                name="email"
                placeholder="Your Email"
                required
                data-validation-required-message="Please enter your email"
              />
              
            </div>
            <div className="control-group">
              <input
              value={formData.password} onChange={changeHandler}
                type="password"
                className="form-control"
                name="password"
                placeholder="password"
                required
               
              />
               
            </div>
            <div>
              <button
                className="btn btn-primary w-100 py-3 float-right"
                onClick={()=>{state==="Login"?login():signup()}}
              >
                Contniue
              </button>
            </div>
            
            <div className="mt-5">
            {state === "Sign Up" ?                   
                    <span onClick={()=>{setState("Login")}} className='text-decoration-none ' style={{ color: "#393f81" }}>
                    Already have an account? Login here
                    </span>:
                    <span onClick={()=>{setState("Sign Up")}} className='text-decoration-none' style={{ color: "#393f81" }}>
                    Create an account? Click here
                    </span>
                  }
                  </div>
        </div>
      </form>
      </div>
      
    </div>
    
  </div>
  {/* Login End */}

    </>)
}
export default Login;