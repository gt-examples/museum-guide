import Link from "next/link";
import { notFound } from "next/navigation";
import { T, Var, DateTime, Num, Plural, Branch } from "gt-next";
import { getTranslations } from "gt-next/server";
import { exhibitions } from "@/data/exhibitions";
import { artworks } from "@/data/artworks";

export default async function ExhibitionDetailPage({ params }: { params: Promise<{ exhibitionId: string }> }) {
  const { exhibitionId } = await params;
  const exhibition = exhibitions.find((e) => e.id === exhibitionId);
  if (!exhibition) return notFound();

  const d = await getTranslations();

  const exhibitionArtworks = exhibition.artworkIds
    .map((id) => artworks.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 px-4" style={{ backgroundColor: exhibition.color }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1A1A]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <T>
            <span className={`text-xs font-medium px-3 py-1 rounded-full mb-4 inline-block ${
              exhibition.status === "current" ? "bg-[#C9B037]/20 text-[#C9B037]" :
              exhibition.status === "upcoming" ? "bg-blue-500/20 text-blue-400" :
              "bg-[#444]/50 text-[#ccc]"
            }`}>
              <Branch
                branch={exhibition.status}
                current={<>Now on view</>}
                upcoming={<>Coming soon</>}
                past={<>Past exhibition</>}
              />
            </span>
          </T>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{d(`exhibitions.${exhibition.id}.title`)}</h1>
          <p className="text-xl text-white/80 mb-4">{d(`exhibitions.${exhibition.id}.subtitle`)}</p>
          <p className="text-sm text-white/60">
            <T>
              <DateTime>{new Date(exhibition.startDate)}</DateTime> — <DateTime>{new Date(exhibition.endDate)}</DateTime>
            </T>
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Curator Statement */}
        <section className="mb-12">
          <T>
            <h2 className="text-xl font-bold text-[#C9B037] mb-4">Curator Statement</h2>
          </T>
          <p className="text-[#BBB] leading-relaxed">{d(`exhibitions.${exhibition.id}.curatorStatement`)}</p>
        </section>

        {/* Audio Tour */}
        {exhibition.audioTourAvailable && (
          <section className="bg-[#222] rounded-xl p-6 border border-[#333] mb-12">
            <T>
              <h3 className="text-lg font-semibold text-[#F5F5F5] mb-2">Audio Tour</h3>
              <p className="text-sm text-[#999] mb-1">
                A guided audio tour is available for this exhibition, offering deeper insight into each artwork and the curatorial vision behind the show.
              </p>
              <p className="text-sm text-[#666]">
                Duration: <Num>{exhibition.audioTourDuration}</Num> minutes
              </p>
            </T>
          </section>
        )}

        {/* Artworks in Exhibition */}
        <section>
          <T>
            <h2 className="text-xl font-bold text-[#F5F5F5] mb-2">Artworks in This Exhibition</h2>
            <p className="text-sm text-[#888] mb-6">
              <Plural
                n={exhibitionArtworks.length}
                singular={<><Num>{exhibitionArtworks.length}</Num> artwork on display</>}
                plural={<><Num>{exhibitionArtworks.length}</Num> artworks on display</>}
              />
            </p>
          </T>
          <div className="grid sm:grid-cols-2 gap-4">
            {exhibitionArtworks.map((artwork) => artwork && (
              <Link
                key={artwork.id}
                href={`/collection/${artwork.id}`}
                className="group bg-[#222] rounded-xl overflow-hidden border border-[#333] hover:border-[#C9B037]/50 transition-colors"
              >
                <div className="h-32 relative" style={{ backgroundColor: artwork.color }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222] to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#F5F5F5] group-hover:text-[#C9B037] transition-colors mb-1">{d(`artworks.${artwork.id}.title`)}</h3>
                  <T>
                    <p className="text-sm text-[#999]"><Var>{artwork.artist}</Var>, <Num>{artwork.year}</Num></p>
                    <p className="text-xs text-[#666] mt-1 capitalize">
                      <Branch
                        branch={artwork.medium}
                        painting={<>Painting</>}
                        sculpture={<>Sculpture</>}
                        photography={<>Photography</>}
                        installation={<>Installation</>}
                      />
                    </p>
                  </T>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <Link href="/exhibitions" className="text-sm text-[#C9B037] hover:underline">
            <T>Back to all exhibitions</T>
          </Link>
        </div>
      </div>
    </div>
  );
}
