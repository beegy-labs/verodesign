      {/* --- 애니메이션 Keyframes --- */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-up { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes bounceShort { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, -4px); } }
        .animate-bounce-short { animation: bounceShort 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}
