import React, { Component, Fragment } from 'react'
import { withRuntimeContext } from 'render'

import FinalistsList from './components/FinalistsList'
import Navigation from './components/Navigation'
import ProjectsList from './components/ProjectsList'

interface ProjectsData {
  params: any
}

class FormulaEdition extends Component<RuntimeProps & ProjectsData> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    const { params: { edition }, runtime } = this.props

    return (
      <Fragment>
        <Navigation edition={edition} setPage={(page) => runtime.navigate({page, params: {edition}})} currentPage={runtime.page} />
        {runtime.page === 'formula/projects/list' ? <FinalistsList state={'Registration'} edition={edition} /> : <ProjectsList state={'Registration'} edition={edition} />}
      </Fragment>
    )
  }
}

export default withRuntimeContext(FormulaEdition)
