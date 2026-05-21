              {/* 1-1. 내역 조회 */}
              {activeSegment === '가계부' && (
                <div className="flex flex-col animate-fade-in pb-24">
                  <div className="px-6 py-2 flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1 bg-[#1A1813] px-2.5 py-1.5 rounded-full border border-[#2B271E]">
                      <button className="text-zinc-400 hover:text-amber-400"><ChevronLeft size={14} /></button>
                      <span className="text-xs font-bold w-20 text-center text-zinc-100 truncate">2026년 7월</span>
                      <button className="text-zinc-400 hover:text-amber-400"><ChevronRight size={14} /></button>
                    </div>
                    <button onClick={() => { setSelectedDate(null); setIsAddModalOpen(true); }} className="text-[11px] font-extrabold bg-[#2E281C] text-amber-400 border border-[#483E2C] px-3.5 py-1.5 rounded-full">등록</button>
                    <div className="flex bg-[#1A1813] rounded-lg p-1 border border-[#2B271E]">
                      <button onClick={() => setViewType('달력')} className={`p-1.5 rounded-md ${viewType === '달력' ? 'bg-[#2E281C] text-amber-400' : 'text-zinc-500'}`}><Calendar size={14} /></button>
                      <button onClick={() => setViewType('목록')} className={`p-1.5 rounded-md ${viewType === '목록' ? 'bg-[#2E281C] text-amber-400' : 'text-zinc-500'}`}><List size={14} /></button>
                    </div>
                  </div>

                  {/* 목록 뷰 전용 필터 */}
                  {viewType === '목록' && (
                    <div className="px-6 mt-2 mb-1">
                      <div className="flex gap-5 border-b border-zinc-800/80">
                        {['월', '주', '기간'].map((filter) => (
                          <button key={filter} onClick={() => setListFilter(filter)} className={`pb-2 text-xs font-bold relative transition-colors ${listFilter === filter ? 'text-amber-400' : 'text-zinc-500'}`}>
                            {filter}
                            {listFilter === filter && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 rounded-t-full"></div>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 월간 요약 카드 */}
                  <div className="px-6 py-4 mb-2">
                    <div className="grid grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
                      <div className="bg-[#14120E] p-3 flex flex-col justify-center items-center text-center">
                        <span className="text-[10px] text-zinc-500 mb-1">기간 수입</span>
                        <span className="text-xs font-bold text-emerald-400">+{totalIncome.toLocaleString()}</span>
                      </div>
                      <div className="bg-[#14120E] p-3 flex flex-col justify-center items-center text-center">
                        <span className="text-[10px] text-zinc-500 mb-1">기간 지출</span>
                        <span className="text-xs font-bold text-rose-400">-{totalExpense.toLocaleString()}</span>
                      </div>
                      <div className="bg-[#14120E] p-3 flex flex-col justify-center items-center text-center">
                        <span className="text-[10px] text-zinc-500 mb-1">남은 금액</span>
                        <span className={`text-xs font-bold ${remainingMoney >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                          {remainingMoney.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 달력 뷰 */}
                  {viewType === '달력' && (
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-7 mb-4 mt-2">
                        {days.map((day, i) => <div key={day} className={`text-center text-[11px] font-bold ${i === 6 ? 'text-rose-400' : i === 5 ? 'text-blue-400' : 'text-zinc-500'}`}>{day}</div>)}
                      </div>
                      <div className="grid grid-cols-7 gap-y-5">
                        {calendarDates.map((date, index) => {
                          const hasData = transactions.some(t => t.day === date);
                          return (
                            <div key={index} className={`flex flex-col items-center h-11 justify-start pt-1 ${date ? 'cursor-pointer hover:bg-zinc-800/30 rounded-xl transition-colors' : ''}`} onClick={() => handleDateClick(date)}>
                              {date && (
                                <>
                                  <span className={`text-sm font-semibold flex items-center justify-center w-7 h-7 rounded-full ${date === 20 ? 'bg-[#2E281C] text-amber-500 border border-[#483E2C]' : 'text-zinc-300'}`}>{date}</span>
                                  {hasData && <div className="flex gap-0.5 mt-1"><span className="w-1 h-1 bg-amber-400 rounded-full"></span></div>}
                                </>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* 목록 뷰 */}
                  {viewType === '목록' && (
                    <div className="px-6 space-y-3 pb-6 mt-2">
                      {transactions.map((t) => (
                        <div key={t.id} className="bg-[#14120E] border border-[#232018] rounded-xl p-3.5 flex justify-between items-center hover:bg-[#1A1812]">
                          <div className="flex items-center gap-3.5">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold bg-zinc-800 text-zinc-300">{t.category.substring(0,2)}</div>
                            <div><h4 className="text-[13px] font-bold text-zinc-100">{t.title}</h4><p className="text-[10px] text-zinc-500 mt-0.5">{t.date} · {t.category}</p></div>
                          </div>
                          <span className={`text-[13px] font-extrabold ${t.type === '수입' ? 'text-emerald-400' : 'text-rose-400'}`}>{t.type === '수입' ? '+' : ''}{t.amount.toLocaleString()}원</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

