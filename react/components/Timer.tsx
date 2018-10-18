import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { FormattedMessage } from 'react-intl'

import InfoQuery from '../queries/info.graphql'

interface TimerProps {
  edition: string
}

export default class Timer extends Component<TimerProps> {
  public render() {
    const { edition } = this.props
    return (
      <Query query={InfoQuery} ssr={false} variables={{ edition }}>
        {({ loading, error, data }) => {
          console.log(data)
          return (
            <div className="bg-serious-black pa7 white">
              <FormattedMessage id="formula.timeToStart" />
              {data && data.info && data.info.timeRemainingSeconds}
            </div>
          )
        }}
      </Query>
    )
  }
}
