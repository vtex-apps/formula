declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export default value
}

declare module 'vtex.styleguide' {
  import { ReactElement } from 'react'

  const Badge: ReactElement
  const Button: ReactElement
  const Checkbox: ReactElement
  const Dropdown: ReactElement
  const IconCaretRight: ReactElement
  const Tab: ReactElement
  const Tabs: ReactElement
  const Radio: ReactElement
  const Spinner: ReactElement
  const PageHeader: ReactElement

  export { Badge, Button, Checkbox, Dropdown, IconCaretRight, Tab, Tabs, Radio, Spinner, PageHeader }
}

declare module 'render' {
  import { ReactElement } from 'react'
  import { Helmet } from 'react-helmet'

  const NoSSR: ReactElement
  const Link: ReactElement
  const withRuntimeContext: ReactElement

  export { NoSSR, Helmet, Link, withRuntimeContext }
}

interface Project {
  demoURL?: string
  description?: string
  edition?: string
  id?: string
  name?: string
  owner?: string
  team?: string[]
}

interface RuntimeProps {
  runtime: any
}
