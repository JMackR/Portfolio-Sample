import React, { FC } from 'react'
import { Separator as RNSeparator, Margin } from '@sample/layout-controls'
import { View } from 'react-native'

const MARGIN_PADDING = 4

export interface FlexibleRowContainerProps {
	children: React.ReactNode
	extendRightMargin?: boolean
	extendLeftMargin?: boolean
	skipFirstSeparator?: boolean
	skipLastSeparator?: boolean
	serviceRequestID?: string
}

export const FlexibleRowContainer = (props: FlexibleRowContainerProps) => {
	const {
		children,
		extendRightMargin,
		extendLeftMargin,
		skipFirstSeparator = false,
		skipLastSeparator = false,
		serviceRequestID,
	} = props
	const marginRightHorizontal = extendRightMargin ? MARGIN_PADDING : 0
	const marginLeftHorizontal = extendLeftMargin ? MARGIN_PADDING : 0

	return (
		<View key={`${props.serviceRequestID}`}>
			{skipFirstSeparator === true ? null : (
				<Separator marginLeftHorizontal={marginLeftHorizontal} marginRightHorizontal={marginRightHorizontal} />
			)}

			{React.Children.map(children, (child, i) => {
				return (
					<>
						{child !== null && child}

						{child !== null && !skipLastSeparator && (
							<Separator marginLeftHorizontal={marginLeftHorizontal} marginRightHorizontal={marginRightHorizontal} />
						)}
					</>
				)
			})}
		</View>
	)
}

const Separator: FC<{ marginLeftHorizontal: number; marginRightHorizontal: number }> = ({
	marginLeftHorizontal,
	marginRightHorizontal,
}) => (
	<Margin marginLeftStep={marginLeftHorizontal} marginRightStep={marginRightHorizontal}>
		<RNSeparator />
	</Margin>
)
