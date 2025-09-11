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