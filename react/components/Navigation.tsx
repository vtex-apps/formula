import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, withRuntimeContext } from 'render'
import { Button, Tab, Tabs } from 'vtex.styleguide'

interface NavigationProps {
  edition: string
}

class Navigation extends Component<NavigationProps & RuntimeProps> {
  public render() {
    const { edition, runtime } = this.props

    return (
      <div className="relative mw7 center mt7">
        <Tabs>
          <Tab label="Projects" active={runtime.page === 'formula/projects/list'} onClick={() => runtime.navigate({page: 'formula/projects/list', params: {edition}})} />
          <Tab label="Finalists" active={runtime.page === 'formula/projects/finalists'} onClick={() => runtime.navigate({page: 'formula/projects/list', params: {edition}})}/>
        </Tabs>

        <Link page="formula/projects/detail" params={{edition, id: 'new'}} className="absolute" style={{right: '0em', bottom: '1em'}}>
          <Button size="small" className="pb4">
            <FormattedMessage id="formula.newProject" />
          </Button>
        </Link>
      </div>
    )
  }
}

export default withRuntimeContext(Navigation)
