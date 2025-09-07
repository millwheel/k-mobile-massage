export type Row = {
    duration: string;
    price: string
};
export type Course = {
    name: string;
    rows: Row[];
    badge?: string
};