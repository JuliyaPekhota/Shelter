const burger = document.querySelector(".header__burger");
const navigation = document.querySelector(".navigation");
const body = document.body;

const burgerHandler = (event) => {
    const wrapMenu = document.querySelector(".underlay__burger") ? document.querySelector(".underlay__burger").remove() : document.createElement("div");

    event.preventDefault();

    navigation.classList.toggle("open");
    burger.classList.toggle("active");
    body.classList.toggle("noscroll");
    
    if (wrapMenu) {
        body.appendChild(wrapMenu);
        wrapMenu.classList.add("underlay__burger");
    }
}

burger.addEventListener("click", burgerHandler);

const handlerOnClose = () => {
    const wrapMenu = document.querySelector(".underlay__burger");

    navigation.classList.remove("open");
    burger.classList.remove("active");
    body.classList.remove("noscroll");
    wrapMenu.remove();
}

const links = Array.from(navigation.children);
links.forEach((link) => {
    link.addEventListener("click", function(e) {
        handlerOnClose();

        const isInternalLink = link.querySelector('a[href^="#"]').getAttribute("href") || null;

        if (!isInternalLink) {
            return;
        }
        
        e.preventDefault();
        setTimeout(() => {
            document.querySelector(link.querySelector('a[href^="#"]').getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        }, 300);
    });
});

window.addEventListener("click", (event) => {
    if (event.target === document.querySelector(".underlay__burger")) {
        handlerOnClose();
    }
});

/*
console.log('1. Вёрстка страницы Main соответствует макету при ширине экрана 1280px (14 / 14)\n2. Вёрстка страницы Main соответствует макету при ширине экрана 768px (14 / 14)\n3. Вёрстка страницы Main соответствует макету при ширине экрана 320px (14 / 14)\n4. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется (20 / 20)\n5. Верстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (8 / 8)\n6. При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню (4 / 4)\n7. Верстка обеих страниц валидная: для проверки валидности вёрстки используйте сервис (8 / 8)');
*/