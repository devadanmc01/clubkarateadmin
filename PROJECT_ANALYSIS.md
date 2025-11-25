# Análisis del Proyecto: Gym Clubs Admin

## 📋 Resumen General

**Nombre:** gym-clubs-admin  
**Descripción:** Sistema de administración para clubes de gimnasia/karate  
**Versión:** 1.0.0  
**Licencia:** MIT  
**Repositorio:** clubkarateadmin (Owner: devadanmc01)  
**Rama actual:** master

---

## 🏗️ Stack Tecnológico

### Frontend
- **Framework:** Next.js 15.4.4
- **Lenguaje:** TypeScript 5.7.3
- **UI:** React 19.1.0
- **CMS:** Payload CMS 3.53.0
- **Editor de texto enriquecido:** Lexical (@payloadcms/richtext-lexical)
- **Íconos:** Lucide React 0.553.0
- **Estilos:** SCSS/CSS

### Backend
- **Runtime:** Node.js (18.20.2 o superior, 20.9.0+)
- **Base de datos:** MongoDB (con @payloadcms/db-mongodb 3.53.0)
- **ORM:** Mongoose (a través de adaptador MongoDB)
- **GraphQL:** Soportado (graphql 16.8.1)

### DevOps & Deployment
- **Containerización:** Docker + Docker Compose
- **Package Manager:** pnpm (9 o 10+)
- **Almacenamiento:** Payload Cloud S3
- **Cloud Hosting:** Payload Cloud (opcional)

### Testing
- **E2E:** Playwright 1.54.1
- **Unit/Integration:** Vitest 3.2.3
- **Testing Library:** @testing-library/react 16.3.0
- **DOM Testing:** jsdom 26.1.0

### Code Quality
- **Linter:** ESLint 9.16.0
- **Formatter:** Prettier 3.4.2
- **Bundler:** Vite (para rutas de configuración)

### Procesamiento de Imágenes
- **Sharp:** 0.34.2 (procesamiento de media)

---

## 📁 Estructura del Proyecto

```
gym-clubs-admin/
├── src/
│   ├── app/                          # Next.js app directory
│   │   ├── (frontend)/               # Rutas públicas del frontend
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── page.css
│   │   │   └── styles.css
│   │   ├── (payload)/                # Rutas administrativas de Payload
│   │   │   ├── admin/                # Panel de administración
│   │   │   │   ├── importMap.js
│   │   │   │   └── [[...segments]]/
│   │   │   └── api/                  # Rutas API
│   │   │       ├── [..slug]/
│   │   │       │   ├── registro.ts
│   │   │       │   └── route.ts
│   │   │       ├── graphql/
│   │   │       └── graphql-playground/
│   │   └── customComponents/         # Componentes personalizados
│   ├── collections/                  # Definiciones de colecciones
│   │   ├── Users.ts
│   │   ├── Members.ts
│   │   ├── Attendances.ts
│   │   ├── Payments.ts
│   │   └── Media.ts
│   ├── components/                   # Componentes React reutilizables
│   │   ├── Nav/                      # Navegación principal
│   │   ├── afterNavLink/             # Enlaces después de la navegación
│   │   ├── Logout/                   # Componente de logout
│   │   └── views/                    # Vistas personalizadas
│   │       ├── PaymentsStats.tsx
│   │       └── StudentsStats.tsx
│   ├── access/                       # Lógica de control de acceso
│   │   ├── isAdmin.ts
│   │   └── isAdminOrSelf.ts
│   ├── utilities/                    # Funciones utilitarias
│   │   └── adminGroups.ts
│   ├── theme/                        # Configuración de estilos
│   │   ├── app.scss
│   │   └── colors.scss
│   ├── payload.config.ts             # Configuración principal de Payload
│   └── payload-types.ts              # Tipos generados automáticamente
├── tests/
│   ├── e2e/                          # Pruebas End-to-End
│   │   └── frontend.e2e.spec.ts
│   └── int/                          # Pruebas de integración
│       └── api.int.spec.ts
├── media/                            # Archivos multimedia
├── next.config.mjs                   # Configuración de Next.js
├── payload.config.ts                 # Configuración de Payload
├── tsconfig.json                     # Configuración de TypeScript
├── playwright.config.ts              # Configuración de Playwright
├── vitest.config.mts                 # Configuración de Vitest
├── vitest.setup.ts                   # Setup de pruebas
├── docker-compose.yml                # Orquestación de contenedores
├── Dockerfile                        # Imagen Docker personalizada
├── eslint.config.mjs                 # Configuración de ESLint
├── package.json                      # Dependencias y scripts
├── README.md                         # Documentación
└── test.env                          # Variables de entorno para tests
```

