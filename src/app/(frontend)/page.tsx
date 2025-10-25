import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import hero from '../../../media/hero.png'
import config from '@/payload.config'
import './page.css'
export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div>
      <header className="navbar">
        <div className="logo">🥋 **Taekwondo Manager Pro**</div>
        <nav>
            <a href="#caracteristicas">Características</a>
            <a href="#testimonios">Testimonios</a>
            <a href="#precios">Precios</a>
            <a href="#" className="cta-button">Prueba Gratis</a>
        </nav>
    </header>

    <section id="hero" className="hero">
        <div className="hero-content">
            <h1>Domina la Gestión, No Solo el Dojang.</h1>
            <p className="subtitle">El software #1 diseñado para clubes y academias de Taekwondo.</p>
            <div className="cta-group">
                <a href="#" className="btn btn-primary">¡Empieza Hoy Mismo!</a>
                <a href="#" className="btn btn-secondary">Ver Demo</a>
            </div>
            <p className="small-text">Sin tarjetas de crédito. Cancelación en cualquier momento.</p>
        </div>
        <div className="hero-image">
      <Image src={hero} alt='hero'/>
        </div>
    </section>

    <section id="caracteristicas" className="features">
        <h2>Características que Potencian tu Club</h2>
        <div className="feature-grid">
            <div className="feature-card">
                <i className="fas fa-users"></i>
                <h3>Gestión de Alumnos</h3>
                <p>Registra asistencias, administra grados (cinturones) y mantén perfiles completos de cada estudiante.</p>
            </div>
            <div className="feature-card">
                <i className="fas fa-money-check-alt"></i>
                <h3>Control de Pagos</h3>
                <p>Envía recordatorios de pago automáticos y haz seguimiento a las cuotas mensuales y anuales.</p>
            </div>
            <div className="feature-card">
                <i className="fas fa-chart-line"></i>
                <h3>Reportes y Estadísticas</h3>
                <p>Visualiza el crecimiento del club, la retención de alumnos y las métricas de rendimiento académico.</p>
            </div>
            <div className="feature-card">
                <i className="fas fa-calendar-alt"></i>
                <h3>Programación de Clases</h3>
                <p>Crea horarios, asigna instructores y gestiona la capacidad de cada clase de forma intuitiva.</p>
            </div>
        </div>
    </section>

    <section id="testimonios" className="testimonials">
        <h2>Lo que Dicen Nuestros Maestros</h2>
        <div className="testimonial-container">
            <div className="testimonial-card">
                <p>Taekwondo Manager Pro liberó 10 horas de mi semana. La gestión de pagos es impecable.</p>
                <cite>- Maestro Kim, Academia Dragones Azules</cite>
            </div>
            <div className="testimonial-card">
                <p>La herramienta de seguimiento de grados es esencial. Mis alumnos y padres están siempre informados.</p>
                <cite>- Instructora Soto, Dojang del Fénix</cite>
            </div>
        </div>
    </section>

<section id="precios" className="pricing">
        <h2>Planes de Suscripción Flexibles</h2>
        <div className="pricing-grid">
            <div className="plan-card">
                <h3>Dojang Básico</h3>
                <p className="price">$29<span>/mes</span></p>
                <ul>
                    <li><i className="fas fa-check"></i> Hasta 50 alumnos</li>
                    <li><i className="fas fa-check"></i> Gestión de pagos</li>
                    <li><i className="fas fa-check"></i> App móvil para asistencia</li>
                    <li className="disabled"><i className="fas fa-times"></i> Reportes avanzados</li>
                </ul>
                <a href="#" className="btn btn-primary">Seleccionar Plan</a>
            </div>
            
            <div className="plan-card recommended">
                <span className="badge">Más Popular</span>
                <h3>Dojang Avanzado</h3>
                <p className="price">$59<span>/mes</span></p>
                <ul>
                    <li><i className="fas fa-check"></i> **Alumnos Ilimitados**</li>
                    <li><i className="fas fa-check"></i> Todas las características básicas</li>
                    <li><i className="fas fa-check"></i> **Reportes avanzados**</li>
                    <li><i className="fas fa-check"></i> Módulo de eventos/torneos</li>
                </ul>
                <a href="#" className="btn btn-primary">Seleccionar Plan</a>
            </div>

             <div className="plan-card">
                <h3>Empresa Multi-Sede</h3>
                <p className="price">$99<span>/mes</span></p>
                <ul>
                    <li><i className="fas fa-check"></i> Alumnos Ilimitados</li>
                    <li><i className="fas fa-check"></i> Todas las características Avanzadas</li>
                    <li><i className="fas fa-check"></i> **Gestión de múltiples sedes**</li>
                    <li><i className="fas fa-check"></i> Soporte VIP 24/7</li>
                </ul>
                <a href="#" className="btn btn-primary">Seleccionar Plan</a>
            </div>
        </div>
    </section>
      <section className='testimonials'>
          <a
           className="btn btn-primary"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>

        </section>
    </div>
)
}
