import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Mock login if no real supabase credentials exist yet
      if (!import.meta.env.VITE_SUPABASE_URL) {
        console.log('Mock login successful');
        localStorage.setItem('mock_user', 'true');
        navigate('/');
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ett fel uppstod vid inloggning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-sm bg-dark-card border border-dark-border rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Inloggning</h1>
        <p className="text-gray-400 text-sm text-center mb-6">Service Tekniker Portal</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">E-post</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
              placeholder="namn@företag.se"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Lösenord</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && <p className="text-red-400 text-sm">{error}</p>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl mt-4 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loggar in...' : 'Logga in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
