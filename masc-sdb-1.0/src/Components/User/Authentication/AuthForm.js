import React, {useEffect,useState} from "react";
import "sal.js/dist/sal.css";
import sal from "sal.js";
import classes from "./Auth.module.css";
import { useHistory } from 'react-router-dom'

const AuthForm = () => {
  const history = useHistory()
  useEffect(
    sal, []
);

const login = ()=>{
  console.log('in login');
  fetch('/auth/login',{
    method:'Post',
    headers:{
      "Content-Type":'application/json'
    },
    //convert username and password
    body:JSON.stringify({
        userName,
        password
    })
  }).then(res=>res.json()).then(user=>{
    if(user.error){
      alert(user.error)
    }else{
      console.log(user);
      localStorage.setItem('mascStudetDb',JSON.stringify(user.token));
      history.push('/')
    }
    
  })
  setPassword('');
  setUsername('')
}

const [userName,setUsername] = useState('');
const [password,setPassword] = useState('');


  return (
    <div className={classes.AuthForm}>
      <div className={classes.Auth_Header}>
      <p className={classes.subHead}
      data-sal-duration="1200"
      data-sal="slide-left"
      data-sal-delay="300"
      data-sal-easing="ease-out-back"
      >MASC Students DataBase</p>
        <h3
        data-sal-duration="1200"
        data-sal="slide-left"
        data-sal-delay="300"
        data-sal-easing="ease-out-back"
        >Login</h3>
      </div>
      <div className={classes.Form}>
      <p className={classes.ErrorMsg}>Incorrect Username or Password*</p>
        <form action=""
          data-sal-duration="1200"
          data-sal="slide-up"
          data-sal-delay="300"
          data-sal-easing="ease-out-back"
        >
          <input className={`${classes.Username} ${classes.Input}`} type="text" required placeholder="username" 
          value={userName} onChange={e=>setUsername(e.target.value)}/> <br />
          <input className={`${classes.Password} ${classes.Input}`} type="password" required placeholder="password" 
          value={password} onChange={e=>setPassword(e.target.value)}
          /><br />
          <input className={`${classes.Submit} ${classes.Input}`} type="button" value="Submit" onClick={login}/>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
