import React, { Component } from 'react'
import { Helmet } from 'render'

import VtexIcon from './icons/VtexIcon'

import './global.css'

export default class FormulaTemplate extends Component {
  render() {
    return (
      <div className="container bg-light-silver">
        <Helmet>
          <title>VTEX Formula</title>
        </Helmet>
        {this.props.children}
        <footer>
          VTEX Formula - all rights reserved © <VtexIcon />
        </footer>
      </div>
    )
  }
}
