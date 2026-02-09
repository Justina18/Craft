import MorphingCards from "./morph"
import { Layers, Palette, Clock, Sparkles, Zap, Star} from "lucide-react"

const CardsPage = () => {
  const cardData = [
    {
      id: "1",
      title: "Magnetic Dock",
      description: "Cursor-responsive scaling with smooth spring animations",
      icon: <Layers className="h-5 w-5" />,
      color: "#1e3a8a",
    },
    {
      id: "2",
      title: "Gradient Mesh",
      description: "Dynamic animated gradient backgrounds that follow your cursor",
      icon: <Palette className="h-5 w-5" />,
      color: "#7c2d12",
    },
    {
      id: "3",
      title: "Pulse Timeline",
      description: "Interactive timeline with animated pulse nodes",
      icon: <Clock className="h-5 w-5" />,
      color: "#14532d",
    },
    {
      id: "4",
      title: "Command Menu",
      description: "Radial command palette with keyboard navigation",
      icon: <Sparkles className="h-5 w-5" />,
      color: "#581c87",
    },
    {
      id: "5",
      title: "Lightning Fast",
      description: "Optimized performance for smooth 60fps animations",
      icon: <Zap className="h-5 w-5" />,
      color: "#713f12",
    },
    {
      id: "6",
      title: "Premium Quality",
      description: "Hand-crafted components with attention to detail",
      icon: <Star className="h-5 w-5" />,
      color: "#831843",
    },
  ]

  const handleCardClick = (card: any) => {
    console.log("Card clicked:", card.title)
  }

  return (
    <div className="min-h-screen w-full bg-[#0f1728] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Morphing Card Stack</h1>
          <p className="text-gray-400">Switch between stack, grid, and list layouts</p>
        </div>
        
        <MorphingCards 
          cards={cardData} 
          defaultLayout="stack"
          onCardClick={handleCardClick}
        />
      </div>
    </div>
  )
}

export default CardsPage;