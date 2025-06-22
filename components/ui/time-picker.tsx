"use client"

import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { cn } from "@/lib/utils"

interface TimePickerProps {
    value: string
    onChange: (value: string) => void
    availableSlots?: string[]
    className?: string
}

export function TimePicker({
    value,
    onChange,
    availableSlots,
    className,
}: TimePickerProps) {
    const [open, setOpen] = React.useState(false)

    // Generate time slots from 9 AM to 9 PM in 30-minute increments
    const allTimeSlots = React.useMemo(() => {
        const slots = []
        for (let hour = 9; hour <= 21; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
                slots.push(timeString)
            }
        }
        return slots
    }, [])

    // Filter available slots if provided, otherwise use all slots
    const timeSlots = availableSlots && availableSlots.length > 0
        ? allTimeSlots.filter(slot => availableSlots.includes(slot))
        : allTimeSlots

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-between text-left font-normal",
                        !value && "text-muted-foreground",
                        className
                    )}
                >
                    {value || "Select time"}
                    {open ? (
                        <ChevronUp className="ml-2 h-4 w-4 opacity-50" />
                    ) : (
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="max-h-60 overflow-y-auto">
                    {timeSlots.map((time) => (
                        <Button
                            key={time}
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                value === time && "bg-accent"
                            )}
                            onClick={() => {
                                onChange(time)
                                setOpen(false)
                            }}
                        >
                            {time}
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}