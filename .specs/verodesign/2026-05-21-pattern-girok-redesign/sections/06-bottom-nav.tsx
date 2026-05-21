        {/* 하단 바텀 네비게이션 (글로벌 루트 메뉴) */}
        {/* ========================================================================= */}
        <nav className="absolute bottom-0 w-full h-[84px] bg-[#0E0D0A]/95 backdrop-blur-md border-t border-zinc-800/60 px-2 flex items-start pt-3 justify-around z-50 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
          <button onClick={() => triggerToast('홈 화면 이동')} className="flex flex-col items-center justify-center w-14 gap-1 text-zinc-500 hover:text-amber-400 transition-colors"><Home size={22} /><span className="text-[10px] font-semibold">홈</span></button>
          {/* 가계부 탭은 현재 전체 앱의 메인 컨텍스트이므로 활성화 */}
          <button className="flex flex-col items-center justify-center w-14 gap-1 text-amber-500"><Wallet size={22} strokeWidth={2.5} /><span className="text-[10px] font-bold">가계부</span></button>
          <button onClick={() => triggerToast('활동(Todo, 건강 등) 이동')} className="flex flex-col items-center justify-center w-14 gap-1 text-zinc-500 hover:text-amber-400 transition-colors"><Activity size={22} /><span className="text-[10px] font-semibold">활동</span></button>
          <button onClick={() => triggerToast('상점 화면 이동')} className="flex flex-col items-center justify-center w-14 gap-1 text-zinc-500 hover:text-amber-400 transition-colors"><ShoppingBag size={22} /><span className="text-[10px] font-semibold">상점</span></button>
          <button onClick={() => triggerToast('확장 메뉴 열기')} className="flex flex-col items-center justify-center w-14 gap-1 text-zinc-500 hover:text-amber-400 transition-colors"><Menu size={22} /><span className="text-[10px] font-semibold">메뉴</span></button>
        </nav>

        {/* ========================================================================= */}
        {/* 모달 및 바텀 시트 영역 (Modals & Bottom Sheets) */}
        {/* ========================================================================= */}

