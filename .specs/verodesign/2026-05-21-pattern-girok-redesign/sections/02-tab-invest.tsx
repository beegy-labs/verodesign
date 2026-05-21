          {/* ======================================= */}
          {/* 2. 투자 탭 (Stock Goal & 스노우볼) */}
          {/* ======================================= */}
          {activeDepth1 === '투자' && (
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 animate-fade-in pb-24 scrollbar-hide">
              {/* 스노우볼 주식 자산 목표 */}
              <section className="bg-gradient-to-br from-[#1C1A14] to-[#12110E] border border-[#3A3326] rounded-3xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Target size={80} /></div>
                
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <h3 className="text-[10px] font-extrabold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md">10% 복리 스노우볼 챌린지</h3>
                  <button onClick={() => triggerToast('챌린지 설정(원금/수익률/횟수)')} className="text-zinc-400 hover:text-white"><Settings size={14}/></button>
                </div>
                
                {/* 횟수 기반 전체 진행률 */}
                <div className="flex justify-between items-end mb-1 mt-4 relative z-10">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">현재 <span className="text-amber-400">12회차</span> 달성</h2>
                    <p className="text-[11px] text-zinc-400 mt-1">총 72회 중 <strong className="text-zinc-200">60번</strong> 남았어요!</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">16.6%</span>
                </div>
                
                <div className="w-full h-2.5 bg-black rounded-full overflow-hidden mb-4 border border-zinc-800 relative z-10">
                  <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 w-[16.6%] rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
                </div>

                {/* 다음 1회차(단기) 목표 진행 상황 */}
                <div className="bg-black/40 border border-zinc-800/50 rounded-xl p-3 mb-4 relative z-10">
                  <div className="flex justify-between items-center text-[10px] font-semibold text-zinc-400 mb-2">
                    <span>다음 13회차 목표 자산</span>
                    <span className="text-white">3,138만 원</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[85%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                  </div>
                  <div className="flex justify-between text-[9px] mt-1.5 text-zinc-500">
                    <span>현재 2,850만 원</span>
                    <span className="text-emerald-500 font-bold">85% 도달</span>
                  </div>
                </div>
                
                {/* 챌린지 전체 조건 요약 */}
                <div className="grid grid-cols-3 gap-2 border-t border-zinc-800/80 pt-4 relative z-10">
                  <div className="text-center">
                    <p className="text-[9px] text-zinc-500 mb-0.5">시작 원금</p>
                    <p className="text-[11px] font-bold text-zinc-200">1,000만 원</p>
                  </div>
                  <div className="text-center border-l border-r border-zinc-800/80">
                    <p className="text-[9px] text-zinc-500 mb-0.5">회당 목표</p>
                    <p className="text-[11px] font-bold text-rose-400">+ 10%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] text-zinc-500 mb-0.5">최종 (72회)</p>
                    <p className="text-[11px] font-bold text-amber-400">100억 원</p>
                  </div>
                </div>
                
                {/* 수익 배분 요약 (Allocation) */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex justify-between relative z-10">
                  <div className="flex flex-col items-center flex-1 border-r border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 mb-1">상환 배분 (30%)</span>
                    <button onClick={() => triggerToast('전진 상환 기록 팝업')} className="text-[11px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"><ArrowDownRight size={12}/> 대출 갚기</button>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-[10px] text-zinc-500 mb-1">안전 보전 (10%)</span>
                    <button onClick={() => triggerToast('안전보전 저축/배당 실행')} className="text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"><Landmark size={12}/> 저축 이체</button>
                  </div>
                </div>
              </section>

              {/* 매매 및 스캘핑 진입점 */}
              <section className="grid grid-cols-2 gap-3">
                <div onClick={() => triggerToast('/stock-history 정산 내역 이동')} className="bg-[#14120E] border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between h-24 cursor-pointer hover:bg-[#1A1813] transition-colors shadow-sm">
                  <History size={20} className="text-zinc-300 mb-1" />
                  <h4 className="text-xs font-bold text-zinc-200">정산 히스토리</h4>
                </div>
                <div onClick={() => setIsScalpCalcOpen(true)} className="bg-gradient-to-b from-[#2E281C] to-[#1A1813] border border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between h-24 cursor-pointer hover:border-amber-500/60 transition-colors shadow-sm relative overflow-hidden">
                  <div className="absolute -right-2 -bottom-2 text-amber-500/10"><Zap size={48}/></div>
                  <Zap size={20} className="text-amber-500 mb-1 relative z-10" />
                  <h4 className="text-xs font-extrabold text-amber-400 relative z-10">스캘프 계산기</h4>
                </div>
              </section>

              {/* 보유 포지션 (Positions) */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2"><TrendingUp size={16} className="text-rose-500"/> 내 주식 포지션</h3>
                  <button onClick={() => triggerToast('/stock-trades 매수/매도 이동')} className="text-[10px] font-bold bg-zinc-800 px-2 py-1 rounded text-zinc-300 hover:text-white">+ 거래 등록</button>
                </div>
                <div className="space-y-2.5">
                  {[{ ticker: 'AAPL', name: 'Apple Inc.', profit: '+12.5%', amount: '12,500,000', up: true }, { ticker: 'TSLA', name: 'Tesla', profit: '-3.2%', amount: '8,400,000', up: false }].map((stock) => (
                    <div key={stock.ticker} className="bg-[#14120E] border border-[#232018] rounded-xl p-3.5 flex justify-between items-center hover:bg-[#1A1812] cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1C1A14] border border-[#2B271E] flex items-center justify-center text-xs font-black text-amber-500 shadow-inner">{stock.ticker[0]}</div>
                        <div><h4 className="text-xs font-bold text-zinc-100">{stock.ticker}</h4><p className="text-[10px] text-zinc-500 mt-0.5">{stock.name}</p></div>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] font-bold text-zinc-200">{stock.amount}원</p>
                        <p className={`text-[10px] font-extrabold mt-0.5 ${stock.up ? 'text-rose-500' : 'text-blue-500'}`}>{stock.profit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

