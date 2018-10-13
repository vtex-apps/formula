import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'render'

export default class IntroPage extends Component {
  render() {
    return (
      <div>
        O que é o Formula?
        <Link page="formula/projects">Entrar</Link>
      </div>
    )
  }
}
