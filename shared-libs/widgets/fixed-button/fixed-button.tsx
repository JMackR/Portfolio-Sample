import React from 'react'
import { Button, ButtonSize, ButtonType } from '@sample/basic-controls'
import { Margin } from '@sample/layout-controls'
import { StyleSheet, css } from 'aphrodite/no-important'

export interface FixedContainerProps {
	title: string
	buttonType: ButtonType
	buttonSize: ButtonSize
	onClick: () => void
	width?: string
	bottom?: number
	top?: number
	left?: number
	right?: number
	marginTop?: number
	marginRight?: number
	marginBottom?: number
	marginLeft?: number
}

export const FixedButton = ({
	title,
	buttonType,
	buttonSize,
	onClick,
	width = '100%',
	bottom,
	top,
	left,
	right,
	marginTop,
	marginRight,
	marginBottom,
	marginLeft,
}: FixedContainerProps) => {
	const styles = StyleSheet.create({
		fixedButtonContainer: {
			position: 'fixed',
			width: '100%',
			bottom,
			top,
			left,
			right,
		},
	})

	return (
		<div className={css(styles.fixedButtonContainer)}>
			<Margin width={'100%'} grow={1} axisDistribution={'center'}>
				<Margin
					width={width}
					direction={'column'}
					marginBottomStep={marginBottom}
					marginTopStep={marginTop}
					marginLeftStep={marginLeft}
					marginRightStep={marginRight}
				>
					<Button title={title} onClick={onClick} buttonType={buttonType} buttonSize={buttonSize} />
				</Margin>
			</Margin>
		</div>
	)
}
