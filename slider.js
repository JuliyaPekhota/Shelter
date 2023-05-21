let position = 0;
const slidesToShow = 3;
const slidesToScroll = 3;
const container = document.querySelector(".slider__container");
const track = document.querySelector(".slider__track");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");

const itemWidth = container.clientWidth / slidesToShow; //330
const movePosition = slidesToScroll * itemWidth;

let allCards = [];
let currentCards = [];
let itemsLeftNext = false;

/*items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
});*/

btnPrev.addEventListener("click", () => {
    const itemsLeft = Math.abs(position) / itemWidth;


    position += movePosition + 90;
    //itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
   // checkButtons();
});

btnNext.addEventListener("click", () => {
    const items = document.querySelectorAll(".card");
    const itemsCount = items.length;

    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= movePosition + 90;

    if (!(itemsLeft >= slidesToScroll)) {
        updatedSlider();
    }

    setPosition();
    //checkButtons();
});

const setPosition = () => {
    //position = position === 0 ? position + 90 : position;

    track.style.transform = `translateX(${position}px)`;
};

const updatedSlider = () => {
    position -= movePosition + 90;
    const lastThreeValues = currentCards.slice(3);
    let newCards = [...lastThreeValues];

    newCards.map(() => {
        let currentId = getRandomNum();
        if (newCards.includes(currentId)) {
            while (newCards.includes(currentId)) {
                currentId = getRandomNum();
            }
            newCards.push(currentId);
            
        } else {
            newCards.push(currentId);
        }
    });

    currentCards = newCards;

    cardsDisplay(); 
    
    setPosition();
};

/*const checkButtons = () => {
    const itemsCount = 0;
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
};*/

const getRandomNum = () => Math.floor(Math.random() * (7 - 0 + 1)) + 0; // ( max - min + 1) + min)

const shuffle = (arr) => {
    let j, temp;
	for(let i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

const getCards = () => {
    const quotes = 'assets/pets.json';
      fetch(quotes)
        .then(res => res.json())
        .then(data => { 
            const array = shuffle(data).slice(0, 6);
            allCards = data;
            currentCards = array.map(card => card.id);
            cardsDisplay();
    });
}

const cardsDisplay = () => {
    const filterCards = allCards.filter(card =>
        currentCards.includes(card.id)
    );

    filterCards.forEach(card => {
        const cardDiv = document.createElement("div");
        track.appendChild(cardDiv);
        cardDiv.classList.add("card");

        const image = document.createElement("img");
        image.src = card.img;
        image.alt = `${card.type} ${card.name}`;
        cardDiv.appendChild(image);

        const name = document.createElement("p");
        const nameText = document.createTextNode(card.name);
        name.appendChild(nameText);
        cardDiv.appendChild(name);

        cardDiv.innerHTML += `<a class="button btnWhite" href="/">Learn more</a>`;

        //cardDiv.style.minWidth = `${itemWidth}px`;
    });
}

//checkButtons();
getCards();

