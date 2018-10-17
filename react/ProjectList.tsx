import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'

import ProjectsQuery from './queries/projects.graphql'

import Navigation from './components/Navigation'
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
            <div>
              <Navigation edition={edition} />
              {data.projects.map((p: Project) => <ProjectCard key={p.id} {...p} email={data.profile.email} edition={edition} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}
