"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { T, Var, Num, Branch, DateTime } from "gt-next";
import { artworks } from "@/data/artworks";
import { exhibitions } from "@/data/exhibitions";

export default function ArtworkDetailPage() {
  const params = useParams();
  const artworkId = params.artworkId as string;
  const artwork = artworks.find((a) => a.id === artworkId);
  const [zoomed, setZoomed] = useState(false);

  if (!artwork) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <T>
          <h1 className="text-2xl font-bold text-[#F5F5F5] mb-4">Artwork not found</h1>
          <p className="text-[#999]">The requested artwork could not be found in our collection.</p>
        </T>
        <Link href="/collection" className="text-sm text-[#C9B037] hover:underline mt-4 inline-block">
          <T>Back to collection</T>
        </Link>
      </div>
    );
  }

  const relatedArtworks = artwork.relatedIds
    .map((id) => artworks.find((a) => a.id === id))
    .filter(Boolean);

  const inExhibitions = exhibitions.filter((e) => e.artworkIds.includes(artwork.id));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Artwork Image with Zoom */}
      <div className="mb-8">
        <div
          onClick={() => setZoomed(!zoomed)}
          className={`relative rounded-xl overflow-hidden cursor-zoom-in transition-all duration-300 ${
            zoomed ? "h-[600px] cursor-zoom-out" : "h-80"
          }`}
          style={{ backgroundColor: artwork.color }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`transition-transform duration-300 ${zoomed ? "scale-150" : "scale-100"}`}>
              <div className="w-32 h-32 border-2 border-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
          {!zoomed && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white/70 text-xs px-2 py-1 rounded">
              <T>Click to zoom</T>
            </div>
          )}
        </div>
      </div>

      {/* Artwork Info */}
      <div className="mb-12">
        <T>
          <p className="text-xs text-[#666] uppercase tracking-widest mb-2">
            <Branch
              branch={artwork.medium}
              painting={<>Painting</>}
              sculpture={<>Sculpture</>}
              photography={<>Photography</>}
              installation={<>Installation</>}
            />
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-2"><Var>{artwork.title}</Var></h1>
          <p className="text-lg text-[#C9B037] mb-1"><Var>{artwork.artist}</Var></p>
          <p className="text-sm text-[#888] mb-6">
            <Num>{artwork.year}</Num> — <Num>{artwork.dimensions.width}</Num> x <Num>{artwork.dimensions.height}</Num> <Var>{artwork.dimensions.unit}</Var>
          </p>
        </T>
      </div>

      {/* Description */}
      <section className="mb-10">
        <T>
          <h2 className="text-lg font-bold text-[#C9B037] mb-3">About This Work</h2>
          <p className="text-[#BBB] leading-relaxed"><Var>{artwork.description}</Var></p>
        </T>
      </section>

      {/* Historical Context */}
      <section className="mb-10">
        <T>
          <h2 className="text-lg font-bold text-[#C9B037] mb-3">Historical Context</h2>
          <p className="text-[#BBB] leading-relaxed"><Var>{artwork.historicalContext}</Var></p>
        </T>
      </section>

      {/* Artist Bio */}
      <section className="bg-[#222] rounded-xl p-6 border border-[#333] mb-10">
        <T>
          <h2 className="text-lg font-bold text-[#F5F5F5] mb-3">About the Artist</h2>
          <p className="text-[#BBB] leading-relaxed"><Var>{artwork.artistBio}</Var></p>
        </T>
      </section>

      {/* Exhibitions featuring this artwork */}
      {inExhibitions.length > 0 && (
        <section className="mb-10">
          <T>
            <h2 className="text-lg font-bold text-[#C9B037] mb-4">Featured In</h2>
          </T>
          <div className="space-y-3">
            {inExhibitions.map((ex) => (
              <Link
                key={ex.id}
                href={`/exhibitions/${ex.id}`}
                className="block bg-[#222] rounded-lg p-4 border border-[#333] hover:border-[#C9B037]/50 transition-colors"
              >
                <T>
                  <h3 className="font-semibold text-[#F5F5F5] mb-1"><Var>{ex.title}</Var></h3>
                  <p className="text-xs text-[#888]">
                    <DateTime>{new Date(ex.startDate)}</DateTime> — <DateTime>{new Date(ex.endDate)}</DateTime>
                  </p>
                </T>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Works */}
      {relatedArtworks.length > 0 && (
        <section className="mb-10">
          <T>
            <h2 className="text-lg font-bold text-[#C9B037] mb-4">Related Works</h2>
          </T>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedArtworks.map((related) => related && (
              <Link
                key={related.id}
                href={`/collection/${related.id}`}
                className="group bg-[#222] rounded-xl overflow-hidden border border-[#333] hover:border-[#C9B037]/50 transition-colors"
              >
                <div className="h-24 relative" style={{ backgroundColor: related.color }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222] to-transparent" />
                </div>
                <div className="p-4">
                  <T>
                    <h3 className="font-semibold text-[#F5F5F5] group-hover:text-[#C9B037] transition-colors mb-1"><Var>{related.title}</Var></h3>
                    <p className="text-sm text-[#999]"><Var>{related.artist}</Var>, <Num>{related.year}</Num></p>
                  </T>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Link href="/collection" className="text-sm text-[#C9B037] hover:underline">
        <T>Back to collection</T>
      </Link>
    </div>
  );
}
