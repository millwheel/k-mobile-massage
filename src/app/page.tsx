import FadeUpWrapper from "@/component/fadeUpWrapper";
import Image from "next/image";
import {ShieldIcon} from "@/component/shieldIcon";
import {AlertIcon} from "@/component/alertIcon";
import {courses} from "@/data/data";
import CallButtons from "@/component/CallButton";

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
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight py-6 text-white">
              K Mobile Massage
            </h1>

            {/* 어트랙션 */}
            <div className="flex flex-col space-y-10">
              <FadeUpWrapper delay={50}>
                {/* 거리 문구 */}
                <div className="flex flex-col space-y-3">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
                    Service Area: <span className="text-cyan-300">Seoul · Gyeonggi · Incheon</span>
                    <br />
                    <span className="text-pink-400 font-extrabold">Arrival within 30 minutes</span>
                  </p>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    * Please allow for possible delays during peak hours or to outer Gyeonggi regions.
                  </p>
                </div>
              </FadeUpWrapper>

              <FadeUpWrapper delay={100}>
                {/* 24시간 운영 문구 */}
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
                    Available <span className="text-cyan-300 font-extrabold">24/7</span>, 365 Days a Year
                    <br />
                    <span className="text-pink-400">Book anytime, day or night</span>
                  </p>
                </div>
              </FadeUpWrapper>

              <FadeUpWrapper delay={150}>
                {/* 결제 수단 문구 */}
                <div className="flex flex-col space-y-2">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    Easy & Transparent Payment
                  </p>
                  <p className="text-base sm:text-lg text-gray-100 font-medium">
                    Cash, bank transfer, or card accepted <br className="sm:hidden"/>
                    <span className="text-gray-400">(card payments subject to 10% VAT)</span>
                  </p>
                  <ul className="text-sm sm:text-base text-gray-400 list-disc list-inside space-y-1">
                    <li>No advance payment required</li>
                    <li>No travel fees or hidden charges</li>
                    <li>Pay after the therapist arrives</li>
                  </ul>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Our Therapists, <span className="text-pink-400">All in their 20s</span>
              </h2>
            </FadeUpWrapper>
            <FadeUpWrapper>
              <p className="text-gray-400 text-lg">
                30+ therapists available daily, with diverse styles to match your preference
              </p>
            </FadeUpWrapper>
          </div>

          {/* 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto text-xl sm:text-2xl font-bold">
            <FadeUpWrapper>
              <div className="rounded-2xl bg-gradient-to-br from-white/6 to-white/3 p-6 text-center ring-1 ring-white/10 shadow-lg shadow-black/20">
                <p className="text-pink-400">🏆 Ranked #1 in customer satisfaction</p>
              </div>
            </FadeUpWrapper>

            <FadeUpWrapper>
              <div className="rounded-2xl bg-gradient-to-br from-white/6 to-white/3 p-6 text-center ring-1 ring-white/10 shadow-lg shadow-black/20">
                <p className="text-pink-400">🏆 Ranked #1 in repeat bookings</p>
              </div>
            </FadeUpWrapper>

            <FadeUpWrapper>
              <div className="rounded-2xl bg-gradient-to-br from-white/6 to-white/3 p-6 text-center ring-1 ring-white/10 shadow-lg shadow-black/20">
                <p className="text-cyan-400">A professional massage certification</p>
              </div>
            </FadeUpWrapper>

            <FadeUpWrapper>
              <div className="rounded-2xl bg-gradient-to-br from-white/6 to-white/3 p-6 text-center ring-1 ring-white/10 shadow-lg shadow-black/20">
                <p className="text-cyan-400">Safe Database Guarantee</p>
              </div>
            </FadeUpWrapper>
          </div>

          {/* 이미지 */}
          <div className="flex justify-center">
            <Image
                src="/image/therapist1.jpg"
                alt="therapist1"
                width={600}
                height={500}
                className="object-cover rounded-lg"
                priority
            />
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-16 space-y-8">
          {/* 헤더 영역 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <FadeUpWrapper>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Recruitment & Quality Management
              </h2>
            </FadeUpWrapper>
          </div>

          {/* 신뢰 / 운영 안내 */}
          <div className="pt-2 text-base md:text-lg flex flex-col gap-6 max-w-2xl mx-auto">
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 leading-relaxed">
              <li>
                All therapists are personally interviewed prior to hiring
              </li>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 leading-relaxed">
              <li>
                International recruitment through certified agencies ensures both skill and appearance
              </li>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 leading-relaxed">
              <li>
                Strict Three-Strike Policy: repeated complaints result in immediate dismissal
              </li>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 leading-relaxed">
              <li>
                Constantly hiring new, high-quality therapists
              </li>
            </div>
          </div>

          {/* 이미지 */}
          <div className="flex justify-center">
            <Image
                src="/image/therapist2.jpg"
                alt="therapist2"
                width={600}
                height={500}
                className="object-cover rounded-lg"
                priority
            />
          </div>
        </section>

        {/* 표 섹션 */}
        <section className="mx-auto max-w-3xl px-6 py-16 space-y-8">
          <FadeUpWrapper>
            <div className="flex justify-center p-2">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Course & Pricing
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
                              Duration
                            </th>
                            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-gray-200">
                              Price
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
                Call us
              </h2>
            </FadeUpWrapper>
            <FadeUpWrapper>
              <p className="text-xl text-gray-200">
                for friendly consultation and <span className="text-pink-400 font-semibold">personalized therapist matching</span>
              </p>
            </FadeUpWrapper>

            {/* 안내 문구 */}
            <div className="pt-8 flex flex-col gap-6 max-w-2xl mx-auto w-full">
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 leading-relaxed text-gray-300 space-y-2">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="font-semibold text-white">Express service</span> across Seoul, Gyeonggi, and Incheon
                  </li>
                  <li>
                    Available at <span className="font-semibold text-white">private residences, hotels,</span> and accommodations
                  </li>
                  <li>
                    <span className="font-semibold text-white">1 to 4+ persons</span> (one therapist per client; separate rooms required for each person)
                  </li>
                </ul>
              </div>
            </div>

            {/*/!* CTA *!/*/}
            <CallButtons />
          </div>
        </section>

        {/* 개인정보보호 및 주의 섹션 */}
        <section className="mx-auto max-w-3xl px-6 py-16 space-y-10">
          {/* 헤더 */}
          <div className="flex flex-col items-center text-center space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              <span className="text-red-400">Important Notes</span>
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
                    At K Mobile Massage, <span className="text-yellow-300 font-semibold"> your payment is made only upon arrival, </span>
                    and all therapists are verified professionals.
                  </p>
                </div>
              </div>
            </div>

            {/* 경고 박스 */}
            <div className="rounded-2xl bg-orange-400/5 p-6 ring-1 ring-orange-400/30 text-sm sm:text-base md:text-lg">
              <div className="flex items-start gap-3">
                <AlertIcon className="mt-1 !h-5 !w-5 shrink-0 text-orange-400" />
                <div className="space-y-2 text-gray-200">
                  <p className="font-semibold text-orange-300">
                    Be aware of this:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      We do not accept reservations from 070 numbers, VoIP, public phones, landlines, or blocked caller IDs
                    </li>
                    <li>
                      Any attempt to force services outside the agreed booking will immediately terminate the session and result in strict measures
                    </li>
                    <li>
                      Repeated last-minute cancellations may restrict future bookings
                    </li>
                  </ul>
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
