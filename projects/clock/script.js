const checkboxes = document.querySelectorAll(".tasks input");
const petals = document.querySelectorAll(".petal");
const flower = document.querySelector(".flower");
const ground = document.querySelector(".ground");

const animations = [];

const timedPetals = [];

function dropPetal(number) {
  const petal = petals[number];

  const flowerPosition = flower.getBoundingClientRect();
  const groundPosition = ground.getBoundingClientRect();

  const centerY =
    flowerPosition.top + flowerPosition.height / 2;

  const landingY =
    groundPosition.top + groundPosition.height / 2;

  const drop = landingY - centerY;

  const drift =
    (number - 4.5) * flowerPosition.width * 0.07;

  const start = getComputedStyle(petal).transform;

  animations[number] = petal.animate(
    [
      {
        transform: start
      },
      {
        transform:
          "translate(" + drift + "px, " + drop + "px) " +
          "scale(0.6, 0.22)"
      }
    ],
    {
      duration: 1600,
      easing: "ease-in",
      fill: "forwards"
    }
  );
}

function updateFlower() {
  petals.forEach(function (petal, number) {

    const taskNumber = Math.floor(number / 2);

    const shouldFall =
      checkboxes[taskNumber].checked ||
      timedPetals.includes(number);

    if (shouldFall && !animations[number]) {
      dropPetal(number);
    }

    if (!shouldFall && animations[number]) {
      animations[number].cancel();
      animations[number] = null;
    }

  });
}
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", updateFlower);
});

setInterval(function () {

  for (let number = 0; number < petals.length; number++) {

    if (!animations[number]) {
      timedPetals.push(number);
      updateFlower();
      break;
    }

  }

}, 60 * 60 * 1000);

updateFlower();