import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'

import LogoutIcon from '../icons/LogoutIcon'
import VtexIcon from '../icons/VtexIcon'

interface HeaderProps {
  name?: string
  onLogout?: () => void
}

export default class Header extends Component<HeaderProps> {
  public render() {
    const { name, onLogout } = this.props

    const title = (
      <h1><FormattedMessage id="formula.title"/></h1>
    )

    const hello = name && (
      <div>
        <FormattedMessage id="formula.hello"/> {name}
      </div>
    )

    const logout = onLogout && (
      <Button variation="secondary" onClick={onLogout}>
        <LogoutIcon /><FormattedMessage id="formula.logout"/>
      </Button>
    )

    return (
      <header className="bg-serious-black pa7 white">
        <VtexIcon fill="white" logo/>
        {title}
        {hello}
        {logout}
      </header>
    )
  }
}