---

## 📊 Colecciones de Datos (Collections)

### 1. **Users** (Sistema)
**Propósito:** Autenticación y gestión de usuarios del panel administrativo  
**Slug:** `users`  
**Auth habilitado:** Sí

**Campos principales:**
- `name` (text) - Nombre del usuario
- `lastName` (text) - Apellido
- `email` (email) - Email único
- `roles` (select) - admin | client

**Control de acceso:**
- **Create:** Solo admins
- **Read:** Admin ve todos, otros solo a sí mismos
- **Update:** Admin actualiza todos, otros solo a sí mismos
- **Delete:** Solo admins

**Grupo administrativo:** system

---

### 2. **Members** (App)
**Propósito:** Gestión de miembros/estudiantes del club  
**Slug:** `members`  
**Búsqueda:** fullName, email

**Campos principales:**
- `fullName` (text) - Nombre completo (usado como título)
- `email` (email) - Email requerido
- `phone` (text) - Teléfono
- `joinDate` (date) - Fecha de afiliación (virtual)

**Control de acceso:**
- **Create:** Solo admins
- **Read:** Solo admins
- **Update:** Solo admins
- **Delete:** Solo admins

**Grupo administrativo:** app

---

### 3. **Attendances** (App)
**Propósito:** Registro de asistencias de miembros  
**Slug:** `attendances`  
**Nota:** No se pueden actualizar (evitar manipulación de registros)

**Campos principales:**
- `member` (relationship) - Relación con Members (hasMany)
- `checkInTime` (date) - Hora de registro (virtual, readOnly)
  - Formato: `d MMM yyy h:mm:ss a`
  - Se obtiene de `createdAt`

**Control de acceso:**
- **Create:** Solo admins
- **Read:** Solo admins
- **Update:** NO PERMITIDO (immutable)
- **Delete:** Solo admins

**Grupo administrativo:** app

---

### 4. **Payments** (App)
**Propósito:** Registro de pagos de miembros  
**Slug:** `payments`

**Campos principales:**
- `member` (relationship) - Relación con Members (hasMany)
- `amount` (number) - Monto del pago (requerido, mín: 0)
- `date` (date) - Fecha de pago (virtual, readOnly)
  - Formato: `d MMM yyy h:mm:ss a`

**Control de acceso:**
- **Create:** Solo admins
- **Read:** Solo admins
- **Update:** Solo admins
- **Delete:** Solo admins

**Grupo administrativo:** app

---

### 5. **Media** (Comentado)
**Estado:** Deshabilitado en payload.config.ts  
**Propósito:** Gestión de archivos multimedia

---

## 🔐 Sistema de Acceso

### Funciones de Control

**`isAdmin`** - Verifica si el usuario es administrador
- Ubicación: `src/access/isAdmin.ts`
- Usado en: Crear, leer, actualizar, eliminar en la mayoría de colecciones

**`isAdminOrSelfUser`** - Admin o el mismo usuario
- Ubicación: `src/access/isAdminOrSelf.ts`
- Usado en: Colección Users (lectura y actualización)

### Roles
- `admin` - Acceso completo
- `client` - Acceso limitado

---

## 🎨 Componentes Frontend

### Navegación (`components/Nav/`)
- `index.tsx` - Componente principal de navegación
- `index.client.tsx` - Versión client-side
- `getNavPrefs.ts` - Preferencias de navegación
- `navIconMap.ts` - Mapeo de íconos
- `NavHamburger/index.tsx` - Menú hamburguesa responsive
- `NavWrapper/index.tsx` - Wrapper para la navegación

### Vistas Personalizadas (`components/views/`)
- `StudentsStats.tsx` - Estadísticas de estudiantes
- `PaymentsStats.tsx` - Estadísticas de pagos
- `paymentsStudents.css` - Estilos compartidos

### Enlaces Adicionales (`components/afterNavLink/`)
- `LinkToStudentsStatsView.tsx` - Enlace a estadísticas de estudiantes
- `LinkToPaymentsStatsView.tsx` - Enlace a estadísticas de pagos

