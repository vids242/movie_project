

const hendalseat = async () => {
    event.preventDefault
    let cinema_id = localStorage.getItem("cinema_id")
    let movie_id = localStorage.getItem("movie_id")
    let time = localStorage.getItem("Selected_time")
    let date = localStorage.getItem("Selected_date")
    // console.log(cinema_id,movie_id,time,date);

    let response = await fetch("http://localhost:3000/seat");
    let data = await response.json();


    let fdata = data.find((v) => v.time === time && v.cinema_id === cinema_id && v.movie_id === movie_id)
    // console.log(fdata);

    let sdata = fdata.seatObj.find((v) => v.date === date)
    // console.log(sdata);

    let print = ''
    let boxprint = ''


    let SeatData = sdata.seat.map((v, i) => {
        const status = v === 1 ? "disabled" : "active"
        if (status === 0) {
            print += `<button onclick="handleButton(${i},${fdata.price})" ${status}  id="seat-${i}" ${i + 1}</button>`
           
        } else {
            print += `<button onclick="handleButton(${i},${fdata.price})" ${status}  id="seat-${i}" >${i + 1}</button>`
        }
       
    })

    boxprint += `<button type="button" class="btn"  onclick="handleSuccess()">BOOK NOW</button>`


    document.getElementById("disp").innerHTML = print
    document.getElementById("disp3").innerHTML = boxprint;



}


let butArr = [];
let Allprice = 0;

const handleButton = async (i, price) => {
    // console.log(i);
    // event.preventDefault()

    if (butArr.includes(i)) {
        let index = butArr.findIndex((v) => v === i);
        butArr.splice(index, 1);
    } else {
        butArr.push(i);
    }

    localStorage.setItem("seats", JSON.stringify(butArr))




    if (butArr.some((v) => v === i)) {

        document.getElementById("seat-" + i).style.backgroundColor = "#1ea83c"
        document.getElementById("seat-" + i).style.color = "#fff"


    } else {
        document.getElementById("seat-" + i).style.backgroundColor = "#fff"
        document.getElementById("seat-" + i).style.color = "#1ea83c"
    }


    Allprice = butArr.length * price

    document.getElementById("price").innerHTML = Allprice
}

const handleSuccess = async () => {

    if (butArr.length !== 0) {
        alert("Your seat is Booked");
        window.location.href="http://127.0.0.1:5500/success.html"

    } else {
        alert("Please select any seat");
    }


    let cinema_id = localStorage.getItem("cinema_id");
    let movie_id = localStorage.getItem("movie_id");
    let time = localStorage.getItem("Selected_time");
    let date = localStorage.getItem("Selected_date");


    //console.log(cinema_id, movie_id , date);

    const response = await fetch("http://localhost:3000/seat");
    let data = await response.json();
    // console.log(data);

    let obj = data.find((v) => v.cinema_id === cinema_id && v.movie_id === movie_id && v.time === time);
    
    // console.log(obj);

    const seatdata = obj.seatObj.find((v) => v.date === date);
    // console.log(seatdata);

    seatdata.seat.map((v, i) => {
        if (butArr.includes(i)) {
            seatdata.seat[i] = 1;    
        };

    });
    

    if (seatdata) {
        const response = await fetch("http://localhost:3000/seat/" + obj.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
        const data = await response.json();
        // console.log(data);
    }

}








window.onload = () => {
    hendalseat()
}