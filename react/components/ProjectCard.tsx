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
  hasTeam: boolean
}

export default class ProjectCard extends Component<ProjectCardProps & Project> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    const { id, edition, name, description, owner, team, email, hasTeam } = this.props

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
    ) : !hasTeam ? (
      <Mutation mutation={JoinProjectMutation} refetchQueries={[refetchProjectsQuery]}>
        {(joinProject) => {
          return (
            <Button onClick={() => joinProject({variables: {edition, id}})}>
              <FormattedMessage id="formula.join" />
            </Button>
          )
        }}
      </Mutation>
    ) : null

    return (
      <div className="bg-base ma5 ba1 b-dark-silver center mw7 pa7 mt7 br2">
        <div className="inline-flex w-100">
          <div className="w-100">
            <div className="flex justify-between items-center pb6 w-100">
              <div className="f4 fw5 pb3">{name}</div>
              <div className="h1">
                <Link page="formula/projects/detail" params={{edition, id}}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="16" height="16" fill="white"/>
                  <path d="M2 14.5H14" stroke="#f71963" strokeWidth="1.4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.1429 1.5L12.7143 4.1L5.42857 11.4667L2 12.3333L2.85714 8.86667L10.1429 1.5Z" stroke="#f71963" strokeWidth="1.4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.42859 3.2334L11 5.8334" stroke="#f71963" strokeWidth="1.4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="f5 bb b--muted-5 mb7 pb7 fw3 lh-copy">{description}</div>
          </div>
        </div>
        <section>
          <div className="f4 fw5"><FormattedMessage id="formula.team" /></div>
          <ul className="list pl0 mb7 lh-copy">
            {team && team.map((u) => <li key={u.id}>{u.name} - {u.email}</li>)}
          </ul>
        </section>
        {!isOwner && joinOrLeave}

        <div>
          <div className="flex justify-between fw7">
            <div>Evaluation</div>
            <div>Total Score: 5</div>
          </div>
          <div className="pt6">
            <div className="c-muted-2 f5">
              Criteria #1
            </div>
            <div className="f6 pt3">
              Project impact on VTEX
            </div>
          </div>
          <div className="flex mt7 w-100 bb b--muted-5 pb7">
            <div className="br-pill bg-emphasis c-on-base--inverted flex items-center justify-center fw3 f4 mr6 pointer" style={{ width: '48px', height: '48px' }}>1</div>
            <div className="br-pill bg-emphasis c-on-base--inverted flex items-center justify-center fw3 f4 mr6 pointer" style={{ width: '48px', height: '48px' }}>2</div>
            <div className="br-pill bg-emphasis c-on-base--inverted flex items-center justify-center fw3 f4 mr6 pointer" style={{ width: '48px', height: '48px' }}>3</div>
            <div className="br-pill bg-base ba b--muted-3 c-muted-3 flex items-center justify-center fw3 f4 mr6 pointer" style={{ width: '48px', height: '48px' }}>4</div>
            <div className="br-pill bg-base ba b--muted-3 c-muted-3 flex items-center justify-center fw3 f4 mr6 pointer" style={{ width: '48px', height: '48px' }}>5</div>
          </div>
          <div className="pt6">
            <div className="c-muted-2 f5">
              Criteria #2
            </div>
            <div className="f6 pt3">
              Project quality level
            </div>
          </div>
          <div className="flex mt7">
            <div className="br-pill bg-emphasis c-on-base--inverted flex items-center justify-center fw3 f4 mr6 pointer" style={{ width: '48px', height: '48px' }}>1</div>
            <div className="br-pill bg-emphasis c-on-base--inverted flex items-center justify-center fw3 f4 mr6 pointer" style={{ width: '48px', height: '48px' }}>2</div>
            <div className="br-pill bg-base ba b--muted-3 c-muted-3 flex items-center justify-center fw3 f4 mr6 pointer" style={{ width: '48px', height: '48px' }}>3</div>
            <div className="br-pill bg-base ba b--muted-3 c-muted-3 flex items-center justify-center fw3 f4 mr6 pointer" style={{ width: '48px', height: '48px' }}>4</div>
            <div className="br-pill bg-base ba b--muted-3 c-muted-3 flex items-center justify-center fw3 f4 mr6 pointer" style={{ width: '48px', height: '48px' }}>5</div>
          </div>
        </div>
      </div>
    )
  }
}
