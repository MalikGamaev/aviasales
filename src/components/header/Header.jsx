import React from 'react'

import mainLogo from '../../assets/main-logo.png'

import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={mainLogo} alt="Лого" />
    </header>
  )
}

export default Header
