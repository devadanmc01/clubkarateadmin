'use client'

import { useState, useRef, useEffect } from 'react'
import { BrowserQRCodeReader } from '@zxing/browser'
import { Scan, SquarePause } from 'lucide-react'

interface QRReaderProps {
  onSuccess?: (data: { message: string; status: string; data?: Record<string, unknown> }) => void
  onError?: (error: string) => void
}

export const QRReader: React.FC<QRReaderProps> = ({ onSuccess, onError }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const readerRef = useRef<BrowserQRCodeReader | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null)

  // Inicializar el lector de QR
  useEffect(() => {
    return () => {
      if (controlsRef.current) {
        try {
          controlsRef.current.stop()
        } catch (err) {
          console.log('Error al limpiar controles:', err)
        }
      }
    }
  }, [])

  // Solicitar permisos de cámara
  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      stream.getTracks().forEach(track => track.stop())
      setPermissionDenied(false)
      return true
    } catch (err) {
      console.error('[QR READER] Permiso de cámara denegado:', err)
      setPermissionDenied(true)
      setError('No tienes permiso para acceder a la cámara. Por favor, habilita los permisos.')
      return false
    }
  }

  // Iniciar escaneo
  const startScanning = async () => {
    try {
      setError(null)
      setSuccess(null)
      setIsLoading(true)

      // Solicitar permiso primero
      const hasPermission = await requestCameraPermission()
      if (!hasPermission) {
        setIsLoading(false)
        return
      }

      // Cambiar isScanning primero para que React renderice el video
      setIsScanning(true)

      // Esperar a que el elemento de video se renderice
      await new Promise(resolve => setTimeout(resolve, 500))

      if (!videoRef.current) {
        throw new Error('No se pudo acceder al elemento de video. Por favor, recarga la página e intenta de nuevo.')
      }

      // Crear nuevo lector cada vez
      if (readerRef.current) {
        try {
          if (controlsRef.current) {
            controlsRef.current.stop()
          }
        } catch (err) {
          console.log('Error limpiando lector anterior:', err)
        }
      }

      readerRef.current = new BrowserQRCodeReader()
      console.log('[QR READER] Inicializando lector de QR...')

      const controls = await readerRef.current.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (result: any, err: any) => {
          if (result) {
            const qrCode = result.getText()
            console.log('[QR READER] QR escaneado:', qrCode)
            await handleQRScan(qrCode)
          }
          if (err && err.name !== 'NotFoundException') {
            // Ignorar el error NotFoundException que es normal durante el escaneo
            if (!err.message?.includes('Could not decode')) {
              console.log('[QR READER] Info de escaneo:', err.message)
            }
          }
        }
      )

      controlsRef.current = controls
      setIsLoading(false)
      console.log('[QR READER] Escaneo iniciado correctamente')
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido'
      console.error('[QR READER] Error al iniciar escaneo:', errorMsg)
      setError(`Error: ${errorMsg}`)
      setIsScanning(false)
      setIsLoading(false)
      onError?.(errorMsg)
    }
  }

  // Detener escaneo
  const stopScanning = () => {
    try {
      if (controlsRef.current) {
        controlsRef.current.stop()
        controlsRef.current = null
      }
      setIsScanning(false)
      console.log('[QR READER] Escaneo detenido')
    } catch (err) {
      console.error('[QR READER] Error al detener escaneo:', err)
    }
  }

  // Manejar lectura de QR
  const handleQRScan = async (memberId: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // Detener escaneo después de leer
      stopScanning()

      console.log('[QR READER] Enviando petición con ID:', memberId)

      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: memberId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error en la petición')
      }

      console.log('[QR READER] Respuesta exitosa:', data)
      setSuccess(`✓ Asistencia registrada para: ${memberId}`)
      onSuccess?.(data)

      // Limpiar mensaje de éxito después de 3 segundos y permitir nuevo escaneo
      setTimeout(() => {
        setSuccess(null)
        setIsLoading(false)
      }, 3000)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido'
      console.error('[QR READER] Error al enviar petición:', errorMsg)
      setError(errorMsg)
      setIsLoading(false)
      onError?.(errorMsg)
    }
  }

  return (
    <div className="qr-reader-container">
      <div className="qr-reader-card">
        <h2 className="qr-reader-title">Registrar asistencias</h2>

        {/* Camera permission notice */}
        {permissionDenied && (
          <div className="qr-message qr-error">
            <span>⚠️ Se requieren permisos de cámara. Verifica la configuración de tu dispositivo.</span>
          </div>
        )}

        {/* Video element for QR scanning */}
        {isScanning && (
          <video
            ref={videoRef}
            className="qr-video"
            style={{ width: '100%', maxWidth: '400px', aspectRatio: '1' }}
            autoPlay
            playsInline
          />
        )}

        {/* Messages */}
        {error && (
          <div className="qr-message qr-error">
            <span>❌ {error}</span>
          </div>
        )}

        {success && (
          <div className="qr-message qr-success">
            <span>{success}</span>
          </div>
        )}

        {isLoading && !isScanning && (
          <div className="qr-message qr-loading">
            <span>⏳ Inicializando cámara...</span>
          </div>
        )}

        {isLoading && isScanning && (
          <div className="qr-message qr-loading">
            <span>⏳ Procesando...</span>
          </div>
        )}

        {!isScanning && !success && !error && !isLoading && (
          <p className="qr-placeholder">
            Haz clic en &quot;Iniciar escaneo&quot; para comenzar a leer códigos QR
          </p>
        )}

        {/* Buttons */}
        <div className="qr-buttons">
          {!isScanning ? (
            <button
              onClick={startScanning}
              disabled={isLoading}
              className="qr-button qr-button-start"
            >
              <Scan />
              <span style={{ marginLeft: '8px' }}>Iniciar escaneo</span>
            </button>
          ) : (
            <button
              onClick={stopScanning}
              className="qr-button qr-button-stop"
            >
              <SquarePause />
              <span style={{ marginLeft: '8px' }}>Detener escaneo</span>
            </button>
          )}
        </div>

        {/* Info text */}
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '20px' }}>
          Asegúrate de que la cámara tenga permisos y apunta al código QR
        </p>
      </div>

      <style jsx>{`
        .qr-reader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - var(--app-header-height));
          padding: 20px;
        }

        .qr-reader-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          padding: 40px;
          max-width: 500px;
          width: 100%;
        }

        .qr-reader-title {
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 30px 0;
          color: #333;
        }

        .qr-video {
          border: 2px solid #667eea;
          border-radius: 8px;
          margin-bottom: 20px;
          background: #f5f5f5;
        }

        .qr-placeholder {
          text-align: center;
          color: #666;
          margin: 40px 0;
          font-size: 16px;
        }

        .qr-message {
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-weight: 500;
          text-align: center;
          font-size: 16px;
        }

        .qr-error {
          background-color: #fee;
          color: #c33;
          border: 1px solid #fcc;
        }

        .qr-success {
          background-color: #efe;
          color: #3c3;
          border: 1px solid #cfc;
        }

        .qr-loading {
          background-color: #fef3cd;
          color: #856404;
          border: 1px solid #ffeaa7;
        }

        .qr-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 20px;
        }

        .qr-button {
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 150px;
        }

        .qr-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .qr-button-start {
          color: white;
        }

        .qr-button-start:hover:not(:disabled) {
          background-color: #28292aff;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .qr-button-stop {
          background-color: #ff6b6b;
          color: white;
        }

        .qr-button-stop:hover:not(:disabled) {
          background-color: #ee5a52;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }

        @media (max-width: 600px) {
          .qr-reader-card {
            padding: 20px;
          }

          .qr-reader-title {
            font-size: 24px;
          }

          .qr-button {
            padding: 10px 20px;
            font-size: 14px;
            min-width: 120px;
          }
        }
      `}</style>
    </div>
  )
}

export default QRReader
