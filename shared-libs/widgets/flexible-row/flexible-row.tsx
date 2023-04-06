// @ts-nocheck
import { ICON_MARGIN_MULTIPLIER, formattedSubContentRowFromProps } from './common'
import { FlexibleRowProps, FlexibleMainContentRow, FlexibleAction } from './flexible-row-props'
import { ActionRightChevron, AlertHelpLine } from '@sample/assets'
import { SVG, Text, Toggle, ToggleProps } from '@sample/basic-controls'
import { useColor, useColorForBackgroundColor, useMargin } from '@sample/themes'
import { StyleSheet, css } from 'aphrodite/no-important'
import React, { FC, PropsWithChildren } from 'react'

const VERTICAL_MARGIN_MULTIPLIER = 1
const HORIZONTAL_MARGIN_MULTIPLIER = 4

/**
 * Consists of different combinations, layed out in the following columns:
 *    - left icon / left action
 *    - mainContent
 *        can be multiple rows
 *    - rightNotification
 *    - right icon / right action
 */
export const FlexibleRow = (props: FlexibleRowProps) => {
  const colors = useColor().colors
  const { baseMargin } = useMargin()
  const { doNotApplyHorizontalPadding } = props

  const horizontalRowPadding = doNotApplyHorizontalPadding ? undefined : baseMargin * HORIZONTAL_MARGIN_MULTIPLIER
  const styles = StyleSheet.create({
    container: {
      paddingLeft: horizontalRowPadding,
      paddingRight: horizontalRowPadding,
      paddingTop: props.height ? 0 : baseMargin * VERTICAL_MARGIN_MULTIPLIER,
      paddingBottom: props.height ? 0 : baseMargin * VERTICAL_MARGIN_MULTIPLIER,
      minHeight: 50,
      height: props.height,
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      'user-select': props.clickAction ? undefined : 'none',
      cursor: props.clickAction ? 'pointer' : undefined,
      alignItems: 'center',
      verticalAlign: 'middle',
      backgroundColor: useColorForBackgroundColor('background1'),
      border: 'none',
      width: '100%',
      ':hover': {
        backgroundColor: useColorForBackgroundColor('background4'),
      },
      ':focus': {
        backgroundColor: useColorForBackgroundColor('background4'),
      },
    },
    leftIconColumn: {
      marginRight: 8,
      alignSelf: props.leftAlignIconTop ? 'flex-start' : 'center',
      alignContent: 'center',
    },
    leftIcon: {
      display: 'inline-block',
      height: 24,
      verticalAlign: 'middle',
      width: 24,
    },
    leftActionColumn: {
      marginRight: 8,
      alignSelf: 'center',
    },
    mainContentColumn: {
      alignSelf: 'center',
      flexDirection: 'column',
    },
    mainContentRow: {
      height: 20,
      display: 'flex',
    },
    mainContentRowWithPadding: {
      height: 20,
      display: 'flex',
      marginBottom: 8,
    },
    mainContentRowLeftText: {
      textAlign: 'center',
      verticalAlign: 'center',
      alignSelf: 'center',
    },
    mainContentRowLeftHelpIcon: {
      marginLeft: 4,
      height: 16,
      width: 16,
      cursor: 'pointer',
      alignSelf: 'center',
    },
    mainContentRowSpacer: {
      flexGrow: 1,
    },
    mainContentRowRightText: {
      alignSelf: 'center',
    },
    rightIconNotificationText: {
      display: 'inline-flex',
      alignSelf: 'flex-start',
    },
    rightIconNotificationBadge: {
      alignSelf: 'flex-end',
      width: 6,
      height: 6,
      borderRadius: 10,
      position: 'absolute',
      zIndex: 1,
      right: baseMargin * ICON_MARGIN_MULTIPLIER,
      backgroundColor: useColorForBackgroundColor('error3'),
    },
    rightIconColumn: {
      display: 'inline-flex',
      paddingLeft: 8,
    },
    rightActionColumn: {
      marginLeft: 8,
    },
    rightActionSwitch: {
      cursor: 'pointer',
      height: 30,
    },
    subtextContainer: {
      marginTop: 4,
      display: 'flex',
      flexDirection: 'column',
    },
  })

  const renderFlexibleMainRows = () => {
    const MainText: FC<PropsWithChildren> = ({ children }) => {
      return (
        <Text
          textType={props.mainContentTextType || 'primary4'}
          color={props.mainContentTint || 'primary1'}
          text={children}
        />
      )
    }

    if (typeof props.mainContent === 'string') {
      return (
        <span>
          <MainText>{props.mainContent}</MainText>
        </span>
      )
    }
    const outputRows: React.ReactNode[] = []

    // flexible row can be an array of rows or just one row
    // make our propRows object
    let formattedPropRows: FlexibleMainContentRow[]
    let count: number
    if ((props.mainContent as FlexibleMainContentRow).mainText) {
      // it's a FlexibleMainContentRow
      count = 1
      formattedPropRows = []
      formattedPropRows.push(props.mainContent as FlexibleMainContentRow)
    } else {
      // it's a FlexibleMainContentRow[]
      formattedPropRows = props.mainContent as FlexibleMainContentRow[]
      count = formattedPropRows.length
    }

    // iterate through our formatted prop rows
    formattedPropRows.forEach((row, index) => {
      const lastRow = count - 1 === index
      outputRows.push(
        <div key={index} className={css(lastRow ? styles.mainContentRow : styles.mainContentRowWithPadding)}>
          <div className={css(styles.mainContentRowLeftText)}>
            <MainText>{row.mainText}</MainText>
          </div>
          {row.mainTextHelpTooltipClickAction ? (
            <div className={css(styles.mainContentRowLeftHelpIcon)} ref={row.helperIconRef}>
              <SVG
                tint={'grey400'}
                localSVG={{
                  SVG: AlertHelpLine.SVG,
                  size: { width: 16, height: 16 },
                }}
              />
            </div>
          ) : null}
          <div className={css(styles.mainContentRowSpacer)} />
          {row.rightText ? (
            <div className={css(styles.mainContentRowRightText)}>
              <Text textType={'secondary3'} text={row.rightText} />
            </div>
          ) : null}
        </div>
      )
    })
    return outputRows
  }

  const renderSubContent = () => {
    const formattedSubContentRow = formattedSubContentRowFromProps(props)

    return (
      <>
        {!!formattedSubContentRow && (
          <div className={css(styles.subtextContainer)}>
            {!!formattedSubContentRow.subText && (
              <Text textType={'secondary4'} color={'primary2'}>
                {formattedSubContentRow.subText}
              </Text>
            )}
            {!!formattedSubContentRow.clickableSubText && (
              <Text textType={'primary4'} onPress={formattedSubContentRow.clickableSubTextClickAction}>
                {formattedSubContentRow.clickableSubText}
              </Text>
            )}
          </div>
        )}
      </>
    )
  }

  const renderAction = (action?: FlexibleAction) => {
    if (action === undefined) {
      return
    }
    let actionItem
    switch (action.type) {
      default:
        return
      case 'brandtext':
        actionItem = () => <Text textType={'primary4'}>{action.props}</Text>

        break

      case 'switch':
        const customProps: ToggleProps = { ...(action.props as ToggleProps) }
        actionItem = () => (
          <div className={css(styles.rightActionSwitch)}>
            <Toggle {...customProps} />
          </div>
        )
        break
    }
    return actionItem()
  }

  const renderLeftIconOrAction = () => {
    return (
      <>
        {props.leftIcon ? (
          <div className={css(styles.leftIconColumn)}>
            <span className={css(styles.leftIcon)}>
              <SVG
                tint={props.iconTint || 'grey600'}
                localSVG={{
                  SVG: props.leftIcon.SVG,
                  size: { width: 24, height: 24 },
                }}
              />
            </span>
          </div>
        ) : props.leftAction ? (
          <div className={css(styles.leftActionColumn)}>{renderAction(props.leftAction)}</div>
        ) : null}
      </>
    )
  }

  const renderRightNotificationText = () => {
    return (
      <>
        {props.rightNotification ? (
          <div className={css(styles.rightIconNotificationText)}>
            <Text color={'error3'} textType={'primary5'}>
              {props.rightNotification}
            </Text>
          </div>
        ) : null}
      </>
    )
  }

  const renderRightIconOrAction = () => {
    return (
      <>
        {props.rightIcon ? (
          <RightIcon />
        ) : (
          <div className={css(styles.rightActionColumn)}>{renderAction(props.rightAction)}</div>
        )}
      </>
    )
  }

  const renderRightArrow = () => {
    const showArrow = !props.rightArrowHidden && props.clickAction !== undefined
    return (
      <>
        {showArrow ? (
          <div className={css(styles.rightIconColumn)}>
            <SVG
              localSVG={{
                SVG: ActionRightChevron.SVG,
                size: {
                  width: '7',
                  height: '11',
                },
              }}
            />
          </div>
        ) : null}
      </>
    )
  }

  const RightIcon = () => {
    const nobadge = (
      <div className={css(styles.rightIconColumn)}>
        {props.rightIcon ? <SVG tint={props.iconTint || 'grey600'} localSVG={props.rightIcon} /> : null}
      </div>
    )
    const badge = (
      <div className={css(styles.rightIconColumn)}>
        {props.rightIcon ? (
          <div>
            <span className={css(styles.rightIconNotificationBadge)} />
            <SVG tint={props.iconTint || 'grey600'} localSVG={props.rightIcon} />
          </div>
        ) : null}
      </div>
    )

    return props.rightNotification ? badge : nobadge
  }

  return (
    <button onClick={props.clickAction} className={css(styles.container)}>
      {renderLeftIconOrAction()}
      <div className={css(styles.mainContentColumn)}>
        {renderFlexibleMainRows()}
        {renderSubContent()}
      </div>
      {renderRightNotificationText()}
      {renderRightIconOrAction()}
      {renderRightArrow()}
    </button>
  )
}