### Logout (`components/Logout/`)
- `index.tsx` - Componente de logout

---

## 🛠️ Scripts y Comandos

```bash
# Desarrollo
pnpm dev                    # Inicia servidor en modo desarrollo
pnpm devsafe               # Limpia .next y reinicia en desarrollo

# Producción
pnpm build                 # Compila para producción
pnpm start                 # Inicia servidor de producción

# Linting y Formato
pnpm lint                  # Ejecuta ESLint
pnpm prettier              # Formatea código (si está configurado)

# Generación de Tipos
pnpm generate:types        # Genera tipos de Payload
pnpm generate:importmap    # Genera import map de Payload

# Testing
pnpm test                  # Ejecuta todos los tests (int + e2e)
pnpm test:int              # Tests de integración (Vitest)
pnpm test:e2e              # Tests E2E (Playwright)

# Payload CLI
pnpm payload               # Acceso directo a comandos de Payload
```

---

## 📝 Configuración Principal

### `payload.config.ts`
- **Idiomas soportados:** Inglés (en), Español (es)
- **Base de datos:** MongoDB (mongooseAdapter)
- **Editor:** Lexical para contenido enriquecido
- **Almacenamiento:** Payload Cloud (payloadCloudPlugin)
- **Imagen sharp:** 0.34.2

**Componentes personalizados:**
- Nav personalizado
- Botón Logout personalizado
- (Comentados) Vistas de estadísticas

**Grupos administrativos:**
- `system` - Usuarios
- `app` - Miembros, Asistencias, Pagos

### `tsconfig.json`
- **Target:** ES2022
- **Module:** esnext
- **Strict mode:** Habilitado
- **Rutas alias:** `@/*` → `./src/*`, `@payload-config` → `./src/payload.config.ts`

### `docker-compose.yml`
**Servicios:**
1. **payload** - Node 18 Alpine
   - Puerto: 3000
   - Instala pnpm y ejecuta `pnpm dev`
   - Depende de: mongo

2. **mongo** - MongoDB
   - Puerto: 27017
   - Storage: wiredTiger
   - Volume persistente: `/data/db`

---

## 🌐 Endpoints API

### GraphQL
- **URL:** `/api/graphql`
- **Playground:** `/api/graphql-playground`

### REST

#### POST `/api/registro`
**Propósito:** Registrar asistencia de un miembro en la colección `attendances`

**Autenticación:** ✅ Requerida (usuario debe estar logueado)

**Body (JSON):**
```json
{
  "id": "member-id-aqui"
}
```

**Parámetros:**
- `id` (string, requerido) - ID del miembro a registrar asistencia

**Respuesta exitosa (200):**
```json
{
  "message": "Asistencia registrada correctamente",
  "status": "success",
  "data": {
    "id": "attendance-id",
    "member": ["member-id"],
    "createdAt": "2025-11-19T10:30:00.000Z",
    "updatedAt": "2025-11-19T10:30:00.000Z"
  }
}
```

**Errores:**

| Código | Caso | Respuesta |
|--------|------|-----------|
| 401 | Usuario no autenticado | `{"error": "No autorizado", "status": "error", "message": "Debes estar logueado..."}` |
| 400 | Campo `id` falta | `{"error": "El campo id es requerido", "status": "error"}` |
| 500 | Error en base de datos | `{"error": "Error al procesar la solicitud", "status": "error", "details": "..."}` |

**Ejemplo con cURL:**
```bash
curl -X POST http://localhost:3000/api/registro \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"id": "miembro-id-aqui"}'
```

**Implementación:**
- **Archivo:** `src/app/(payload)/api/[...slug]/registro.ts`
- **Controller:** `src/controllers/attendanceController.ts`
- **Lógica:**
  1. Valida autenticación del usuario
  2. Parsea el body JSON
  3. Valida que exista el campo `id`
  4. Crea registro en colección `attendances`
  5. Retorna el registro creado

**Funciones del Controller:**
- `validateAuthentication()` - Verifica que el usuario esté logueado
- `validateRequestBody()` - Valida presencia del campo `id`
- `createAttendanceRecord()` - Crea el registro en la BD
- `handleAttendanceRegistration()` - Orquesta todo el flujo

---

#### GET/POST/PATCH/PUT/DELETE `/api/[...slug]`
**Propósito:** API REST de Payload para CRUD de colecciones

