"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Campaign119Page() {
  const [showToast, setShowToast] = useState(false);

  const handlePledge = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#bbf7d0_0,_#ecfccb_35%,_#064e3b_100%)] p-4 md:p-8">
      <div className="w-full max-w-4xl">
        {/* 빛나는 외곽 테두리 효과 */}
        <div className="relative">
          <div className="pointer-events-none absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-500 opacity-70 blur-sm" />

          <Card className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-50 shadow-[0_40px_80px_rgba(6,78,59,0.7)]">
            {/* 상단 리본 */}
            <div className="absolute -left-10 top-8 rotate-[-30deg] bg-amber-400 text-emerald-950 px-12 py-1.5 text-xs font-extrabold shadow-xl tracking-widest">
              119 SAFE DRINKING CAMPAIGN
            </div>

            {/* 장식 요소 */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 top-16 h-40 w-40 rounded-full border border-amber-200/40" />
            <div className="pointer-events-none absolute -left-10 bottom-10 h-32 w-32 rounded-full border border-emerald-400/40" />

            <CardContent className="relative p-6 md:p-10 space-y-10">
              {/* 헤더 영역 */}
              <div className="space-y-4 text-center md:text-left max-w-2xl mx-auto">
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-800/80 px-4 py-1 text-[11px] font-semibold tracking-wide text-emerald-50 shadow-sm">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-300 animate-pulse" />
                  내일의 안전을 지키는 오늘의 회식 약속
                </p>
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                    건전한 회식 문화!
                  </h1>
                  <div className="mt-2 flex items-baseline gap-3 justify-center md:justify-start">
                    <span className="text-4xl md:text-5xl font-black text-amber-300 drop-shadow-[0_0_20px_rgba(250,250,165,0.5)]">
                      1&nbsp;1&nbsp;9
                    </span>
                    <span className="text-sm md:text-base text-emerald-100/80 font-semibold">
                      1가지 술 · 1차만 · 9시까지
                    </span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-emerald-100/80">
                  과음·장시간 회식은 다음 날 작업 집중력을 떨어뜨리고 사고 위험을 높입니다.
                  119 원칙을 지켜 내일의 나와 동료의 안전을 함께 지켜주세요.
                </p>
              </div>

              {/* 카드 뉴스 3단 영역 */}
              <div className="grid gap-4 md:grid-cols-3">
                {/* 1가지 술로 */}
                <div className="group rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-700 p-4 md:p-5 shadow-lg border border-emerald-500/40 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(16,185,129,0.45)]">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950/60 px-3 py-1 text-[11px] font-semibold text-emerald-100">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-300 text-emerald-950 text-sm font-extrabold shadow">
                        1
                      </span>
                      <span>가지 술로</span>
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-lg md:text-xl font-bold">
                        여러 술 섞어 마시지 않기
                      </h2>
                      <p className="text-xs md:text-sm text-emerald-50/80 leading-relaxed">
                        폭탄주, 섞어 마시기 금지!
                        <br />
                        한 가지 주종으로 천천히, 내 컨디션을 지키는 회식 문화를 만듭니다.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] md:text-xs text-emerald-100/70">
                    ※ 다양한 술을 섞어 마시면 숙취와 사고 위험이 급격히 증가합니다.
                  </div>
                </div>

                {/* 1차에 한하여 */}
                <div className="group rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-700 p-4 md:p-5 shadow-lg border border-emerald-500/40 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(16,185,129,0.45)]">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950/60 px-3 py-1 text-[11px] font-semibold text-emerald-100">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-300 text-emerald-950 text-sm font-extrabold shadow">
                        1
                      </span>
                      <span>차에 한하여</span>
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-lg md:text-xl font-bold">
                        2차, 3차 강요하지 않기
                      </h2>
                      <p className="text-xs md:text-sm text-emerald-50/80 leading-relaxed">
                        눈치 보는 추가 회식은 그만!
                        <br />
                        1차에서 충분히 소통하고, 각자의 가정과 휴식을 존중합니다.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] md:text-xs text-emerald-100/70">
                    ※ 자율적인 귀가 보장이 건강한 조직 문화를 만듭니다.
                  </div>
                </div>

                {/* 9시까지 */}
                <div className="group rounded-2xl bg-gradient-to-br from-amber-500 to-amber-400 p-4 md:p-5 shadow-lg border border-amber-300 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(251,191,36,0.6)]">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-900/20 px-3 py-1 text-[11px] font-semibold text-amber-950">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900 text-amber-200 text-sm font-extrabold shadow">
                        9
                      </span>
                      <span>시까지</span>
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-lg md:text-xl font-bold text-amber-950">
                        9시 전 종료로 내일의 안전 지키기
                      </h2>
                      <p className="text-xs md:text-sm text-amber-950/90 leading-relaxed">
                        늦은 회식은 다음 날 작업 집중력 저하와 사고로 이어집니다.
                        <br />
                        9시 이전 종료로 충분한 휴식을 보장합니다.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] md:text-xs text-amber-950/80">
                    ※ 충분한 수면은 산업재해 예방의 첫 걸음입니다.
                  </div>
                </div>
              </div>

              {/* 하단 메시지 & 버튼 / 서약 섹션 */}
              <div className="space-y-4 pt-4 border-t border-emerald-700/60">
                <p className="text-center text-sm md:text-lg text-emerald-100/95 font-semibold tracking-wide">
                  <span className="block md:inline text-amber-300 text-base md:text-2xl font-extrabold">
                    내일의 안전을 위해 오늘 9시에 멈춥니다.
                  </span>
                  <span className="block md:inline md:ml-3 text-emerald-100/80 text-xs md:text-sm">
                    - 안전보건실 -
                  </span>
                </p>

                <p className="text-center text-[11px] md:text-xs text-emerald-100/80">
                  이 캠페인은 법정보다 한 발 앞선{" "}
                  <span className="font-semibold text-amber-300">
                    부현전기만의 안전 문화
                  </span>
                  를 약속합니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* (시연용으로 토스트 동작은 제거, 정적 포스터 한 장으로 사용) */}
      </div>
    </div>
  );
}


