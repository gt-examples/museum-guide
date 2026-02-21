import { T } from "gt-next";

export default function Footer() {
  return (
    <footer className="bg-[#111] border-t border-[#333] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <T>
          <div className="bg-[#222] border border-[#444] rounded-lg p-4 mb-8 text-sm text-[#999] text-center">
            This is an example application built with General Translation to demonstrate internationalization. It is not a real museum or visitor guide.
          </div>
        </T>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#666]">
          <T>
            <div className="flex items-center gap-4">
              <a href="https://generaltranslation.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9B037] transition-colors">General Translation</a>
              <a href="https://www.metmuseum.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9B037] transition-colors">The Met</a>
              <a href="https://www.louvre.fr" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9B037] transition-colors">Louvre</a>
              <a href="https://www.tate.org.uk" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9B037] transition-colors">Tate</a>
            </div>
          </T>
          <T>
            <p>Built with General Translation for Next.js</p>
          </T>
        </div>
      </div>
    </footer>
  );
}
