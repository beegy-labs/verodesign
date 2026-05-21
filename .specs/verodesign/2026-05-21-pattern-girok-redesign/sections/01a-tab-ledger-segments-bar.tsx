          {/* ======================================= */}
          {/* 1. 가계부 탭 (Core Ledger) */}
          {/* ======================================= */}
          {activeDepth1 === '가계부' && (
            <>
              {/* 가계부 2 Depth (내역 조회 | 소비 분석 | 가계부 관리) */}
              <div className="px-6 py-4 bg-[#0D0C0A] sticky top-0 z-20">
                <div className="bg-[#1C1A14] p-1 rounded-xl flex relative border border-[#2B271E]">
                  <div className={`absolute top-1 bottom-1 w-[calc(33.333%-2.6px)] rounded-lg bg-[#2E281C] border border-[#483E2C] transition-transform duration-300 ease-out shadow-sm`}
                       style={{ transform: activeSegment === '가계부' ? 'translateX(0)' : activeSegment === '분석' ? 'translateX(100%)' : 'translateX(200%)' }} />
                  <button onClick={() => setActiveSegment('가계부')} className={`flex-1 py-1.5 text-xs font-bold text-center z-10 transition-colors ${activeSegment === '가계부' ? 'text-amber-400' : 'text-zinc-500'}`}>내역 조회</button>
                  <button onClick={() => setActiveSegment('분석')} className={`flex-1 py-1.5 text-xs font-bold text-center z-10 transition-colors ${activeSegment === '분석' ? 'text-amber-400' : 'text-zinc-500'}`}>소비 분석</button>
                  <button onClick={() => setActiveSegment('관리')} className={`flex-1 py-1.5 text-xs font-bold text-center z-10 transition-colors ${activeSegment === '관리' ? 'text-amber-400' : 'text-zinc-500'}`}>가계부 관리</button>
                </div>
              </div>

