        {/* --- [모달 1] 일간 상세 내역 바텀 시트 --- */}
        {isDailySheetOpen && (
          <div className="absolute inset-0 z-[60] flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsDailySheetOpen(false)} />
            <div className="relative bg-[#161410] rounded-t-[32px] border-t border-[#3A3326] flex flex-col pb-8 pt-2 animate-slide-up h-[65%] shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
              <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-4" />
              <div className="px-6 flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">7월 {selectedDate}일</h2>
                  <div className="flex gap-2 mt-1 text-[11px] font-bold">
                    <span className="text-emerald-400">수입 +{dailyIncome.toLocaleString()}</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-rose-400">지출 -{dailyExpense.toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => setIsDailySheetOpen(false)} className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-400 hover:text-white transition-colors"><X size={18} /></button>
              </div>
              <div className="px-6 space-y-3 overflow-y-auto scrollbar-hide flex-1">
                {dailyTransactions.length > 0 ? (
                  dailyTransactions.map((t) => (
                    <div key={t.id} className="bg-[#1C1A14] border border-[#2B271E] rounded-xl p-3.5 flex justify-between items-center">
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold bg-[#14120E] text-zinc-300 border border-zinc-800">{t.category.substring(0,2)}</div>
                        <div><h4 className="text-[13px] font-bold text-zinc-100">{t.title}</h4><p className="text-[10px] text-zinc-500 mt-0.5">{t.category}</p></div>
                      </div>
                      <span className={`text-[13px] font-extrabold ${t.type === '수입' ? 'text-emerald-400' : 'text-rose-400'}`}>{t.type === '수입' ? '+' : ''}{t.amount.toLocaleString()}원</span>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-600 mb-3"><Calendar size={20} /></div>
                    <p className="text-sm font-bold text-zinc-400">해당 일자의 내역이 없습니다.</p>
                  </div>
                )}
                <button onClick={() => { setIsDailySheetOpen(false); setIsAddModalOpen(true); }} className="w-full py-3 mt-4 flex items-center justify-center gap-1.5 bg-[#2E281C] border border-[#483E2C] hover:bg-[#3D3425] text-amber-400 font-extrabold rounded-xl text-xs transition-colors">
                  <Plus size={14} /> 이 날짜에 새로 등록하기
                </button>
              </div>
            </div>
          </div>
        )}

