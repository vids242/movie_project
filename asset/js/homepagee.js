const movie = async () => {
    const response = await fetch("http://localhost:3000/movie");
    let data = await response.json();

    // const moviedata = data.filter((obj, i, self) =>
    // i === self.findIndex((o) => o.name === obj.name))

    let print = '';

    data.map((v) => {
        print += `<div class="movieCard col-3">
        <div class="movie_name">${v.movie_name}</div>
        <img id="movieImage" src="${v.movie_pic}" alt="${v.name}"/>
        <p>${v.description}</p>
        <p>${v.movie_status}</p>
      
        </div>`

    })

    // const movieCard = data.filter((obj, i, self) =>
    //     i === self.findIndex((o) => o.name === obj.name))

    // console.log(movieCard);

    document.getElementById("movie-slide").innerHTML = print


}

const cinema = async () => {

    const cinemaRsponse = await fetch("http://localhost:3000/cinema");
    let cinema_data = await cinemaRsponse.json()

    let print = '';

    // <li class="card">
    //     <div class="img"><img src="asset/img/drworld.jpg" alt="img" draggable="false"></div>
    //     <h2>DR WORLD</h2>
    //     <span>Sales Manager</span>
    // </li>
    `
    <li class="card">
    //     <div class="img"><img src="asset/img/drworld.jpg" alt="img" draggable="false"></div>
    //     <h2>DR WORLD</h2>
    //     <span>Sales Manager</span>
    // </li>
    `

    cinema_data.map((v) => {
        print += `
        <li class="card" >
        <a onclick="handelcinema_movie('${v.id}')">
        <h2>${v.cinema_name}</h2>
                <div class="img">
                <img id="cinemaImage" src="${v.image}" alt="${v.name}" draggable="false" >
                </div>
               
                
                <span>${v.address}</span>
                <span>${v.phoneNumber}</span>
                <span>${v.email}</span>
                <span>${v.status}</span>
               
                </li></a>`;

    });
    document.getElementById("cinema_slider").innerHTML = print

}

const handelcinema_movie = (id) => {
    // console.log("hkijij", id);

    localStorage.setItem("cinema_id", id);

    window.location.href = "http://127.0.0.1:5500/Home_Cinema.html";
}

window.onload = () => {
    movie()
    cinema()
}



// --------------------------------------------------
// homepage.js

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

// const autoPlay = () => {
//     if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
//     // Autoplay the carousel after every 2500 ms
//     timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
// }
// autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);