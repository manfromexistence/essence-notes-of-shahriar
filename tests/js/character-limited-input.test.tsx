/**
 * Property-Based Tests for CharacterLimitedInput Component
 * Feature: admin-text-limits-and-route-fix
 * 
 * These tests validate the character limit enforcement and counter accuracy
 * using property-based testing with fast-check.
 */

import { describe, it, expect, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { render, screen, cleanup } from '@testing-library/react';
import { CharacterLimitedInput } from '@/components/ui/character-limited-input';

describe('CharacterLimitedInput - Property-Based Tests', () => {
    // Clean up after each test to prevent DOM pollution
    afterEach(() => {
        cleanup();
    });

    /**
     * Property 1: Character Limit Enforcement
     * Feature: admin-text-limits-and-route-fix, Property 1: Character Limit Enforcement
     * 
     * For any CharacterLimitedInput component with maxLength N, and for any input
     * string S, the resulting value length SHALL never exceed N characters.
     * 
     * Validates: Requirements 2.4, 3.4, 4.4, 5.5, 6.7
     */
    it('Property 1: Character Limit Enforcement - input maxLength attribute is correctly set', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 0, maxLength: 500 }),
                fc.integer({ min: 1, max: 500 }),
                (value, maxLength) => {
                    cleanup(); // Clean up before each property test iteration
                    const handleChange = () => { };

                    render(
                        <CharacterLimitedInput
                            id="test-input"
                            value={value}
                            onChange={handleChange}
                            maxLength={maxLength}
                        />
                    );

                    const input = screen.getByRole('textbox') as HTMLInputElement;

                    // The input element should have the maxLength attribute set
                    expect(input.maxLength).toBe(maxLength);
                }
            ),
            { numRuns: 100 }
        );
    });

    /**
     * Property 2: Character Counter Accuracy
     * Feature: admin-text-limits-and-route-fix, Property 2: Character Counter Accuracy
     * 
     * For any CharacterLimitedInput component with maxLength M, and for any input
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
                        <CharacterLimitedInput
                            id="test-input"
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
                <CharacterLimitedInput
                    id="test"
                    value=""
                    onChange={() => { }}
                    maxLength={50}
                />
            );
            expect(screen.getByText('0/50 characters')).toBeTruthy();
        });

        it('handles value at exactly maxLength', () => {
            const value = 'a'.repeat(50);
            render(
                <CharacterLimitedInput
                    id="test"
                    value={value}
                    onChange={() => { }}
                    maxLength={50}
                />
            );
            expect(screen.getByText('50/50 characters')).toBeTruthy();
        });

        it('shows warning color when over 80% of limit', () => {
            const value = 'a'.repeat(45); // 90% of 50
            const { container } = render(
                <CharacterLimitedInput
                    id="test"
                    value={value}
                    onChange={() => { }}
                    maxLength={50}
                />
            );
            const counter = container.querySelector('.text-amber-500');
            expect(counter).toBeTruthy();
        });

        it('shows error color when at 100% of limit', () => {
            const value = 'a'.repeat(50); // 100% of 50
            const { container } = render(
                <CharacterLimitedInput
                    id="test"
                    value={value}
                    onChange={() => { }}
                    maxLength={50}
                />
            );
            const counter = container.querySelector('.text-destructive');
            expect(counter).toBeTruthy();
        });

        it('handles undefined value gracefully', () => {
            render(
                <CharacterLimitedInput
                    id="test"
                    value={undefined as unknown as string}
                    onChange={() => { }}
                    maxLength={50}
                />
            );
            expect(screen.getByText('0/50 characters')).toBeTruthy();
        });
    });
});
