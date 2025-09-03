import { motion } from "framer-motion";

export default function Gallery() {
  const images = [
    "/assets/gallery/img1.jpg",
    "/assets/gallery/img2.jpg",
    "/assets/gallery/img3.jpg",
    "/assets/gallery/img4.jpg",
  ];

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-3xl font-display text-white mb-8">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Gallery ${i + 1}`}
            className="rounded-lg object-cover aspect-square cursor-pointer hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
