import classes from './Nav.module.css'
import React from 'react'
import Option from './Option'
import Menu from './Menu'

const Nav = (props) => {
    return(
        <div className={classes.Nav}>
            <Menu data={props.data.setAddress}/>
            <Option />
        </div>
    )
}
export default Nav
