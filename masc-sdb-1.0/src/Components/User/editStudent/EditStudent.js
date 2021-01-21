import React from 'react';
import EditForm from './EditForm'
import Nav from '../Navigation/StudentNav'
import classes from './EditStudent.module.css'
const EditStudent = () => {
    return (
        <div className={classes.EditStudent}>
            <Nav />
            <EditForm/>
        </div>
    );
};

export default EditStudent;