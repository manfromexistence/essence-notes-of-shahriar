/**
 * Property-Based Tests for CharacterLimitedTextarea Component
 * Feature: admin-text-limits-and-route-fix
 * 
 * These tests validate the character limit enforcement and counter accuracy
 * using property-based testing with fast-check.
 */

import { describe, it, expect, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import { CharacterLimitedTextarea } from '@/components/ui/character-limited-textarea';

describe('CharacterLimitedTextarea - Property-Based Tests', () => {
    // Clean up after each test to prevent DOM pollution
    afterEach(() => {
        cleanup();
    });

    /**
     * Property 1: Character Limit Enforcement
     * Feature: admin-text-limits-and-route-fix, Property 1: Character Limit Enforcement
     * 
     * For any CharacterLimitedTextarea component with maxLength N, and for any input
     * string S, the resulting value length SHALL never exceed N characters.
     * 
     * Validates: Requirements 2.4, 3.4, 4.4, 5.5, 6.7
     */
    it('Property 1: Character Limit Enforcement - textarea maxLength attribute is correctly set', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 0, maxLength: 500 }),
                fc.integer({ min: 1, max: 500 }),
                (value, maxLength) => {
                    cleanup(); // Clean up before each property test iteration
                    const handleChange = () => { };

                    render(
                        <CharacterLimitedTextarea
                            id="test-textarea"
                            value={value}
                            onChange={handleChange}
                            maxLength={maxLength}
                        />
                    );

                    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

                    // The textarea element should have the maxLength attribute set
                    expect(textarea.maxLength).toBe(maxLength);
                }
            ),
            { numRuns: 100 }
        );
    });

    /**
     * Property 2: Character Counter Accuracy
     * Feature: admin-text-limits-and-route-fix, Property 2: Character Counter Accuracy
     * 
     * For any CharacterLimitedTextarea component with maxLength M, and for any input
     * value V, the displayed counter SHALL show exactly `${V.length}/${M} characters`.
     * 
     * Validates: Requirements 2.3, 3.3, 4.3, 5.4, 6.6
     */
    it('Property 2: Character Counter Accuracy - counter displays correct current/max values', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 0, maxLength: 300 }),
                fc.integer({ min: 1, max: 500 }),
                (value, maxLength) => {
                    cleanup(); // Clean up before each property test iteration
                    const handleChange = () => { };

                    render(
                        <CharacterLimitedTextarea
                            id="test-textarea"
                            value={value}
                            onChange={handleChange}
                            maxLength={maxLength}
                        />
                    );

                    const expectedCounterText = `${value.length}/${maxLength} characters`;
                    expect(screen.getByText(expectedCounterText)).toBeTruthy();
                }
            ),
            { numRuns: 100 }
        );
    });

    /**
     * Edge case tests for boundary conditions
     */
    describe('Edge Cases', () => {
        it('handles empty string value', () => {
            render(
                <CharacterLimitedTextarea
                    id="test"
                    value=""
                    onChange={() => { }}
                    maxLength={300}
                />
            );
            expect(screen.getByText('0/300 characters')).toBeTruthy();
        });

        it('handles value at exactly maxLength', () => {
            const value = 'a'.repeat(300);
            render(
                <CharacterLimitedTextarea
                    id="test"
                    value={value}
                    onChange={() => { }}
                    maxLength={300}
                />
            );
            expect(screen.getByText('300/300 characters')).toBeTruthy();
        });

        it('shows warning color when over 80% of limit', () => {
            const value = 'a'.repeat(270); // 90% of 300
            const { container } = render(
                <CharacterLimitedTextarea
                    id="test"
                    value={value}
                    onChange={() => { }}
                    maxLength={300}
                />
            );
            const counter = container.querySelector('.text-amber-500');
            expect(counter).toBeTruthy();
        });

        it('shows error color when at 100% of limit', () => {
            const value = 'a'.repeat(300); // 100% of 300
            const { container } = render(
                <CharacterLimitedTextarea
                    id="test"
                    value={value}
                    onChange={() => { }}
                    maxLength={300}
                />
            );
            const counter = container.querySelector('.text-destructive');
            expect(counter).toBeTruthy();
        });

        it('handles undefined value gracefully', () => {
            render(
                <CharacterLimitedTextarea
                    id="test"
                    value={undefined as unknown as string}
                    onChange={() => { }}
                    maxLength={300}
                />
            );
            expect(screen.getByText('0/300 characters')).toBeTruthy();
        });

        it('accepts rows prop', () => {
            render(
                <CharacterLimitedTextarea
                    id="test"
                    value="test"
                    onChange={() => { }}
                    maxLength={300}
                    rows={5}
                />
            );
            const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
            expect(textarea.rows).toBe(5);
        });
    });
});
