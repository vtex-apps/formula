import React, { Component } from 'react'
import { Helmet } from 'render'
import { FormattedMessage } from 'react-intl'

import VtexIcon from './icons/VtexIcon'

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
          VTEX Formula - all rights reserved © <VtexIcon />
        </footer>
      </div>
    )
  }
}
