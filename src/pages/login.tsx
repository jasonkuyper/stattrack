import { SignIn } from "@clerk/nextjs";

export default function LogInPage() {
  return (
    <div className="flex justify-center items-center h-[100dvh] bg-blue-100">
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/signup"
        afterSignInUrl="/dashboard"
      />
    </div>
  );
}
