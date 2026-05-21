              {/* 1-2. 소비 분석 */}
              {activeSegment === '분석' && (
                <div className="px-6 py-2 space-y-8 animate-fade-in pb-24">
                  <section>
                    <div className="flex items-center justify-between mb-4"><h3 className="text-[15px] font-bold text-zinc-100 flex items-center gap-2"><TrendingUp size={16} className="text-amber-500" /> 6개월 소비 흐름</h3></div>
                    <div className="bg-[#14120E] border border-zinc-800/80 rounded-2xl p-4 h-44 flex items-end justify-between shadow-inner">
                        {[{ m: '3월', h: '75%' }, { m: '4월', h: '45%' }, { m: '5월', h: '85%' }, { m: '6월', h: '65%' }, { m: '7월', h: '100%', c: true }].map((d, i) => (
                          <div key={i} className="flex flex-col items-center flex-1 gap-2"><div className="w-full flex justify-center items-end h-28"><div className={`w-[60%] rounded-t-sm ${d.c ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-zinc-700'}`} style={{ height: d.h }} /></div><span className={`text-[10px] ${d.c ? 'text-amber-400 font-bold' : 'text-zinc-500'}`}>{d.m}</span></div>
                        ))}
                    </div>
                  </section>
                  <section>
                    <div className="flex items-center justify-between mb-4"><h3 className="text-[15px] font-bold text-zinc-100 flex items-center gap-2"><PieChart size={16} className="text-amber-500" /> 지출 Top 5</h3><span className="text-[11px] font-extrabold text-rose-400">총 {totalExpense.toLocaleString()}원</span></div>
                    <div className="space-y-4 bg-[#14120E] border border-zinc-800/80 rounded-2xl p-4">
                      {[{ name: '식비', amount: 650000, p: 35, c: 'bg-rose-400' }, { name: '주거/통신', amount: 450000, p: 24, c: 'bg-amber-500' }, { name: '쇼핑', amount: 320000, p: 17, c: 'bg-blue-400' }, { name: '교통', amount: 180000, p: 10, c: 'bg-emerald-400' }].map((cat, i) => (
                        <div key={i} className="space-y-1.5 group">
                          <div className="flex justify-between items-center text-xs"><div className="flex items-center gap-2"><span className="text-[10px] font-extrabold text-zinc-600 w-3">{i+1}</span><span className="font-semibold text-zinc-200">{cat.name}</span></div><div className="font-bold text-zinc-300">{cat.amount.toLocaleString()}원 <span className="text-[10px] text-zinc-500 ml-1">({cat.p}%)</span></div></div>
                          <div className="w-full h-1.5 bg-zinc-900 rounded-full border border-zinc-800/50"><div className={`h-full rounded-full ${cat.c}`} style={{ width: `${cat.p}%` }} /></div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

