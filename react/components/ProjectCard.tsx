import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Link } from 'render'
import { Button } from 'vtex.styleguide'

import JoinProjectMutation from '../queries/joinProject.graphql'
import LeaveProjectMutation from '../queries/leaveProject.graphql'
import ProjectsQuery from '../queries/projects.graphql'

interface ProjectCardProps {
  email: string
}

export default class ProjectCard extends Component<ProjectCardProps & Project> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    const { id, edition, name, description, owner, team, email } = this.props

    const refetchProjectsQuery = {
      query: ProjectsQuery,
      variables: {
        edition,
      }
    }

    const isOwner = owner === email

    const isInTeam = team && team.find((t) => t === email)

    const joinOrLeave = isInTeam ? (
      <Mutation mutation={LeaveProjectMutation} refetchQueries={[refetchProjectsQuery]}>
        {(leaveProject) => {
          return (
            <Button onClick={() => leaveProject({variables: {edition, id}})}>
              <FormattedMessage id="formula.leave" />
            </Button>
          )
        }}
      </Mutation>
    ) : (
      <Mutation mutation={JoinProjectMutation} refetchQueries={[refetchProjectsQuery]}>
        {(joinProject) => {
          return (
            <Button onClick={() => joinProject({variables: {edition, id}})}>
              <FormattedMessage id="formula.join" />
            </Button>
          )
        }}
      </Mutation>
    )

    return (
      <div className="bg-white ma5 ba1 b-dark-silver">
        <h1>{name}</h1>
        <h3>{description}</h3>
        <section>
          <h3><FormattedMessage id="formula.team" /></h3>
          <ul>
            {team && team.map((u) => <li key={u}>{u}</li>)}
          </ul>
        </section>
        {!isOwner && joinOrLeave}
        <Link page="formula/projects/detail" params={{edition, id}}>
          <Button>
            <FormattedMessage id="formula.seeDetails" />
          </Button>
        </Link>
      </div>
    )
  }
}
