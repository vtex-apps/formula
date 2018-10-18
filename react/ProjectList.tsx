import React, { Component } from 'react'
import { Query } from 'react-apollo'

import ProjectsQuery from './queries/projects.graphql'

import Loading from './components/Loading'
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
          const hasTeam = !loading && data.projects && !!data.projects.find((p: Project) => p.team && p.team.find(({email}) => email === data.profile.email))
          return (
            <div>
              <Navigation edition={edition} />
              {loading ? <Loading /> : data.projects.map((p: Project) => <ProjectCard key={p.id} {...p} email={data.profile.email} edition={edition} hasTeam={hasTeam} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}
