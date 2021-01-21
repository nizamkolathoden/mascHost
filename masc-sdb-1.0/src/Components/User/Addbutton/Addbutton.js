import React from 'react'
import { FaPlus } from "react-icons/fa";
import classes from './Addbutton.module.css';
import {useHistory} from 'react-router-dom'

const Addbutton = () => {
    const history = useHistory()
    return(
<div className={classes.Addbutton} onClick={()=>{
    history.push('/addstudent')
}}>
    <FaPlus size="20px" color="#fafafa" />
</div>
    )
}

export default Addbutton

