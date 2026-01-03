"use client"

import * as React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"

export interface TruncatedTextProps {
    text: string;
    maxLength: number;
    className?: string;
    hoverCardClassName?: string;
}

/**
 * Truncates text to a specified length and displays full content via HoverCard on hover.
 * If text is shorter than maxLength, displays the full text without HoverCard.
 */
export function TruncatedText({
    text,
    maxLength,
    className,
    hoverCardClassName,
}: TruncatedTextProps) {
    // Handle null, undefined, or non-string input
    const safeText = text == null ? "" : String(text);

    // If text is within limit, render as-is without HoverCard
    if (safeText.length <= maxLength) {
        return <span className={className}>{safeText}</span>;
    }

    // Truncate text and add ellipsis
    const truncatedText = safeText.slice(0, maxLength) + "...";

    return (
        <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
                <span
                    className={cn("cursor-help", className)}
                    tabIndex={0}
                    role="button"
                    aria-label="Hover or focus to see full text"
                >
                    {truncatedText}
                </span>
            </HoverCardTrigger>
            <HoverCardContent
                className={cn("max-w-sm break-words", hoverCardClassName)}
                side="top"
                align="start"
            >
                <p className="text-sm">{safeText}</p>
            </HoverCardContent>
        </HoverCard>
    );
}

/**
 * Helper function to truncate text - useful for testing and external use
 */
export function truncateText(text: string, maxLength: number): string {
    const safeText = text == null ? "" : String(text);
    if (safeText.length <= maxLength) {
        return safeText;
    }
    return safeText.slice(0, maxLength) + "...";
}

export default TruncatedText;
