# Frontend - Foca Docs

Astro 6 + Tailwind CSS | Portal de documentación con rendering SSR

---

## Requisitos

- **Node.js** 18+
- **npm** 9+

---

## Instalación

```bash
# Instalar dependencias
npm install --legacy-peer-deps
```

> **¿Por qué `--legacy-peer-deps`?**
> 
> Astro 6 y algunas dependencias pueden tener conflictos en las versiones de peer dependencies. Este flag permite resolver las dependencias ignorando esos conflictos, manteniendo la compatibilidad con el proyecto.

---

## Ejecutar

```bash
# Desarrollo (accesible desde otros dispositivos)
npm run dev -- --host

# Build de producción
npm run build

# Preview del build
npm run preview
```

El frontend estará disponible en:
- Local: `http://localhost:4321`
- Red local: `http://<tu-ip>:4321`

---

## Configuración

### Variables de Entorno

Crear `.env` en la raíz del proyecto:

```env
# URL del backend API
PUBLIC_API_URL=http://localhost:8080/api
```

### API Base

El frontend consume los siguientes endpoints del backend:

| Endpoint | Uso |
|----------|-----|
| `GET /api/articles` | Lista de artículos |
| `GET /api/articles/{slug}` | Contenido de artículo |
| `GET /api/articles/search?q=` | Búsqueda |
| `GET /api/sections` | Secciones |

---

## Arquitectura

### Rendering

- **SSR (Server-Side Rendering)** - Astro en modo `server`
- Contenido Markdown renderizado en el servidor
- JavaScript minimalista para interactividad

### Estructura

```
src/
├── layouts/
│   ├── Layout.astro         # HTML base + theme init
│   └── DocsLayout.astro    # Layout 3 columnas
├── pages/
│   ├── index.astro          # Home + Novedades + Soporte
│   ├── [slug].astro         # Artículo individual
│   └── section/[section].astro  # Lista por sección
├── lib/
│   ├── api.ts               # Cliente API
│   └── markdown.ts          # Pipeline de render
└── styles/
    └── globals.css          # Estilos base (Tailwind)
```

### Componentes Principales

| Componente | Descripción |
|------------|-------------|
| `DocsLayout` | Layout de 3 columnas (sidebar, contenido, TOC) |
| `Header` | Barra superior con toggle de tema |
| `Sidebar` | Navegación con secciones dinámicas |
| `TableOfContents` | Índice con scroll-spy |

### Interactividad (Vanilla JS)

| Funcionalidad | Tecnología |
|---------------|------------|
| Cambio de vista | Vanilla JS (`data-view`) |
| Búsqueda | Fetch API + debounce |
| Toggle tema | localStorage + class toggle |
| Sidebar mobile | Transform + overlay |
| TOC scroll-spy | IntersectionObserver |

---

## Diseño

**Estética:** Clean Technical - foco en legibilidad y navegación clara

### Colores

| Color | Uso |
|-------|-----|
| Orange `#f97316` | Accentos, links, elementos activos |
| Gray scales | Texto, bordes, fondos |
| Dark mode | Toggle manual + system preference |

### Tipografía

- Sistema de fuentes nativas para rendimiento
- Line-height amplio (`leading-7`) para readability
- Jerarquía clara con tamaños y pesos

---

## Estructura del Código

### Código en Inglés, Comentarios en Español

```astro
---
// Fetch data server-side
const articles = await getArticles();
---

<!-- Render con componentes atómicos -->
<article>
  <h1>{article.title}</h1>
  <div set:html={html} />
</article>
```

### Props Tipados

```astro
---
interface Props {
  title: string;
  error?: boolean;
}

const { title, error = false } = Astro.props;
---
```

### Scripts Isolados

```astro
<script>
  // Solo afecta al componente actual
  const btn = document.getElementById('mi-boton');
  btn?.addEventListener('click', handleClick);
</script>
```

---

## Licencia

MIT - ver [LICENSE](../LICENSE) en la raíz del proyecto
