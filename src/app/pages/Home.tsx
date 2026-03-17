import { Link } from 'react-router';
import { Calculator, ArrowRight, Code2, Sparkles } from 'lucide-react';
import logo from '../../assets/6532e167dcd5777765d507729883458f165969b7.png';

export default function Home() {
  const utilities = [
    {
      id: 1,
      title: 'Age Calculator',
      description: 'Calculate your exact age in years, months, and days',
      icon: Calculator,
      path: '/age-calculator',
      color: 'from-blue-500 to-cyan-500',
    },
    // Add more utilities here as you build them
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SurajCWeb Logo" className="h-12 w-auto" />
          </div>
          <div className="flex items-center gap-6">
            <a href="#utilities" className="hover:text-cyan-400 transition-colors">
              Utilities
            </a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">
              About
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="SurajCWeb" className="h-48 w-auto animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Welcome to SurajCWeb
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Hi, I'm <span className="text-orange-400 font-semibold">Suraj Chandurkar</span>
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Web Developer | Creating Powerful Utilities for Everyone
          </p>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-cyan-500/30">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span className="text-sm">Web Development</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-orange-500/30">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span className="text-sm">Utility Tools</span>
            </div>
          </div>
          <a
            href="#utilities"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
          >
            Explore Utilities
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Utilities Section */}
      <section id="utilities" className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Free Utilities</h2>
            <p className="text-gray-400 text-lg">
              Explore our collection of useful tools and utilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilities.map((utility) => {
              const Icon = utility.icon;
              return (
                <Link
                  key={utility.id}
                  to={utility.path}
                  className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${utility.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
                  <div className="relative">
                    <div className={`w-12 h-12 bg-gradient-to-r ${utility.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{utility.title}</h3>
                    <p className="text-gray-400 mb-4">{utility.description}</p>
                    <div className="flex items-center text-cyan-400 group-hover:gap-2 transition-all">
                      <span className="text-sm font-medium">Try it now</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Coming Soon Card */}
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <Sparkles className="w-12 h-12 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">More Coming Soon</h3>
              <p className="text-gray-600 text-sm">
                New utilities are being developed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">About SurajCWeb</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            SurajCWeb is a platform created by <span className="text-orange-400 font-semibold">Suraj Chandurkar</span>, 
            a passionate web developer dedicated to building useful tools and utilities for everyone. 
            My mission is to create simple, effective, and free utilities that make everyday tasks easier.
          </p>
          <p className="text-gray-400 text-lg">
            All utilities are built with modern web technologies and are completely free to use.
          </p>
        </div>
      </section>

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
