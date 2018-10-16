import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, withRuntimeContext } from 'render'

interface RuntimeProps {
  runtime: any
}

class IntroPage extends Component<RuntimeProps> {
  componentDidMount() {
    const { runtime: { prefetchPage } } = this.props
    prefetchPage('formula/projects')
    prefetchPage('formula/projects/list')
    prefetchPage('formula/projects/detail')
  }

  render() {
    return (
      <div>
        O que é o Formula?
        <Link page="formula/projects/list" params={{edition: "2018.10"}}>
          <FormattedMessage id="formula.signup"/>
        </Link>
      </div>
    )
  }
}

export default withRuntimeContext(IntroPage)
