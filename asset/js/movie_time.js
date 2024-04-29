const handelmovieTime = async() => {
    // console.log("bjj");

    let movie_id = localStorage.getItem("movie_id");

    const response = await fetch("http://localhost:3000/movie/"+ movie_id);
    let data = await response.json();

    // console.log(data);

    document.getElementById("disp").innerHTML=data.movie_name;
}

const handelMovie = async () => {
    // console.log("bjbj");

    const response = await fetch("http://localhost:3000/time");
    let data = await response.json();

    // console.log(data);
    let movie_id = localStorage.getItem("movie_id");

    let fdata = data.filter((v) => v.movie_id === movie_id);
    
    document.getElementById("endDate").value =fdata[0].date

    let print = "";

    fdata.map((v) => {
        let timeBoxes = '';

        print += `<div class="time">
        <p> <input type="date" id="bookDate"></p>`

        v.time_data.forEach(t => {
            timeBoxes += `<input class="btn" type="radio" name="timesMovie" id="${t}" value="${t}">
            <label for="${t}">${t}</label>`
        });

       print += timeBoxes;

        print += `<p><button onclick="handleTime()">Next</button></p>`;
        
        print += `</div>`
    })
    
    document.getElementById("time").innerHTML= print
    
}

const handleTime = async() => {
    event.preventDefault()
    let bookdate = document.getElementById("bookDate").value
    let dateAt = new Date(bookdate).toLocaleDateString()
    // console.log(bookdate);

    let endDate = document.getElementById("endDate").value
    // console.log(endDate);
    
    let user_time = document.querySelector(`input[name="timesMovie"]:checked`).value;
    console.log(user_time);

    const response = await fetch("http://localhost:3000/user")
    const data = await response.json();

    let flag = 0
    if (bookdate <= endDate) {
        console.log("Booking Done");
        localStorage.setItem("Selected_date",dateAt)
        localStorage.setItem("Selected_time",user_time)
        data.map((v)=> {
            if(v.status === 'active'){
                flag = 1
            } else {
                flag = 0
            }
        }) 
    } else {
        console.log("Movie closed");
    }
    

    if (flag === 1) {
        window.location.href="http://127.0.0.1:5500/time_seats.html"
    } else {
        window.location.href="http://127.0.0.1:5500/login.html"
        alert("login Fiirst");
    }

}
const hendalSubmit = () => {
    // console.log(date.value);
}

const hendalmovietime = document.getElementById("hendalmovietime")
hendalmovietime.addEventListener("submit",hendalSubmit())
window.onload =() => {
    handelmovieTime()
    handelMovie()
}