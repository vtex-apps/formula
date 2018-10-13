import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import ProjectsQuery from './queries/projects.graphql'

import LogoutIcon from './icons/LogoutIcon'
import VtexIcon from './icons/VtexIcon'

interface ProjectsData {
  data: any
}

class ProjectsPage extends Component<{} & ProjectsData> {
  constructor(props: any) {
    super(props)
  }

  public componentDidUpdate() {
    const { data: { error } } = this.props

    if (error) {
      const { graphQLErrors } = error
      const authError = graphQLErrors && graphQLErrors.length > 0 && graphQLErrors.find((e: any) => e.extensions.code === 'UNAUTHENTICATED')
      console.log('Authentication error, redirecting to login', authError)
      window.location.href = '/_v/auth-server/v1/login?ReturnUrl=' + encodeURIComponent('/formula/projects')
    }
  }

  public render() {
    const { data: { profile, projects } } = this.props

    const firstName = profile
      ? profile.name.split(' ')[0]
      : ''

    return (
      <div className="w-100 h-100 bg-light-silver overflow-hidden overflow-y-scroll">
        Olá, {firstName}
        <br/>
        {JSON.stringify(projects)}
      </div>
    )
  }

  private logout = () => {
    window.location.href = '/admin/logout?redirectUrl=/'
  }
}

export default graphql<ProjectsData>(ProjectsQuery, {
  options: {
    ssr: false
  }
})(ProjectsPage)
