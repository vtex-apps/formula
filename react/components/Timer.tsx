import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

interface TimerProps {
  time: string
}

export default class Timer extends Component<TimerProps> {
  public render() {
    const { time } = this.props

    return (
      <div className="bg-serious-black pa7 white">
        <FormattedMessage id="formula.timeToStart" />
        {time}
      </div>
    )
  }
}
