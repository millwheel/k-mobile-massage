"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon, Phone } from "lucide-react";
import { getPhoneSettings, getWhatsappSetting } from "@/lib/api";
import type { PhoneSettings, WhatsappSettings } from "@/data/type";
import QrModal from "@/component/QrModal";
import PhoneModal from "@/component/phoneModal";

type ModalType = "phone" | "qr" | null;

export default function CallButtons() {
    const [phones, setPhones] = useState<PhoneSettings>({ call1: null });
    const [isMobile, setIsMobile] = useState(false);
    const [settings, setSettings] = useState<WhatsappSettings>({ qrUrl1: null, qrUrl2: null });
    const [loading, setLoading] = useState(true);

    const [modalType, setModalType] = useState<ModalType>(null);
    const [qrUrl, setQrUrl] = useState<string>("");
    const [selectedNumber, setSelectedNumber] = useState<string>("");

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

        (async () => {
            try {
                const ps = await getPhoneSettings();
                setPhones(ps);
            } catch (e) {
                console.error("전화번호 불러오기 실패:", e);
            }
        })();

        const ua = navigator.userAgent.toLowerCase();
        setIsMobile(/iphone|ipad|ipod|android/.test(ua));
    }, []);

    const call1 = phones.call1 ?? "010-0000-0000";

    function openQrModal(url: string | null) {
        if (!url) return;
        setQrUrl(url);
        setSelectedNumber("");      // 다른 모달 데이터는 비워주기
        setModalType("qr");
    }

    function openPhoneModal(number: string) {
        if (isMobile) {
            window.location.href = `tel:${number}`;
            return;
        }
        setSelectedNumber(number);
        setQrUrl("");               // 다른 모달 데이터는 비워주기
        setModalType("phone");
    }

    const disabled1 = !settings.qrUrl1;
    const disabled2 = !settings.qrUrl2;

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-10">
                {/* 전화번호 버튼 */}
                <button
                    onClick={() => openPhoneModal(call1)}
                    aria-label="전화 상담하기"
                    className="btn-call inline-flex items-center gap-2 rounded-2xl px-10 py-6
                     font-semibold text-white cursor-pointer
                     shadow-lg shadow-black/20 ring-1 ring-white/10
                     transition-transform duration-200 hover:scale-[1.02]"
                >
                    <Phone className="h-5 w-5 opacity-90" />
                    <span className="text-base sm:text-lg tracking-tight">Phone call</span>
                </button>

                {/* QR #1 버튼 */}
                <button
                    onClick={() => openQrModal(settings.qrUrl1)}
                    disabled={disabled1 || loading}
                    aria-label="WhatsApp QR 1 보기"
                    className={`inline-flex items-center gap-2 rounded-2xl px-10 py-6 font-semibold text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition-transform duration-200
            ${disabled1 || loading
                        ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "cursor-pointer hover:scale-[1.02] bg-cyan-700 hover:bg-cyan-600"}`}
                >
                    <ImageIcon className="h-5 w-5 opacity-90" />
                    <span className="text-base sm:text-lg tracking-tight">
            {loading ? "불러오는 중…" : disabled1 ? "QR 1 (Empty)" : "Whatsapp 1"}
          </span>
                </button>

                {/* QR #2 버튼 */}
                <button
                    onClick={() => openQrModal(settings.qrUrl2)}
                    disabled={disabled2 || loading}
                    aria-label="WhatsApp QR 2 보기"
                    className={`inline-flex items-center gap-2 rounded-2xl px-10 py-6 font-semibold text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition-transform duration-200
            ${disabled2 || loading
                        ? "bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "cursor-pointer hover:scale-[1.02] bg-cyan-700 hover:bg-cyan-600"}`}
                >
                    <ImageIcon className="h-5 w-5 opacity-90" />
                    <span className="text-base sm:text-lg tracking-tight">
            {loading ? "불러오는 중…" : disabled2 ? "QR 2 (Empty)" : "Whatsapp 2"}
          </span>
                </button>
            </div>

            {/* 모달들 - 각자 열림 상태를 분리 */}
            <PhoneModal
                open={modalType === "phone"}
                onClose={() => setModalType(null)}
                title="Phone call"
                number={selectedNumber}
            />

            <QrModal
                open={modalType === "qr"}
                onClose={() => setModalType(null)}
                imageUrl={qrUrl}
                alt="WhatsApp QR"
            />
        </>
    );
}
