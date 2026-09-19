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

export function Combobox({ options, value, onChange, name, placeholder = "" }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [selectedValue, setSelectedValue] = React.useState(value || "")
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredOptions = options.filter(opt => 
    opt.name.toLowerCase().includes(search.toLowerCase())
  )

  React.useEffect(() => {
    if (open) setActiveIndex(0)
    else setActiveIndex(-1)
  }, [search, open])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true)
      e.preventDefault()
      return
    }

    if (!open) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
        const selected = filteredOptions[activeIndex]
        setSelectedValue(selected.id)
        onChange(selected.id)
        setSearch("")
        setOpen(false)
      }
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false)
    }
  }

  const selectedOption = options.find(opt => opt.id === selectedValue)

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input type="hidden" name={name} value={selectedValue} />
      
      <div 
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-text transition-colors",
          open ? "ring-2 ring-ring outline-none" : "focus-within:ring-2 focus-within:ring-ring focus-within:outline-none"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <input 
          ref={inputRef}
          className="bg-transparent outline-none flex-1 placeholder:text-muted-foreground w-full"
          placeholder={selectedOption ? selectedOption.name : placeholder}
          value={open ? search : (selectedOption ? selectedOption.name : "")}
          onChange={(e) => {
            setSearch(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          aria-expanded={open}
          role="combobox"
          aria-controls={`${name}-listbox`}
        />
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </div>

      {open && (
        <div id={`${name}-listbox`} role="listbox" className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No se encontraron resultados.
            </div>
          ) : (
            <div className="p-1">
              {filteredOptions.map((option, idx) => (
                <div
                  key={option.id}
                  role="option"
                  aria-selected={selectedValue === option.id}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-2 pr-8 text-sm outline-none transition-colors",
                    activeIndex === idx ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
                    selectedValue === option.id && "font-bold"
                  )}
                  onClick={() => {
                    setSelectedValue(option.id)
                    onChange(option.id)
                    setSearch("")
                    setOpen(false)
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
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
