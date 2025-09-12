"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { getWhatsappSetting } from "@/lib/api";
import type { WhatsappSettings } from "@/data/type";
import QrModal from "@/component/QrModal";

export default function QrButtons() {
    const [settings, setSettings] = useState<WhatsappSettings>({ qrUrl1: null, qrUrl2: null });
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUrl, setModalUrl] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const s = await getWhatsappSetting();
                setSettings(s);
            } catch (e) {
                console.error("WhatsApp QR 설정 불러오기 실패:", e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    function openQr(url: string | null) {
        if (!url) return;
        setModalUrl(url);
        setModalOpen(true);
    }

    const disabled1 = !settings.qrUrl1;
    const disabled2 = !settings.qrUrl2;

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-10">
                {/* QR #1 버튼 */}
                <button
                    onClick={() => openQr(settings.qrUrl1)}
                    disabled={disabled1 || loading}
                    aria-label="WhatsApp QR 1 보기"
                    className={`inline-flex items-center gap-2 rounded-2xl px-10 py-6 font-semibold text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition-transform duration-200
                    ${disabled1 || loading
                        ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "cursor-pointer hover:scale-[1.02] bg-cyan-700 hover:bg-cyan-600"}`}
                >
                    <ImageIcon className="h-5 w-5 opacity-90" />
                    <span className="text-base sm:text-lg tracking-tight">
                        {loading ? "불러오는 중…" : disabled1 ? "QR 1 (등록 필요)" : "Whatsapp 1"}
                    </span>
                </button>

                {/* QR #2 버튼 */}
                <button
                    onClick={() => openQr(settings.qrUrl2)}
                    disabled={disabled2 || loading}
                    aria-label="WhatsApp QR 2 보기"
                    className={`inline-flex items-center gap-2 rounded-2xl px-10 py-6 font-semibold text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition-transform duration-200
                    ${disabled2 || loading
                        ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "cursor-pointer hover:scale-[1.02] bg-cyan-700 hover:bg-cyan-600"}`}
                >
                    <ImageIcon className="h-5 w-5 opacity-90" />
                    <span className="text-base sm:text-lg tracking-tight">
                        {loading ? "불러오는 중…" : disabled2 ? "QR 2 (등록 필요)" : "Whatsapp 2"}
                    </span>
                </button>
            </div>

            <QrModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                imageUrl={modalUrl}
                alt="WhatsApp QR"
            />
        </>
    );
}
