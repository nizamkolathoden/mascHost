import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import classes from './Nav.module.css'
import {useHistory} from 'react-router-dom'
const StudentNav = () => {
  const history = useHistory()
  return (
    <div className={classes.StudentNav}>
      <button onClick={()=>history.push("/")}>
        <FaChevronLeft size="20px" color="#2d4059" />
      </button>
      <p>MASC Students DB</p>
    </div>
  );
};

export default StudentNav;
