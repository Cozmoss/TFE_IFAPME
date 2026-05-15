export default function Badges({children}) {
  return (
    <div className="inline-flex items-center rounded-full border border-(--accent)/20 px-3 py-1 text-xs font-semibold bg-(--accent)/5 text-(--accent)">{children}</div>
  )
}