**Nota:** Generada automáticamente por Payload CMS

---

## 📦 Variables de Entorno

**Archivo:** `.env`

**Variables esperadas:**
- `MONGODB_URI` - Conexión a MongoDB
- `DATABASE_URL` - (Alternativa/Payload Cloud)
- `PAYLOAD_CLOUD_...` - Credenciales de Payload Cloud

---

## 🧪 Testing

### Vitest (Integration Tests)
- Configuración: `vitest.config.mts`
- Setup: `vitest.setup.ts`
- Tests: `tests/int/api.int.spec.ts`
- Comando: `pnpm test:int`

### Playwright (E2E Tests)
- Configuración: `playwright.config.ts`
- Tests: `tests/e2e/frontend.e2e.spec.ts`
- Comando: `pnpm test:e2e`
- Browser testing para frontend completo

---

## 🎯 Patrones y Mejores Prácticas

### 1. **Bilingüismo**
- Labels y mensajes en inglés y español
- Configuración: `{ en: 'text', es: 'texto' }`

### 2. **Control de Acceso Granular**
- Funciones reutilizables en `src/access/`
- Aplicadas a nivel de colección
- Operaciones CRUD independientes

### 3. **Campos Virtuales**
- `checkInTime` y `date` son virtuales (readOnly)
- Se generan a partir de `createdAt`
- Evita manipulación de datos críticos

### 4. **Relationships**
- Members → Attendances (hasMany)
- Members → Payments (hasMany)
- Permite rastreo de asistencias y pagos por miembro

### 5. **Agrupación Administrativa**
- **system:** Configuración del sistema
- **app:** Datos de negocio

---

## 🚀 Requisitos del Sistema

- **Node.js:** 18.20.2 o superior, 20.9.0+
- **pnpm:** 9 o 10+
- **Docker/Docker Compose:** (Opcional, para desarrollo local)
- **MongoDB:** Local o Payload Cloud

---

## 📊 Características Principales

1. **Autenticación y Autorización**
   - Sistema de roles (admin, client)
   - Control de acceso a nivel de operación

2. **Gestión de Miembros**
   - Perfil completo de miembros
   - Información de contacto
   - Fecha de afiliación

3. **Registro de Asistencias**
   - Marcado de entrada automático
   - Immutable (no se puede modificar)
   - Asociación a miembros

4. **Gestión de Pagos**
   - Registro de transacciones
   - Seguimiento de deudas/pagos
   - Montos y fechas

5. **Estadísticas**
   - Vistas de estadísticas de estudiantes
   - Vistas de estadísticas de pagos
   - Componentes comentados (framework listo)

6. **Panel Administrativo**
   - Interfaz Payload CMS
   - Navegación personalizada
   - GraphQL + REST API

---

## 🔄 Flujos de Desarrollo

### Agregar Nueva Colección
1. Crear archivo en `src/collections/NuevaColeccion.ts`
2. Implementar `CollectionConfig`
3. Importar en `payload.config.ts`
4. Correr `pnpm generate:types`

### Agregar Control de Acceso
1. Crear función en `src/access/`
2. Importar en la colección
3. Aplicar a fields o a nivel de colección

### Personalizar Componentes UI
1. Crear componente en `src/components/`
2. Registrar en `payload.config.ts` bajo `admin.components`
3. Path relativo: `./components/MiComponente#NombreExportacion`

---

## 📚 Recursos Útiles

- **Payload CMS Docs:** https://payloadcms.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **MongoDB Docs:** https://docs.mongodb.com
- **GraphQL API:** Ver `/api/graphql-playground`

---

## 🏁 Próximos Pasos para Desarrollo

### Completados ✅
- [x] Endpoint `/api/registro` POST para registro de asistencias
- [x] Refactorización del endpoint en controllers
- [x] Validación de autenticación
- [x] Validación de body requerido
- [x] Manejo completo de errores

### Pendientes
- [ ] Descomentar vistas de estadísticas cuando estén listas
- [ ] Habilitar colección Media si es necesario
- [ ] Implementar más validaciones de acceso granular
- [ ] Expandir sistema de pagos (facturación, recibos)
- [ ] Dashboard mejorado
- [ ] Reportes automatizados
- [ ] Sistema de notificaciones
- [ ] Tests unitarios para el controller
- [ ] Tests E2E para el endpoint `/api/registro`

---

**Última actualización:** Noviembre 19, 2025
