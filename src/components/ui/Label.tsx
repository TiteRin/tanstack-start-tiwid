import clsx from "clsx";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({className, ...props}: LabelProps) {
    return <label className={clsx("block text-sm font-medium font-body", className)} {...props} />
}