# Skill.md — 48.AUTO Cinematic Landing Page Intro Demo

## 1. Vai trò của AI Builder

Bạn là **Senior Frontend Creative Developer** chuyên xây landing page quảng cáo xe hơi cao cấp, có tư duy thẩm mỹ mạnh, animation mượt, hiệu ứng cinematic và tối ưu trải nghiệm trên mobile/desktop.

Hãy build một demo landing page cho thương hiệu **48.AUTO** dựa trên ảnh hero đã cung cấp. Mục tiêu chính là tạo phần **intro đầu trang** thật đẹp, mượt, có cảm giác xe đang lao tới rồi dừng lại đúng bố cục cuối cùng như ảnh mẫu.

---

## 2. Công nghệ đề xuất

Sử dụng:

- Vite
- React
- TypeScript
- Tailwind CSS
- GSAP cho intro animation
- Framer Motion nếu cần micro-interaction
- CSS mask / blend-mode / filter cho hiệu ứng ánh sáng

Ưu tiên cảm giác:

- Premium
- Automotive
- Cinematic
- Dark luxury showroom
- Glossy reflections
- Motion speed
- High-end advertising landing page

Không dùng animation quá nặng gây lag trên mobile.

---

## 3. Asset đầu vào

Đặt các file trong thư mục:

```txt
public/assets/
```

Tên file đề xuất:

```txt
hero-final.png          // ảnh cuối cùng đã ghép người + xe + showroom
logo-48auto.png         // logo 48.AUTO người dùng gửi
car.png                 // nếu có thể tách riêng xe
person.png              // nếu có thể tách riêng nhân vật
front-wheel.png         // nếu có thể tách riêng bánh trước
rear-wheel.png          // nếu có thể tách riêng bánh sau
light-trail.png         // layer luồng sáng nếu có
```

Nếu chưa tách được layer riêng, hãy vẫn build demo bằng `hero-final.png`, sau đó tạo thêm các hiệu ứng overlay giả lập:

- Luồng sáng chạy ngang thân xe
- Vòng blur tại vị trí bánh xe
- Glow layer
- Speed line
- Camera dolly-in
- Bụi sáng / smoke nhẹ phía sau xe

---

## 4. Mục tiêu demo đầu tiên

Chỉ cần build phần đầu landing page gồm:

1. Header
2. Hero intro cinematic
3. Nút CTA gọi điện
4. Hiệu ứng xe + bánh + ánh sáng

Không cần build nhiều section phía dưới ở demo đầu tiên.

---

## 5. Header yêu cầu

Header nằm trên cùng, dạng glassmorphism tối.

Yêu cầu:

- Bên trái: logo `48.AUTO`
- Bên phải: số điện thoại `033.489.6628`
- Khi bấm vào số điện thoại phải mở trình gọi điện thoại:

```html
<a href="tel:0334896628">033.489.6628</a>
```

Hiệu ứng header:

- Ban đầu fade xuống nhẹ
- Có viền sáng mỏng màu cam/đỏ
- Logo phát sáng nhẹ
- Số điện thoại có hover glow
- Mobile phải bấm gọi được ngay

---

## 6. Bố cục Hero

Hero full màn hình:

```css
height: 100vh;
min-height: 720px;
overflow: hidden;
background: #050505;
```

Bố cục cuối cùng phải giống ảnh mẫu:

- Nhân vật ở bên trái
- Xe chiếm trung tâm và bên phải
- Logo 48.AUTO nằm trên tường bên trái
- Background showroom tối, sang trọng
- Có khoảng trống vừa đủ để sau này thêm headline quảng cáo

---

## 7. Timeline intro animation

### 7.1. Giai đoạn 1 — Loading cinematic

Thời gian: `0s → 0.6s`

Hiệu ứng:

- Nền tối hiện dần
- Header xuất hiện từ trên xuống
- Logo 48.AUTO glow nhẹ
- Camera zoom-in rất nhẹ

Cảm giác mong muốn:

```txt
dark fade in
soft showroom light
premium reveal
```

---

### 7.2. Giai đoạn 2 — Nhân vật xuất hiện

Thời gian: `0.3s → 1.1s`

