import React, { useState } from 'react';
import { 
  Calendar, List, ChevronLeft, ChevronRight, Home, Wallet, Activity, ShoppingBag, MoreHorizontal, Menu,
  X, TrendingUp, CreditCard, PieChart, Settings, Bell, ToggleLeft, ToggleRight, Trash2, FolderEdit, Plus,
  Target, Zap, Landmark, ArrowDownRight, ArrowUpRight, Users, ShieldCheck, FileText, ArrowRightLeft,
  History, Download, RefreshCcw
} from 'lucide-react';

export default function App() {
  // ==========================================
  // 1. 상태 관리 (State Management)
  // ==========================================
  
  // 글로벌 & 네비게이션 상태
  const [activeDepth1, setActiveDepth1] = useState('가계부'); 
  const [activeSegment, setActiveSegment] = useState('가계부'); // 가계부 탭의 2 Depth
  const [viewType, setViewType] = useState('달력'); 
  const [listFilter, setListFilter] = useState('월'); 
  const [toastMessage, setToastMessage] = useState(''); 

  // 모달 제어 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [isDailySheetOpen, setIsDailySheetOpen] = useState(false); 
  const [selectedDate, setSelectedDate] = useState(null); 
  const [isScalpCalcOpen, setIsScalpCalcOpen] = useState(false);
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);

  const depth1Menus = ['가계부', '투자', '자산', '부채', '설정'];

  // ==========================================
  // 2. 가상 데이터 세팅 (Mock Data)
  // ==========================================
  
  // 카테고리 데이터
  const [categories, setCategories] = useState({
    지출: [
      { id: 'cat1', name: '식비', emoji: '🍔', color: 'bg-rose-400' },
      { id: 'cat2', name: '주거/통신', emoji: '🏠', color: 'bg-amber-500' },
      { id: 'cat3', name: '쇼핑', emoji: '🛍️', color: 'bg-blue-400' },
      { id: 'cat4', name: '교통', emoji: '🚌', color: 'bg-emerald-400' },
      { id: 'cat5', name: '기타', emoji: '🧸', color: 'bg-zinc-500' },
    ],
    수입: [
      { id: 'cat6', name: '월급', emoji: '💰', color: 'bg-emerald-500' },
      { id: 'cat7', name: '부수입', emoji: '🎁', color: 'bg-purple-400' },
    ]
  });

  // 달력 및 거래 데이터
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const calendarDates = Array.from({ length: 35 }, (_, i) => {
    const day = i - 1; 
    return (day < 1 || day > 31) ? null : day;
  });

  const [transactions, setTransactions] = useState([
    { id: 1, day: 19, date: '7.19 (일)', title: '스타벅스 강남점', category: '식비', amount: -6500, type: '지출' },
    { id: 2, day: 18, date: '7.18 (토)', title: '이마트 장보기', category: '생활', amount: -84000, type: '지출' },
    { id: 3, day: 15, date: '7.15 (수)', title: '쿠팡 로켓와우', category: '쇼핑', amount: -4990, type: '지출' },
    { id: 4, day: 10, date: '7.10 (금)', title: '7월 급여', category: '월급', amount: 3500000, type: '수입' },
    { id: 5, day: 2, date: '7.02 (목)', title: '관리비 자동이체', category: '주거/통신', amount: -150000, type: '지출' },
  ]);

  const [fixedTransactions, setFixedTransactions] = useState([
    { id: 'f1', title: '넷플릭스 구독', amount: 17000, day: '매달 14일', category: '쇼핑', type: '지출', active: true },
    { id: 'f2', title: '주택청약 저축', amount: 100000, day: '매달 20일', category: '저축', type: '지출', active: true },
  ]);

  // ==========================================
  // 3. 폼 입력 상태 및 핸들러 (Form Controls)
  // ==========================================
  
  // 일반 거래 폼
  const [addTitle, setAddTitle] = useState('');
  const [addAmount, setAddAmount] = useState('');
  const [addType, setAddType] = useState('지출');
  const [addCategory, setAddCategory] = useState('식비');

  // 고정 거래 폼
  const [fixedTitle, setFixedTitle] = useState('');
  const [fixedAmount, setFixedAmount] = useState('');
  const [fixedDay, setFixedDay] = useState('25');
  const [fixedType, setFixedType] = useState('지출');

  // 신규 카테고리 폼
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryEmoji, setNewCategoryEmoji] = useState('💡');
  const [newCategoryType, setNewCategoryType] = useState('지출');

  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // 일반 거래 등록 핸들러
  const handleAddTransactionSubmit = (e) => {
    e.preventDefault();
    if (!addTitle.trim() || !addAmount) { triggerToast('입력값을 확인해주세요.'); return; }
    const amt = parseInt(addAmount);
    const targetDay = selectedDate || 20; 
    setTransactions([{ id: Date.now(), day: targetDay, date: `7.${targetDay.toString().padStart(2, '0')} (신규)`, title: addTitle, category: addCategory, amount: addType === '지출' ? -amt : amt, type: addType }, ...transactions]);
    setIsAddModalOpen(false); setAddTitle(''); setAddAmount('');
    triggerToast('새 거래 내역이 등록되었습니다.');
  };

  // 고정 지출 등록 핸들러
  const handleAddFixedSubmit = (e) => {
    e.preventDefault();
    if (!fixedTitle.trim() || !fixedAmount) { triggerToast('고정 지출/수입 정보를 채워주세요.'); return; }
    setFixedTransactions([...fixedTransactions, {
      id: 'f_' + Date.now(), title: fixedTitle, amount: parseInt(fixedAmount), day: `매달 ${fixedDay.padStart(2, '0')}일`, category: '기타', type: fixedType, active: true
    }]);
    setFixedTitle(''); setFixedAmount('');
    triggerToast('정기 결제 일정이 추가되었습니다.');
  };

  // 카테고리 추가 핸들러
  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) { triggerToast('카테고리 이름을 기입해주세요.'); return; }
    setCategories({
      ...categories,
      [newCategoryType]: [...categories[newCategoryType], { id: 'c_'+Date.now(), name: newCategoryName, emoji: newCategoryEmoji, color: newCategoryType === '지출' ? 'bg-amber-500' : 'bg-emerald-500' }]
    });
    setNewCategoryName('');
    triggerToast(`'${newCategoryName}' 카테고리가 생성되었습니다.`);
  };

  // 고정지출 삭제 및 토글
  const toggleFixedActive = (id) => setFixedTransactions(fixedTransactions.map(f => f.id === id ? { ...f, active: !f.active } : f));
  const deleteFixed = (id) => setFixedTransactions(fixedTransactions.filter(f => f.id !== id));

  // ==========================================
  // 4. 연산 로직 (Calculations)
  // ==========================================
  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
    setIsDailySheetOpen(true);
  };

  const totalIncome = transactions.filter(t => t.type === '수입').reduce((acc, cur) => acc + cur.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.type === '지출').reduce((acc, cur) => acc + cur.amount, 0));
  const remainingMoney = totalIncome - totalExpense;
  
  const dailyTransactions = transactions.filter(t => t.day === selectedDate);
  const dailyIncome = dailyTransactions.filter(t => t.type === '수입').reduce((acc, cur) => acc + cur.amount, 0);
  const dailyExpense = Math.abs(dailyTransactions.filter(t => t.type === '지출').reduce((acc, cur) => acc + cur.amount, 0));

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans selection:bg-amber-500/20">
      
      {/* 📱 iPhone 17 Frame */}
      <div className="relative w-[393px] h-[852px] bg-[#0E0D0A] rounded-[52px] border-[10px] border-zinc-800 shadow-2xl overflow-hidden flex flex-col text-zinc-100 ring-1 ring-zinc-700/30">
        
        {/* Status Bar */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-black rounded-3xl z-50"></div>
        <div className="h-14 pt-4 px-8 flex justify-between items-center text-xs font-semibold text-zinc-300 z-40 bg-[#0E0D0A]">
          <span>16:45</span>
          <div className="flex items-center gap-1.5"><span>5G</span><div className="w-5 h-2.5 border border-zinc-400 rounded-sm p-0.5 flex items-center"><div className="h-full w-4 bg-zinc-300 rounded-[1px]"></div></div></div>
        </div>

        {/* --- 통합 글로벌 헤더 (girok. 브랜딩) --- */}
        <div className="px-6 py-2 flex justify-between items-center bg-[#0E0D0A] z-20">
          <span className="text-xl font-extrabold text-white tracking-tighter">girok<span className="text-amber-500">.</span></span>
          <div className="flex gap-4">
            <button className="text-zinc-400 hover:text-white transition-colors" onClick={() => triggerToast('새로운 알림이 없습니다.')}><Bell size={20} /></button>
            <button onClick={() => setActiveDepth1('설정')} className="text-zinc-400 hover:text-white transition-colors"><Settings size={20} /></button>
          </div>
        </div>

        {/* --- 1 Depth 메뉴 (4축 압축본: 가계부, 투자, 자산, 부채, 설정) --- */}
        <div className="relative border-b border-zinc-800/80 bg-[#0E0D0A] z-10">
          <div className="flex overflow-x-auto scrollbar-hide px-2">
            {depth1Menus.map((menu) => (
              <button key={menu} onClick={() => setActiveDepth1(menu)} className={`relative min-w-[64px] px-4 py-3 text-[15px] font-bold whitespace-nowrap transition-colors ${activeDepth1 === menu ? 'text-amber-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
                {menu}
                {activeDepth1 === menu && <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-400 rounded-t-full shadow-[0_-2px_8px_rgba(251,191,36,0.5)]"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 메인 컨텐츠 영역 (라우팅 분기) */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col bg-[#0D0C0A]">
          
