import {useState} from "react";
import {Button} from "@/components/ui/Button.tsx";
import {Input} from "@/components/ui/Input.tsx";
import {Label} from "@/components/ui/Label.tsx";

type LoginFormProps = {
    handleSignIn: (email: string, password: string) => void;
    error?: string;
}

export default function LoginForm({handleSignIn, error}: LoginFormProps) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSignIn(email, password);
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Sign in</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <Label>E-mail</Label>
                    <Input
                        type="email"
                        data-testid="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        data-testid="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <Button type="submit" className={"w-full"}>
                    Sign in
                </Button>
            </form>
        </>
    )
};