import axiosModule from 'axios'
import Cookies from 'js-cookie'

const ARUNDO_SSO_KEY = 'arundo-sso'

const getAuthenticatedAxios = (bearer) => {
  const instance = axiosModule.create()

  instance.defaults.headers.common['Authorization'] = bearer

  return instance
}

let ssoCookie = Cookies.get(ARUNDO_SSO_KEY)

export const axios = getAuthenticatedAxios(ssoCookie)
