import { Url } from './url'

export const Urls = {
  home: '/',
  search: '/search',
  profile: (id: string) => Url.reverse('/p/:id/', { id }),
  discussion: (id: string) => Url.reverse('/discussions/:id/', { id }),
  account: '/profile',
  searchAlerts: '/accounts/search-alerts',
  settings: '/accounts/settings',
  savedItems: '/saved/saved-lists',
  vanityUrl: '/profile/vanity-url',
  inviteFriend: '/profile/invite-friends',
  login: '/login',
  loginWithEmail: '/login-with-email',
  resetPassword: '/reset-password',
  register: '/register',
  item: (id: string) => Url.reverse('/item/detail/:id', { id }),
  transactions: '/accounts/transactions',
  contactUs: (path?: string) => {
    let url = '/support/contact-us/'
    if (path) {
      url += path
    }
    return url
  },
}
