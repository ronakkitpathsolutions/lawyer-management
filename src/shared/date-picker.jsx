import * as React from "react";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date) {
  if (!date) {
    return "";
  }
  return dayjs(date).format("MMMM DD, YYYY");
}

function isValidDate(date) {
  if (!date) {
    return false;
  }
  return dayjs(date).isValid();
}

const DatePicker = React.forwardRef(({ 
  value, 
  onChange, 
  placeholder = "Pick a date",
  className,
  disabled = false,
  ...props 
}, ref) => {
  const [open, setOpen] = React.useState(false);
  const initialDate = value ? dayjs(value).toDate() : undefined;
  const [date, setDate] = React.useState(initialDate);
  const [month, setMonth] = React.useState(initialDate);
  const [inputValue, setInputValue] = React.useState(formatDate(initialDate));

  // Update local state when value prop changes
  React.useEffect(() => {
    const newDate = value ? dayjs(value).toDate() : undefined;
    setDate(newDate);
    setMonth(newDate);
    setInputValue(formatDate(newDate));
  }, [value]);

  return (
    <div className="relative flex gap-2">
      <Input
        ref={ref}
        value={inputValue}
        placeholder={placeholder}
        className={cn("bg-background pr-10", className)}
        disabled={disabled}
        onChange={(e) => {
          const inputDate = new Date(e.target.value);
          setInputValue(e.target.value);
          if (isValidDate(inputDate)) {
            const formattedDate = dayjs(inputDate).format("YYYY-MM-DD");
            setDate(inputDate);
            setMonth(inputDate);
            onChange?.(formattedDate);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        {...props}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            disabled={disabled}
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            fromYear={1900}
            toYear={new Date().getFullYear()}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                const today = new Date();
                today.setHours(23, 59, 59, 999);
                
                // Don't allow future dates
                if (selectedDate > today) {
                  return;
                }
                
                const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
                setDate(selectedDate);
                setInputValue(formatDate(selectedDate));
                onChange?.(formattedDate);
                setOpen(false);
              }
            }}
            disabled={(date) => {
              const today = new Date();
              today.setHours(23, 59, 59, 999);
              return date > today;
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});

DatePicker.displayName = "DatePicker";

export default DatePicker;
