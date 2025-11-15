import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  return Response.json({
    message: 'This is an example of a custom route.',
  })
}

export const POST = (request: Request) => {
  // const students = payload.find({ collection: 'alumnos' })
  // console.log(students)

  return Response.json({
    message: 'There must be some update somewhere in the database',
  })
}