Nhân vật xuất hiện bên trái:

- Fade in
- Dịch nhẹ từ trái sang phải khoảng `40px`
- Sau khi xuất hiện thì giữ nguyên vị trí
- Không lắc mạnh
- Không chuyển động quá nhiều

GSAP tham khảo:

```ts
gsap.fromTo(
  ".person-layer",
  { opacity: 0, x: -48, filter: "blur(8px)" },
  {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 0.9,
    ease: "power3.out"
  }
);
```

---

### 7.3. Giai đoạn 3 — Xe trượt tới

Thời gian: `0.55s → 2.2s`

Xe chạy/trượt từ phải sang vị trí cuối:

- Bắt đầu ngoài màn hình bên phải
- Di chuyển nhanh vào giữa
- Có motion blur
- Có speed line phía sau
- Khi tới vị trí cuối thì hơi overshoot rồi settle lại
- Kết thúc đúng bố cục ảnh mẫu

GSAP tham khảo:

```ts
gsap.fromTo(
  ".car-layer",
  {
    x: "55vw",
    scale: 1.03,
    filter: "blur(5px)"
  },
  {
    x: "0vw",
    scale: 1,
    filter: "blur(0px)",
    duration: 1.65,
    ease: "expo.out"
  }
);
```

Thêm hiệu ứng dừng xe:

```ts
gsap.to(".car-layer", {
  x: "-1.2vw",
  duration: 0.18,
  yoyo: true,
  repeat: 1,
  ease: "power2.inOut",
  delay: 2.1
});
```

---

## 8. Bánh xe xoay liên tục

Bánh trước và bánh sau phải xoay liên tục.

Nếu có layer bánh riêng:

```ts
gsap.to(".wheel", {
  rotate: 360,
  duration: 0.45,
  repeat: -1,
  ease: "none"
});
```

Sau khi xe dừng, bánh vẫn xoay nhưng chậm hơn:

```ts
gsap.to(".wheel", {
  duration: 0.9,
  repeat: -1,
  ease: "none"
});
```

Nếu chỉ có ảnh gốc, tạo hai vòng wheel overlay tại vị trí bánh xe:

```html
<div className="wheel-spin front-wheel-fake"></div>
<div className="wheel-spin rear-wheel-fake"></div>
```

CSS tham khảo:

```css
.wheel-spin {
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
  background:
    conic-gradient(
      from 0deg,
      rgba(255,255,255,.0),
      rgba(255,255,255,.28),
      rgba(255,255,255,.0),
      rgba(255,80,20,.32),
      rgba(255,255,255,.0)
    );
  mix-blend-mode: screen;
  filter: blur(1px);
  opacity: .72;
  animation: wheelRotate .42s linear infinite;
}

@keyframes wheelRotate {
  to {
    transform: rotate(360deg);
  }
}
```

Vị trí overlay demo desktop:

```css
.front-wheel-fake {
  width: 13vw;
  height: 13vw;
  left: 50.5%;
  top: 57%;
}

.rear-wheel-fake {
  width: 11.5vw;
  height: 11.5vw;
  left: 82%;
  top: 56.5%;
}
```

Mobile phải dùng media query để chỉnh lại vị trí.

---

## 9. Luồng sáng phấp phới trên thân xe

Tạo nhiều light streak chạy từ phải sang trái và trái sang phải, không quá chói.

Yêu cầu:

- Màu cam, đỏ, trắng nhẹ
- Blend mode: `screen` hoặc `lighten`
- Blur mềm
- Chạy qua thân xe và phía sau xe
- Lặp vô hạn nhưng tinh tế
- Không che mặt nhân vật

HTML demo:

```html
<div className="light-ribbon ribbon-1"></div>
<div className="light-ribbon ribbon-2"></div>
<div className="light-ribbon ribbon-3"></div>
<div className="rear-speed-glow"></div>
```

CSS tham khảo:

