export interface Exhibition {
  id: string;
  title: string;
  subtitle: string;
  curatorStatement: string;
  description: string;
  startDate: string; // ISO date
  endDate: string;
  status: "current" | "upcoming" | "past";
  artworkIds: string[];
  audioTourAvailable: boolean;
  audioTourDuration: number; // minutes
  color: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: "luminous-worlds",
    title: "Luminous Worlds",
    subtitle: "Light, Color, and Perception in Contemporary Art",
    curatorStatement: "This exhibition brings together artists who use light as both subject and medium. From Vasquez's painted nocturnes to Mori's glowing glass forests, each work invites us to reconsider how we see and how light shapes our experience of the world. The works presented here span painting, sculpture, and installation, united by their investigation of luminosity and its emotional power.",
    description: "An immersive exploration of how contemporary artists capture, manipulate, and create light. Featuring paintings, installations, and mixed-media works that transform gallery spaces into environments of radiance and shadow.",
    startDate: "2025-11-15",
    endDate: "2026-04-30",
    status: "current",
    artworkIds: ["starlit-garden", "midnight-bloom", "glass-forest", "light-study-autumn"],
    audioTourAvailable: true,
    audioTourDuration: 45,
    color: "#C9B037",
  },
  {
    id: "material-dialogues",
    title: "Material Dialogues",
    subtitle: "Conversations Between Form and Substance",
    curatorStatement: "The artists in this exhibition share a deep engagement with their chosen materials. Whether stone, steel, glass, or electronics, each artist enters into a dialogue with physical substance, allowing the material itself to guide the creative process. The result is work that speaks as much through texture, weight, and presence as through visual form.",
    description: "An exhibition examining how contemporary artists work with and against their materials. Sculptures, installations, and mixed-media works that foreground the physical properties of stone, metal, glass, and technology.",
    startDate: "2026-01-10",
    endDate: "2026-06-15",
    status: "current",
    artworkIds: ["cathedral-of-trees", "glass-forest", "erosion-no-7", "vessel-of-memory", "signal-noise"],
    audioTourAvailable: true,
    audioTourDuration: 60,
    color: "#8B7355",
  },
  {
    id: "garden-of-light",
    title: "Garden of Light",
    subtitle: "Nature Reimagined Through Art",
    curatorStatement: "This exhibition celebrates the enduring relationship between art and the natural world. From Vasquez's painted gardens to Tanaka's steel forests and Johansson's seasonal light studies, these artists reimagine nature through their unique perspectives, reminding us of both its beauty and its fragility.",
    description: "A thematic exhibition exploring how contemporary artists interpret, transform, and celebrate the natural world through diverse media and approaches.",
    startDate: "2026-05-01",
    endDate: "2026-09-30",
    status: "upcoming",
    artworkIds: ["starlit-garden", "cathedral-of-trees", "light-study-autumn", "portrait-of-the-wind"],
    audioTourAvailable: false,
    audioTourDuration: 0,
    color: "#4A7C59",
  },
  {
    id: "lens-and-light",
    title: "Lens and Light",
    subtitle: "Contemporary Photography and the Seen World",
    curatorStatement: "Photography has always been the art of light, yet the photographers in this exhibition push beyond documentation toward transformation. Eriksson's long exposures dissolve time, Ruiz's palimpsests compress it, and together they reveal that the camera can show us not just what is, but what lies beneath and beyond ordinary seeing.",
    description: "A focused exhibition of contemporary photography exploring time, memory, and perception through innovative techniques and compelling subjects.",
    startDate: "2025-03-01",
    endDate: "2025-08-31",
    status: "past",
    artworkIds: ["frozen-moment-no-3", "urban-palimpsest", "the-reading-room"],
    audioTourAvailable: true,
    audioTourDuration: 35,
    color: "#6B6B7B",
  },
];
