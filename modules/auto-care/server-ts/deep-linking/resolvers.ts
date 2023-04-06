import { SUCCESS_CODE } from '@sample/core-server-ts/constants'

export default () => ({
	Query: {},
	Mutation: {
		// inviteUser: async (_, { userInviteInput }, context: any) => {
		//   try {
		//     console.log('userInviteInput ==>', userInviteInput)
		//     return { code: SUCCESS_CODE, success: true, message: 'BOB WAS HERE' }
		//   } catch (error) {
		//     console.log('USER INVITE ERROR ', error)
		//     return error
		//   }
		// },
	},
})
