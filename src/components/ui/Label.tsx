import clsx from "clsx";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({className, ...props}: LabelProps) {
    return <label className={clsx("block text-sm font-medium dynapuff-400", className)} {...props} />
}