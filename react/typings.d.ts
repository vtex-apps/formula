declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export default value
}

declare module 'vtex.styleguide' {
  import { ReactElement } from 'react'

  const Badge: ReactElement<any>
  const Button: ReactElement<any>
  const Checkbox: ReactElement<any>
  const Dropdown: ReactElement<any>
  const IconCaretRight: ReactElement<any>
  const Tab: ReactElement<any>
  const Tabs: ReactElement<any>
  const Radio: ReactElement<any>
  const Spinner: ReactElement<any>

  export { Badge, Button, Checkbox, Dropdown, IconCaretRight, Tab, Tabs, Radio, Spinner }
}

declare module 'render' {
  import { ReactElement } from 'react'
  import { Helmet } from 'react-helmet'

  const NoSSR: ReactElement<any>
  const Link: ReactElement<any>

  export { NoSSR, Helmet, Link }
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