```css
.light-ribbon {
  position: absolute;
  height: 2px;
  width: 42vw;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 117, 38, .15),
    rgba(255, 240, 210, .75),
    rgba(255, 73, 29, .35),
    transparent
  );
  filter: blur(.5px);
  mix-blend-mode: screen;
  opacity: .75;
  transform: skewX(-14deg);
  animation: ribbonFloat 3.8s ease-in-out infinite;
}

.ribbon-1 {
  top: 36%;
  right: -18%;
  animation-delay: 0s;
}

.ribbon-2 {
  top: 47%;
  right: -24%;
  animation-delay: .7s;
  opacity: .55;
}

.ribbon-3 {
  top: 61%;
  right: -20%;
  animation-delay: 1.4s;
  opacity: .38;
}

@keyframes ribbonFloat {
  0% {
    transform: translateX(12vw) skewX(-14deg);
    opacity: 0;
  }

  18% {
    opacity: .8;
  }

  55% {
    opacity: .55;
  }

  100% {
    transform: translateX(-115vw) skewX(-14deg);
    opacity: 0;
  }
}
```

---

## 10. Hiệu ứng khói / bụi sáng phía sau xe

Tạo cảm giác xe vừa lao tới:

```css
.rear-speed-glow {
  position: absolute;
  right: -8vw;
  bottom: 13%;
  width: 44vw;
  height: 28vh;
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 111, 43, .22), transparent 52%),
    radial-gradient(circle at 60% 45%, rgba(255, 255, 255, .12), transparent 60%);
  filter: blur(18px);
  mix-blend-mode: screen;
  opacity: .75;
  animation: smokePulse 2.8s ease-in-out infinite;
}

@keyframes smokePulse {
  0%, 100% {
    transform: translateX(0) scale(1);
    opacity: .45;
  }

  50% {
    transform: translateX(-2vw) scale(1.08);
    opacity: .82;
  }
}
```

---

## 11. Hero text demo

Tạo text nhỏ, không che xe:

```txt
PREMIUM CAR DEALER
48.AUTO
Muscle Cars. Luxury Showroom. One Touch Call.
```

Vị trí đề xuất:

- Desktop: bên phải trên hoặc giữa phải, nhưng không che thân xe
- Mobile: đặt dưới ảnh xe
- Text có hiệu ứng reveal sau khi xe vào xong

CTA:

```txt
Gọi ngay 033.489.6628
```

Link:

```html
<a href="tel:0334896628">Gọi ngay 033.489.6628</a>
```

---

## 12. Motion detail sau khi intro kết thúc

Sau khi intro kết thúc:

- Xe không đứng chết hoàn toàn
- Bánh xe vẫn xoay nhẹ
- Luồng sáng vẫn chạy chậm
- Camera có breathing zoom rất nhẹ
- Logo 48.AUTO glow nhẹ
- Button điện thoại pulse nhẹ mỗi 3 giây

CSS breathing:

```css
.hero-scene {
  animation: sceneBreath 7s ease-in-out infinite;
}

@keyframes sceneBreath {
  0%, 100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.018);
  }
}
```

---

## 13. Responsive

### Desktop

- Hero full width
- Xe lớn, chiếm khoảng 70% chiều ngang
- Nhân vật bên trái rõ mặt
- Header không che mặt

### Mobile

- Header logo nhỏ hơn
- Số điện thoại vẫn hiện rõ
- Hero chuyển sang bố cục dọc
- Xe và nhân vật không bị cắt mặt
- CTA gọi điện nổi dưới cùng hoặc nằm ngay dưới hero

Mobile call button:

```css
.mobile-call-fab {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 18px;
  z-index: 80;
}
```

---

## 14. Quy chuẩn thẩm mỹ

Màu chủ đạo:

```txt
Black: #050505
Graphite: #111111
Orange: #ff6a2a
Red: #ef2b1d
Gold light: #ffd19a
White: #ffffff
```

Không dùng màu quá loè loẹt.

Hiệu ứng phải có cảm giác:

- Sang
- Mạnh
- Mượt
- Đắt tiền
- Giống quảng cáo xe hơi cao cấp

Không dùng animation kiểu game/cartoon.

---

## 15. Cấu trúc component đề xuất

```txt
src/
  components/
    Header.tsx
    HeroIntro.tsx
    PhoneCTA.tsx
    LightRibbons.tsx
    WheelSpin.tsx
  styles/
    hero.css
  App.tsx
  main.tsx
```

---

