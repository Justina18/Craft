import React, { useState } from 'react';
import MacDock from './macdock';

const DockPage: React.FC = () => {
  const [openApps, setOpenApps] = useState<string[]>(['finder', 'safari']);

  const sampleApps = [
    { 
      id: 'finder', 
      name: 'Finder', 
      icon: '/Finder.png'
    },
    { 
      id: 'teams', 
      name: 'Teams', 
      icon: '/Teams.png'
    },
    { 
      id: 'spotify', 
      name: 'Spotify', 
      icon: '/Spotify.png'
    },
    { 
      id: 'maps', 
      name: 'Maps', 
      icon: '/Maps.png'
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: '/Settings.png'
    },
    { 
      id: 'safari', 
      name: 'Safari', 
      icon: '/Safari.png'
    },
    { 
      id: 'figma', 
      name: 'Figma', 
      icon: '/Figma.png'
    },
    { 
      id: 'cirra', 
      name: 'Cirra', 
      icon: '/Cirra.png'
    },
    { 
      id: 'minecraft', 
      name: 'Minecraft', 
      icon: '/Minecraft.png'
    },
  ];

  const handleAppClick = (appId: string) => {
    console.log('App clicked:', appId);
    
    setOpenApps(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  return (
    <div 
      className="h-screen w-screen flex items-end justify-center pb-8 overflow-hidden relative"
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/de6dwxq4l/image/upload/v1770382919/dreamlike-surrealistic-landscape_zleqgi.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Optional overlay for better dock visibility */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative z-10">
        <MacDock
          apps={sampleApps}
          onAppClick={handleAppClick}
          openApps={openApps}
        />
      </div>
    </div>
  );
};

export default DockPage;