"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/component/loadingSpinner";
import HomeLinkButton from "@/component/homeLinkButton";
import type { WhatsappSettings } from "@/data/type";
import {
    getWhatsappSetting,
    saveWhatsappSetting,
    uploadWhatsappQr,
    deleteWhatsappQr,
} from "@/lib/api";
import toast, {Toaster} from "react-hot-toast";

export default function AdminPage() {

}