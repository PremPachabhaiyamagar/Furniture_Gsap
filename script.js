gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
// animate navbar title
// ScrollTrigger.create({
//   trigger: "#Title",
//   end: "bottom top",
//   ease: "expoScale(0.5,7,none)",
//   invalidateOnRefresh: true,
//   duration: 1,
//   scrub: 2,
//   animation: gsap.fromTo(
//     "#Title",
//     {
//       scale: 5.2,
//       y: -250,
//     },
//     { scale: 1, y: 0 }
//   ),
// });
const Headinganimation = gsap.fromTo(
  "#Title",
  { scale: 5.2, y: -250 },
  {
    scale: 1,
    duration: 1,
    y: 0,
  }
);

ScrollTrigger.create({
  trigger: "#Title",
  end: "bottom top",
  scrub: 2,
  invalidateOnRefresh: true,
  ease: "expoScale(0.5,7,none)",
  animation: Headinganimation,
});

// animate discover section
gsap.utils
  .toArray([".slide1", ".slide2", ".slide3", ".slide4"])
  .forEach((slide, _) => {
    gsap.to(slide, {
      y: 350,
      // duration: 1,
      autoAlpha: 1,
      ease: "ease",
      scrollTrigger: {
        trigger: slide,
        //   start: `top ${80 + index * 5}%`, //each slide starts at different scroll position
        markers: false,
        start: "top 40%",
        end: "top 50%",
        scrub: 2,
      },
    });
  });
// const discover_tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".slide",
//     start: "top 20%",
//     scrub: true,
//     ease: "ease",
//   },
// });

// discover_tl.to(".slide1", {
//   y: 350,
// });
// discover_tl.to(".slide2", {
//   y: 350,
// });
// discover_tl.to(".slide3", {
//   y: 350,
// });
// discover_tl.to(".slide4", {
//   y: 350,
// });

// animate image section
ScrollTrigger.create({
  trigger: "#image-wrapper > .container",
  start: "top top ",
  end: "bottom bottom",
  pin: true,
  pinSpacing: false,
  scrub: 2,
  animation: gsap.to(".cover > img", {
    clipPath: "circle(100% at 50% 50%)",
    duration: 2,
  }),
  onEnter: () => {
    document.body.classList.add("animateBackground");
  },
  onEnterBack: () => {
    document.body.classList.add("animateBackground");
  },
  onLeaveBack: () => {
    document.body.classList.remove("animateBackground");
  },
  onLeave: () => {
    document.body.classList.remove("animateBackground");
  },
});

let mm = gsap.matchMedia();

mm.add("(min-width: 600px)", () => {
  const contents = gsap.utils.toArray(".ContentSection").slice(1);
  const photos = gsap.utils.toArray(".photo").slice(1);
  ScrollTrigger.create({
    trigger: ".gallery",
    start: "top top",
    end: "bottom bottom",
    pin: ".right",
  });

  gsap.set(photos, { yPercent: 100, autoAlpha: 0 });
  contents.forEach((item, index) => {
    const text = item.querySelector("h1");
    const animation = gsap.timeline().to(photos[index], {
      yPercent: 0,
      autoAlpha: 1,
    });
    ScrollTrigger.create({
      trigger: text,
      start: "top 70%",
      end: "bottom 50%",
      animation: animation,
      scrub: 2,
    });
  });
});
// animate image section
const boxes = gsap.utils.toArray(".box");
boxes.forEach((box) => {
  const animation = gsap.from(box, {
    y: 500,
    duration: 0.5,
    ease: "power3.out",
  });
  ScrollTrigger.create({
    trigger: box,
    scrub: 2,
    start: `top bottom`,
    end: "bottom top",
    markers: false,
    animation: animation,
  });
});

// aniamate heading section
const heading = document.querySelector("#furniture-section  h1");
const sections = gsap.utils.toArray(".grid-wrapper");

const heading_tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#furniture-section > .container",
    start: "top 50%",
    end: "top 50%",
    ease: "ease",
    scrub: 2,
    markers: true,
    onEnter: () => {
      gsap.set(heading, { position: "fixed", bottom: 0, zIndex: -1 });
    },
    onEnterBack: () => {
      gsap.set(heading, { position: "relative", bottom: 0 });
    },
  },
});

sections.forEach((section, index) => {
  ScrollTrigger.create({
    trigger: section,
    start: "bottom-=20% bottom",
    end: "bottom top",
    onEnter: () => {
      updateHeading(index);
      if (index === 0) {
        document.body.classList.remove("animateBackground");
      }
    },
    onEnterBack: () => {
      updateHeading(index);
      if (index === 0) {
        document.body.classList.add("animateBackground");
      }
    },
  });
});
function updateHeading(i) {
  const headingTexts = ["Furniture", "Decor", "Tech"];
  heading.textContent = headingTexts[i];
}
