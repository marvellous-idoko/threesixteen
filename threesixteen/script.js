let scrollAnimatedElements = document.getElementsByClassName("scrollElements");

function nj(elem) {
  if (elem.getBoundingClientRect().y < 470) {
    elem.classList.add("animate");
  }
}

function searcher() {
  for (let index = 0; index < scrollAnimatedElements.length; index++) {
    nj(scrollAnimatedElements.item(index));
  }
}

// let scrolling = false;

// window.scroll = () => {

//     console.log('jhg')
// };
// function jfj(){
//     setInterval(() => {
//         if (scrolling) {
//             scrolling = false;
//             searcher();
//         }
//     },300);
// }

document.addEventListener(
  "scroll",
  (event) => {
    // handle scroll event
    // scrolling = true;
    searcher();
  },
  { passive: true }
);

// Slider Code

setInterval(() => {
  displayer();
}, 10000);
counter = 0
function displayer() {
  let y = document.getElementsByClassName("landingCont");
  for (let index = 0; index < y.length; index++) {
    y[index].classList.remove("active");
  }
  if (counter == y.length - 1) {
    y.item(counter).classList.add("active");
    counter = 0;
  } else {
    y.item(counter).classList.add("active");
    counter++;
  }
}
displayer();

function movR(elemId, width){
  document.getElementById(elemId).scrollLeft = parseInt(width)
}
function show(){
  document.getElementById('sidenav').style.display = 'block'
  document.getElementById('sidenav').style.opacity = '1'
}
function hide(){
  document.getElementById('sidenav').style.display = 'none'
  document.getElementById('sidenav').style.opacity = '0'

}
