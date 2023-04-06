export interface FontTheme {
  identifier: string
  displayName: string
  baseMargin: number
  fonts: TextTypes
  baseBorder: {
    cornerRadius: { small: number; large: number }
    lineWeight: { light: number; heavy: number }
  }
}

export interface TextTypes {
  heading1: FontStyle
  heading2: FontStyle
  heading3: FontStyle
  heading4: FontStyle
  heading5: FontStyle
  heading6: FontStyle
  heading7: FontStyle
  primary1: FontStyle
  primary2: FontStyle
  primary3: FontStyle
  primary4: FontStyle
  primary5: FontStyle
  secondary1: FontStyle
  secondary2: FontStyle
  secondary3: FontStyle
  secondary4: FontStyle
  secondary5: FontStyle
}

export type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'

export interface FontStyle {
  fontFamily: string
  fontSize: number
  lineHeight: number
  fontWeight: FontWeight | undefined
}
