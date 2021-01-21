import React from 'react'
import AuthSection from './AuthSection'
import AuthForm from './AuthForm'
import Footer from '../Footer/Footer'
import classes from './Auth.module.css'


const Auth = () => {
return(
<div className={classes.Auth}>
    <AuthSection />
    <AuthForm />
    <Footer />
</div>
)
}

export default Auth


