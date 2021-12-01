import { AxiosInstance } from 'axios'

import { Feedback } from '@/@types/feedback'
import { RequestError } from '@/@types/error'

type Create = {
  data: Feedback
  errors: RequestError | null
}

type CreatePayload = {
  type: string
  text: string
  fingerprint: string
  apiKey: string
  device: string
  page: string
}

interface IFeedbackService {
  create(payload:CreatePayload): Promise<Create>
}

export default (httpClient:AxiosInstance):IFeedbackService => ({
  create: async (payload:CreatePayload):Promise<Create> => {
    const response = await httpClient.post<Feedback>('feedbacks', payload)
    let errors: RequestError | null = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  }
})
