export function AlertIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
            <path d="M12 9v5M12 16.5v.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
            <path d="M10.3 3.7 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}