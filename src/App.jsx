import React, { useState } from 'react';
import { 
  Download, 
  Sparkles, 
  Image as ImageIcon, 
  Video, 
  CheckCircle2, 
  LogOut, 
  Settings, 
  History, 
  ShieldCheck, 
  Smartphone,
  Check,
  Play
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState('');
  const [mediaType, setMediaType] = useState('both');
  const [quality, setQuality] = useState('1080p');
  const [loading, setLoading] = useState(false);
  const [downloadHistory, setDownloadHistory] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleGoogleLogin = () => {
    setUser({
      name: "مستخدم Fast Flash",
      email: "user@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleFetchMedia = (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setProgress(10);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setDownloadHistory(prevHistory => [
            {
              id: Date.now(),
              url: url,
              type: mediaType,
              quality: quality,
              date: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
            },
            ...prevHistory
          ]);
          return 100;
        }
        return prev + 30;
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans dir-rtl" dir="rtl">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Fast Flash
              </h1>
              <p className="text-xs text-slate-400">Media Downloader Pro</p>
            </div>
          </div>

          <div>
            {user ? (
              <div className="flex items-center gap-3 bg-slate-800/80 p-1.5 pr-3 rounded-full border border-slate-700">
                <span className="text-sm font-medium text-slate-200">{user.name}</span>
                <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-cyan-500" />
                <button 
                  onClick={handleLogout}
                  className="p-1.5 hover:bg-slate-700 rounded-full text-slate-400 hover:text-red-400 transition"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md shadow-cyan-500/20"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V13.4h6.887c-.58 2.307-2.738 3.914-5.26 3.914-3.15 0-5.7-2.55-5.7-5.7s2.55-5.7 5.7-5.7c1.35 0 2.58.47 3.55 1.35l2.43-2.43C18.36 3.4 15.48 2.4 12.24 2.4 6.94 2.4 2.64 6.7 2.64 12s4.3 9.6 9.6 9.6c5.55 0 9.2-3.9 9.2-9.37 0-.64-.06-1.26-.16-1.95H12.24z"/>
                </svg>
                تسجيل الدخول بـ Gmail
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        
        {/* URL Input Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <form onSubmit={handleFetchMedia} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ضع رابط الفيديو أو الصورة هنا:
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://example.com/video-or-photo..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 pl-12 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute left-2 top-2 bottom-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-5 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{loading ? "جاري التحليل..." : "تحميل"}</span>
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Type Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">نوع المحتوى المطلوب:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'both', label: 'الكل', icon: Sparkles },
                    { id: 'video', label: 'فيديو فقط', icon: Video },
                    { id: 'image', label: 'صورة فقط', icon: ImageIcon },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMediaType(item.id)}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition ${
                        mediaType === item.id
                          ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">الجودة المطلوب تنزيلها:</label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="1080p">1080p (عالية الدقة - Full HD)</option>
                  <option value="720p">720p (جودة متوسطة - HD)</option>
                  <option value="480p">480p (جودة منخفضة)</option>
                  <option value="mp3">صوت فقط (MP3)</option>
                </select>
              </div>
            </div>
          </form>

          {/* Progress Bar */}
          {loading && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>جاري المعالجة واستخراج الملف...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* History List */}
        {downloadHistory.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4 text-slate-200 font-bold">
              <History className="w-5 h-5 text-cyan-400" />
              <h2>سجل التحميلات السابقة</h2>
            </div>

            <div className="space-y-3">
              {downloadHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-xs text-slate-300 max-w-xs truncate">{item.url}</p>
                      <div className="flex gap-2 text-[10px] text-slate-500 mt-1">
                        <span>الجودة: {item.quality}</span>
                        <span>•</span>
                        <span>النوع: {item.type}</span>
                        <span>•</span>
                        <span>الوقت: {item.date}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 px-3 py-1.5 rounded-lg border border-slate-700 transition">
                    تنزيل الملف
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-slate-600 border-t border-slate-900">
        © Fast Flash Media Downloader - جميع الحقوق محفوظة
      </footer>
    </div>
  );
}