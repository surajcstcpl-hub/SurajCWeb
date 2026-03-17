import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface DateSelectorProps {
  value: string;
  onChange: (date: string) => void;
  maxDate?: string;
}

export function DateSelector({ value, onChange, maxDate }: DateSelectorProps) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [daySearch, setDaySearch] = useState('');
  const [monthSearch, setMonthSearch] = useState('');
  const [yearSearch, setYearSearch] = useState('');
  const [highlightedDayIndex, setHighlightedDayIndex] = useState(0);
  const [highlightedMonthIndex, setHighlightedMonthIndex] = useState(0);
  const [highlightedYearIndex, setHighlightedYearIndex] = useState(0);
  const dayDropdownRef = useRef<HTMLDivElement>(null);
  const monthDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);

  const months = [
    { num: '01', name: 'January' },
    { num: '02', name: 'February' },
    { num: '03', name: 'March' },
    { num: '04', name: 'April' },
    { num: '05', name: 'May' },
    { num: '06', name: 'June' },
    { num: '07', name: 'July' },
    { num: '08', name: 'August' },
    { num: '09', name: 'September' },
    { num: '10', name: 'October' },
    { num: '11', name: 'November' },
    { num: '12', name: 'December' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 150 }, (_, i) => currentYear - i);

  // Parse initial value
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setDay(String(date.getDate()).padStart(2, '0'));
      setMonth(String(date.getMonth() + 1).padStart(2, '0'));
      setYear(String(date.getFullYear()));
    }
  }, [value]);

  // Update parent when date changes
  useEffect(() => {
    if (day && month && year) {
      const dateStr = `${year}-${month}-${day}`;
      onChange(dateStr);
    }
  }, [day, month, year, onChange]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dayDropdownRef.current && !dayDropdownRef.current.contains(event.target as Node)) {
        setShowDayDropdown(false);
      }
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target as Node)) {
        setShowMonthDropdown(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setShowYearDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = () => {
    if (!month || !year) return 31;
    return new Date(parseInt(year), parseInt(month), 0).getDate();
  };

  const days = Array.from({ length: getDaysInMonth() }, (_, i) => i + 1);

  const filteredDays = days.filter(d => 
    String(d).includes(daySearch)
  );

  const filteredMonths = months.filter(m => 
    m.name.toLowerCase().includes(monthSearch.toLowerCase()) ||
    m.num.includes(monthSearch)
  );

  const filteredYears = years.filter(y => 
    String(y).includes(yearSearch)
  );

  // Reset highlighted index when search changes
  useEffect(() => {
    setHighlightedDayIndex(0);
  }, [daySearch]);

  useEffect(() => {
    setHighlightedMonthIndex(0);
  }, [monthSearch]);

  useEffect(() => {
    setHighlightedYearIndex(0);
  }, [yearSearch]);

  const getMonthName = (monthNum: string) => {
    const monthObj = months.find(m => m.num === monthNum);
    return monthObj ? monthObj.name : 'Month';
  };

  // Keyboard navigation handlers
  const handleDayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedDayIndex(prev => 
        prev < filteredDays.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedDayIndex(prev => prev > 0 ? prev - 1 : 0);
    } else if (e.key === 'Enter' && filteredDays.length > 0) {
      e.preventDefault();
      setDay(String(filteredDays[highlightedDayIndex]).padStart(2, '0'));
      setShowDayDropdown(false);
      setDaySearch('');
    } else if (e.key === 'Escape') {
      setShowDayDropdown(false);
      setDaySearch('');
    }
  };

  const handleMonthKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedMonthIndex(prev => 
        prev < filteredMonths.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedMonthIndex(prev => prev > 0 ? prev - 1 : 0);
    } else if (e.key === 'Enter' && filteredMonths.length > 0) {
      e.preventDefault();
      setMonth(filteredMonths[highlightedMonthIndex].num);
      setShowMonthDropdown(false);
      setMonthSearch('');
    } else if (e.key === 'Escape') {
      setShowMonthDropdown(false);
      setMonthSearch('');
    }
  };

  const handleYearKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedYearIndex(prev => 
        prev < filteredYears.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedYearIndex(prev => prev > 0 ? prev - 1 : 0);
    } else if (e.key === 'Enter' && filteredYears.length > 0) {
      e.preventDefault();
      setYear(String(filteredYears[highlightedYearIndex]));
      setShowYearDropdown(false);
      setYearSearch('');
    } else if (e.key === 'Escape') {
      setShowYearDropdown(false);
      setYearSearch('');
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (showDayDropdown) {
      const highlightedElement = dayDropdownRef.current?.querySelector(`[data-index="${highlightedDayIndex}"]`);
      highlightedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [highlightedDayIndex, showDayDropdown]);

  useEffect(() => {
    if (showMonthDropdown) {
      const highlightedElement = monthDropdownRef.current?.querySelector(`[data-index="${highlightedMonthIndex}"]`);
      highlightedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [highlightedMonthIndex, showMonthDropdown]);

  useEffect(() => {
    if (showYearDropdown) {
      const highlightedElement = yearDropdownRef.current?.querySelector(`[data-index="${highlightedYearIndex}"]`);
      highlightedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [highlightedYearIndex, showYearDropdown]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {/* Day Selector with Search */}
        <div className="relative" ref={dayDropdownRef}>
          <label className="block text-xs text-gray-400 mb-1">Day</label>
          <button
            type="button"
            onClick={() => {
              setShowDayDropdown(!showDayDropdown);
              setShowMonthDropdown(false);
              setShowYearDropdown(false);
            }}
            className="w-full px-3 py-2 bg-gray-900 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white text-left flex items-center justify-between"
          >
            <span>{day || 'Day'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showDayDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDayDropdown && (
            <div className="absolute top-full mt-1 w-full bg-gray-900 border-2 border-cyan-500 rounded-lg shadow-xl z-50 max-h-64 overflow-hidden">
              <div className="p-2 border-b border-gray-700 sticky top-0 bg-gray-900">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    ref={dayInputRef}
                    type="text"
                    value={daySearch}
                    onChange={(e) => setDaySearch(e.target.value)}
                    onKeyDown={handleDayKeyDown}
                    placeholder="Search day..."
                    className="w-full pl-8 pr-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredDays.map((d, index) => (
                  <button
                    key={d}
                    type="button"
                    data-index={index}
                    onClick={() => {
                      setDay(String(d).padStart(2, '0'));
                      setShowDayDropdown(false);
                      setDaySearch('');
                    }}
                    onMouseEnter={() => setHighlightedDayIndex(index)}
                    className={`w-full px-3 py-2 text-left transition-colors ${
                      index === highlightedDayIndex
                        ? 'bg-cyan-500/30 text-cyan-400'
                        : day === String(d).padStart(2, '0')
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-white hover:bg-cyan-500/10'
                    }`}
                  >
                    {d}
                  </button>
                ))}
                {filteredDays.length === 0 && (
                  <div className="px-3 py-4 text-center text-gray-500 text-sm">
                    No days found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Month Selector with Search */}
        <div className="relative" ref={monthDropdownRef}>
          <label className="block text-xs text-gray-400 mb-1">Month</label>
          <button
            type="button"
            onClick={() => {
              setShowMonthDropdown(!showMonthDropdown);
              setShowDayDropdown(false);
              setShowYearDropdown(false);
            }}
            className="w-full px-3 py-2 bg-gray-900 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white text-left flex items-center justify-between"
          >
            <span className="truncate">{month ? getMonthName(month) : 'Month'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${showMonthDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showMonthDropdown && (
            <div className="absolute top-full mt-1 w-full bg-gray-900 border-2 border-cyan-500 rounded-lg shadow-xl z-50 max-h-64 overflow-hidden">
              <div className="p-2 border-b border-gray-700 sticky top-0 bg-gray-900">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    ref={monthInputRef}
                    type="text"
                    value={monthSearch}
                    onChange={(e) => setMonthSearch(e.target.value)}
                    onKeyDown={handleMonthKeyDown}
                    placeholder="Search month..."
                    className="w-full pl-8 pr-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredMonths.map((m, index) => (
                  <button
                    key={m.num}
                    type="button"
                    data-index={index}
                    onClick={() => {
                      setMonth(m.num);
                      setShowMonthDropdown(false);
                      setMonthSearch('');
                    }}
                    onMouseEnter={() => setHighlightedMonthIndex(index)}
                    className={`w-full px-3 py-2 text-left transition-colors ${
                      index === highlightedMonthIndex
                        ? 'bg-cyan-500/30 text-cyan-400'
                        : month === m.num
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-white hover:bg-cyan-500/10'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
                {filteredMonths.length === 0 && (
                  <div className="px-3 py-4 text-center text-gray-500 text-sm">
                    No months found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Year Selector with Search */}
        <div className="relative" ref={yearDropdownRef}>
          <label className="block text-xs text-gray-400 mb-1">Year</label>
          <button
            type="button"
            onClick={() => {
              setShowYearDropdown(!showYearDropdown);
              setShowDayDropdown(false);
              setShowMonthDropdown(false);
            }}
            className="w-full px-3 py-2 bg-gray-900 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500 text-white text-left flex items-center justify-between"
          >
            <span>{year || 'Year'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showYearDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showYearDropdown && (
            <div className="absolute top-full mt-1 w-full bg-gray-900 border-2 border-cyan-500 rounded-lg shadow-xl z-50 max-h-64 overflow-hidden">
              <div className="p-2 border-b border-gray-700 sticky top-0 bg-gray-900">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    ref={yearInputRef}
                    type="text"
                    value={yearSearch}
                    onChange={(e) => setYearSearch(e.target.value)}
                    onKeyDown={handleYearKeyDown}
                    placeholder="Search year..."
                    className="w-full pl-8 pr-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredYears.map((y, index) => (
                  <button
                    key={y}
                    type="button"
                    data-index={index}
                    onClick={() => {
                      setYear(String(y));
                      setShowYearDropdown(false);
                      setYearSearch('');
                    }}
                    onMouseEnter={() => setHighlightedYearIndex(index)}
                    className={`w-full px-3 py-2 text-left transition-colors ${
                      index === highlightedYearIndex
                        ? 'bg-cyan-500/30 text-cyan-400'
                        : year === String(y)
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-white hover:bg-cyan-500/10'
                    }`}
                  >
                    {y}
                  </button>
                ))}
                {filteredYears.length === 0 && (
                  <div className="px-3 py-4 text-center text-gray-500 text-sm">
                    No years found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Select Buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            const today = new Date();
            setDay(String(today.getDate()).padStart(2, '0'));
            setMonth(String(today.getMonth() + 1).padStart(2, '0'));
            setYear(String(today.getFullYear()));
          }}
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-xs text-gray-300 hover:bg-gray-700 hover:border-cyan-500 transition-colors"
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 18);
            setDay(String(date.getDate()).padStart(2, '0'));
            setMonth(String(date.getMonth() + 1).padStart(2, '0'));
            setYear(String(date.getFullYear()));
          }}
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-xs text-gray-300 hover:bg-gray-700 hover:border-cyan-500 transition-colors"
        >
          18 Years Ago
        </button>
        <button
          type="button"
          onClick={() => {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 25);
            setDay(String(date.getDate()).padStart(2, '0'));
            setMonth(String(date.getMonth() + 1).padStart(2, '0'));
            setYear(String(date.getFullYear()));
          }}
          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-xs text-gray-300 hover:bg-gray-700 hover:border-cyan-500 transition-colors"
        >
          25 Years Ago
        </button>
      </div>
    </div>
  );
}