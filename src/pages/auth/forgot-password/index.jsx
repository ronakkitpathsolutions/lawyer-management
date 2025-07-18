import { AUTH_ROUTES } from "@/routing/routes";
import useForgotPassword from "./use-forgot-password";
import { ICONS } from "@/assets/icons";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const ForgotPassword = () => {
  const {
    methods,
    fieldsData,
    onSubmit,
    loading,
    notification,
  } = useForgotPassword();

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-center">
          Forgot Password?
        </h2>
        <p className="text-sm text-center text-muted-foreground max-w-md">
          No worries! Enter your email address below and we'll send you a secure link to reset your password.
        </p>
      </div>
      
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          {notification}

          {fieldsData.map((field) => (
            <FormField
              key={field.id}
              control={methods.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>
                    {field.label}
                    {field.withAsterisk && <span className="text-destructive ml-1">*</span>}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      autoFocus={field.focus}
                      {...formField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Sending reset link...
              </>
            ) : (
              <>
                <ICONS.IconMailForward className="w-4 h-4 mr-2" />
                Send Reset Link
              </>
            )}
          </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm">
              Remember your password?{" "}
              <Link
                to={AUTH_ROUTES.login.url}
                className="text-primary hover:underline"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;