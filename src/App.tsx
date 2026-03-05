/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  AlertCircle, 
  CheckCircle2, 
  Cpu, 
  Lock, 
  Globe, 
  ChevronDown, 
  HelpCircle,
  TrendingUp,
  Target,
  Clock,
  ArrowRight,
  Star,
  Layers,
  Code2,
  Users,
  Activity,
  TrendingDown,
  DollarSign
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

// --- Mock Data for Backtest ---
const backtestData = Array.from({ length: 50 }, (_, i) => {
  const base = 10000;
  const growth = i * 7400; // Massive growth to reach ~373k
  const volatility = Math.sin(i * 0.8) * 5000;
  return {
    date: `Point ${i + 1}`,
    balance: base + growth + volatility,
    equity: base + growth + volatility - (Math.random() * 8000)
  };
});

// --- Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-neon-cyan rounded-lg flex items-center justify-center neon-glow">
            <Rocket className="text-space-black w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter">
            HEOHUNTER<span className="text-neon-cyan">EA</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#proof" className="hover:text-neon-cyan transition-colors">Proof</a>
          <a href="#solution" className="hover:text-neon-cyan transition-colors">System</a>
          <a href="#pricing" className="hover:text-neon-cyan transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-neon-cyan transition-colors">FAQ</a>
        </div>
        <a 
          href="#pricing" 
          className="px-6 py-2 bg-neon-cyan text-space-black font-bold rounded-full text-sm hover:scale-105 transition-transform neon-glow"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-display font-bold mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-white/60 text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className={`h-1 w-20 bg-neon-cyan mt-6 ${centered ? 'mx-auto' : ''} rounded-full neon-glow`} />
  </div>
);

