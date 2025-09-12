"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

export interface QrModalProps {
    open: boolean;
    onClose: () => void;
    imageUrl: string;
    alt?: string;
}

export default function QrModal({ open, onClose, imageUrl, alt = "QR code" }: QrModalProps) {
    const backdropRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    // ESC로 닫기 & 포커스 이동
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) {
            document.addEventListener("keydown", handleKey);
            const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
            return () => {
                document.removeEventListener("keydown", handleKey);
                clearTimeout(t);
            };
        }
    }, [open, onClose]);

    // 바깥(배경) 클릭으로 닫기
    function handleBackdropClick(e: React.MouseEvent) {
        if (e.target === backdropRef.current) onClose();
    }

    if (!open) return null;

    return (
        <div
            ref={backdropRef}
            onMouseDown={handleBackdropClick}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            aria-modal="true"
            role="dialog"
            aria-label="QR Code Modal"
        >
            {/* 내용 컨테이너: 텍스트 없이 이미지만 */}
            <div className="relative mx-4 w-full max-w-md rounded-2xl bg-[#0B0E13] ring-1 ring-white/10 shadow-2xl">
                {/* 닫기 버튼 (오른쪽 상단) */}
                <button
                    ref={closeBtnRef}
                    onClick={onClose}
                    aria-label="닫기"
                    className="absolute right-2 top-2 z-10 rounded-lg p-2 hover:bg-white/10 focus:outline-none"
                >
                    <X className="h-5 w-5 text-white" />
                </button>

                {/* QR 이미지 (정중앙, 여백 없이 꽉 차게 노출) */}
                <div className="p-12">
                    <div className="w-full aspect-square overflow-hidden rounded-xl bg-black/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imageUrl}
                            alt={alt}
                            className="h-full w-full object-contain"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}