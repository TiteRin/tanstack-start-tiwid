import clsx from "clsx";

type InputProps = React.ComponentPropsWithoutRef<'input'>;

export function Input({className, ...props}: InputProps) {
    return <input
        className={clsx("px-4 py-2 rounded-xl border border-yellow-400 text-black " +
            "focus:outline-none focus:ring-2 focus:ring-yellow-300", className)} {...props} />
}

export type {InputProps}