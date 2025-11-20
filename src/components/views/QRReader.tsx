'use client'

import { useState, useRef, useEffect } from 'react'
import { BrowserQRCodeReader } from '@zxing/browser'

interface QRReaderProps {
  onSuccess?: (data: { message: string; status: string; data?: Record<string, unknown> }) => void
  onError?: (error: string) => void
}

export const QRReader: React.FC<QRReaderProps> = ({ onSuccess, onError }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const readerRef = useRef<BrowserQRCodeReader | null>(null)
  const controlsRef = useRef<any>(null)

  // Inicializar el lector de QR
  useEffect(() => {
    if (!readerRef.current) {
      readerRef.current = new BrowserQRCodeReader()
    }

    return () => {
      if (isScanning && controlsRef.current) {
        controlsRef.current.stop()
      }
    }
  }, [isScanning])

  // Iniciar escaneo
  const startScanning = async () => {
    try {
      setError(null)
      setSuccess(null)
      setIsScanning(true)

      if (!videoRef.current || !readerRef.current) {
        throw new Error('No se pudo inicializar el lector de QR')
      }

      const controls = await readerRef.current.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (result: any, err: any) => {
          if (result && isScanning) {
            const qrCode = result.getText()
            console.log('QR escaneado:', qrCode)
            await handleQRScan(qrCode)
          }
          if (err && !(err.name?.includes('NotFound'))) {
            console.error('Error de lectura:', err)
          }
        }
      )

      controlsRef.current = controls
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido'
      console.error('[QR READER] Error al iniciar escaneo:', errorMsg)
      setError(errorMsg)
      setIsScanning(false)
      onError?.(errorMsg)
    }
  }

  // Detener escaneo
  const stopScanning = () => {
    try {
      if (controlsRef.current) {
        controlsRef.current.stop()
      }
      setIsScanning(false)
    } catch (err) {
      console.error('[QR READER] Error al detener escaneo:', err)
    }
  }

  // Manejar lectura de QR
  const handleQRScan = async (memberId: string) => {
    try {
      setIsLoading(true)
      setError(null)

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

      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error desconocido'
      console.error('[QR READER] Error al enviar petición:', errorMsg)
      setError(errorMsg)
      onError?.(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="qr-reader-container">
      <div className="qr-reader-card">
        <h2 className="qr-reader-title">Escanear QR</h2>

        {/* Video element for QR scanning */}
        {isScanning && (
          <video
            ref={videoRef}
            className="qr-video"
            style={{ width: '100%', maxWidth: '400px', aspectRatio: '1' }}
          />
        )}

        {/* Messages */}
        {error && (
          <div className="qr-message qr-error">
            <span>❌ Error: {error}</span>
          </div>
        )}

        {success && (
          <div className="qr-message qr-success">
            <span>{success}</span>
          </div>
        )}

        {isLoading && (
          <div className="qr-message qr-loading">
            <span>⏳ Procesando...</span>
          </div>
        )}

        {!isScanning && !success && !error && (
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
              📱 Iniciar escaneo
            </button>
          ) : (
            <button
              onClick={stopScanning}
              className="qr-button qr-button-stop"
            >
              ⏹️ Detener escaneo
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .qr-reader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          
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
          background-color: #070709ff;
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
