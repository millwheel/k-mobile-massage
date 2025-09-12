export type Row = {
    duration: string;
    price: string
};

export type Course = {
    name: string;
    rows: Row[];
    badge?: string
};

export type WhatsappSettings = {
    qrUrl1: string | null;
    qrUrl2: string | null;
}

export type SlotState = {
    currentUrl: string | null;   // what's stored in DB now
    file: File | null;           // newly chosen file (not uploaded yet)
    previewUrl: string | null;   // local ObjectURL for preview
    markedDelete: boolean;       // user chose to clear this slot
};