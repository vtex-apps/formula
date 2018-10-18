import React, { Component } from 'react'
import { Query } from 'react-apollo'

import ProjectsQuery from '../queries/projects.graphql'

import Loading from './Loading'
import ProjectCard from './ProjectCard'

interface ProjectsListData {
  edition: string
  state: States
}

export default class FinalistsList extends Component<ProjectsListData> {
  public render () {
    const { edition } = this.props
    return (
      <Query query={ProjectsQuery} variables={{ edition }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />
          }

          const hasTeam = data.projects && !!data.projects.find((p: Project) => p.team && p.team.find(({ email }) => email === data.profile.email))
          return data.projects.map((p: Project) =>
            <ProjectCard key={p.id} {...p} email={data.profile.email} edition={edition} hasTeam={hasTeam} />
          )
        }}
      </Query>
    )
  }
}
