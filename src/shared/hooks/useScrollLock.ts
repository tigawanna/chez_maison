import { useEffect } from 'react';

function useBodyScrollLock(modal_open: boolean) {
    useEffect(() => {
        // Get original body overflow
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if(modal_open){
            document.body.style.overflow = 'hidden';
        }
        else{
            document.body.style.overflow = originalStyle;
        }

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [modal_open]); // Empty array ensures effect is only run on mount and unmount
};

export default useBodyScrollLock;
