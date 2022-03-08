$(function () {
  // This function is used to remove the cue indicator on the title page when scrolling down.
  let headerContent = document.querySelector(".header-content");
  let headerCue = document.querySelector(".header-cue");
  // This function is used to create a background in the nav bar after scrolling a certain distance - see the .site-nav.in-body CSS
  let nav = document.querySelector(".site-nav");
  let navHeight = nav.scrollHeight;
  let meetMonsters = document.querySelector("#meet");
  let monsterScroll = document.querySelectorAll("#monster-group .monster");

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
});