const PricingCard = ({ 
  title, 
  price, 
  features, 
  link, 
  highlight = false,
  color = "neon-cyan"
}: { 
  title: string, 
  price: string, 
  features: string[], 
  link: string, 
  highlight?: boolean,
  color?: string
}) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`p-8 rounded-3xl glass relative overflow-hidden flex flex-col h-full ${highlight ? 'border-neon-cyan/50 ring-1 ring-neon-cyan/30' : ''}`}
  >
    {highlight && (
      <div className="absolute top-0 right-0 bg-neon-cyan text-space-black text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
        Most Popular
      </div>
    )}
    <h3 className="text-xl font-display font-bold mb-2 uppercase tracking-wider">{title}</h3>
    <div className="text-2xl font-display font-bold mb-8 text-neon-cyan">
      {price}
    </div>
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-white/80">
          <CheckCircle2 className="w-5 h-5 text-neon-cyan shrink-0" />
          {f}
        </li>
      ))}
    </ul>
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
        highlight 
        ? 'bg-neon-cyan text-space-black hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]' 
        : 'bg-white/10 text-white hover:bg-white/20'
      }`}
    >
      Dapatkan Sekarang
    </a>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-neon-cyan transition-colors"
      >
        <span className="text-lg font-medium">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/60 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-space-black overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            alt="Space Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-space-black via-transparent to-space-black" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-bold uppercase tracking-widest mb-8">
                <Zap className="w-4 h-4" /> Next-Gen Trading Algorithm
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] mb-6">
                Dari $100 Jadi <span className="text-neon-cyan">36x Lipat</span> Tanpa Sentuh Chart!
              </h1>
              <p className="text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
                Sistem Otomatis yang Eksekusi,<br />Market 24 Jam Tanpa Emosi.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a 
                  href="#pricing" 
                  className="px-8 py-4 bg-neon-cyan text-space-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform neon-glow"
                >
                  Mulai Trading Otomatis Sekarang <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="#proof" 
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  Lihat Performa
                </a>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  "Profit di Segala Market",
                  "Sistem Presisi Tinggi",
                  "Eksekusi Tanpa Emosi",
                  "Bekerja Otomatis 24/7"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/60">
                    <CheckCircle2 className="w-5 h-5 text-neon-cyan" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-neon-cyan/20 blur-3xl rounded-full" />
              <div className="relative glass rounded-3xl p-12 border-white/10 flex flex-col items-center justify-center min-h-[400px]">
                {/* Abstract Visual instead of broken image */}
                <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden rounded-3xl">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 242, 255, 0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                </div>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Cpu className="w-32 h-32 text-neon-cyan/30 mb-8 neon-glow" />
                </motion.div>
                
                <div className="text-center relative z-10">
                  <div className="text-xs text-white/40 uppercase tracking-[0.3em] mb-2 font-bold">System Status</div>
                  <div className="text-3xl font-display font-bold text-white mb-2">ACTIVE</div>
                  <div className="flex items-center justify-center gap-2 text-neon-cyan text-[10px] font-mono tracking-widest">
                    <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                    SYNCING WITH MARKET DATA...
                  </div>
                </div>

                {/* Floating Stats */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-6 glass p-6 rounded-2xl border-neon-cyan/30 shadow-[0_0_40px_rgba(0,242,255,0.2)]"
                >
                  <div className="text-xs text-white/50 uppercase font-bold mb-1">Total Profit</div>
                  <div className="text-3xl font-display font-bold text-neon-cyan">+3,633.38%</div>
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-10 -left-6 glass p-6 rounded-2xl border-neon-purple/30 shadow-[0_0_40px_rgba(188,19,254,0.2)]"
                >
                  <div className="text-xs text-white/50 uppercase font-bold mb-1">Win Rate</div>
                  <div className="text-3xl font-display font-bold text-neon-purple">79.41%</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section id="proof" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Performa yang Terukur & Transparan" 
            subtitle="Heohunter telah melalui backtest multi-tahun dan pengujian real account untuk memastikan relevansi dengan dinamika market."
          />

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: BarChart3, label: "Backtest Multi-Tahun", desc: "Data historis 2023-2026" },
              { icon: ShieldCheck, label: "Real Account Tested", desc: "Teruji di kondisi market nyata" },
              { icon: Layers, label: "Dynamic Adaptation", desc: "Update algoritma berkala" }
            ].map((item, i) => (
              <div key={i} className="glass p-8 rounded-2xl border-white/5 text-center">
                <div className="w-12 h-12 bg-neon-cyan/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="text-neon-cyan w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.label}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="glass rounded-3xl p-8 md:p-12 border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">Hasil Backtest Heohunter</h3>
                <p className="text-white/50">Balance 10.000 | Start 01/01/2023 | Finish 15/02/2026</p>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <div className="text-xs text-white/40 uppercase font-bold">Net Profit</div>
                  <div className="text-2xl font-display font-bold text-neon-cyan">$363,338.60</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-right">
                  <div className="text-xs text-white/40 uppercase font-bold">Drawdown</div>
                  <div className="text-2xl font-display font-bold text-red-400">10.46%</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Real Chart Visualization */}
              <div className="glass rounded-2xl p-6 border-white/5 h-[400px]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Activity className="text-neon-cyan w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-widest">Growth Curve (Balance/Equity)</span>
                  </div>
                  <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-neon-cyan rounded-full" /> Balance
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-neon-purple rounded-full" /> Equity
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={backtestData}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="date" hide />
                    <YAxis 
                      domain={['dataMin - 5000', 'dataMax + 5000']} 
                      stroke="#ffffff40" 
                      fontSize={10}
                      tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#050505', border: '1px solid #ffffff10', borderRadius: '12px' }}
                      itemStyle={{ fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="balance" stroke="#00f2ff" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={2} />
                    <Line type="monotone" dataKey="equity" stroke="#bc13fe" strokeWidth={1} dot={false} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Stats Grid Visualization */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Profit Factor", value: "1.24", icon: TrendingUp, color: "text-neon-cyan" },
                  { label: "Recovery Factor", value: "2.21", icon: Activity, color: "text-neon-purple" },
                  { label: "Win Rate", value: "79.41%", icon: Target, color: "text-emerald-400" },
                  { label: "Total Trades", value: "206,836", icon: Users, color: "text-white" },
                  { label: "Gross Profit", value: "$1,848,892", icon: DollarSign, color: "text-neon-cyan" },
                  { label: "Gross Loss", value: "-$1,485,553", icon: TrendingDown, color: "text-red-400" },
                  { label: "Max Drawdown", value: "10.46%", icon: AlertCircle, color: "text-orange-400" },
                  { label: "Sharpe Ratio", value: "0.97", icon: BarChart3, color: "text-blue-400" }
                ].map((stat, i) => (
                  <div key={i} className="glass p-4 rounded-xl border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`w-4 h-4 ${stat.color} opacity-70`} />
                      <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <div className={`text-xl font-display font-bold ${stat.color}`}>{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionHeading 
            title="Apakah Anda Mengalami Hal Ini?" 
            subtitle="Trading manual seringkali menjadi jebakan emosi yang melelahkan."
          />

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              "Entry sering salah arah",
              "Di Buy turun, di Sell naik",
              "Hit Stop Loss sebelum ke Take Profit",
              "Emosi menghancurkan disiplin",
              "Profit tidak konsisten"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-6 glass rounded-2xl border-white/5 text-left">
                <AlertCircle className="text-red-400 w-6 h-6 shrink-0" />
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold italic text-neon-purple">Anda tidak sendirian!.</h3>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              Mayoritas trader gagal bukan karena strategi, melainkan karena <span className="text-white font-bold">emosi dan ketidakdisiplinan</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24 px-6 bg-neon-cyan/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-neon-cyan font-display font-bold uppercase tracking-[0.3em] mb-4">The Future is Here</div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                Heohunter: High Probability Algorithmics Machine
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Heohunter bukan indikator. Bukan signal. Dan bukan sistem prediksi. Ini adalah mesin algoritma yang dirancang dengan fondasi strategi kuat untuk mengeksekusi market secara disiplin tanpa campur tangan manusia.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "No Human Error", desc: "Menghilangkan faktor emosi, ketakutan, dan keserakahan." },
                  { title: "Mathematical Precision", desc: "Semua entry berbasis sistem matematis yang terukur." },
                  { title: "24/7 Execution", desc: "Bekerja tanpa henti saat market terbuka, tanpa lelah." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-neon-cyan/10 rounded-lg flex items-center justify-center shrink-0">
                      <Target className="text-neon-cyan w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-neon-cyan/20 blur-[100px] rounded-full" />
              <div className="relative glass rounded-3xl p-8 border-white/10 aspect-square flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-full h-full border-2 border-dashed border-neon-cyan/20 rounded-full"
                />
                <div className="text-center">
                  <Cpu className="w-24 h-24 text-neon-cyan mx-auto mb-6 neon-glow" />
                  <div className="text-3xl font-display font-bold tracking-tighter">HEOHUNTER <span className="text-neon-cyan">EA</span></div>
                  <div className="text-white/40 text-sm uppercase tracking-widest mt-2">Active Algorithm v1.11</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Kenapa Heohunter Berbeda?" 
            subtitle="Kami tidak hanya menjual janji, kami memberikan sistem yang dirancang secara logis dan matematis."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Market Agnostic", desc: "Profit di market naik, turun, maupun sideways." },
              { icon: ShieldCheck, title: "Smart Filter", desc: "Menghindari entry saat market terlalu berisiko tinggi." },
              { icon: TrendingUp, title: "Consistent Growth", desc: "Winrate tinggi dengan kurva profit yang stabil." },
              { icon: Code2, title: "Complex Logic", desc: "Algoritma presisi tinggi yang mustahil dieksekusi manusia." },
              { icon: Clock, title: "Zero Latency", desc: "Eksekusi instan tanpa ragu-ragu saat signal muncul." },
              { icon: Star, title: "Proven Strategy", desc: "No fear. No greed. Just consistent profit." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-8 glass rounded-2xl border-white/5"
              >
                <item.icon className="text-neon-cyan w-8 h-8 mb-6" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Pilih Lisensi Anda" 
            subtitle="Mulai perjalanan trading otomatis Anda dengan paket yang sesuai dengan kebutuhan Anda."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PricingCard 
              title="Basic License"
              price="Rp 750.000"
              features={[
                "Lock 1 Account",
                "Lifetime License",
                "Support Instalasi",
                "Standard Updates"
              ]}
              link="https://space-algo.myscalev.com/heohunter-checkout"
            />
            <PricingCard 
              title="Pro License"
              price="Rp 1.500.000"
              features={[
                "Lock 3 Account",
                "Lifetime License",
                "Support Prioritas",
                "Advanced Updates"
              ]}
              highlight={true}
              link="https://space-algo.myscalev.com/heohunter-checkout"
            />
            <PricingCard 
              title="Advanced License"
              price="Rp 10.000.000"
              features={[
                "Lock 1 Account",
                "Open Setting Access",
                "Full Custom Control",
                "Expert Support"
              ]}
              link="https://space-algo.myscalev.com/heohunter-checkout"
            />
            <PricingCard 
              title="Premium Source"
              price="Rp 100.000.000"
              features={[
                "Full Source Code",
                "Commercial Use Rights",
                "Private Support",
                "Unlimited Accounts"
              ]}
              link="https://space-algo.myscalev.com/heohunter-checkout"
            />
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto glass rounded-[40px] p-10 md:p-20 border-neon-cyan/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <Users className="w-20 h-20 text-neon-cyan/10" />
          </div>
          
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Mulai Tanpa Biaya Lisensi?</h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl">
              Bagi trader yang ingin mencoba tanpa risiko di awal, kami menyediakan program kemitraan eksklusif hanya untuk <span className="text-neon-cyan font-bold">5 orang pertama</span> minggu ini.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h4 className="text-neon-cyan font-bold uppercase tracking-widest mb-6">Anda Mendapatkan:</h4>
                <ul className="space-y-4">
                  {["Akses Penuh EA", "Tanpa Biaya Lisensi Awal", "Trading Hingga Modal Kembali"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-neon-cyan" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white/40 font-bold uppercase tracking-widest mb-6">Ketentuan:</h4>
                <ul className="space-y-4 text-sm text-white/60">
                  <li>• Menggunakan IB kami</li>
                  <li>• Biaya instalasi Rp 50.000</li>
                  <li>• Maintenance VPS & Account Rp 150.000/bulan (Setelah balik modal)</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <a 
                href="https://wa.me/6285179950559?text=Daftar+Under+IB"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white text-space-black font-bold rounded-2xl hover:bg-neon-cyan transition-colors neon-glow"
              >
                Daftar Under IB Sekarang
              </a>
              <p className="text-white/40 italic">
                "Sistem ini dirancang agar Anda dan kami sama-sama profit."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title="Pertanyaan Umum" centered={false} />
          
          <div className="space-y-2">
            <FAQItem 
              question="Cocok Untuk Siapa?" 
              answer="Heohunter cocok untuk trader pemula yang ingin hasil konsisten, trader yang sering rugi karena emosi, investor EA, hingga professional trader yang mencari side income stream." 
            />
            <FAQItem 
              question="Berapa minimal deposit?" 
              answer="Minimum deposit adalah $50, namun kami menyarankan $100 untuk standard dan $300 untuk hasil yang lebih optimal menggunakan akun cent." 
            />
            <FAQItem 
              question="Pair apa yang digunakan?" 
              answer="Heohunter bisa digunakan di semua pair, namun XAUUSD (Gold) adalah backbone aslinya dan memberikan performa terbaik." 
            />
            <FAQItem 
              question="Apakah cocok untuk semua broker?" 
              answer="Ya, Heohunter kompatibel dengan hampir semua broker. Namun kami merekomendasikan broker dengan spread rendah dan eksekusi cepat untuk hasil maksimal." 
            />
          </div>
        </div>
      </section>

      {/* Footer / Disclaimer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-space-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Rocket className="text-neon-cyan w-8 h-8" />
                <span className="text-2xl font-display font-bold tracking-tighter">
                  HEOHUNTER<span className="text-neon-cyan">EA</span>
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-md">
                Solusi trading otomatis masa depan. Kami menggabungkan algoritma kompleks dengan strategi yang teruji untuk memberikan pengalaman trading tanpa emosi dan konsisten.
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl border-white/5">
              <div className="flex items-center gap-2 text-red-400 mb-4">
                <AlertCircle className="w-5 h-5" />
                <span className="font-bold uppercase tracking-widest text-xs">Disclaimer!</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">
                Heohunter adalah sistem trading, bukan mesin uang instan. Risiko tetap ada dalam setiap aktivitas trading. Gunakan modal dengan bijak. Heohunter hadir untuk membantu trader agar lebih profitable dan konsisten, namun pengguna bertanggung jawab penuh atas risiko masing-masing.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
            <div className="text-white/20 text-xs">
              © 2026 Heohunter EA. All rights reserved.
            </div>
            <div className="flex gap-8 text-white/20 text-xs">
              <a href="#" className="hover:text-neon-cyan transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-neon-cyan transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-neon-cyan transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
