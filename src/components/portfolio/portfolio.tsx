import AnimatedFolder, { Project } from './animated-folder';

const PortfolioPage = () => {
  const portfolioData = [
    {
      title: "Branding",
      gradient: "linear-gradient(135deg, #e73827, #f85032)",
      projects: [
        { id: "b1", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800", title: "Lumnia Identity" },
        { id: "b2", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800", title: "Prism Collective" },
        { id: "b3", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800", title: "Vertex Studio" },
        { id: "b4", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800", title: "Aura Branding" },
        { id: "b5", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800", title: "Zephyr Lab" },
      ] as Project[]
    },
    {
      title: "Web Design",
      gradient: "linear-gradient(to right, #f7b733, #fc4a1a)",
      projects: [
        { id: "w1", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800", title: "Nexus Platform" },
        { id: "w2", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", title: "Echo Analytics" },
        { id: "w3", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800", title: "Flow Systems" },
        { id: "w4", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800", title: "Code Nest" },
      ] as Project[]
    },
    {
      title: "UI/UX Design",
      gradient: "linear-gradient(135deg, #00c6ff, #0072ff)",
      projects: [
        { id: "u1", image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800", title: "Crypto Wallet" },
        { id: "u2", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800", title: "Social Connect" },
        { id: "u3", image: "https://images.unsplash.com/photo-1522542550221-31fd19fe4af0?auto=format&fit=crop&q=80&w=800", title: "Health Tracker" },
      ] as Project[]
    },
    {
      title: "Photography",
      gradient: "linear-gradient(to right, #414345, #232526)",
      projects: [
        { id: "p1", image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=800", title: "Urban Rhythms" },
        { id: "p2", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800", title: "Natural States" },
        { id: "p3", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800", title: "Silent Woods" },
      ] as Project[]
    },
  ];

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto pt-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
          Design <span className="text-blue-500 italic">Portfolio</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          An interactive catalog of creative work. Hover over folders to reveal project previews.
        </p>
      </div>

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {portfolioData.map((folder) => (
            <div key={folder.title} className="w-full">
              <AnimatedFolder 
                title={folder.title} 
                projects={folder.projects} 
                gradient={folder.gradient}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;