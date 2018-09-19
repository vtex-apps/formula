import PropTypes from 'prop-types'
import React, {Component} from 'react'
import { Helmet } from 'render'
import { FormattedMessage } from 'react-intl'

import './global.css'

export default class Formula extends Component {
  render() {
    return (
      <main>
        <Helmet>
          <title>VTEX Formula</title>
        </Helmet>
        <h1><FormattedMessage id="formula.title"/></h1>
      </main>
    )
  }
}
