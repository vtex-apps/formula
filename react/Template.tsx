import React, { Component } from 'react'
import { Helmet } from 'render'
import { FormattedMessage } from 'react-intl'

import './global.css'

export default class FormulaTemplate extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>VTEX Formula</title>
        </Helmet>
        <header>
          <h1><FormattedMessage id="formula.title"/></h1>
        </header>
        <main>
          {this.props.children}
        </main>
        <footer>
          VTEX Formula - all rights reserved ©
        </footer>
      </div>
    )
  }
}
