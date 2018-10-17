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
      <h3><FormattedMessage id="formula.title"/></h3>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <VtexIcon fill="white" logo/>
            <div className="pr3">
              {title}
            </div>
            {hello}
          </div>
          <div>
            {logout}
          </div>
        </div>
      </header>
    )
  }
}