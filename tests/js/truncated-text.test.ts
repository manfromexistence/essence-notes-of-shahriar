/**
 * Property-Based Tests for TruncatedText Component
 * Feature: about-me-page-fixes
 * 
 * These tests validate the truncation logic using property-based testing
 * with fast-check to ensure correctness across all valid inputs.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { truncateText } from '@/components/ui/truncated-text';

describe('TruncatedText - Property-Based Tests', () => {
    /**
     * Property 1: Truncation Threshold Behavior
     * Feature: about-me-page-fixes, Property 1: Truncation Threshold Behavior
     * 
     * For any text string and maxLength value, if text.length > maxLength then
     * the output SHALL be truncated to maxLength characters (plus ellipsis),
     * otherwise the output SHALL equal the original text unchanged.
     * 
     * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 4.2, 4.3
     */
    it('Property 1: Truncation Threshold Behavior - text longer than maxLength is truncated, shorter text is unchanged', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 0, maxLength: 500 }),
                fc.integer({ min: 1, max: 300 }),
                (text, maxLength) => {
                    const result = truncateText(text, maxLength);

                    if (text.length <= maxLength) {
                        // Text within limit should be unchanged
                        expect(result).toBe(text);
                    } else {
                        // Text exceeding limit should be truncated
                        // The truncated part (without ellipsis) should be exactly maxLength characters
                        const truncatedPart = result.slice(0, -3); // Remove "..."
                        expect(truncatedPart.length).toBe(maxLength);
                        expect(truncatedPart).toBe(text.slice(0, maxLength));
                    }
                }
            ),
            { numRuns: 100 }
        );
    });

    /**
     * Property 2: Ellipsis Suffix
     * Feature: about-me-page-fixes, Property 2: Ellipsis Suffix
     * 
     * For any text that is truncated (where original length > maxLength),
     * the displayed text SHALL end with "..." (ellipsis).
     * 
     * Validates: Requirements 2.6
     */
    it('Property 2: Ellipsis Suffix - truncated text always ends with ellipsis', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 1, maxLength: 500 }),
                fc.integer({ min: 1, max: 300 }),
                (text, maxLength) => {
                    const result = truncateText(text, maxLength);

                    if (text.length > maxLength) {
                        // Truncated text must end with ellipsis
                        expect(result.endsWith('...')).toBe(true);
                    } else {
                        // Non-truncated text should NOT have ellipsis added
                        expect(result).toBe(text);
                    }
                }
            ),
            { numRuns: 100 }
        );
    });

    /**
     * Property 3: HoverCard Content Integrity (via truncateText function)
     * Feature: about-me-page-fixes, Property 3: HoverCard Content Integrity
     * 
     * For any truncated text, the original text is preserved and can be retrieved.
     * This tests that the truncation function doesn't lose information.
     * 
     * Validates: Requirements 2.5
     */
    it('Property 3: Original text is always recoverable from truncation context', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 0, maxLength: 500 }),
                fc.integer({ min: 1, max: 300 }),
                (originalText, maxLength) => {
                    const truncated = truncateText(originalText, maxLength);

                    if (originalText.length > maxLength) {
                        // The truncated text (minus ellipsis) should be a prefix of original
                        const prefix = truncated.slice(0, -3);
                        expect(originalText.startsWith(prefix)).toBe(true);
                    } else {
                        // Non-truncated text should be identical
                        expect(truncated).toBe(originalText);
                    }
                }
            ),
            { numRuns: 100 }
        );
    });

    /**
     * Edge case tests for boundary conditions
     */
    describe('Edge Cases', () => {
        it('handles empty string', () => {
            expect(truncateText('', 10)).toBe('');
        });

        it('handles text exactly at maxLength', () => {
            const text = 'exactly10!';
            expect(truncateText(text, 10)).toBe(text);
        });

        it('handles text one character over maxLength', () => {
            const text = 'exactly11!!';
            // First 10 characters of 'exactly11!!' is 'exactly11!' + ellipsis
            expect(truncateText(text, 10)).toBe('exactly11!...');
        });

        it('handles very short maxLength', () => {
            expect(truncateText('hello world', 1)).toBe('h...');
        });

        it('handles null-like values gracefully', () => {
            // @ts-expect-error - testing runtime behavior with null
            expect(truncateText(null, 10)).toBe('');
            // @ts-expect-error - testing runtime behavior with undefined
            expect(truncateText(undefined, 10)).toBe('');
        });
    });
});
