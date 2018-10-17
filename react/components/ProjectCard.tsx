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
        <div className="inline-flex">
          <div className="pr5 mr5">
            <div className="flex justify-between pb6">
              <div className="f4 fw5 pb3">{name}</div>
            </div>
            <div className="f5 bb b--muted-5 mb7 pb7 fw3 lh-copy">{description}</div>
          </div>
          <div className="h1">
            <Link page="formula/projects/detail" params={{edition, id}}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="16" height="16" fill="white"/>
              <path d="M2 14.5H14" stroke="#CACBCC" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.1429 1.5L12.7143 4.1L5.42857 11.4667L2 12.3333L2.85714 8.86667L10.1429 1.5Z" stroke="#CACBCC" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.42859 3.2334L11 5.8334" stroke="#CACBCC" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
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
