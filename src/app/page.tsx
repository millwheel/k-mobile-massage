import FadeUpWrapper from "@/component/fadeUpWrapper";
import Image from "next/image";
import {ShieldIcon} from "@/component/shieldIcon";
import {AlertIcon} from "@/component/alertIcon";
import {courses} from "@/data/data";

export default function Home() {
  return (
      <div className="min-h-screen bg-[#0B0E13] text-white">
        {/* 인트로 섹션 */}
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
          {/* 배경 */}
          <div
              className="absolute inset-0 opacity-40 blur-3xl"
              style={{
                background:
                    "radial-gradient(60% 50% at 20% 10%, #34d0ff55 0%, transparent 60%), radial-gradient(50% 40% at 90% 30%, #00ffaa33 0%, transparent 60%)",
              }}
          />

          {/* 콘텐츠 */}
          <div className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center space-y-16 mt-15">
            {/* 메인 타이틀 */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight py-5">
              K Mobile Massage
            </h1>

            {/* 어트랙션 */}
            <div className="flex flex-col space-y-8">
              <FadeUpWrapper delay={50}>
                {/* 거리 문구 */}
                <div className="flex flex-col space-y-3">
                  <p className="text-2xl sm:text-4xl font-bold text-white">
                    Service Area: Seoul · Gyeonggi · Incheon
                    <br />
                    <span className="text-cyan-300">Arrival within 30 minutes</span>
                  </p>
                  <p className="text-base sm:text-lg text-gray-400">
                    * Please allow for possible delays during peak hours or to outer Gyeonggi regions.
                  </p>
                </div>
              </FadeUpWrapper>
              <FadeUpWrapper delay={100}>
                {/* 24시간 운영 문구 */}
                <div>
                  <p className="text-2xl sm:text-4xl font-bold text-white">
                    Available 24/7, 365 Days a Year
                    <br/>
                    <span className="text-cyan-300"> Book anytime, day or night. </span>
                  </p>
                </div>
              </FadeUpWrapper>
              <FadeUpWrapper delay={150}>
                {/* 결제 수단 문구 */}
                <div className="flex flex-col space-y-2">
                  <p className="text-2xl sm:text-4xl font-bold text-white">
                    Easy & Transparent Payment
                  </p>
                  <p className="text-lg sm:text-xl text-white">
                    Cash, bank transfer, or card accepted (card payments subject to 10% VAT)
                  </p>
                  <p className="text-base sm:text-lg text-gray-400">
                    * No advance payment required
                  </p>
                  <p className="text-base sm:text-lg text-gray-400">
                    * No travel fees or hidden charges
                  </p>
                  <p className="text-base sm:text-lg text-gray-400">
                    * Pay after the therapist arrives
                  </p>
                </div>
              </FadeUpWrapper>
            </div>

            {/* 인트로 이미지 */}
            <div className="flex justify-center">
              <Image
                  src="/image/notice.jpg"
                  alt="K mobile massage notice"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg shadow-black/40"
              />
            </div>
          </div>

        </section>

        {/* 관리사 섹션 */}
        <section className="mx-auto max-w-4xl px-6 py-16 space-y-8 mt-15">
          {/* 헤더 영역 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <FadeUpWrapper>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                한국 · 태국 전원 <span className="text-pink-400">20대</span> 관리사
              </h2>
            </FadeUpWrapper>
            <FadeUpWrapper>
              <p className="text-gray-400 text-lg">
                매일 출근인원 30명 이상 · 다양한 스타일
              </p>
            </FadeUpWrapper>
          </div>

          {/* 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <FadeUpWrapper>
              <div className="rounded-2xl bg-gradient-to-br from-black/40 to-black/20 p-6 text-center text-cyan-300 ring-1 ring-cyan-400/30">
                <span className="text-xl font-semibold">전문 자격증 보유</span>
              </div>
            </FadeUpWrapper>

            <FadeUpWrapper>
              <div className="rounded-2xl bg-gradient-to-br from-black/40 to-black/20 p-6 text-center text-cyan-300 ring-1 ring-cyan-400/30">
                <span className="text-xl font-semibold">맞춤형 스타일 배정</span>
              </div>
            </FadeUpWrapper>

            <FadeUpWrapper>
              <div className="rounded-2xl bg-gradient-to-br from-white/6 to-white/3 p-6 text-center ring-1 ring-white/10 shadow-lg shadow-black/20">
                <p className="text-2xl font-bold text-pink-400">🏆 만족도 1위</p>
                <p className="mt-2 text-sm text-gray-300">
                  꾸준한 평가와 피드백 기반의 품질 관리
                </p>
              </div>
            </FadeUpWrapper>

            <FadeUpWrapper>
              <div className="rounded-2xl bg-gradient-to-br from-white/6 to-white/3 p-6 text-center ring-1 ring-white/10 shadow-lg shadow-black/20">
                <p className="text-2xl font-bold text-pink-400">🏆 재방율 1위</p>
                <p className="mt-2 text-sm text-gray-300">
                  스타일 미팅 후 최적 배정 · 높은 만족도
                </p>
              </div>
            </FadeUpWrapper>
          </div>

          {/* 이미지 */}
          <div className="flex justify-center">
            <Image
                src="/image/therapist1.jpg"
                alt="therapist1"
                width={600}
                height={400}
                className="object-cover rounded-lg"
                priority
            />
          </div>

          {/* 신뢰 / 운영 안내 */}
          <div className="pt-8 flex flex-col gap-6 max-w-2xl mx-auto">
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 leading-relaxed">
              <p>
                관리사는 모두 직접 면접 후 채용하고 있으며, 공인 에이전시를 통한 해외 리크루팅으로
                외적으로도 실력적으로도 뛰어난 인원으로만 구성되어 있습니다.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 leading-relaxed">
              <p>
                <span className="font-semibold text-yellow-400">쓰리아웃 제도</span>를 운영하여
                지속적인 컴플레인 발생 시 <span className="text-red-500 font-semibold">즉시 퇴출</span>합니다.
                동시에 새로운 관리사들을 상시 채용하여 서비스 품질을 유지합니다.
              </p>
            </div>
          </div>

        </section>

        {/* 표 섹션 */}
        <section className="mx-auto max-w-3xl px-6 py-16 space-y-8">
          <FadeUpWrapper>
            <div className="flex justify-center p-2">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                <span className="text-pink-400">SSUM</span> 코스 & 가격
              </h2>
            </div>
          </FadeUpWrapper>

          <div className="grid grid-cols-1 gap-8">
            {courses.map((course, idx) => (
                <FadeUpWrapper key={course.name} delay={60 * (idx + 1)}>
                  <div className="rounded-2xl bg-gradient-to-br from-white/6 to-white/3 ring-1 ring-white/10 shadow-lg shadow-black/20">
                    {/* 타이틀 바 */}
                    <div className="flex items-center justify-between px-6 py-5 border-white/10">
                      <div>
                        <h2 className="text-2xl font-extrabold tracking-tight">
                          {course.name}
                        </h2>
                      </div>
                      {course.badge && (
                          <span className="rounded-xl bg-pink-500/20 text-pink-300 text-xs font-semibold px-3 py-1 ring-1 ring-pink-400/40">
                            {course.badge}
                          </span>
                      )}
                    </div>

                    {/* 표 */}
                    <div className="px-2 pb-4 sm:px-6 sm:pb-6">
                      <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                        <table className="min-w-full divide-y divide-white/10">
                          <thead className="bg-white/5">
                          <tr>
                            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-200">
                              코스 시간
                            </th>
                            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-200">
                              가격
                            </th>
                          </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                          {course.rows.map((row, i) => (
                              <tr
                                  key={`${course.name}-${row.duration}`}
                                  className={i % 2 === 0 ? "bg-white/0" : "bg-white/[0.03]"}
                              >
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                  {row.duration}
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                                  {row.price}
                                </td>
                              </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>

                      {/* 안내 문구 */}
                      <p className="mt-3 text-xs sm:text-sm text-gray-400">
                        * The amount shown is based on one person
                      </p>
                    </div>
                  </div>
                </FadeUpWrapper>
            ))}
          </div>
        </section>

        {/* 고객 편의 섹션 */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="flex flex-col items-center text-center space-y-6">
            <FadeUpWrapper>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                부담없이 전화주세요
              </h2>
            </FadeUpWrapper>
            <FadeUpWrapper>
              <p className="text-lg text-gray-200">
                전화주시면 한분 한분 <span className="text-pink-400 font-semibold">스타일 미팅</span> 후
                <span className="text-cyan-300 font-semibold"> 즉시 배정</span>까지 친절 상담 드립니다. ^^
              </p>
            </FadeUpWrapper>
            <FadeUpWrapper>
              {/* 포인트 칩 */}
              <div className="flex flex-wrap justify-center gap-2">
                        <span className="rounded-xl bg-white/5 px-3 py-1 text-sm text-gray-200 ring-1 ring-white/10">
                            서울/경기/인천 전지역 총알 방문
                        </span>
                <span className="rounded-xl bg-white/5 px-3 py-1 text-sm text-gray-200 ring-1 ring-white/10">
                            자택 및 다양한 숙박업소 방문
                        </span>
                <span className="rounded-xl bg-white/5 px-3 py-1 text-sm text-gray-200 ring-1 ring-white/10">
                            1인 · 2인 · 3인 · 4인 다인원 가능
                        </span>
              </div>
            </FadeUpWrapper>

            {/* 안내 문구 */}
            <div className="pt-8 flex flex-col gap-6 max-w-2xl mx-auto w-full">
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 leading-relaxed text-gray-300 space-y-3">
                <p>
                  다인원 출장 시 <span className="font-semibold text-white">1인 1배정</span>입니다.
                </p>
                <p>
                  자택일 경우 <span className="font-semibold text-white">방이 분리</span>되어야 하고,
                  숙박업소는 <span className="font-semibold text-white">각각의 객실</span>이 필요합니다.
                </p>
              </div>
            </div>

            {/*/!* CTA *!/*/}
            {/*<PhoneCallButton />*/}
          </div>
        </section>

        {/* 개인정보보호 및 주의 섹션 */}
        <section className="mx-auto max-w-3xl px-6 py-16 space-y-10">
          {/* 헤더 */}
          <div className="flex flex-col items-center text-center space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              안심 DB 번호 — 먼저 연락드리는 일은 <span className="text-red-400">절대 없습니다</span>
            </h3>
          </div>

          {/* 본문 카드 */}
          <div className="mt-8 space-y-6">
            {/* 정보 보호 박스 */}
            <div className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 text-sm sm:text-base md:text-lg">
              <div className="flex items-start gap-3">
                <ShieldIcon className="mt-1 !h-6 !w-6 shrink-0 text-cyan-300" />
                <div className="space-y-2 text-gray-200">
                  <p className="font-semibold text-cyan-300">Your personal information is strictly protected. </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      No advertising calls or texts
                    </li>
                    <li>
                      We never contact you first unless you reach out to us
                    </li>
                    <li>
                      Beware of impersonators claiming to be us
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 주의 박스 */}
            <div className="rounded-2xl bg-red-500/5 p-6 ring-1 ring-red-400/30 text-sm sm:text-base md:text-lg">
              <div className="flex items-start gap-3">
                <AlertIcon className="mt-1 !h-5 !w-5 shrink-0 text-red-400" />
                <div className="space-y-2 text-gray-200">
                  <p className="font-semibold text-red-300">
                    Important Notice
                  </p>
                  <p>
                    Be cautious of operators who:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Demand deposits or reservation fees
                    </li>
                    <li>
                      Use stolen therapist images for promotion
                    </li>
                  </ul>
                  <p>
                    At K Mobile Massage, <span className="text-yellow-300 font-semibold"> your payment is made only upon arrival,</span>
                    and all therapists are verified professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mx-auto max-w-6xl px-6 py-12 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} K mobile massage. All rights reserved.
        </footer>

      </div>
  );
}
