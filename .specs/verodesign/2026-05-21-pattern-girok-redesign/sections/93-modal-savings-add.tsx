        {/* --- [모달 4] 저축 상품 등록 (자산 탭 연동) --- */}
        {isAddAssetOpen && (
          <div className="absolute inset-0 z-[70] bg-black/80 flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-[#1C1A14] w-full max-w-sm rounded-3xl border border-[#3A3326] p-5 space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5"><Landmark size={16} className="text-emerald-400"/> 예/적금 상품 추가</h3>
                <button onClick={() => setIsAddAssetOpen(false)} className="text-zinc-500 hover:text-zinc-300 p-1"><X size={18} /></button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 bg-[#0E0D0A] p-1 rounded-xl">
                  <button className="py-1.5 text-xs font-bold rounded-lg bg-emerald-500 text-white">적금 (월납)</button>
                  <button className="py-1.5 text-xs font-bold rounded-lg text-zinc-500">예금 (거치)</button>
                </div>
                <input type="text" placeholder="상품명 (예: 청년도약계좌)" className="w-full bg-[#0E0D0A] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500" />
                <div className="flex gap-2">
                  <input type="number" placeholder="월 납입액" className="flex-1 bg-[#0E0D0A] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500" />
                  <input type="number" placeholder="연 이율(%)" className="w-24 bg-[#0E0D0A] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500" />
                </div>
                <button onClick={() => { setIsAddAssetOpen(false); triggerToast('새로운 저축 상품이 추가되었습니다.'); }} className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs transition-colors mt-2">상품 등록</button>
              </div>
            </div>
          </div>
        )}

        {/* 토스트 메세지 알림 */}
        {toastMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-amber-500 text-zinc-950 font-bold px-4 py-2.5 rounded-full shadow-lg text-[10px] z-[80] flex items-center gap-1.5 animate-bounce-short">
            <span>🔔</span><span>{toastMessage}</span>
          </div>
        )}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-600 rounded-full z-[80]"></div>
      </div>

