export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            부현전기 안전보건 플랫폼 업무 흐름 구성도
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            임원/관리자/외부 감사자 보고용 (업무 흐름 중심)
          </p>
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 1400 720"
              role="img"
              aria-label="부현전기 안전보건 플랫폼 업무 흐름 구성도"
              className="w-full h-auto min-w-[1000px]"
            >
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
                </marker>
              </defs>

              {/* Left: Field */}
              <rect x="40" y="110" width="320" height="220" rx="16" ry="16" fill="#eef2f7" stroke="#64748b" strokeWidth="2" />
              <text x="70" y="150" fontSize="18" fontWeight="700" fill="#0f172a">현장 근로자 (모바일 앱)</text>
              <text x="70" y="185" fontSize="14" fill="#334155">· 작업지시 확인</text>
              <text x="70" y="210" fontSize="14" fill="#334155">· 위험성평가 / TBM 서명</text>
              <text x="70" y="235" fontSize="14" fill="#334155">· 위험 신고 (사진·음성·텍스트)</text>
              <text x="300" y="150" fontSize="22" fill="#2563eb">📱</text>

              {/* Center Top: Platform */}
              <rect x="430" y="70" width="420" height="220" rx="16" ry="16" fill="#eff6ff" stroke="#64748b" strokeWidth="2" />
              <text x="460" y="110" fontSize="18" fontWeight="700" fill="#0f172a">부현전기 안전보건 플랫폼</text>
              <text x="460" y="140" fontSize="12" fill="#64748b">(업무 통합 관리)</text>
              <text x="460" y="175" fontSize="14" fill="#334155">· 위험성평가 관리</text>
              <text x="460" y="200" fontSize="14" fill="#334155">· 현장 활동 기록</text>
              <text x="460" y="225" fontSize="14" fill="#334155">· 사고/산안비 관리</text>

              {/* Center Bottom: Managers */}
              <rect x="430" y="340" width="200" height="190" rx="16" ry="16" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
              <text x="450" y="375" fontSize="16" fontWeight="700" fill="#0f172a">현장 관리자 (웹)</text>
              <text x="450" y="405" fontSize="13" fill="#334155">· 현장 현황 조회</text>
              <text x="450" y="430" fontSize="13" fill="#334155">· 시정조치 관리</text>
              <text x="600" y="375" fontSize="18" fill="#2563eb">🧑‍💼</text>

              <rect x="650" y="340" width="200" height="190" rx="16" ry="16" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
              <text x="670" y="375" fontSize="16" fontWeight="700" fill="#0f172a">본사 관리자 (웹)</text>
              <text x="670" y="405" fontSize="13" fill="#334155">· 표준 위험성평가 관리</text>
              <text x="670" y="430" fontSize="13" fill="#334155">· 통합 관제 / KPI 관리</text>
              <text x="820" y="375" fontSize="18" fill="#2563eb">🏢</text>

              {/* Right: External */}
              <rect x="980" y="180" width="360" height="320" rx="16" ry="16" fill="#eef2f7" stroke="#64748b" strokeWidth="2" />
              <text x="1010" y="220" fontSize="18" fontWeight="700" fill="#0f172a">외부 연동 시스템</text>
              <text x="1010" y="260" fontSize="14" fill="#334155">· ERP 작업지시</text>
              <text x="1010" y="290" fontSize="14" fill="#334155">· OCR (영수증 인식)</text>
              <text x="1010" y="320" fontSize="14" fill="#334155">· 알림톡 / Push</text>
              <text x="1010" y="350" fontSize="14" fill="#334155">· 기상청 정보</text>

              {/* Arrows: workflow */}
              <path d="M 360 210 L 430 170" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
              <text x="360" y="165" fontSize="12" fill="#334155">작업 정보 전달</text>

              <path d="M 850 210 L 980 260" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
              <text x="860" y="190" fontSize="12" fill="#334155">연동 정보 수신</text>

              <path d="M 430 255 L 630 350" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
              <text x="480" y="305" fontSize="12" fill="#334155">현장 결과 공유</text>

              <path d="M 640 255 L 720 340" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
              <text x="640" y="305" fontSize="12" fill="#334155">관리 현황 공유</text>

              <path d="M 850 400 L 980 360" stroke="#334155" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
              <text x="860" y="400" fontSize="12" fill="#334155">알림 발송</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
