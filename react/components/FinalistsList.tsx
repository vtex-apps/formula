import React, { Component } from 'react'
import { Query } from 'react-apollo'

import ProjectsQuery from '../queries/projects.graphql'

import BlockedFinalists from './BlockedFinalists'
import Loading from './Loading'
import ProjectCard from './ProjectCard'

interface ProjectsListData {
  edition: string
  state: States
}

export default class FinalistsList extends Component<ProjectsListData> {
  public count: number = 0

  public getWinnerIcon() {
    this.count++
    if (this.count === 3) { return '🥉 ' }
    if (this.count === 2) { return '🥈 ' }
    if (this.count === 1) { return '🥇 ' }

    return ''
  }

  public render () {
    const { edition, state } = this.props

    if (state !== 'RESULTS') {
      return <BlockedFinalists />
    }

    return (
      <Query query={ProjectsQuery} variables={{ edition }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />
          }

          const hasTeam = data.projects && !!data.projects.find((p: Project) => p.team && p.team.find(({ email }) => email === data.profile.email))
          return data.projects.slice(0,3).map((p: Project) =>
            <ProjectCard nameIcon={this.getWinnerIcon()} key={p.id} {...p} email={data.profile.email} edition={edition} hasTeam={hasTeam} />
          )
        }}
      </Query>
    )
  }
}
