import { Formik } from 'formik'
import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { withRuntimeContext } from 'render'
import { Button } from 'vtex.styleguide'

import DeleteProjectMutation from '../queries/deleteProject.graphql'
import ProjectsQuery from '../queries/projects.graphql'
import UpdateProjectMutation from '../queries/updateProject.graphql'

interface ProjectFormProps {
  initialProject: Project
  edition: string
}

interface ProjectFormState {
  project: Project
}

class ProjectForm extends Component<ProjectFormProps & RuntimeProps, ProjectFormState> {
  constructor(props: any) {
    super(props)

    this.state = {
      project: props.initialProject || {},
    }
  }

  public render() {
    const { edition } = this.props
    const { project } = this.state

    const team = project && project.id && project.team && (
      <ul>
        {project.team.map((u) => <li key={u.id}>{u.name} - {u.email}</li>)}
      </ul>
    )

    const refetchProjectsQuery = {
      query: ProjectsQuery,
      variables: {
        edition,
      }
    }

    const handleDeleteSuccess = () => this.props.runtime.navigate({page: 'formula/projects/list', params: {edition}})

    const deleteButton = project.id && (
      <Mutation mutation={DeleteProjectMutation} refetchQueries={[refetchProjectsQuery]}>
        {(deleteProject) => {
          return (
            <Button variation="tertiary" onClick={() => deleteProject({variables: {edition, id: project.id}}).then(handleDeleteSuccess)} >
              <FormattedMessage id="formula.delete" />
            </Button>
          )
        }}
      </Mutation>
    )

    return (
      <div className="bg-white ma5 ba1 b-dark-silver">
        <Mutation mutation={UpdateProjectMutation} refetchQueries={[refetchProjectsQuery]}>
          {(updateProject, { data }) => {
            console.log('data on mutation', data)
            return (
              <Formik
                initialValues={project}
                validate={values => {
                  const errors: any = {}
                  if (!values.name) {
                    errors.name = 'Required'
                  }
                  return errors
                }}
                onSubmit={(values, { setSubmitting }) => {
                  updateProject({
                    variables: {
                      edition,
                      ...project,
                      ...values,
                    }
                  }).then((d: any) => {
                    console.log('updateProject.then', d.data.updateProject.id)
                    this.setState({
                      project: {
                        ...project,
                        id: d.data.updateProject.id,
                      }
                    })
                    setSubmitting(false)
                  })
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    {project.id}
                    <br />
                    <label htmlFor="name">Name</label>
                    <input
                      type="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && errors.name}
                    <label htmlFor="description">Description</label>
                    <input
                      type="description"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    {errors.description && touched.description && errors.description}
                    {team}
                    {deleteButton}
                    <Button type="submit" disabled={isSubmitting}>
                      <FormattedMessage id="formula.save" />
                    </Button>
                  </form>
                )}
              </Formik>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default withRuntimeContext(ProjectForm)
