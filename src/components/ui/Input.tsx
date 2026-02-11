import clsx from "clsx";

type InputProps = React.ComponentPropsWithoutRef<'input'>;

export function Input({className, ...props}: InputProps) {
    return <input
        className={clsx(
            "w-full px-3 py-2 rounded-xl",
            "border border-yellow-400/40 text-primary",
            "focus:outline-none focus:ring-2 focus:ring-yellow-300",
            "placeholder:text-primary/50",
            className
        )}
        {...props}
    />
}

export type {InputProps}