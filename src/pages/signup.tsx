import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-[100dvh] bg-blue-100">
      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/login"
        // afterSignUpUrl="/dashboard"
      />
    </div>
  );
}
