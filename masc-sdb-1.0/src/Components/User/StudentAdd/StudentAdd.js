import React from "react";
import Nav from '../Navigation/StudentNav'
import Form from './StudentAddForm'
import classes from "../StudentAdd/StudentAdd.module.css";

const StudentAdd = () => {


  return (
    <div className={classes.StudentAdd}>
     <Nav />
     <Form />
    </div>
  );
};

export default StudentAdd;
