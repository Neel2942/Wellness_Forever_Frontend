import React from 'react'
import { Link} from 'react-router-dom';
import styles from './AuthLoginComponent.module.css'

function AuthLoginComponent(props) {
  return (
    <div className={styles.mainContainer}>
    <p>Please log in to access the {props.user} dashboard.</p>
    <Link to="/" className={styles.button}>Login</Link>
  </div>
  )
}

export default AuthLoginComponent