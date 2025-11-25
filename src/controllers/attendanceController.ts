import { PayloadRequest } from 'payload'

interface AttendanceRequest {
  id?: string
}

interface ApiResponse<T = Record<string, unknown>> {
  message?: string
  error?: string
  status: 'success' | 'error'
  data?: T
  details?: string
}

/**
 * Valida que el usuario esté autenticado
 */
export function validateAuthentication(req: PayloadRequest): { valid: boolean; response?: Response } {
  if (!req.user) {
    console.warn('[ATTENDANCE CONTROLLER] Acceso denegado: Usuario no autenticado')
    return {
      valid: false,
      response: new Response(
        JSON.stringify({
          error: 'No autorizado',
          status: 'error',
          message: 'Debes estar logueado para acceder a este endpoint',
        } as ApiResponse),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    }
  }

  console.log('Usuario autenticado:', req.user.email)
  return { valid: true }
}

/**
 * Valida el body de la request
 */
export function validateRequestBody(body: AttendanceRequest): { valid: boolean; response?: Response } {
  if (!body.id) {
    return {
      valid: false,
      response: new Response(
        JSON.stringify({
          error: 'El campo id es requerido',
          status: 'error',
        } as ApiResponse),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      ),
    }
  }

  return { valid: true }
}

/**
 * Crea un nuevo registro de asistencia
 */
export async function createAttendanceRecord(
  payload: unknown,
  memberId: string
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  try {
    console.log('Creando asistencia para miembro:', memberId)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newAttendance = await (payload as any).create({
      collection: 'attendances',
      data: {
        member: [memberId],
      },
    })

    console.log('Asistencia creada exitosamente:', newAttendance)
    return { success: true, data: newAttendance }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
    console.error('[ATTENDANCE CONTROLLER] Error al crear asistencia:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

/**
 * Maneja la creación de un registro de asistencia
 */
export async function handleAttendanceRegistration(req: PayloadRequest): Promise<Response> {
  try {
    // Validar autenticación
    const authValidation = validateAuthentication(req)
    if (!authValidation.valid) {
      return authValidation.response!
    }

    // Parsear body
    const body = (typeof req.json === 'function' ? await req.json() : {}) as AttendanceRequest
    console.log('Body recibido:', body)
    console.log('ID del body:', body.id)

    // Validar body
    const bodyValidation = validateRequestBody(body)
    if (!bodyValidation.valid) {
      return bodyValidation.response!
    }

    // Crear registro de asistencia
    const payload = req.payload
    const result = await createAttendanceRecord(payload, body.id!)

    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: 'Error al procesar la solicitud',
          status: 'error',
          details: result.error,
        } as ApiResponse),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    return new Response(
      JSON.stringify({
        message: 'Asistencia registrada correctamente',
        status: 'success',
        data: result.data,
      } as ApiResponse),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (err) {
    console.error('[ATTENDANCE CONTROLLER] Error no controlado:', err)
    return new Response(
      JSON.stringify({
        error: 'Error al procesar la solicitud',
        status: 'error',
        details: err instanceof Error ? err.message : 'Error desconocido',
      } as ApiResponse),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
