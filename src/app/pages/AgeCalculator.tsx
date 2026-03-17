import { useState } from 'react';
import { Link } from 'react-router';
import { Calendar, ArrowLeft, Home } from 'lucide-react';
import logo from '../../assets/6532e167dcd5777765d507729883458f165969b7.png';
import { DateSelector } from '../components/DateSelector';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const today = new Date();
    const birth = new Date(birthDate);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  const handleReset = () => {
    setBirthDate('');
    setAge(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="SurajCWeb Logo" className="h-12 w-auto" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Utilities
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-full">
                <Calendar className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Age Calculator
            </h1>
            <p className="text-center text-gray-400 mb-8">
              Find out your exact age in years, months, and days
            </p>

            {/* Input Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Enter Your Birth Date
              </label>
              <DateSelector
                value={birthDate}
                onChange={setBirthDate}
                maxDate={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={calculateAge}
                disabled={!birthDate}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/50 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:transform-none"
              >
                Calculate Age
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700 hover:border-gray-500 transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Result Section */}
            {age !== null && (
              <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-xl p-6 border-2 border-cyan-500/30 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-gray-200 mb-4 text-center">
                  Your Age
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-gray-900/80 rounded-lg p-4 shadow-lg border border-gray-700">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {age.years}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {age.years === 1 ? 'Year' : 'Years'}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-900/80 rounded-lg p-4 shadow-lg border border-gray-700">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {age.months}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {age.months === 1 ? 'Month' : 'Months'}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-900/80 rounded-lg p-4 shadow-lg border border-gray-700">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {age.days}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {age.days === 1 ? 'Day' : 'Days'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">
              Part of the <span className="text-orange-400 font-semibold">SurajCWeb</span> utilities collection
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="SurajCWeb" className="h-8 w-auto" />
              <span className="text-gray-400">© 2026 SurajCWeb. All rights reserved.</span>
            </div>
            <div className="text-gray-400">
              Developed with ❤️ by <span className="text-orange-400">Suraj Chandurkar</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
