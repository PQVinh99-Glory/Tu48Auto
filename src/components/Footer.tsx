export function Footer() {
  return (
    <footer className="relative z-10 w-full bg-[#111] py-12 text-white/70">
      <div className="mx-auto max-w-7xl px-5 text-center">
        <div className="mb-8">
          <h3 className="mb-4 text-2xl font-bold text-white">Em Tú Suzuki</h3>
          <p className="mb-2">
            Địa chỉ: 49-51 Tân Thới Nhất 17 - Phường Đông Hưng Thuận - HCM
          </p>
          <p className="mb-6">Hotline: 033.489.6628</p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://www.facebook.com/people/T%C3%BA-Suzuki-Mi%E1%BB%81n-Nam/100090847749271/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-blue-500 hover:scale-110"
              title="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@tuxeluotsg?_r=1&_d=secCgYIASAHKAESPgo8sJniCTbjmDJoPlpF61PEiXmjJF2k0YTLIy7NYIj66EQSGB4sYuQ%2BMNI0NGlPrEkrEJmuwmWO7cswr2QzGgA%3D&_svg=1&checksum=fd0c81cef1c3ef2652db65aa9d69819265ee878d5d2b4185fad19367b972f85b&item_author_type=1&reflow_sign_scene=7&rgssign=8.1.1wqOmktZdAr1pXKJ5BqrhQ&sec_uid=MS4wLjABAAAAzoJseaAzjfpgBiM9paabfJvJtTmQZ6dTrNg9EiqigNwJg8hVbYvikv0kFPVLNkUh&sec_user_id=MS4wLjABAAAAzoJseaAzjfpgBiM9paabfJvJtTmQZ6dTrNg9EiqigNwJg8hVbYvikv0kFPVLNkUh&share_app_id=1180&share_author_id=6524237630493229057&share_link_id=2D7CE3FF-D701-4703-B583-ABA136017F66&share_region=VN&share_scene=1&sharer_language=vi&social_share_type=4&source=h5_t&timestamp=1782198267&tt_from=copy&u_code=clg89k8e9ekg9f&ug_btm=b0%2Cb0&user_id=6524237630493229057&utm_campaign=client_share&utm_medium=ios&utm_source=copy"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white hover:scale-110"
              title="TikTok"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.35-2.22 1.83-5.27 2.26-8.05 1.5-2.68-.74-4.96-2.5-6.05-5.1-.96-2.28-1-4.95-.08-7.28 1.11-2.8 3.52-4.95 6.43-5.6 2.3-.51 4.79-.31 6.95.66v4.07c-1.35-.91-3.07-1.18-4.63-.8-1.54.38-2.85 1.39-3.56 2.81-.66 1.34-.69 2.95-.14 4.31.57 1.41 1.75 2.5 3.19 2.96 1.46.47 3.15.34 4.51-.43 1.34-.76 2.27-2.06 2.53-3.6.09-.54.12-1.09.11-1.63-.03-3.52-.02-7.05-.03-10.57z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCzlx9E0Aip903qCks2fRvqg"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-red-500 hover:scale-110"
              title="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://zalo.me/0334896628"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-blue-400 hover:scale-110"
              title="Zalo"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.547 7.031c-1.464-3.616-5.875-5.513-9.58-4.482-3.801 1.056-6.49 4.382-6.49 8.28 0 1.942.664 3.75 1.83 5.176.104.127.172.284.195.448l.385 2.766c.074.526.685.79 1.109.48l2.645-1.932c.16-.118.358-.172.556-.153 1.054.103 2.133.029 3.19-.228 3.73-.912 6.516-3.929 6.848-7.747.165-1.921-.247-3.83-1.688-5.352zm-12.753 6.945c-.477 0-.863-.386-.863-.863s.386-.863.863-.863.863.386.863.863-.386.863-.863.863zm2.59-1.938c-.476 0-.862-.386-.862-.863s.386-.863.863-.863.863.386.863.863-.387.863-.863.863zm2.589 0c-.476 0-.862-.386-.862-.863s.386-.863.863-.863.863.386.863.863-.387.863-.863.863zm2.589 0c-.476 0-.862-.386-.862-.863s.386-.863.863-.863.863.386.863.863-.387.863-.863.863z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6">
          <p className="text-sm">Copyright 2026 by Vinh</p>
        </div>
      </div>
    </footer>
  );
}
