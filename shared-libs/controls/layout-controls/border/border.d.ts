import type { BackgroundColors } from '@sample/themes'
import type { LayoutContainerProps } from '../container-props'

export interface BorderProps extends LayoutContainerProps {
  /**
   * @default 'background2'
   */
  color?: keyof BackgroundColors
  lineWeight?: 'light' | 'heavy' | 'none'
  /**
   * Amount of curvature at the corners.  Note that circle is only supported in native
   */
  cornerRadius?: 'small' | 'large' | 'none' | 'circle'
  hidden?: boolean
  /**
   * @default 'solid'
   * @note Not yet implemented for web.
   */
  borderType?: 'solid' | 'dashed' | 'dotted'
  /**
   * Removes the focus within styling
   */
  noFocus?: boolean
  /**
   * Overflow setting
   */
  overflow?: boolean
}
