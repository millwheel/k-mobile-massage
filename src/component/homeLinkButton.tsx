import Link from "next/link";

export default function HomeLinkButton() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 py-5">
            <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl
                 bg-gray-900 border border-gray-600 px-10 py-4 font-semibold text-white text-lg
                 shadow-md shadow-black/20
                 transition-all duration-300
                 hover:border-cyan-400 hover:text-cyan-500"
            >
                홈으로 돌아가기
            </Link>
        </div>
    );
}
