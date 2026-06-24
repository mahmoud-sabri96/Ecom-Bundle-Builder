

type OutlineButtonProps = {
  label: string,
  className?: string,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function OutlineButton({
  label,
  ...props
}: OutlineButtonProps) {
  return (
    <button
      className={`border hover:text-white hover:bg-primary transition-all duration-200 ease-in-out 
        cursor-pointer mt-3.75 text-lg mx-auto font-semibold text-primary border-primary rounded-[7px] py-1.5 px-6 ${props?.className}`
      }
      {...props}
    >
      {label}
    </button>
  )
}