## 16. Header component yêu cầu

```tsx
export function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-5 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/35 px-5 py-3 backdrop-blur-xl">
        <img
          src="/assets/logo-48auto.png"
          alt="48.AUTO"
          className="h-9 w-auto object-contain drop-shadow-[0_0_16px_rgba(255,106,42,.45)]"
        />

        <a
          href="tel:0334896628"
          className="rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold tracking-wide text-white shadow-[0_0_24px_rgba(255,106,42,.18)] transition hover:bg-orange-500/20 hover:shadow-[0_0_34px_rgba(255,106,42,.38)]"
        >
          033.489.6628
        </a>
      </div>
    </header>
  );
}
```

---

## 17. HeroIntro component demo

```tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroIntro() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-bg",
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }
      )
        .fromTo(
          ".person-layer",
          { opacity: 0, x: -48, filter: "blur(8px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out"
          },
          "-=0.45"
        )
        .fromTo(
          ".car-layer",
          { x: "55vw", scale: 1.03, filter: "blur(5px)" },
          {
            x: "0vw",
            scale: 1,
            filter: "blur(0px)",
            duration: 1.65,
            ease: "expo.out"
          },
          "-=0.55"
        )
        .fromTo(
          ".hero-copy",
          { opacity: 0, y: 28, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power3.out"
          },
          "-=0.3"
        );

      gsap.to(".wheel-spin", {
        rotate: 360,
        duration: 0.42,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".phone-pulse", {
        scale: 1.045,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut"
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen overflow-hidden bg-[#050505] text-white"
    >
      <div className="hero-bg absolute inset-0">
        <img
          src="/assets/hero-final.png"
          alt="48.AUTO cinematic showroom"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-black/25" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(255,106,42,.12),transparent_38%)]" />

      <div className="light-ribbon ribbon-1" />
      <div className="light-ribbon ribbon-2" />
      <div className="light-ribbon ribbon-3" />
      <div className="rear-speed-glow" />

      <div className="wheel-spin front-wheel-fake" />
      <div className="wheel-spin rear-wheel-fake" />

      <div className="hero-copy absolute right-[7vw] top-[22vh] z-20 max-w-[420px] text-right max-lg:bottom-28 max-lg:left-5 max-lg:right-5 max-lg:top-auto max-lg:text-left">
        <p className="mb-3 text-xs font-bold tracking-[.38em] text-orange-300">
          PREMIUM CAR DEALER
        </p>

        <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
          48.AUTO
        </h1>

        <p className="mt-4 text-base leading-7 text-white/72 md:text-lg">
          Muscle Cars. Luxury Showroom. One Touch Call.
        </p>

        <a
          href="tel:0334896628"
          className="phone-pulse mt-7 inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_35px_rgba(255,106,42,.42)] transition hover:bg-orange-400"
        >
          Gọi ngay 033.489.6628
        </a>
      </div>
    </section>
  );
}
```

Lưu ý:

Nếu dùng `hero-final.png` là ảnh đã ghép sẵn thì `.person-layer` và `.car-layer` chỉ là ý tưởng cho bản đã tách layer. Ở demo nhanh, chỉ cần dùng ảnh nền đầy đủ và thêm overlay bánh xe, ánh sáng, glow, camera zoom là được.

---

## 18. CSS hiệu ứng bắt buộc

