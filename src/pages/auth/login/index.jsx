import { AUTH_ROUTES } from "@/routing/routes";
import useLogin from "./use-login";
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

const Login = () => {
  const {
    methods,
    fieldsData,
    onSubmit,
    loading,
    notification,
  } = useLogin();

  return (
    <div className="w-full">
      <div className="flex flex-col items-start gap-2 mb-8">
        <h2 className="text-3xl font-bold">
          Welcome Back
        </h2>
        <p className="text-base text-muted-foreground">
          Please log in to your account to continue.
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
                <FormItem >
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

          <div className="text-right -mt-4">
            <Link
              to={AUTH_ROUTES.forgotPassword.url}
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Logging in...
              </>
            ) : (
              <>
                <ICONS.IconLogin2 className="w-4 h-4 mr-2" />
                Login
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;