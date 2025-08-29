
import { SignUpForm } from '@/components/sign-up-form';

export default function SignUpPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <SignUpForm {...props} />
  ); 
}