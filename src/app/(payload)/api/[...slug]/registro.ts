import { Endpoint, PayloadRequest } from 'payload'
import { handleAttendanceRegistration } from '@/controllers/attendanceController'

export const testEndpoint: Endpoint = {
  path: '/registro',
  method: 'post',
  handler: async (req: PayloadRequest): Promise<Response> => {
    return handleAttendanceRegistration(req)
  },
}