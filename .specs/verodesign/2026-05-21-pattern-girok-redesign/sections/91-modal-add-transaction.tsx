        {/* --- [모달 2] 일반 거래 등록 모달 --- */}
        {isAddModalOpen && (
          <div className="absolute inset-0 z-[70] bg-black/80 flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-[#1C1A14] w-full max-w-sm rounded-3xl border border-[#3A3326] p-5 space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-100">{selectedDate ? `7월 ${selectedDate}일 ` : ''}거래내역 등록</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-500 hover:text-zinc-300 p-1"><X size={18} /></button>
              </div>
              <form onSubmit={handleAddTransactionSubmit} className="space-y-3.5 text-left">
                <div className="grid grid-cols-2 gap-2 bg-[#0E0D0A] p-1 rounded-xl">
                  <button type="button" onClick={() => { setAddType('지출'); setAddCategory('식비'); }} className={`py-1.5 text-xs font-bold rounded-lg transition-all ${addType === '지출' ? 'bg-rose-500 text-white' : 'text-zinc-500'}`}>지출</button>
                  <button type="button" onClick={() => { setAddType('수입'); setAddCategory('월급'); }} className={`py-1.5 text-xs font-bold rounded-lg transition-all ${addType === '수입' ? 'bg-emerald-500 text-white' : 'text-zinc-500'}`}>수입</button>
                </div>
                <div><label className="block text-[10px] font-bold text-zinc-500 mb-1">내역명</label><input type="text" placeholder="어디서 돈을 썼나요?" value={addTitle} onChange={(e) => setAddTitle(e.target.value)} className="w-full bg-[#0E0D0A] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-amber-500" /></div>
                <div><label className="block text-[10px] font-bold text-zinc-500 mb-1">금액</label><input type="number" placeholder="얼마인가요?" value={addAmount} onChange={(e) => setAddAmount(e.target.value)} className="w-full bg-[#0E0D0A] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-amber-500" /></div>
                <div><label className="block text-[10px] font-bold text-zinc-500 mb-1">카테고리</label>
                  <select value={addCategory} onChange={(e) => setAddCategory(e.target.value)} className="w-full bg-[#0E0D0A] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none">
                    {categories[addType].map(c => <option key={c.id} value={c.name}>{c.emoji} {c.name}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs transition-colors">등록하기</button>
              </form>
            </div>
          </div>
        )}

