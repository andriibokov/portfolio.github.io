
// Плавный склолл для меню
const menu = document.querySelector(".menu");

menu.onclick = function(event){

    event.preventDefault();

    let elem = event.target;

    let link = elem.closest(".menu__link");

    let coord,topBox,Box;
    
    if(link.getAttribute("href") == "#carousel"){

        Box = document.querySelector("#carousel");

        scroll(Box);
    };

    if(link.getAttribute("href") == "#specific"){

        Box = document.querySelector("#specific");

        scroll(Box);
    };

    if(link.getAttribute("href") == "#dignity"){

        Box = document.querySelector("#dignity");

        scroll(Box);
    };
};

function scroll(Box){

    coord = Box.getBoundingClientRect();

    topBox =coord.top;

    return window.scrollBy({

        top: topBox,

        behavior: 'smooth'   //плавный скролл
    });
};

//настройка  slick

$(document).ready(function(){

    $('.container__slick').slick({

        slidesToShow: 1,

        slidesToScroll: 1,

        autoplay: true,

        pauseOnDotsHover:true,

        autoplaySpeed: 6000,

        speed:600,

        nextArrow:'<svg class="slick-arrow slick-next" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" transform="rotate(-90,20,20)" /><path d="M18,10 l10,10 -10,10" /></svg>',

        prevArrow:'<svg class="slick-arrow slick-prev" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" /><path d="M22,10 l-10,10 10,10" /></svg>',

    });

});

//Акардион характеристик
specific.onclick = function(event){

    let elem = event.target;
    
    if(!elem.closest('.specifications__title')) return;
    
    let nextElem =  elem.closest('.specifications__title').nextElementSibling;
    
    nextElem.classList.toggle("opacity");
    
    if(nextElem.classList.contains("opacity")){
    
        fadeIn(nextElem)
        
    } else{
        
        fadeOut(nextElem)
    
    }
}

function fadeOut(el) {
    
    var opacity = 1;

    var timer = setInterval(function() {
    
        if(opacity <= 0.1) {
        
            clearInterval(timer);
            el.style.display = "none";
    
        }
    
        el.style.opacity = opacity;
    
        opacity -= opacity * 0.1;
    
    }, 10);

}

function fadeIn(el) {

    var opacity = 0.01;

    el.style.display = "block";

    var timer = setInterval(function() {
    
        if(opacity >= 1) {
            
            clearInterval(timer);
        
        }
        
        el.style.opacity = opacity;
    
        opacity += opacity * 0.1;
    
    }, 10);
    
    }

