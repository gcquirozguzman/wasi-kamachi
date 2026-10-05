import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import RecipeListPage from './pages/RecipeListPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import ComingSoonPage from './pages/ComingSoonPage'
import UnitsSettingsPage from './pages/UnitsSettingsPage'
import { ThemeProvider } from './theme/ThemeProvider'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <RecipeListPage /> },
      {
        path: 'configuracion',
        children: [
          // Configuracion no tiene pagina propia: su indice vive en el menu
          // lateral, asi que entra directo a la primera seccion.
          { index: true, element: <Navigate to="unidades" replace /> },
          { path: 'unidades', element: <UnitsSettingsPage /> },
        ],
      },
      { path: 'recetas/:id', element: <RecipeDetailPage /> },
      {
        path: 'menus',
        element: (
          <ComingSoonPage
            title="Planificacion de menus"
            description="Aqui podras armar el menu de la semana arrastrando tus comidas."
            emoji="🗓️"
          />
        ),
      },
      {
        path: 'compras',
        element: (
          <ComingSoonPage
            title="Lista de compras"
            description="Se generara automaticamente a partir de los menus que planifiques."
            emoji="🛒"
          />
        ),
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
