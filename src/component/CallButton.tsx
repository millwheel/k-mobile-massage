"use client";

import {useEffect, useMemo, useState} from "react";
import {Image as ImageIcon, Phone} from "lucide-react";
import {getPhoneSettings, getWhatsappSetting} from "@/lib/api";
import type {PhoneSettings, WhatsappSettings} from "@/data/type";
import QrModal from "@/component/QrModal";
import PhoneModal from "@/component/phoneModal";

type ModalType = "phone" | "qr" | null;

// 간단한 className 병합 유틸
function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

// 모바일 여부 유틸
function detectMobile() {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod|android/.test(ua);
}

// tel 링크용 간단 정규화(숫자/플러스만 허용)
function toTelHref(num: string) {
    const cleaned = num.replace(/[^\d+]/g, "");
    return `tel:${cleaned}`;
}

export default function CallButtons() {
    const [phones, setPhones] = useState<PhoneSettings>({ call1: null });
    const [whats, setWhats] = useState<WhatsappSettings>({ qrUrl1: null, qrUrl2: null });

    const [loadingPhone, setLoadingPhone] = useState(true);
    const [loadingQr, setLoadingQr] = useState(true);

    const [isMobile, setIsMobile] = useState(false);

    const [modalType, setModalType] = useState<ModalType>(null);
    const [qrUrl, setQrUrl] = useState<string>("");
    const [selectedNumber, setSelectedNumber] = useState<string>("");

    // 최초 로드 시 병렬 요청
    useEffect(() => {
        setIsMobile(detectMobile());

        (async () => {
            setLoadingQr(true);
            setLoadingPhone(true);

            const [qrRes, phoneRes] = await Promise.allSettled([
                getWhatsappSetting(),
                getPhoneSettings(),
            ]);

            if (qrRes.status === "fulfilled") setWhats(qrRes.value);
            else console.error("WhatsApp 설정 불러오기 실패:", qrRes.reason);
            setLoadingQr(false);

            if (phoneRes.status === "fulfilled") setPhones(phoneRes.value);
            else console.error("전화번호 불러오기 실패:", phoneRes.reason);
            setLoadingPhone(false);
        })();
    }, []);

    const call1 = phones.call1;
    const isPhoneAvailable = !!call1;

    const isQr1Available = !!whats.qrUrl1;
    const isQr2Available = !!whats.qrUrl2;

    const isLoadingAny = loadingPhone || loadingQr;

    // 핸들러
    function openQrModal(url: string | null) {
        if (!url) return;
        setQrUrl(url);
        setSelectedNumber("");
        setModalType("qr");
    }

    function openPhoneModal(number: string | null) {
        if (!number) return;
        if (isMobile) {
            window.location.href = toTelHref(number);
            return;
        }
        setSelectedNumber(number);
        setQrUrl("");
        setModalType("phone");
    }

    const phoneBtnDisabled = !isPhoneAvailable || isLoadingAny;
    const qr1BtnDisabled = !isQr1Available || loadingQr;
    const qr2BtnDisabled = !isQr2Available || loadingQr;

    // 버튼 공통 스타일
    const baseBtn = "inline-flex items-center gap-2 rounded-2xl px-10 py-6 font-semibold text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition-transform duration-200";
    const enabledHover = "cursor-pointer hover:scale-[1.02]";
    const disabledStyle = "bg-gray-800 text-gray-400 cursor-not-allowed";

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-10">
                {/* 전화번호 버튼 */}
                <button
                    onClick={() => openPhoneModal(call1)}
                    disabled={phoneBtnDisabled}
                    aria-disabled={phoneBtnDisabled}
                    aria-label="전화 상담하기"
                    className={cx(
                        baseBtn,
                        phoneBtnDisabled ? disabledStyle : cx(enabledHover, "bg-emerald-700 hover:bg-emerald-600")
                    )}
                >
                    <Phone className="h-5 w-5 opacity-90" />
                    <span className="text-base sm:text-lg tracking-tight">
                        {isLoadingAny ? "불러오는 중…" : "Phone call"}
                    </span>
                </button>

                {/* QR #1 버튼 */}
                <button
                    onClick={() => openQrModal(whats.qrUrl1)}
                    disabled={qr1BtnDisabled}
                    aria-disabled={qr1BtnDisabled}
                    aria-label="WhatsApp QR 1 보기"
                    className={cx(
                        baseBtn,
                        qr1BtnDisabled ? disabledStyle : cx(enabledHover, "bg-cyan-700 hover:bg-cyan-600")
                    )}
                >
                    <ImageIcon className="h-5 w-5 opacity-90" />
                    <span className="text-base sm:text-lg tracking-tight">
                        {loadingQr ? "불러오는 중…" : isQr1Available ? "Whatsapp 1" : "QR 1 (Empty)"}
                    </span>
                </button>

                {/* QR #2 버튼 */}
                <button
                    onClick={() => openQrModal(whats.qrUrl2)}
                    disabled={qr2BtnDisabled}
                    aria-disabled={qr2BtnDisabled}
                    aria-label="WhatsApp QR 2 보기"
                    className={cx(
                        baseBtn,
                        qr2BtnDisabled ? disabledStyle : cx(enabledHover, "bg-cyan-700 hover:bg-cyan-600")
                    )}
                >
                    <ImageIcon className="h-5 w-5 opacity-90" />
                    <span className="text-base sm:text-lg tracking-tight">
                        {loadingQr ? "불러오는 중…" : isQr2Available ? "Whatsapp 2" : "QR 2 (Empty)"}
                    </span>
                </button>
            </div>

            {/* 모달 */}
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
