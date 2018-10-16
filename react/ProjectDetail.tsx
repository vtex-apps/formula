import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Link } from 'render'
import { Button, Spinner } from 'vtex.styleguide'

import ProjectDetailQuery from './queries/project.graphql'

import ProjectForm from './components/ProjectForm'

interface ProjectsData {
  data: any
  params: any
}

class ProjectDetail extends Component<{} & ProjectsData> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    const { data, params: { edition } } = this.props

    if (data && data.loading) {
      return <Spinner />
    }

    return (
      <div className="w-100 h-100 bg-light-silver overflow-hidden overflow-y-scroll">
        <Link page="formula/projects/list" params={{edition}}>
          <Button>
            <FormattedMessage id="formula.back" />
          </Button>
        </Link>
        <ProjectForm {...data.project} />
      </div>
    )
  }
}

export default graphql<ProjectsData>(ProjectDetailQuery, {
  options: ({params: {edition, id}}) => ({
    ssr: false,
    variables: {
      edition,
      id
    }
  })
})(ProjectDetail)
