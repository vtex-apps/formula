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

    const isInTeam = team && team.find((t) => t.email === email)

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
      <div className="bg-base ma5 ba1 b-dark-silver center mw7 pa7 mt7 br2">
        <div className="flex justify-between items-center pb6">
          <div className="f4 fw5 pb3">{name}</div>
          <Link page="formula/projects/detail" params={{edition, id}}>
            <div className="c-emphasis no-underline" style={{textDecoration: 'none' }}>
              <FormattedMessage id="formula.seeDetails" />
            </div>
          </Link>
        </div>
        <div className="f5 bb b--muted-5 mb7 pb7 fw3 lh-body">{description}</div>
        <section>
          <div className="f4 fw5"><FormattedMessage id="formula.team" /></div>
          <ul className="list pl0 mb7">
            {team && team.map((u) => <li key={u.id}>{u.name} - {u.email}</li>)}
          </ul>
        </section>
        {!isOwner && joinOrLeave}
      </div>
    )
  }
}