```css
.light-ribbon {
  position: absolute;
  z-index: 12;
  height: 2px;
  width: 42vw;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 117, 38, .15),
    rgba(255, 240, 210, .75),
    rgba(255, 73, 29, .35),
    transparent
  );
  filter: blur(.5px);
  mix-blend-mode: screen;
  opacity: .75;
  transform: skewX(-14deg);
  animation: ribbonFloat 3.8s ease-in-out infinite;
}

.ribbon-1 {
  top: 36%;
  right: -18%;
  animation-delay: 0s;
}

.ribbon-2 {
  top: 47%;
  right: -24%;
  animation-delay: .7s;
  opacity: .55;
}

.ribbon-3 {
  top: 61%;
  right: -20%;
  animation-delay: 1.4s;
  opacity: .38;
}

@keyframes ribbonFloat {
  0% {
    transform: translateX(12vw) skewX(-14deg);
    opacity: 0;
  }

  18% {
    opacity: .8;
  }

  55% {
    opacity: .55;
  }

  100% {
    transform: translateX(-115vw) skewX(-14deg);
    opacity: 0;
  }
}

.wheel-spin {
  position: absolute;
  z-index: 13;
  border-radius: 999px;
  pointer-events: none;
  background:
    conic-gradient(
      from 0deg,
      rgba(255,255,255,.0),
      rgba(255,255,255,.26),
      rgba(255,255,255,.0),
      rgba(255,80,20,.32),
      rgba(255,255,255,.0)
    );
  mix-blend-mode: screen;
  filter: blur(1px);
  opacity: .7;
  animation: wheelRotate .42s linear infinite;
}

.front-wheel-fake {
  width: 13vw;
  height: 13vw;
  left: 50.5%;
  top: 57%;
}

.rear-wheel-fake {
  width: 11.5vw;
  height: 11.5vw;
  left: 82%;
  top: 56.5%;
}

@keyframes wheelRotate {
  to {
    transform: rotate(360deg);
  }
}

.rear-speed-glow {
  position: absolute;
  z-index: 11;
  right: -8vw;
  bottom: 13%;
  width: 44vw;
  height: 28vh;
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 111, 43, .22), transparent 52%),
    radial-gradient(circle at 60% 45%, rgba(255, 255, 255, .12), transparent 60%);
  filter: blur(18px);
  mix-blend-mode: screen;
  opacity: .75;
  animation: smokePulse 2.8s ease-in-out infinite;
}

@keyframes smokePulse {
  0%, 100% {
    transform: translateX(0) scale(1);
    opacity: .45;
  }

  50% {
    transform: translateX(-2vw) scale(1.08);
    opacity: .82;
  }
}

@media (max-width: 768px) {
  .front-wheel-fake {
    width: 18vw;
    height: 18vw;
    left: 48%;
    top: 58%;
  }

  .rear-wheel-fake {
    width: 16vw;
    height: 16vw;
    left: 80%;
    top: 58%;
  }

  .light-ribbon {
    width: 70vw;
  }
}
```

---

## 19. Tiêu chí hoàn thành demo

Demo được coi là đạt khi:

- Header có logo 48.AUTO bên trái
- Header có số `033.489.6628` bên phải
- Bấm số điện thoại mở trình gọi thoại
- Hero full màn hình
- Ảnh showroom giữ cấu trúc như ảnh mẫu
- Có luồng sáng chạy qua thân xe
- Có hiệu ứng bánh xe xoay liên tục
- Có cảm giác xe vừa trượt tới rồi dừng lại
- Intro mượt, không giật
- Mobile không bị vỡ bố cục
- Code sạch, dễ nâng cấp thành landing page hoàn chỉnh

---

## 20. Hướng phát triển sau demo

Sau khi demo ổn, phát triển thêm:

1. Section giới thiệu showroom
2. Section xe nổi bật
3. Section dịch vụ mua bán/ký gửi xe
4. Gallery cinematic
5. Form liên hệ nhanh
6. Map showroom
7. Zalo / Facebook / Phone floating button
8. Hiệu ứng scroll reveal bằng GSAP ScrollTrigger
9. Tối ưu ảnh sang WebP/AVIF
10. Thêm video WebM làm hero nếu muốn intro thật hơn GIF

---

## 21. Ghi chú quan trọng cho Antigravity

Bản demo đầu tiên ưu tiên **cảm giác thị giác** hơn tính năng.

Hãy tập trung vào:

- Bố cục hero thật đẹp
- Chuyển động xe mượt
- Bánh xe xoay liên tục
- Luồng sáng phấp phới
- Header sang trọng
- CTA gọi điện một chạm
- Không làm giao diện rối
- Không thêm quá nhiều text che mất xe

Nếu chưa có layer tách riêng, hãy dùng `hero-final.png` làm nền chính và tạo hiệu ứng overlay bằng CSS/GSAP.

Nếu có layer tách riêng, hãy animate theo thứ tự:

```txt
background -> person -> car -> wheel -> light streak -> hero text -> CTA
```
