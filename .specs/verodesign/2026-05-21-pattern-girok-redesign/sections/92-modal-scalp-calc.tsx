        {/* --- [모달 3] 스캘핑 계산기 모달 (투자 탭 연동) --- */}
        {isScalpCalcOpen && (
          <div className="absolute inset-0 z-[70] bg-black/80 flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-[#1C1A14] w-full max-w-sm rounded-3xl border border-amber-500/30 p-5 space-y-4 shadow-[0_0_30px_rgba(251,191,36,0.15)] relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5"><Zap size={16}/> 스캘핑 계산기 (Slot A)</h3>
                <button onClick={() => setIsScalpCalcOpen(false)} className="text-zinc-500 hover:text-zinc-300 p-1"><X size={18} /></button>
              </div>
              <div className="space-y-3">
                <div className="bg-[#0E0D0A] border border-zinc-800 rounded-xl p-3">
                  <div className="flex justify-between text-[10px] text-zinc-500 mb-1"><span>현재 평단가</span><span>보유 수량</span></div>
                  <div className="flex justify-between font-bold text-sm"><span>$ 215.40</span><span>15 주</span></div>
                </div>
                <div className="bg-[#0E0D0A] border border-zinc-800 rounded-xl p-3 border-l-2 border-l-amber-500">
                  <div className="flex justify-between text-[10px] text-amber-500/80 mb-1"><span>목표 BEP (손익분기)</span><span>필요 상승폭</span></div>
                  <div className="flex justify-between font-black text-sm text-amber-400"><span>$ 216.05</span><span>+ 0.3%</span></div>
                </div>
                <button onClick={() => { setIsScalpCalcOpen(false); triggerToast('스캘핑 목표가 저장됨'); }} className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs transition-colors mt-2">닫기</button>
              </div>
            </div>
          </div>
        )}

