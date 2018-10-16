import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Link } from 'render'
import { Button, Spinner } from 'vtex.styleguide'

import ProjectDetailQuery from './queries/project.graphql'

import ProjectForm from './components/ProjectForm'

interface ProjectsData {
  data: any
  params: any
}

interface ProjectState {
  project: Project
}

export default class ProjectDetail extends Component<{} & ProjectsData, ProjectState> {
  constructor(props: any) {
    super(props)

    this.state = {
      project: props.data && props.data.project || {}
    }
  }

  public render() {
    const { params: { edition, id } } = this.props


    return (
      <Query query={ProjectDetailQuery} skip={id === 'new'} variables={{edition, id}}>
        {({ loading, error, data = {} }) => {
          if (loading) {
            return <Spinner />
          }

          return (
            <div className="w-100 h-100 bg-light-silver overflow-hidden overflow-y-scroll">
              <Link page="formula/projects/list" params={{edition}}>
                <Button>
                  <FormattedMessage id="formula.back" />
                </Button>
              </Link>
              <ProjectForm initialProject={data.project} edition={edition} />
            </div>
          )
        }}
      </Query>
    )
  }
}
