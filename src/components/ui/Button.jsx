export default function Button({children, variant = "default", className='', ...props}) {
    const base =
		"inline-flex items-center justify-center gap-2 px-4 py-2 cursor-pointer whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

    const variants = {
		default: "bg-(--primary) text-(--primary-foreground) hover:bg-(--primary)/90",
		secondary:
			"bg-(--secondary) text-(--secondary-foreground) hover:bg-(--secondary)/80",
		outline:
			"border border-(--border) bg-(--background) hover:bg-(--accent) hover:text-(--foreground)",
		destructive:
			"bg-(--destructive) text-(--destructive-foreground) hover:bg-(--destructive)/90",
		ghost: "hover:bg-(--accent)",
		link: "text-(--primary) underline-offset-4 hover:underline",
	};
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>
  )
}
