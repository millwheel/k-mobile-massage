"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import LoadingSpinner from "@/component/loadingSpinner";
import HomeLinkButton from "@/component/homeLinkButton";
import type {SlotState, WhatsappSettings} from "@/data/type";
import {
    getWhatsappSetting,
    saveWhatsappSetting,
    uploadWhatsappQr,
    deleteWhatsappQr,
} from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import {SlotCard} from "@/component/slotCard";

type SlotKey = "qr1" | "qr2";

export default function AdminPage() {
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

    // Keep track of created object URLs to revoke on unmount
    const objectUrlsRef = useRef<string[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const settings = await getWhatsappSetting();
                setQr1((s) => ({ ...s, currentUrl: settings.qrUrl1 }));
                setQr2((s) => ({ ...s, currentUrl: settings.qrUrl2 }));
            } catch (e) {
                toast.error("WhatsApp 설정을 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        })();
        return () => {
            // cleanup object URLs
            objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
            objectUrlsRef.current = [];
        };
    }, []);

    const hasChanges = useMemo(() => {
        return (
            qr1.file !== null ||
            qr2.file !== null ||
            qr1.markedDelete ||
            qr2.markedDelete
        );
    }, [qr1.file, qr2.file, qr1.markedDelete, qr2.markedDelete]);

    const onFileChange = (slot: SlotKey, file: File | null) => {
        const makePreview = (f: File | null) => {
            if (!f) return null;
            const url = URL.createObjectURL(f);
            objectUrlsRef.current.push(url);
            return url;
        };
        if (slot === "qr1") {
            // revoke previous preview if any
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
                markedDelete: true, // mark to remove on save
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
        setSaving(true);
        try {
            // Start with current values
            let nextQrUrl1: string | null = qr1.currentUrl;
            let nextQrUrl2: string | null = qr2.currentUrl;

            // For each slot: if markedDelete -> delete storage (if exists) and set null
            // If file selected -> replace: delete old (if exists), upload new and set url
            // Note: deleteWhatsappQr ignores "not-found" error.
            // Slot qr1
            if (qr1.markedDelete && qr1.currentUrl) {
                await deleteWhatsappQr(qr1.currentUrl);
                nextQrUrl1 = null;
            }
            if (qr1.file) {
                if (qr1.currentUrl) {
                    await deleteWhatsappQr(qr1.currentUrl);
                }
                const uploadedUrl = await uploadWhatsappQr("qr1", qr1.file);
                nextQrUrl1 = uploadedUrl;
            }

            // Slot qr2
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

            // Persist to Firestore
            const toSave: WhatsappSettings = {
                qrUrl1: nextQrUrl1,
                qrUrl2: nextQrUrl2,
            };
            await saveWhatsappSetting(toSave);

            // Reset local states based on saved values
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
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">WhatsApp QR 관리</h1>
            <p className="text-gray-400 mt-2">
                이미지는 <span className="font-mono">저장</span>을 눌러야 업로드됩니다. 선택만 하면 미리보기가 표시됩니다.
            </p>

            <div className="my-5 p-5 bg-gray-700 rounded-2xl">
                <div className="mt-8 flex justify-end items-end gap-3">
                    <button
                        disabled={!hasChanges || saving}
                        onClick={handleSave}
                        className={`inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold
            border transition-all
            ${hasChanges && !saving
                            ? "bg-cyan-600 text-white border-cyan-500 hover:bg-cyan-500"
                            : "bg-gray-800 text-gray-400 border-gray-700 cursor-not-allowed"}`}
                    >
                        {saving ? "저장 중…" : "저장"}
                    </button>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SlotCard
                        title="QR #1"
                        slotState={qr1}
                        onFileChange={(file) => onFileChange("qr1", file)}
                        onClear={() => onClearSlot("qr1")}
                    />
                    <SlotCard
                        title="QR #2"
                        slotState={qr2}
                        onFileChange={(file) => onFileChange("qr2", file)}
                        onClear={() => onClearSlot("qr2")}
                    />
                </div>
            </div>

            <HomeLinkButton />
        </div>
    );
}

