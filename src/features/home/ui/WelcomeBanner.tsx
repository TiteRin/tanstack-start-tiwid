import clsx from "clsx";

interface WelcomeBannerProps {
    name: string
}

export default function WelcomeBanner({name}: WelcomeBannerProps) {
    return (
        <header className={clsx("text-center space-y-2")}>
            <h1 className={clsx("text(--text-primary)")}>Welcome, {name}!</h1>
            <p className={clsx("text(--text-secondary)")}>Ready to celebrate another win?</p>
        </header>
    )
}