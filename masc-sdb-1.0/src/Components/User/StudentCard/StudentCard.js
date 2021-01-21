import React, {useEffect} from 'react'
import classes from './StudentCard.module.css'
import { useHistory } from 'react-router-dom'
import "sal.js/dist/sal.css";
import sal from "sal.js";

const StudentCard = (props) => {
    useEffect(
        sal, []
    );

    const history = useHistory()
    return (

        <div onClick={() => {
            history.push(`/editstudent/${props.id}`)
        }} className={classes.StudentCardContainer} 
                data-sal-duration="1200"
                data-sal="slide-up"
                data-sal-delay="300"
                data-sal-easing="ease-out-back"
        >
            <div className={classes.StudentPhoto}>
                <div className={classes.Photo}>
                    <img src={props.pic} alt="Loading ...." />
                </div>
            </div>
            <div className={classes.StudentDetails}>
                <p className={classes.name}><span>Name : </span>{props.name || 'Loading'}</p>
                <p className={classes.course}><span>course : </span>{props.programme || 'Loading'}</p>
                <p className={classes.batch}><span>batch : </span>{props.batch || 'Loading'}</p>
                <p className={classes.admno}><span>Admnno :not found</span></p>
            </div>
        </div>

    )
}

export default StudentCard
