import {auth, db, storage} from "@/lib/firebase";
import {onAuthStateChanged, signInWithEmailAndPassword, signOut, User} from "firebase/auth";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {PhoneSettings, WhatsappSettings} from "@/data/type";
import {deleteObject, getDownloadURL, ref, uploadBytes} from "@firebase/storage";
import {FirebaseError} from "@firebase/app";

export async function login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

export function observeAuthState(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}

export async function logout() {
    await signOut(auth);
}

const WHATSAPP_DOC_REF = doc(db, "settings", "whatsapp");
const PHONE_EN_DOC_REF = doc(db, "settings", "phone_en");

// READ PHONE
export async function getPhoneSettings(): Promise<PhoneSettings> {
    const snap = await getDoc(PHONE_EN_DOC_REF);
    if (!snap.exists()) {
        return { call1: null };
    }
    const data = snap.data() as PhoneSettings;
    return {
        call1: data.call1 ?? null,
    };
}

// UPSERT PHONE
export async function savePhoneSettings(settings: PhoneSettings): Promise<void> {
    await setDoc(
        PHONE_EN_DOC_REF,
        {
            ...(settings.call1 !== undefined ? { call1: settings.call1 } : {}),
        },
        { merge: true }
    );
}

// READ
export async function getWhatsappSetting(): Promise<WhatsappSettings> {
    const snap = await getDoc(WHATSAPP_DOC_REF);
    if (!snap.exists()) {
        return { qrUrl1: null, qrUrl2: null };
    }
    const data = snap.data() as WhatsappSettings;
    return {
        qrUrl1: data.qrUrl1 ?? null,
        qrUrl2: data.qrUrl2 ?? null,
    };
}

// UPSERT
export async function saveWhatsappSetting(settings: WhatsappSettings): Promise<void> {
    await setDoc(
        WHATSAPP_DOC_REF,
        {
            ...(settings.qrUrl1 !== undefined ? { qrUrl1: settings.qrUrl1 } : {}),
            ...(settings.qrUrl2 !== undefined ? { qrUrl2: settings.qrUrl2 } : {}),
        },
        { merge: true }
    );
}

// 업로드
export async function uploadWhatsappQr(slot: "qr1" | "qr2", file: File): Promise<string> {
    const storageRef = ref(storage, `settings/whatsapp/${slot}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}

// 삭제
export async function deleteWhatsappQr(imageUrl: string): Promise<void> {
    try {
        const url = new URL(imageUrl);
        const path = decodeURIComponent(url.pathname.split("/o/")[1].split("?")[0]);
        const imageRef = ref(storage, path);
        await deleteObject(imageRef);
    } catch (error) {
        if (error instanceof FirebaseError && error.code === "storage/object-not-found") {
            return;
        }
        throw error;
    }
}