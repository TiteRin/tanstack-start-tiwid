import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
};

export function Button({
                           variant = 'primary',
                           size = 'md',
                           className, ...props
                       }: ButtonProps) {

    return (
        <button
            className={clsx(
                "px-4 py-2 rounded-xl font-semibold transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-yellow-300",
                {
                    "bg-yellow-400 text-black hover:scale-105 active:scale-95":
                        variant === "primary",
                    "border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black":
                        variant === "ghost",
                },
                {
                    "text-sm": size === "sm",
                    "text-base": size === "md",
                    "text-lg": size === "lg",
                },
                className
            )}
            {...props}
        />
    )
}

