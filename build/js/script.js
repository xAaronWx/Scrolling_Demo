$(function () {
  // This function is used to remove the cue indicator on the title page when scrolling down.
  let headerContent = document.querySelector(".header-content");
  let headerCue = document.querySelector(".header-cue");
  // This function is used to create a background in the nav bar after scrolling a certain distance - see the .site-nav.in-body CSS
  let nav = document.querySelector(".site-nav");
  let navHeight = nav.scrollHeight;
  let meetMonsters = document.querySelector("#meet");
  let monsterScroll = document.querySelectorAll("#monster-group .monster");

  monsterScroll.forEach(
    (item) => (item.style.animationDelay = `${Math.random() * 0.1 + 0.6}s`) // This acts as a time delay for the images to display on the site
  );

  function inViewPort(el) {
    let rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.bottom >= window.innerHeight && rect.top <= window.innerHeight) ||
      (rect.top >= 0 && rect.bottom <= window.innerHeight)
    );
  }

  function moveHeader() {
    let top = window.pageYOffset;

    let mainOnTop = meetMonsters.getBoundingClientRect().top - navHeight;

    mainOnTop < 0
      ? nav.classList.add("in-body")
      : nav.classList.remove("in-body");

    let currentCuePosition = headerContent.getBoundingClientRect().top;

    currentCuePosition < 0
      ? headerCue.classList.add("d-none")
      : headerCue.classList.remove("d-none");
    headerContent.style.transform = `translateY(-${top / 1.5}px)`;

    headerContent.style.opacity =
      1 - Math.max(top / (window.innerHeight * 0.4), 0);
    monsterScroll.forEach((item) =>
      inViewPort(item)
        ? item.classList.add("appear")
        : item.classList.remove("appear")
    );

    window.requestAnimationFrame(moveHeader);
  }
  window.requestAnimationFrame(moveHeader);

  // Below scripts are to be used with the Scroll Magic plug-ins
  let controller = new ScrollMagic.Controller();
  // This helps control the animation
  let friendTextTween = TweenMax.from(".friend-text", {
    y: 400,
    opacity: 0,
    // duration: 2,
    // ease: "elastic.inOut",
  });

  new ScrollMagic.Scene({
    triggerElement: "#friend",
    duration: "100%",
    triggerHook: 0,
    // triggerHook: 0.5,
    // offset: 100,
  })
    .setTween(friendTextTween)
    .setPin("#friend")
    // .addIndicators({ name: "friends" })
    .addTo(controller);

  // New Animation for the parachute in the friend zone (Good example for new animations)
  let parachuteTween = new TimelineMax();
  parachuteTween
    .from("#parachute", {
      scale: 0.5,
      opacity: 0.25,
      rotation: -40,
      x: "100%",
      y: "-200%",
    })
    .to("#parachute", {
      x: "30%",
      y: "20%",
      rotation: -30,
    })
    .to("#parachute", {
      x: "-80%",
      y: "250%",
      rotation: 30,
    });

  new ScrollMagic.Scene({
    triggerElement: "#friend",
    duration: "170%",
    triggerHook: 0,
  })
    .setTween(parachuteTween)
    // This adds indicators to the webpage to see where your breaks are
    // .addIndicators({ name: "Parachute" })
    .addTo(controller);

  // Monster Types Animation
  let typesTween = new TimelineMax();
  typesTween.from("#types .col", {
    scale: 0.5,
    opacity: 0,
    stagger: 0.5,
  });
  new ScrollMagic.Scene({
    triggerElement: "#types",
    triggerHook: 0,
    duration: 300,
  })
    .setPin("#types")
    .setTween(typesTween)
    .addTo(controller);
}); //When page loads
