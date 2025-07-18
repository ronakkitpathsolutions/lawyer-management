import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"

const CustomDrawer = ({ 
  open = false, 
  handleClose, 
  title = "Drawer", 
  children,
  side = "right",
  className = "",
  ...props 
}) => {
  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side={side} className={`overflow-hidden ${className}`} {...props}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CustomDrawer