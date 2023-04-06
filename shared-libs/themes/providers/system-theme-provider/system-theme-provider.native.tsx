import React from 'react'

// import { NativeAppearanceProvider, NativeAppearance } from "./NativeAppearance"

// const AppearanceProvider = (props: { children: any }) => <NativeAppearanceProvider style={{ flex: 1 }} {...props} />

export const SystemThemeProvider: React.FC = (props) => <>{props.children}</>
