import { CSSPropertiesComplete } from 'aphrodite/no-important'
import { TextPropsBase } from './text.props.base'

export interface TextProps extends Omit<TextPropsBase, 'textAlign'> {
  /**
   * Action performed when the text is pressed
   */
  onPress?: () => void

  whiteSpace?: CSSPropertiesComplete['whiteSpace']

  textAlign?: CSSPropertiesComplete['textAlign']
}

export interface TextRef {
  isContentTruncated: () => boolean
}
