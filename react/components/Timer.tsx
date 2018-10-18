import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Countdown from 'react-countdown-now'
import { FormattedMessage } from 'react-intl'

import InfoQuery from '../queries/info.graphql'

interface TimerProps {
  edition: string
}

const nowMillis = new Date().getTime()

export default class Timer extends Component<TimerProps> {
  public render() {
    const { edition } = this.props
    return (
      <Query query={InfoQuery} ssr={false} variables={{ edition }}>
        {({ loading, error, data }) => {
          console.log(data)
          return (
            <div className="bg-serious-black white">
              <div className="center mw7 pv7">
                <div className="f5 fw3">
                  <FormattedMessage id="formula.timeToStart" />         
                </div>
                <div className="fw3 pb5" style={{fontSize : '120px'}}>
                  {data && data.info && data.info.timeRemainingSeconds &&
                    <Countdown
                      date={nowMillis + data.info.timeRemainingSeconds * 1000}
                      daysInHours={true}
                      />
                  }s
                </div>
                <div className="w-100 bg-marine h2 relative mb7 br2" style={{height: '0.25rem';}}>
                  <div className="bg-rebel-pink h2 br2" style={{width: '20px', height: '0.25rem';}}></div>  
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}
