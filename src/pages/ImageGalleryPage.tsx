import React from "react";
import { Image as ImageIcon, Camera } from "lucide-react";

export const ImageGalleryPage = () => {
  // We use placeholder IDs to simulate images. Real app would use actual public assets or URLs.
  const galleryItems = [
    { id: 1, title: "Class Trip 2023", url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" },
    { id: 2, title: "Reading Challenge Winners", url: "https://images.unsplash.com/photo-1512820200502-9ed1e6a121e5?w=800&q=80" },
    { id: 3, title: "New Library Corner", url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80" },
    { id: 4, title: "Science Fair Projects", url: "https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?w=800&q=80" },
    { id: 5, title: "Guest Author Visit", url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80" },
    { id: 6, title: "Missing Image State Demo", url: "invalid-url.jpg" }, // Demonstrates missing state
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Camera className="w-8 h-8 text-indigo-500" /> Gallery
          </h1>
          <p className="text-slate-500 font-bold mt-1">Photos and memories from our explorers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map(item => (
          <div key={item.id} className="card overflow-hidden group">
            <div className="aspect-video bg-slate-100 relative overflow-hidden flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-slate-300 absolute" />
              <img 
                src={item.url} 
                alt={item.title}
                className="w-full h-full object-cover relative z-10 opacity-0 transition-opacity duration-500 group-hover:scale-105"
                onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="p-4 bg-white border-t border-slate-100">
              <h3 className="font-bold text-slate-900">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
