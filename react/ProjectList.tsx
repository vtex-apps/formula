import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Link } from 'render'
import { Button, Spinner } from 'vtex.styleguide'

import ProjectsQuery from './queries/projects.graphql'

import ProjectCard from './components/ProjectCard'

interface ProjectsData {
  data: any
  params: any
}

export default class ProjectList extends Component<{} & ProjectsData> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    const { params: { edition } } = this.props

    return (
      <Query query={ProjectsQuery} variables={{edition}}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Spinner />
          }

          return (
            <div className="w-100 h-100 bg-light-silver overflow-hidden overflow-y-scroll">
            <Link page="formula/projects/detail" params={{edition, id: 'new'}}>
              <Button>
                <FormattedMessage id="formula.newProject" />
              </Button>
            </Link>
            {data.projects.map((p: Project) => <ProjectCard key={p.id} {...p} edition={edition} />)}
          </div>
          )
        }}
      </Query>
    )
  }
}
