              {/* 1-3. 가계부 관리 (고정지출 및 카테고리) */}
              {activeSegment === '관리' && (
                <div className="px-6 py-2 space-y-6 animate-fade-in pb-24">
                  {/* 고정 지출/수입 등록 */}
                  <section>
                    <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2"><CreditCard size={16} className="text-blue-400" /> 고정 지출/수입</h3></div>
                    <div className="bg-[#1C1A14] border border-[#3A3326] rounded-2xl p-4 mb-4 shadow-sm">
                      <h4 className="text-[11px] font-extrabold text-amber-400 mb-3">새로운 고정 결제 등록</h4>
                      <form onSubmit={handleAddFixedSubmit} className="space-y-2.5">
                        <div className="grid grid-cols-2 gap-1.5 bg-black/40 p-0.5 rounded-lg text-[10px]">
                          <button type="button" onClick={() => setFixedType('지출')} className={`py-1.5 rounded font-bold ${fixedType === '지출' ? 'bg-rose-500 text-white' : 'text-zinc-500'}`}>지출</button>
                          <button type="button" onClick={() => setFixedType('수입')} className={`py-1.5 rounded font-bold ${fixedType === '수입' ? 'bg-emerald-500 text-white' : 'text-zinc-500'}`}>수입</button>
                        </div>
                        <input type="text" placeholder="예) 통신비, 정기구독" value={fixedTitle} onChange={(e) => setFixedTitle(e.target.value)} className="w-full bg-[#0E0D0A] border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500" />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="number" placeholder="금액 (원)" value={fixedAmount} onChange={(e) => setFixedAmount(e.target.value)} className="w-full bg-[#0E0D0A] border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500" />
                          <select value={fixedDay} onChange={(e) => setFixedDay(e.target.value)} className="bg-[#0E0D0A] border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-300">
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>매달 {d}일</option>)}
                          </select>
                        </div>
                        <button type="submit" className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-[11px] rounded-lg transition-colors mt-1">+ 리스트에 추가</button>
                      </form>
                    </div>

                    <div className="space-y-2.5">
                      {fixedTransactions.map(f => (
                        <div key={f.id} className="bg-[#14120E] border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button onClick={() => toggleFixedActive(f.id)}>{f.active ? <ToggleRight className="text-amber-500" size={24} /> : <ToggleLeft className="text-zinc-600" size={24} />}</button>
                            <div><div className="flex items-center gap-1.5"><span className={`text-xs font-bold ${f.active ? 'text-zinc-100' : 'text-zinc-500'}`}>{f.title}</span><span className="text-[9px] bg-[#1C1A14] text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-800">{f.day}</span></div><span className={`text-[10px] font-semibold ${f.active ? (f.type === '수입' ? 'text-emerald-400' : 'text-rose-400') : 'text-zinc-600'}`}>{f.type==='수입'?'+':'-'}{f.amount.toLocaleString()}원</span></div>
                          </div>
                          <button onClick={() => deleteFixed(f.id)} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-600 hover:text-rose-400"><Trash2 size={14} /></button>
                        </div>
                      ))}
                    </div>
                  </section>

                  <div className="h-px bg-zinc-800/60 my-4"></div>

                  {/* 카테고리 관리 */}
                  <section>
                    <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2"><FolderEdit size={16} className="text-amber-500" /> 맞춤 카테고리 관리</h3></div>
                    <div className="bg-[#1C1A14] border border-[#3A3326] rounded-2xl p-4 mb-4 shadow-sm">
                      <form onSubmit={handleAddCategorySubmit} className="space-y-2.5">
                        <div className="grid grid-cols-2 gap-1.5 bg-black/40 p-0.5 rounded-lg text-[10px]">
                          <button type="button" onClick={() => setNewCategoryType('지출')} className={`py-1.5 rounded font-bold ${newCategoryType === '지출' ? 'bg-rose-500 text-white' : 'text-zinc-500'}`}>지출</button>
                          <button type="button" onClick={() => setNewCategoryType('수입')} className={`py-1.5 rounded font-bold ${newCategoryType === '수입' ? 'bg-emerald-500 text-white' : 'text-zinc-500'}`}>수입</button>
                        </div>
                        <div className="flex gap-2">
                          <select value={newCategoryEmoji} onChange={(e) => setNewCategoryEmoji(e.target.value)} className="bg-[#0E0D0A] border border-zinc-800 rounded-lg p-2.5 text-sm">{['💡','🔥','🍿','💻','🚗','💊','🏠','💇','💰','🛍️','🍔'].map(e => <option key={e} value={e}>{e}</option>)}</select>
                          <input type="text" placeholder="새 항목 이름" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="flex-1 bg-[#0E0D0A] border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500" />
                        </div>
                        <button type="submit" className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-[11px] rounded-lg mt-1">+ 카테고리 추가</button>
                      </form>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><h4 className="text-[10px] font-bold text-zinc-500 mb-2">지출 그룹</h4><div className="flex flex-wrap gap-1.5">{categories.지출.map(c => <span key={c.id} className="inline-flex items-center gap-1 bg-[#14120E] border border-zinc-800 px-2 py-1 rounded-md text-[11px] text-zinc-300">{c.emoji} {c.name}</span>)}</div></div>
                      <div><h4 className="text-[10px] font-bold text-zinc-500 mb-2">수입 그룹</h4><div className="flex flex-wrap gap-1.5">{categories.수입.map(c => <span key={c.id} className="inline-flex items-center gap-1 bg-[#14120E] border border-zinc-800 px-2 py-1 rounded-md text-[11px] text-zinc-300">{c.emoji} {c.name}</span>)}</div></div>
                    </div>
                  </section>
                </div>
              )}
            </>
          )}

