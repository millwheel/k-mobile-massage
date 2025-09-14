"use client";

import { useEffect, useRef, useState } from "react";
import { X, Copy } from "lucide-react";

interface PhoneModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    number: string;
}

export default function PhoneModal({
                                       open,
                                       onClose,
                                       title = "상담 전화 번호",
                                       number
                                   }: PhoneModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const [copied, setCopied] = useState(false);

    // ESC로 닫기 & 포커스 관리
    useEffect(() => {
        function handler(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) {
            document.addEventListener("keydown", handler);
            // 간단 포커스 이동
            const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
            return () => {
                document.removeEventListener("keydown", handler);
                clearTimeout(t);
            };
        }
    }, [open, onClose]);

    // 바깥 클릭으로 닫기
    function handleBackdrop(e: React.MouseEvent) {
        if (e.target === dialogRef.current) onClose();
    }

    async function copyNumber() {
        try {
            await navigator.clipboard.writeText(number);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // 아주 오래된 브라우저 대비
            const temp = document.createElement("input");
            temp.value = number;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand("copy");
            document.body.removeChild(temp);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    }

    if (!open) return null;

    return (
        <div
            ref={dialogRef}
            onMouseDown={handleBackdrop}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            aria-modal="true"
            role="dialog"
            aria-labelledby="phone-modal-title"
        >
            <div className="mx-4 w-full max-w-md rounded-2xl bg-[#0B0E13] text-white ring-1 ring-white/10 shadow-2xl">
                {/* 헤더 */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <h3 id="phone-modal-title" className="text-lg font-bold tracking-tight">
                        {title}
                    </h3>
                    <button
                        ref={closeBtnRef}
                        onClick={onClose}
                        aria-label="닫기"
                        className="rounded-lg p-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* 본문 */}
                <div className="px-6 py-5 space-y-4">
                    <p className="text-sm text-gray-300">아래 번호로 연락 주세요.</p>

                    <div className="flex items-center justify-between rounded-xl bg-white/[0.06] ring-1 ring-white/10 px-4 py-3">
                        <div className="text-xl font-extrabold tracking-wide">{number}</div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={copyNumber}
                                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 ring-1 ring-white/10 transition"
                            >
                                <Copy className="h-4 w-4" />
                                {copied ? "복사됨!" : "복사"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
