import * as React from "react"
import { Check, ChevronDown, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const Autocomplete = React.forwardRef(({
  className,
  options = [],
  value = "",
  onChange,
  placeholder = "Select an item...",
  searchPlaceholder = "Search...",
  emptyText = "No items found.",
  disabled = false,
  allowClear = true,
  filterFunction,
  displayProperty = "name",
  valueProperty = "value",
  ...props
}, ref) => {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  // Find selected option
  const selectedOption = React.useMemo(() => {
    return options.find(option => option[valueProperty] === value)
  }, [options, value, valueProperty])

  // Filter available options based on search
  const availableOptions = React.useMemo(() => {
    if (filterFunction) {
      return filterFunction(options, searchValue)
    }
    
    return options.filter(option => 
      option[displayProperty]?.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [options, searchValue, filterFunction, displayProperty])

  const handleSelect = React.useCallback((optionValue) => {
    onChange?.(optionValue)
    setOpen(false)
    setSearchValue("")
  }, [onChange])

  const handleClear = React.useCallback((event) => {
    event.stopPropagation()
    onChange?.("")
    setSearchValue("")
  }, [onChange])

  const handleOpenChange = React.useCallback((newOpen) => {
    setOpen(newOpen)
    if (!newOpen) {
      setSearchValue("")
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback((event) => {
    if (event.key === "Escape") {
      setOpen(false)
      setSearchValue("")
    }
  }, [])

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left font-normal h-9 px-3 py-2",
            !selectedOption && "text-muted-foreground",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          {...props}
        >
          <span className="truncate">
            {selectedOption ? selectedOption[displayProperty] : placeholder}
          </span>
          <div className="flex items-center gap-2 ml-2 shrink-0">
            {selectedOption && allowClear && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-accent"
                tabIndex={-1}
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0"
        align="start"
      >
        <div className="flex flex-col">
          {/* Search Input */}
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          
          {/* Options List */}
          <div className="max-h-[200px] overflow-auto p-1">
            {availableOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyText}
              </div>
            ) : (
              availableOptions.map((option) => (
                <div
                  key={option[valueProperty]}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    value === option[valueProperty] && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => handleSelect(option[valueProperty])}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleSelect(option[valueProperty])
                    }
                  }}
                  tabIndex={0}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option[valueProperty] ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{option[displayProperty]}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
})

Autocomplete.displayName = "Autocomplete"

export { Autocomplete }
