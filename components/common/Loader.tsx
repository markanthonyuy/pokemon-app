import { PropsWithChildren } from "react"
import { ActivityIndicator } from "react-native"

export const Loader = (props?: PropsWithChildren<ActivityIndicator | {}>) => {
  return <ActivityIndicator size="small" color="black" {...props} />
}