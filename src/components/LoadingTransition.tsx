import { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';

export default function LoadingTransition({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="bg-white p-6 rounded-2xl shadow-2xl mb-6 inline-block">
          <Building2 className="w-16 h-16 text-blue-600" />
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">Gokuldhaam Bank</h2>
        <p className="text-blue-100 mb-8 text-lg">Securing your session...</p>

        <div className="w-64 mx-auto">
          <div className="bg-white/30 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white mt-3 text-sm font-medium">{progress}%</p>
        </div>
      </div>
    </div>
  );
}
