import { AUTH_ROUTES } from "@/routing/routes";
import useResetPassword from "./use-reset-password";
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
import { Loader2 } from "lucide-react";
import { Link } from "react-router";

const ResetPassword = () => {
  const {
    methods,
    fieldsData,
    onSubmit,
    loading,
    notification,
    refreshToken,
  } = useResetPassword();

  // Don't render anything if no refresh token
  if (!refreshToken) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-center">
          Reset Your Password
        </h2>
        <p className="text-sm text-center text-muted-foreground max-w-md">
          Please enter your new password below. Your password will be updated and you'll be automatically logged in.
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
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Resetting password...
                </>
              ) : (
                <>
                  <ICONS.IconLockPassword className="w-4 h-4 mr-2" />
                  Reset Password
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

export default ResetPassword;