import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import ThemeSelector from './ThemeSelector'
import AccentSelector from './AccentSelector'

interface NavItem {
  to: string
  label: string
  emoji: string
  soon?: boolean
  /** Si tiene hijos, el item no navega: despliega su sub-indice. */
  children?: NavItem[]
}

const NAV: NavItem[] = [
  { to: '/', label: 'Comidas', emoji: '🍲' },
  { to: '/menus', label: 'Menus', emoji: '🗓️', soon: true },
  { to: '/compras', label: 'Compras', emoji: '🛒', soon: true },
  {
    to: '/configuracion',
    label: 'Configuracion',
    emoji: '⚙️',
    children: [
      { to: '/configuracion/unidades', label: 'Medidas', emoji: '⚖️' },
    ],
  },
]

const ACTIVE = 'bg-gray-100 text-gray-900 dark:bg-white/[0.06] dark:text-white'
const IDLE =
  'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.04] dark:hover:text-gray-100'

/** Sub-indice de una seccion. Se reutiliza en movil y escritorio. */
function SubNav({ items, className = '' }: { items: NavItem[]; className?: string }) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      {items.map((child) => (
        <NavLink
          key={child.to}
          to={child.to}
          className={({ isActive }) =>
            [
              'flex items-center gap-2.5 rounded-lg py-2 pl-3 pr-2 text-[0.9375rem] font-medium transition md:ml-7',
              isActive ? ACTIVE : IDLE,
            ].join(' ')
          }
        >
          <span className="text-sm opacity-80">{child.emoji}</span>
          <span className="truncate">{child.label}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default function Sidebar() {
  const { pathname } = useLocation()
  // Seccion desplegada. Se abre sola si ya estas navegando dentro de ella.
  const [openKey, setOpenKey] = useState<string | null>(null)

  useEffect(() => {
    const section = NAV.find(
      (item) => item.children && pathname.startsWith(item.to),
    )
    if (section) setOpenKey(section.to)
  }, [pathname])

  const openSection = NAV.find((item) => item.to === openKey && item.children)

  return (
    <aside className="flex shrink-0 flex-col gap-1 border-b border-black/[0.06] bg-gray-50/60 px-3 py-3 dark:border-white/[0.06] dark:bg-ink-800 md:sticky md:top-0 md:h-screen md:w-64 md:border-b-0 md:border-r md:px-4 md:py-6">
      <div className="mb-3 flex items-center gap-2.5 px-2 md:mb-7">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-lg">
          🍲
        </span>
        <p className="flex-1 text-base font-semibold tracking-tight text-gray-900 dark:text-gray-50">
          Wasi Kamachi
        </p>
        <div className="flex items-center gap-1.5 md:hidden">
          <AccentSelector />
          <ThemeSelector />
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        <div className="flex gap-1 md:flex-col md:gap-1">
          {NAV.map((item) => {
            // Movil: emoji sobre etiqueta (no caben 4 items en una fila).
            // Escritorio: lista vertical clasica.
            const shape = [
              'flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-2 py-2 text-xs font-medium transition',
              'md:flex-none md:flex-row md:gap-3 md:px-3 md:py-2.5 md:text-[0.9375rem]',
            ].join(' ')

            const label = (
              <span className="w-full truncate text-center md:flex-1 md:text-left">
                {item.label}
              </span>
            )

            if (item.children) {
              const open = openKey === item.to
              const inside = pathname.startsWith(item.to)
              return (
                <div key={item.to} className="contents md:block">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenKey(open ? null : item.to)}
                    className={[shape, 'w-full', inside ? ACTIVE : IDLE].join(' ')}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    {label}
                    <span
                      aria-hidden
                      className={[
                        'hidden text-[0.625rem] text-gray-400 transition-transform md:inline',
                        open ? 'rotate-90' : '',
                      ].join(' ')}
                    >
                      ▶
                    </span>
                  </button>

                  {/* Escritorio: el sub-indice va justo debajo de su seccion. */}
                  {open && <SubNav items={item.children} className="mt-0.5 hidden md:flex" />}
                </div>
              )
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [shape, isActive ? ACTIVE : IDLE].join(' ')
                }
              >
                <span className="text-lg">{item.emoji}</span>
                {label}
                {item.soon && (
                  <span className="hidden text-xs text-gray-400 dark:text-gray-600 md:inline">
                    pronto
                  </span>
                )}
              </NavLink>
            )
          })}
        </div>

        {/* Movil: el sub-indice se despliega como panel bajo la barra. */}
        {openSection?.children && (
          <SubNav items={openSection.children} className="md:hidden" />
        )}
      </nav>

      <div className="mt-auto hidden flex-col gap-3 px-1 pt-6 md:flex">
        <ThemeSelector />
        <AccentSelector />
      </div>
    </aside>
  )
}
