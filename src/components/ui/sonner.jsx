import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:bg-green-50 group-[.toaster]:text-green-700 group-[.toaster]:border-green-200 dark:group-[.toaster]:bg-green-950/20 dark:group-[.toaster]:text-green-400 dark:group-[.toaster]:border-green-800/30",
          error: "group-[.toaster]:bg-red-50 group-[.toaster]:text-red-700 group-[.toaster]:border-red-200 dark:group-[.toaster]:bg-red-950/20 dark:group-[.toaster]:text-red-400 dark:group-[.toaster]:border-red-800/30",
          warning: "group-[.toaster]:bg-yellow-50 group-[.toaster]:text-yellow-700 group-[.toaster]:border-yellow-200 dark:group-[.toaster]:bg-yellow-950/20 dark:group-[.toaster]:text-yellow-400 dark:group-[.toaster]:border-yellow-800/30",
          info: "group-[.toaster]:bg-blue-50 group-[.toaster]:text-blue-700 group-[.toaster]:border-blue-200 dark:group-[.toaster]:bg-blue-950/20 dark:group-[.toaster]:text-blue-400 dark:group-[.toaster]:border-blue-800/30",
          loading: "group-[.toaster]:bg-gray-50 group-[.toaster]:text-gray-700 group-[.toaster]:border-gray-200 dark:group-[.toaster]:bg-gray-950/20 dark:group-[.toaster]:text-gray-400 dark:group-[.toaster]:border-gray-800/30",
        },
      }}
      {...props} />
  );
}

export { Toaster }
