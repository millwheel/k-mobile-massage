"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import LoadingSpinner from "@/component/loadingSpinner";
import HomeLinkButton from "@/component/homeLinkButton";
import type { PhoneSettings, SlotState, WhatsappSettings } from "@/data/type";
import {
    getWhatsappSetting,
    saveWhatsappSetting,
    uploadWhatsappQr,
    deleteWhatsappQr,
    getPhoneSettings,
    savePhoneSettings,
} from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import { SlotCard } from "@/component/slotCard";

type SlotKey = "qr1" | "qr2";

// 전화번호 형식: 하이픈 포함 필수 (예: 010-1234-5678, 02-123-4567 등)
const PHONE_REGEX = /^\d{2,4}-\d{3,4}-\d{4}$/;

export default function AdminPage() {
    const [phone, setPhone] = useState<PhoneSettings>({ call1: null });
    const [originalPhone, setOriginalPhone] = useState<PhoneSettings>({ call1: null });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [qr1, setQr1] = useState<SlotState>({
        currentUrl: null,
        file: null,
        previewUrl: null,
        markedDelete: false,
    });
    const [qr2, setQr2] = useState<SlotState>({
        currentUrl: null,
        file: null,
        previewUrl: null,
        markedDelete: false,
    });

    // created object URLs to revoke on unmount
    const objectUrlsRef = useRef<string[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const [phoneSettings, whatsappSettings] = await Promise.all([
                    getPhoneSettings(),
                    getWhatsappSetting(),
                ]);
                setPhone(phoneSettings);
                setOriginalPhone(phoneSettings);
                setQr1((s) => ({ ...s, currentUrl: whatsappSettings.qrUrl1 }));
                setQr2((s) => ({ ...s, currentUrl: whatsappSettings.qrUrl2 }));
            } catch (e) {
                toast.error("연락처 설정을 불러오지 못했습니다.");
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();

        return () => {
            objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
            objectUrlsRef.current = [];
        };
    }, []);

    const hasQrChanges = useMemo(() => {
        return qr1.file !== null || qr2.file !== null || qr1.markedDelete || qr2.markedDelete;
    }, [qr1.file, qr2.file, qr1.markedDelete, qr2.markedDelete]);

    const phoneChanged = useMemo(() => {
        return (phone.call1 ?? null) !== (originalPhone.call1 ?? null);
    }, [phone.call1, originalPhone.call1]);

    const hasChanges = hasQrChanges || phoneChanged;

    const onFileChange = (slot: SlotKey, file: File | null) => {
        const makePreview = (f: File | null) => {
            if (!f) return null;
            const url = URL.createObjectURL(f);
            objectUrlsRef.current.push(url);
            return url;
        };
        if (slot === "qr1") {
            if (qr1.previewUrl) URL.revokeObjectURL(qr1.previewUrl);
            setQr1((s) => ({
                ...s,
                file,
                previewUrl: makePreview(file),
                markedDelete: file ? false : s.markedDelete,
            }));
        } else {
            if (qr2.previewUrl) URL.revokeObjectURL(qr2.previewUrl);
            setQr2((s) => ({
                ...s,
                file,
                previewUrl: makePreview(file),
                markedDelete: file ? false : s.markedDelete,
            }));
        }
    };

    const onClearSlot = (slot: SlotKey) => {
        if (slot === "qr1") {
            if (qr1.previewUrl) URL.revokeObjectURL(qr1.previewUrl);
            setQr1((s) => ({
                ...s,
                file: null,
                previewUrl: null,
                markedDelete: true,
            }));
        } else {
            if (qr2.previewUrl) URL.revokeObjectURL(qr2.previewUrl);
            setQr2((s) => ({
                ...s,
                file: null,
                previewUrl: null,
                markedDelete: true,
            }));
        }
    };

    const handleSave = async () => {
        if (saving) return; // 중복 클릭 가드

        // 전화번호 유효성 검사: 변경된 경우만 검사
        if (phoneChanged && phone.call1 !== null && !PHONE_REGEX.test(phone.call1)) {
            toast.error("전화번호 형식이 올바르지 않습니다. 예) 010-1234-5678");
            return;
        }

        setSaving(true);
        try {
            let nextQrUrl1: string | null = qr1.currentUrl;
            let nextQrUrl2: string | null = qr2.currentUrl;

            // --- QR 저장 시나리오 ---
            // qr1
            if (qr1.markedDelete && qr1.currentUrl) {
                await deleteWhatsappQr(qr1.currentUrl); // not-found는 내부에서 무시
                nextQrUrl1 = null;
            }
            if (qr1.file) {
                if (qr1.currentUrl) {
                    await deleteWhatsappQr(qr1.currentUrl);
                }
                const uploadedUrl = await uploadWhatsappQr("qr1", qr1.file);
                nextQrUrl1 = uploadedUrl;
            }

            // qr2
            if (qr2.markedDelete && qr2.currentUrl) {
                await deleteWhatsappQr(qr2.currentUrl);
                nextQrUrl2 = null;
            }
            if (qr2.file) {
                if (qr2.currentUrl) {
                    await deleteWhatsappQr(qr2.currentUrl);
                }
                const uploadedUrl = await uploadWhatsappQr("qr2", qr2.file);
                nextQrUrl2 = uploadedUrl;
            }

            // Firestore 저장 (QR)
            if (hasQrChanges) {
                const toSave: WhatsappSettings = {
                    qrUrl1: nextQrUrl1,
                    qrUrl2: nextQrUrl2,
                };
                await saveWhatsappSetting(toSave);
            }

            // Firestore 저장 (PHONE)
            if (phoneChanged) {
                const normalized: PhoneSettings = { call1: phone.call1 ?? null };
                await savePhoneSettings(normalized);
                setOriginalPhone(normalized);
            }

            // 로컬 상태 정리
            if (qr1.previewUrl) URL.revokeObjectURL(qr1.previewUrl);
            if (qr2.previewUrl) URL.revokeObjectURL(qr2.previewUrl);
            setQr1({
                currentUrl: nextQrUrl1,
                file: null,
                previewUrl: null,
                markedDelete: false,
            });
            setQr2({
                currentUrl: nextQrUrl2,
                file: null,
                previewUrl: null,
                markedDelete: false,
            });

            toast.success("저장되었습니다.");
        } catch (e) {
            console.error(e);
            toast.error("저장 중 오류가 발생했습니다.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <LoadingSpinner size={44} />
                <div className="text-gray-400">불러오는 중…</div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <Toaster position="top-center" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">연락처 관리</h1>
            <p className="text-sm text-gray-500 mt-2">- 전화번호에는 반드시 하이픈(-)을 포함해주세요</p>
            <p className="text-sm text-gray-500 mt-2">
                - 이미지는 저장을 눌러야 업로드됩니다. 선택만 하면 미리보기가 표시됩니다.
            </p>

            {/* 전화번호 섹션 */}
            <div className="mt-6 p-5 bg-gray-600 rounded-2xl">
                <label className="block mb-2 text-lg font-semibold text-gray-200">전화번호</label>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        inputMode="tel"
                        placeholder="예) 010-1234-5678"
                        className="w-full rounded-xl px-4 py-3 bg-gray-700 text-white placeholder-gray-400 outline-none ring-1 ring-white/10 focus:ring-cyan-500"
                        value={phone.call1 ?? ""}
                        onChange={(e) => {
                            setPhone({ call1: e.target.value === "" ? null : e.target.value });
                        }}
                    />
                </div>
            </div>

            {/* QR 섹션 */}
            <div className="my-5 p-5 bg-gray-600 rounded-2xl">
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SlotCard
                        title="QR 1"
                        slotState={qr1}
                        onFileChange={(file) => onFileChange("qr1", file)}
                        onClear={() => onClearSlot("qr1")}
                    />
                    <SlotCard
                        title="QR 2"
                        slotState={qr2}
                        onFileChange={(file) => onFileChange("qr2", file)}
                        onClear={() => onClearSlot("qr2")}
                    />
                </div>
            </div>

            {/* 저장 버튼 */}
            <div className="mt-6 flex justify-end items-end gap-3">
                <button
                    disabled={!hasChanges || saving}
                    onClick={handleSave}
                    className={`inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold border transition-all
                    ${
                        hasChanges && !saving
                            ? "bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-500"
                            : "bg-gray-800 text-gray-400 border-gray-700 cursor-not-allowed"
                    }`}
                >
                    {saving ? "저장 중…" : "저장"}
                </button>
            </div>

            <HomeLinkButton />
        </div>
    );
}
