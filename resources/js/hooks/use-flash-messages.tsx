import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

interface FlashMessages {
    success?: string;
    error?: string;
    message?: string;
}

/**
 * Hook to handle flash messages from Laravel backend
 * Displays toast notifications based on session flash data
 */
export function useFlashMessages() {
    const { flash } = usePage<{ flash: FlashMessages }>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.message) {
            toast(flash.message);
        }
    }, [flash]);
}
