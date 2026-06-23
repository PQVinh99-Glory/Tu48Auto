export function Menu2() {
  return (
    <section className="relative z-10 w-full bg-[#050505] py-24 text-white">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-black uppercase tracking-widest text-white md:text-5xl">
            Tú Suzuki Miền Nam
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-orange-500"></div>
          <p className="mx-auto mt-6 max-w-[1000px] text-lg text-white/70">
            Chuyên: xe lướt chất lượng - chuẩn số KM, bao check xe toàn quốc, mô tả đúng chất xe - giá hợp lý
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
          {/* Ảnh Center (to nhất) */}
          <div className="group relative overflow-hidden rounded-xl md:col-span-2 md:row-span-2">
            <img
              src="/center.jpg"
              alt="Center Car"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100"></div>
          </div>

          {/* Các ảnh nhỏ */}
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className="group relative h-64 overflow-hidden rounded-xl md:h-auto"
            >
              <img
                src={`/${num}.jpg`}
                alt={`Car ${num}`}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>

        {/* 1-touch CTA */}
        <div className="mt-20 flex justify-center">
          <a
            href="tel:0334896628"
            className="phone-pulse relative inline-flex overflow-hidden rounded-full bg-gradient-to-r from-orange-600 to-orange-500 px-10 py-5 text-lg font-bold text-white shadow-[0_0_35px_rgba(255,106,42,.42)] transition hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Gọi ngay 033.489.6628</span>
            <div className="absolute inset-0 z-0 animate-ping rounded-full bg-orange-400 opacity-20"></div>
          </a>
        </div>
      </div>
    </section>
  );
}
