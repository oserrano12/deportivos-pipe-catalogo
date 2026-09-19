'use client'

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ComboboxProps {
  options: { id: string, name: string }[]
  value?: string
  onChange: (value: string) => void
  name: string
  placeholder?: string
}

export function Combobox({ options, value, onChange, name, placeholder = "Seleccionar..." }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selectedValue, setSelectedValue] = React.useState(value || "")
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  // Sync internal state with external value
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  // Handle click outside to close dropdown
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredOptions = options.filter(opt => 
    opt.name.toLowerCase().includes(search.toLowerCase())
  )

  const selectedOption = options.find(opt => opt.id === selectedValue)

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {/* Hidden input for HTML form submission */}
      <input type="hidden" name={name} value={selectedValue} />
      
      <div 
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-text",
          open && "ring-2 ring-ring outline-none"
        )}
        onClick={() => setOpen(true)}
      >
        <input 
          className="bg-transparent outline-none flex-1 placeholder:text-muted-foreground w-full"
          placeholder={selectedOption ? selectedOption.name : placeholder}
          value={open ? search : (selectedOption ? selectedOption.name : "")}
          onChange={(e) => {
            setSearch(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
        />
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </div>

      {open && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No se encontraron resultados.
            </div>
          ) : (
            <div className="p-1">
              {filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    selectedValue === option.id && "bg-accent/50 font-bold"
                  )}
                  onClick={() => {
                    setSelectedValue(option.id)
                    onChange(option.id)
                    setSearch("")
                    setOpen(false)
                  }}
                >
                  {option.name}
                  {selectedValue === option.id && (
                    <Check className="absolute right-2 h-4 w-4 text-primary" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
