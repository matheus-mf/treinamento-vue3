import { httpClient } from './api'

import AuthService from './auth'
import UsersService from './users'
import FeedbacksService from './feedbacks'

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient)
}
