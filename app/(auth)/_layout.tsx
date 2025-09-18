import React from 'react'
import { Slot ,Redirect} from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

const _layout = () => {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/(tabs)/ReportIssue'} />
  }

  return <Slot />
}

export default _layout
