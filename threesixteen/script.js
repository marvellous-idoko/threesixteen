let scrollAnimatedElements = document.getElementsByClassName('scrollElements')

function nj(elem){
    console.log(elem.getBoundingClientRect().y)
    if(elem.getBoundingClientRect().y < 450 ){
        elem.classList.add('animate')
     }

}

function searcher(){

    for (let index = 0; index < scrollAnimatedElements.length; index++) {
        nj(scrollAnimatedElements.item(index) );
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
    'scroll',
    (event) => {
        // handle scroll event
        // scrolling = true;
        searcher()
    }, 
    { passive: true }
);