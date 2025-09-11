export type Row = {
    duration: string;
    price: string
};

export type Course = {
    name: string;
    rows: Row[];
    badge?: string
};

export type WhatsappQR = {
    storagePath: string;
    downloadURL: string;
    updatedAt: string;
}

export type WhatsappSettings = {
    qr1: WhatsappQR | null;
    qr2: WhatsappQR | null;
}

export type QrSlot = "qr1" | "qr2";