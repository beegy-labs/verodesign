          {/* ======================================= */}
          {/* 5. 설정 탭 (Global Settings) */}
          {/* ======================================= */}
          {activeDepth1 === '설정' && (
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 animate-fade-in pb-24 scrollbar-hide">
              <div className="px-2">
                <h2 className="text-xl font-black text-white">전체 설정</h2>
                <p className="text-[10px] text-zinc-500 mt-1">앱 전역 시스템 및 데이터 연동 관리</p>
              </div>
              
              {/* 시스템/인증 설정 */}
              <div className="bg-[#1C1A14] rounded-2xl border border-zinc-800/80 overflow-hidden shadow-sm">
                <button onClick={() => triggerToast('KIS API 환경/Key 설정')} className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl"><ShieldCheck size={18} /></div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-zinc-200">KIS 자격증명</p>
                      <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">API 연결됨 (Prod)</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-zinc-600 group-hover:text-amber-500" />
                </button>
                
                <button onClick={() => triggerToast('월급/급여일 설정 팝업')} className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><Calendar size={18} /></div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-zinc-200">월급일 및 기준액 설정</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">매월 25일 / 3,500,000원</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-zinc-600 group-hover:text-amber-500" />
                </button>

                <button onClick={() => triggerToast('투자 Seed 및 Goal 금액 재설정')} className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl"><Target size={18} /></div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-zinc-200">투자 전략 (Seed/Goal)</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">시드 6,500만 / 목표 1억</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-zinc-600 group-hover:text-amber-500" />
                </button>
              </div>

              {/* 데이터/로그 관리 */}
              <div className="bg-[#1C1A14] rounded-2xl border border-zinc-800/80 overflow-hidden shadow-sm">
                <button onClick={() => triggerToast('/categories 이동 및 Contact 연동')} className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl"><FolderEdit size={18} /></div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-zinc-200">글로벌 카테고리/연락처</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">시스템 분류 및 채권 상대방 관리</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-zinc-600 group-hover:text-amber-500" />
                </button>

                 <button onClick={() => triggerToast('가계부+대출+주식 통합 타임라인')} className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-800 text-zinc-400 rounded-xl"><History size={18} /></div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-zinc-200">통합 거래 로그 (TxLog)</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">모든 자산 흐름의 단일 시간축 기록</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-zinc-600 group-hover:text-amber-500" />
                </button>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <button className="w-full py-3 bg-amber-500 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all">설정 변경사항 일괄 저장</button>
                <p className="text-center text-[9px] text-zinc-600">v2.1.0 • app-girok state synced</p>
              </div>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
