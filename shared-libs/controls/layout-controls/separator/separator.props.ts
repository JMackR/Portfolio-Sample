import { BackgroundColors } from '@sample/themes'
export interface SeparatorProps {
  direction?: 'row' | 'column'
  width?: string | number
  /**
   * Override default separator color
   * @default: background4
   */
  color?: keyof BackgroundColors
  height?: string | number
}
