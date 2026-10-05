import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-ink-900 md:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 px-4 py-5 md:px-8 md:py-7">
        <div className="mx-auto w-full max-w-[1400px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
