          {/* ======================================= */}
          {/* 3. 자산 탭 (Asset & Savings) */}
          {/* ======================================= */}
          {activeDepth1 === '자산' && (
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 animate-fade-in pb-24 scrollbar-hide">
              {/* 총 자산 */}
              <div className="text-center space-y-1">
                <p className="text-xs font-semibold text-zinc-400">총 보유 자산 (현금+투자+저축)</p>
                <h2 className="text-3xl font-black text-white tracking-tight">₩ 28,450,000</h2>
              </div>

              {/* 1. 현금 및 투자금 계좌 (Cash & Capital) */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2"><Wallet size={16} className="text-amber-500"/> 내 계좌 (현금/투자)</h3>
                  <button onClick={() => triggerToast('계좌 대사(Reconcile) 모드')} className="text-[10px] text-zinc-500 hover:text-amber-400 flex items-center gap-1"><RefreshCcw size={10}/> 실사 조정</button>
                </div>
                <div className="bg-[#1C1A14] border border-[#3A3326] rounded-2xl overflow-hidden shadow-sm">
                  {/* 일반 현금 */}
                  <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center hover:bg-[#25221B] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">토스</div>
                      <div><p className="text-xs font-bold text-zinc-200">일반 현금 (KRW/USD)</p><p className="text-[10px] text-zinc-500 mt-0.5">총 5,450,000 원</p></div>
                    </div>
                    <div className="flex gap-1.5"><button onClick={(e)=>{e.stopPropagation(); triggerToast('입금 추가')}} className="p-1.5 bg-zinc-800 rounded-md text-emerald-400"><Download size={14}/></button></div>
                  </div>
                  {/* 투자금 (Investment Capital) */}
                  <div className="p-4 flex justify-between items-center hover:bg-[#25221B] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold">KIS</div>
                      <div><p className="text-xs font-bold text-zinc-200">한국투자증권 (투자금)</p><p className="text-[10px] text-emerald-500 mt-0.5 font-semibold">Base Total: 23,000,000 원</p></div>
                    </div>
                    <button onClick={(e)=>{e.stopPropagation(); triggerToast('/capital 환전/기록 이동')}} className="text-[10px] font-bold bg-zinc-800 px-2 py-1 rounded text-zinc-300">내역</button>
                  </div>
                </div>
              </section>

              {/* 2. 저축 상품 (Savings Products) */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2"><Landmark size={16} className="text-emerald-400"/> 예/적금 상품</h3>
                  <button onClick={() => setIsAddAssetOpen(true)} className="text-[10px] px-2 py-1 bg-zinc-900 rounded border border-zinc-800 text-zinc-400 hover:text-white">+ 상품 등록</button>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#14120E] border border-[#232018] rounded-xl p-4 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                    <button className="absolute top-3 right-3 text-zinc-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                    <div className="flex justify-between items-start mb-2">
                      <div><span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold mb-1 inline-block">적금</span><h4 className="text-xs font-bold text-zinc-100">카카오 26주 적금</h4></div>
                      <span className="text-xs font-bold text-emerald-400 mr-5">연 3.5%</span>
                    </div>
                    <p className="text-[13px] font-black text-white mt-2">원금 2,000,000원</p>
                    <p className="text-[10px] text-zinc-500 mt-1 flex justify-between"><span>월 10만원 납입</span><span className="text-amber-400">예상이자 45,000원</span></p>
                  </div>
                </div>
              </section>

              {/* 3. 카드 할부 (Credit Cards) */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2"><CreditCard size={16} className="text-indigo-400"/> 신용카드 할부</h3>
                  <button onClick={() => triggerToast('할부 등록 팝업')} className="text-[10px] font-semibold text-zinc-500">+ 할부 추가</button>
                </div>
                <div className="bg-[#14120E] border border-[#232018] rounded-xl p-3.5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center"><CreditCard size={14} className="text-indigo-400"/></div>
                    <div><h4 className="text-xs font-bold text-zinc-200">현대카드 (아이폰 구매)</h4><p className="text-[10px] text-zinc-500 mt-0.5">잔여 3개월 / 총 6개월</p></div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-rose-400">월 250,000원</p>
                    <p className="text-[9px] text-zinc-500 mt-0.5">다음 결제 7.25</p>
                  </div>
                </div>
              </section>
            </div>
          )}

