          {/* ======================================= */}
          {/* 4. 부채 탭 (Loans + Receivables) */}
          {/* ======================================= */}
          {activeDepth1 === '부채' && (
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 animate-fade-in pb-24 scrollbar-hide">
              {/* 부채 & 채권 요약 */}
              <div className="bg-gradient-to-br from-[#1C1A14] to-[#14120E] border border-[#3A3326] rounded-3xl p-5 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-[10px] font-semibold text-zinc-500 mb-1">갚아야 할 대출 총액</h3>
                    <h2 className="text-2xl font-black text-rose-400 tracking-tight">₩ 15,000,000</h2>
                  </div>
                  <div className="text-right">
                    <h3 className="text-[10px] font-semibold text-zinc-500 mb-1">받을 돈 (채권)</h3>
                    <h2 className="text-sm font-black text-emerald-400 tracking-tight">₩ 300,000</h2>
                  </div>
                </div>
                <div className="bg-black/30 rounded-lg p-2 flex justify-between text-[10px] font-semibold text-zinc-400">
                  <span>기간 내 상환합계</span>
                  <span className="text-zinc-200">1,500,000원</span>
                </div>
              </div>

              {/* 대출 목록 (Loans) */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2"><ArrowDownRight size={16} className="text-rose-500"/> 진행 중인 대출</h3>
                  <button onClick={() => triggerToast('새 대출 생성')} className="text-[10px] font-semibold text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">+ 대출 추가</button>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-[#14120E] border border-rose-900/30 rounded-xl p-4 hover:border-rose-500/50 transition-colors">
                    <div className="flex justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <h4 className="text-xs font-bold text-zinc-100">신한 신용대출</h4>
                          <span className="text-[8px] bg-rose-500/20 text-rose-400 px-1 py-0.5 rounded font-bold border border-rose-500/30">우선상환</span>
                        </div>
                        <p className="text-[10px] text-zinc-500">생성일: 2025.01.10</p>
                      </div>
                      <span className="text-xs font-black text-rose-400">연 5.8%</span>
                    </div>
                    <div className="flex gap-2 mt-4 pt-3 border-t border-zinc-800/60">
                      <button onClick={() => triggerToast('상환 및 이자 납입 팝업')} className="flex-1 bg-[#1C1A14] border border-[#3A3326] py-1.5 rounded-lg text-[10px] font-bold text-zinc-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors">상환 / 이자</button>
                      <button onClick={() => triggerToast('원금 증가 팝업')} className="flex-1 bg-[#1C1A14] border border-[#3A3326] py-1.5 rounded-lg text-[10px] font-bold text-zinc-300 hover:text-white transition-colors">원금 증가</button>
                    </div>
                  </div>
                </div>
              </section>

              {/* 채권 목록 (Receivables) */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2"><ArrowUpRight size={16} className="text-emerald-400"/> 받을 돈 (채권)</h3>
                  <button onClick={() => triggerToast('연락처 연동 차용금 등록')} className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">+ 등록</button>
                </div>
                <div className="bg-[#14120E] border border-[#232018] rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400"><Users size={14}/></div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-200">김지훈 (친구)</h4>
                        <p className="text-[10px] font-bold text-rose-400 mt-0.5">D-15 (회수예정)</p>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-white">300,000원</span>
                  </div>
                  <button onClick={() => triggerToast('차용금 회수 이벤트 추가')} className="w-full py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-lg border border-emerald-500/30 hover:bg-emerald-500 hover:text-black transition-all">
                    전액 회수 기록
                  </button>
                </div>
              </section>
            </div>
          )}

