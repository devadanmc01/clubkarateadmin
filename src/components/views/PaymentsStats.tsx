import type { AdminViewProps } from 'payload'

import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import React from 'react'
import './paymentsStudents.css'
 const PaymentsStatsView: React.FC<AdminViewProps> = ({
  initPageResult,
  params,
  searchParams,
}) => {
  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>

    <div className="dashboard-container">
        <header className="dashboard-header">
            <h1>Panel de Control de Alumnos 🎓</h1>
            <p>Resumen de las estadísticas académicas y demográficas.</p>
        </header>

        <section className="kpi-cards">
            <div className="card total-alumnos">
                <span className="card-icon">👥</span>
                <div className="card-content">
                    <p className="card-title">Total de Alumnos</p>
                    <p className="card-value">1,250</p> </div>
            </div>
            <div className="card promedio-general">
                <span className="card-icon">⭐</span>
                <div className="card-content">
                    <p className="card-title">Promedio General</p>
                    <p className="card-value">8.7</p> </div>
            </div>
            <div className="card alumnos-aprobados">
                <span className="card-icon">✅</span>
                <div className="card-content">
                    <p className="card-title">Alumnos Aprobados</p>
                    <p className="card-value">95%</p> </div>
            </div>
            <div className="card mejor-curso">
                <span className="card-icon">📚</span>
                <div className="card-content">
                    <p className="card-title">Curso con Mejor Media</p>
                    <p className="card-value">Matemáticas</p> </div>
            </div>
        </section>

        <main className="dashboard-main">
            <section className="chart-panel">
                <h2>Distribución por Género</h2>
                <div className="chart-placeholder" id="chart-genero">
                    <p>Gráfico de Tarta/Barra (Femenino vs. Masculino)</p>
                </div>
            </section>

            <section className="chart-panel">
                <h2>Rendimiento por Grado</h2>
                <div className="chart-placeholder" id="chart-rendimiento">
                    <p>Gráfico de Barras (Promedio por Grado)</p>
                </div>
            </section>

            <section className="table-panel">
                <h2>Alumnos Destacados (Top 5)</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Grado</th>
                            <th>Promedio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Ana López</td><td>10mo</td><td>9.8</td></tr>
                        <tr><td>Luis Pérez</td><td>11vo</td><td>9.5</td></tr>
                        </tbody>
                </table>
            </section>
        </main>
    </div>

      </Gutter>
    </DefaultTemplate>
  )
}
export default PaymentsStatsView