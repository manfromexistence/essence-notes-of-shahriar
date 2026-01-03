import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "./textarea";

interface CharacterLimitedTextareaProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    maxLength: number;
    placeholder?: string;
    className?: string;
    rows?: number;
    error?: string;
}

function CharacterLimitedTextarea({
    id,
    value,
    onChange,
    maxLength,
    placeholder,
    className,
    rows,
    error,
}: CharacterLimitedTextareaProps) {
    const currentLength = (value || "").length;
    const percentage = (currentLength / maxLength) * 100;
    const isOverLimit = currentLength > maxLength;

    const getCounterColor = () => {
        if (isOverLimit || percentage >= 100) return "text-destructive";
        if (percentage > 80) return "text-amber-500";
        return "text-muted-foreground";
    };

    const getInputBorderClass = () => {
        if (isOverLimit || error) return "border-destructive focus-visible:ring-destructive";
        if (percentage > 80) return "border-amber-500 focus-visible:ring-amber-500";
        return "";
    };

    return (
        <div className="w-full">
            <Textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={cn(className, getInputBorderClass())}
                rows={rows}
            />
            <div className="flex justify-between items-center mt-1">
                {(isOverLimit || error) && (
                    <span className="text-xs text-destructive">
                        {error || `Text exceeds ${maxLength} character limit`}
                    </span>
                )}
                <span className={cn("text-xs ml-auto", getCounterColor())}>
                    {currentLength}/{maxLength} characters
                </span>
            </div>
        </div>
    );
}

export { CharacterLimitedTextarea };
export type { CharacterLimitedTextareaProps };
