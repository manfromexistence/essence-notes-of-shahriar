import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface CharacterLimitInputProps {
    id?: string
    label: string
    value: string
    maxLength: number
    onChange: (value: string) => void
    placeholder?: string
    multiline?: boolean
    rows?: number
    required?: boolean
    error?: string
    className?: string
}

export function CharacterLimitInput({
    id,
    label,
    value,
    maxLength,
    onChange,
    placeholder,
    multiline = false,
    rows = 4,
    required = false,
    error,
    className,
}: CharacterLimitInputProps) {
    const remaining = maxLength - (value?.length || 0)
    const isNearLimit = remaining < maxLength * 0.1
    const isOverLimit = remaining < 0

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value
        // Allow typing but show warning if over limit
        onChange(newValue)
    }

    const InputComponent = multiline ? Textarea : Input

    return (
        <div className={cn('space-y-2', className)}>
            <div className="flex items-center justify-between">
                <Label htmlFor={id}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <span
                    className={cn(
                        'text-xs transition-colors',
                        isOverLimit && 'text-red-500 font-medium',
                        isNearLimit && !isOverLimit && 'text-yellow-600',
                        !isNearLimit && !isOverLimit && 'text-muted-foreground'
                    )}
                >
                    {value?.length || 0}/{maxLength}
                </span>
            </div>
            <InputComponent
                id={id}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                rows={multiline ? rows : undefined}
                className={cn(
                    isOverLimit && 'border-red-500 focus-visible:ring-red-500',
                    isNearLimit && !isOverLimit && 'border-yellow-500 focus-visible:ring-yellow-500'
                )}
            />
            {isOverLimit && (
                <p className="text-xs text-red-500">
                    Content exceeds maximum length by {Math.abs(remaining)} characters
                </p>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    )
}
