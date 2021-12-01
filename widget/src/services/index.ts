import { httpClient } from '@/services/api'
import FeedbackService from './feedback'

export default {
  feedbacks: FeedbackService(httpClient)
}
