import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import profileQuery from '../queries/profile.gql'

const pictureWrapperStyle = { width: '56px', height: '56px' }

function Profile({ data }) {
  const path = window && window.document && window.location.pathname
  if (data.loading || data.error) return null
  const { topbarData: { profile: { name, email, picture } } } = data
  const [firstName, lastName] = name ? name.split(' ') : []
  const initials =
    firstName && lastName
      ? (firstName[0] + lastName[0]).toUpperCase()
      : firstName && !lastName
        ? firstName.slice(0, 1).toUpperCase()
        : email ? email.slice(0, 1).toUpperCase() : ''
  return (
    <div className="flex items-center pa2">
      <div
        onClick={() => global.browserHistory.push('/admin/myuser')}
        title={name}
        className="flex-shrink-none flex items-center justify-center br-100 ba bw1 b--light-gray bg-light-silver overflow-x-hidden pointer"
        style={pictureWrapperStyle}>
        {!picture ? <span className="ttu f3 fw5 gray">{initials}</span> : null}
        {picture ? <img src={picture} alt={name} /> : null}
      </div>
      <div className="flex-auto flex-column items-center">
        <div className="f6 pl4 w-100 dark-gray truncate">{email}</div>
        <div className="mt2 pl4 flex justify-between items-center">
          <a
            href={`/admin/logout?redirectUrl=${path}`}
            className="pa0 mv2 bg-transparent bn self-end flex items-center gray hover-red link dib">
            <span className="f6 pr2">
              <FormattedMessage id="formula.logout" />
            </span>
            <span>logout-icon</span>
          </a>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
  data: PropTypes.object,
}

export default graphql(profileQuery, { options: { ssr: false } })(Profile)
