import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'

import ProjectsQuery from './queries/projects.graphql'

import ProjectCard from './components/ProjectCard'

interface ProjectsData {
  data: any
  params: any
}

class ProjectList extends Component<{} & ProjectsData> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    const { data, params: { edition } } = this.props

    if (data && data.loading) {
      return <Spinner />
    }

    return (
      <div className="w-100 h-100 bg-light-silver overflow-hidden overflow-y-scroll">
        {data.projects.map((p: Project) => <ProjectCard {...p} edition={edition} />)}
      </div>
    )
  }
}

export default graphql<ProjectsData>(ProjectsQuery, {
  options: ({params: {edition}}) => ({
    ssr: false,
    variables: {
      edition
    }
  })
})(ProjectList)
