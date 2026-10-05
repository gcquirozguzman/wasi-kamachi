interface Props {
  title: string
  description: string
  emoji: string
}

export default function ComingSoonPage({ title, description, emoji }: Props) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <span className="text-4xl">{emoji}</span>
      <h1 className="mt-3 text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-50">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">{description}</p>
      <span className="mt-3 text-xs text-gray-400 dark:text-gray-500">
        Proximamente
      </span>
    </div>
  )
}
