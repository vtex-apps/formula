import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { Button, Spinner } from 'vtex.styleguide'

import ProfileQuery from './queries/profile.graphql'

import LogoutIcon from './icons/LogoutIcon'

interface ProjectsData {
  data: any
}

interface ProjectsState {
  forbidden: boolean
}

class ProjectTemplate extends Component<{} & ProjectsData, ProjectsState> {
  constructor(props: any) {
    super(props)

    this.state = {
      forbidden: false
    }
  }

  public componentDidUpdate() {
    const { data: { error } } = this.props

    if (error) {
      const { graphQLErrors } = error
      const authError = graphQLErrors && graphQLErrors.length > 0 && graphQLErrors.find((e: any) => e.extensions.code === 'UNAUTHENTICATED')
      const forbiddenError = graphQLErrors && graphQLErrors.length > 0 && graphQLErrors.find((e: any) => e.extensions.code === 'FORBIDDEN')
      if (authError) {
        console.log('Authentication error, redirecting to login', authError)
        window.location.href = '/_v/auth-server/v1/login?ReturnUrl=' + encodeURIComponent('/formula/projects')
      } else if (forbiddenError) {
        this.setState({forbidden: true})
      }
    }
  }

  public render() {
    const { data } = this.props

    if (data && data.loading) {
      return <Spinner />
    }

    if (this.state.forbidden) {
      return <div>Oops :(</div>
    }

    const firstName = data && data.profile.name
      ? data.profile.name.split(' ')[0]
      : ''

    return (
      <div className="w-100 h-100 bg-light-silver overflow-hidden overflow-y-scroll">
        <FormattedMessage id="formula.hello"/> {firstName}
        <Button variation="secondary" onClick={this.logout}>
          <LogoutIcon /><FormattedMessage id="formula.logout"/>
        </Button>
        <br/>
        {this.props.children}
      </div>
    )
  }

  private logout = () => {
    window.location.href = '/admin/logout?redirectUrl=/formula'
  }
}

export default graphql<ProjectsData>(ProfileQuery, {
  options: {
    ssr: false
  }
})(ProjectTemplate)
