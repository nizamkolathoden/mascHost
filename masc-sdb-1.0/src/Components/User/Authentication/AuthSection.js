import React, {useEffect} from 'react'
import classes from './Auth.module.css'
import Majlislogo from '../../../Asset/Logo-removebg-preview.png'
import iedc from '../../../Asset/iedc logo.png'
import csdpt from '../../../Asset/logo cs.png'
import "sal.js/dist/sal.css";
import sal from "sal.js";

const AuthSection = () => {

    useEffect(
        sal, []
    );

    return(
        <div className={classes.AuthSection}>
            <div className={classes.container}>
                <div className={classes.Logos}>
                <img className={classes.csdpt} src={csdpt} alt="" 
                data-sal-duration="1200"
                data-sal="slide-right"
                data-sal-delay="300"
                data-sal-easing="ease-out-back"
                />
                <img className={classes.masclogo} src={Majlislogo} alt="" 
                data-sal-duration="1300"
                data-sal="slide-down"
                data-sal-delay="300"
                data-sal-easing="ease-out-back"
                />
                <img className={classes.iedc} src={iedc} alt="" 
                data-sal-duration="1400"
                data-sal="slide-left"
                data-sal-delay="300"
                data-sal-easing="ease-out-back"
                />
                </div>
            
            <h1 className={classes.mainHead} 
            data-sal-duration="1200"
            data-sal="slide-up"
            data-sal-delay="300"
            data-sal-easing="ease-out-back"
            >MASC Student DataBase</h1>
            <p className={classes.paragraph}
            data-sal-duration="1200"
            data-sal="slide-up"
            data-sal-delay="300"
            data-sal-easing="ease-out-back"
            >Student Database stores Students's information securely
            </p>
            </div>
           
        </div>
    )
}


export default AuthSection

