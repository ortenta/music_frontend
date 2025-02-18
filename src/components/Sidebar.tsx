import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, PlayCircle, LineChart, Music } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Artists', href: '/artists', icon: Users },
  { name: 'Playlists', href: '/playlists', icon: PlayCircle },
  { name: 'Analytics', href: '/analytics', icon: LineChart },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Music className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-bold">Music App</span>
        </div>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}