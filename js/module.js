export const getTime = (minute) => {
    const hours = Math.floor(minute / 60);
    const days = Math.floor(hours / 24);
  
    const time = days || hours || minute;
    const unitIndex = [days, hours, minute].lastIndexOf(time);
    const timeUnit = ["days", "hours", "minutes"][unitIndex];
  
    return { time, timeUnit };
  };
 export function RoundOff(value) {
    return Number(value.toFixed(2));
  }

 export function adjustCardHeightSlider() {
    const cards = document.querySelectorAll(
      ".swiper-slide .card .food-details .food-name"
    );
    let maxHeight = 0;
  
    cards.forEach((card) => {
      card.style.height = ""; // Reset card height to auto
      maxHeight = Math.max(maxHeight, card.offsetHeight);
    });
  
    cards.forEach((card) => {
      card.style.height = maxHeight + "px";
    });
  }
  
  export function adjustCardHeight() {
    const cards = document.querySelectorAll(
      ".tab-content .card .food-details .food-name"
    );
    let maxHeight = 0;
  
    cards.forEach((card) => {
      card.style.height = ""; // Reset card height to auto
      maxHeight = Math.max(maxHeight, card.offsetHeight);
    });
  
    cards.forEach((card) => {
      card.style.height = maxHeight + "px";
    });
  }

  export function adjustCardHeightRecipes() {
    const cards = document.querySelectorAll(
      ".card .food-details .food-name"
    );
    let maxHeight = 0;
  
    cards.forEach((card) => {
      card.style.height = ""; // Reset card height to auto
      maxHeight = Math.max(maxHeight, card.offsetHeight);
    });
  
    cards.forEach((card) => {
      card.style.height = maxHeight + "px";
    });
  }