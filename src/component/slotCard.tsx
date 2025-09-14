import {SlotState} from "@/data/type";

export function SlotCard({
                      title,
                      slotState,
                      onFileChange,
                      onClear,
                  }: {
    title: string;
    slotState: SlotState;
    onFileChange: (file: File | null) => void;
    onClear: () => void;
}) {
    const displayUrl = slotState.previewUrl ?? slotState.currentUrl;

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg text-white font-semibold">{title}</h2>
                {slotState.markedDelete && (
                    <span className="text-xs px-2 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-400/30">
            삭제 예정
          </span>
                )}
            </div>

            <div className="mt-4 aspect-square w-full overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/20 flex items-center justify-center">
                {displayUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={displayUrl}
                        alt="QR preview"
                        className="object-contain w-full h-full"
                    />
                ) : (
                    <div className="text-gray-500 text-sm">이미지 없음</div>
                )}
            </div>

            <div className="mt-4 flex items-center gap-3">
                <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-gray-900 border border-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:border-cyan-400 hover:text-cyan-300 transition-all">
                    파일 선택
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            onFileChange(file);
                        }}
                    />
                </label>

                <button
                    type="button"
                    onClick={onClear}
                    className="inline-flex items-center justify-center rounded-xl bg-gray-800 border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 transition-colors cursor-pointer"
                >
                    비우기
                </button>

                <div className="ml-auto text-xs text-gray-400">
                    {slotState.previewUrl
                        ? "미리보기 중"
                        : slotState.currentUrl
                            ? "저장됨"
                            : "미선택"}
                </div>
            </div>
        </div>
    );
}
