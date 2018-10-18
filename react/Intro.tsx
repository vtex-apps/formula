import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, withRuntimeContext } from 'render'
import { Button } from 'vtex.styleguide'

import Header from './components/Header'

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
        <Header />
        <div className="pa8 flex center justify-center">
          <Link page="formula/projects/list" params={{edition: "2018.10"}}>
            <Button variation="primary">
              <FormattedMessage id="formula.signup"/>
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default withRuntimeContext(IntroPage)
