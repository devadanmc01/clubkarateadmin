import { Endpoint, PayloadRequest } from "payload"

export const testEndpoint: Endpoint = {
  path: '/registro',
  method: 'post',
  handler: async (req: PayloadRequest): Promise<Response> => {
    try {
      const body = typeof req.json === 'function' ? await req.json() : {}
      console.log('Body recibido:', body)
      console.log('ID del body:', body.id)
      
      // Validar que exista el id
      if (!body.id) {
        return new Response(
          JSON.stringify({ 
            error: 'El campo id es requerido',
            status: 'error'
          }), 
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      }

      // Obtener la instancia de Payload desde la request
      const payload = req.payload
      
      // Crear nuevo registro en la colección attendances
      const newAttendance = await payload.create({
        collection: 'attendances',
        data: {
          member: body.id, // Asignar el id recibido como member
        },
      })

      console.log('Asistencia creada:', newAttendance)

      return new Response(
        JSON.stringify({ 
          message: 'Asistencia registrada correctamente',
          status: 'success',
          data: newAttendance
        }), 
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    } catch (err) {
      console.error(`[REGISTRO ENDPOINT] Error:`, err)
      return new Response(
        JSON.stringify({ 
          error: 'Error al procesar la solicitud',
          details: err instanceof Error ? err.message : 'Error desconocido'
        }), 
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )    
    }
  },
}