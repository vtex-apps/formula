import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'render'
import { Button } from 'vtex.styleguide'

export default class ProjectForm extends Component<{} & Project> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    const { id, edition, name, description, owner, team } = this.props


    return (
      <div className="bg-white ma5 ba1 b-dark-silver">
        <h1>{name}</h1>
        <h3>{description}</h3>
        <section>
          <h3><FormattedMessage id="formula.team" /></h3>
          <ul>
            {team && team.map((u) => <li>{u}</li>)}
          </ul>
        </section>
      </div>
    )
  }
}
