const displaycinama = async () => {
    // console.log("bjhi");

    try {
        let response = await fetch("http://localhost:3000/cinema")
        let data = await response.json();

        let print = '<option value="0">--select cinama--</option>';

        data.map((v) => {
            print += `<option value="${v.id}">${v.cinema_name}</option>`
        })
        // data.find ((v) => v.id === v.cinemaname);
        // console.log(data);


        document.getElementById("cinemaname").innerHTML = print
    } catch (error) {
        console.log(error.message);
    }

}

const displaymovie = async () => {
    // console.log("bjhi");

    try {
        let response = await fetch("http://localhost:3000/movie")
        let data = await response.json();

        let print = '<option value="0">--select movie--</option>';

        data.map((v) => {
            print += `<option value='${v.id}'>${v.movie_name}</option>`
        })

        // console.log(data);


        document.getElementById("moviedata").innerHTML = print
    } catch (error) {
        console.log(error.message);
    }

}

const handeldcinemadata = async () => {
    // console.log("nknk");

    let cinemaresponse = document.getElementById("cinemaname").value;
    // console.log(cinemaresponse);

    let movieresopnse = await fetch("http://localhost:3000/movie")
    let moviedta = await movieresopnse.json();

    // console.log(moviedta);

    let data = moviedta.filter((v) => v.cinema_Id === cinemaresponse);


    let print = '<option value="0">--select movie--</option>';

    data.map((v) => {
        print += `<option value="${v.id}">${v.movie_name}</option>`
    })



    document.getElementById("moviedata").innerHTML = print
}

const handeldtimedata = async () => {
    // console.log("nknk");

    try {
        const movieId = document.getElementById("moviedata").value;
        // console.log(movieId);

        let response = await fetch("http://localhost:3000/time");
        let data = await response.json();
        // console.log(data);

        const fdata = data.filter((v) => v.movie_id === movieId);
        // console.log(fdata);

        let print = '<option value="0">--select time--</option>';

        fdata[0].time_data.map((v) => {
            print += `<option value=${v}>${v}</option>`
        })

        document.getElementById("time").innerHTML = print;
    } catch (error) {
        console.log(error.message);
    }


}

const userdispaydata = async () => {

    // console.log("njnkj");
    try {
        let setResponse = await fetch("http://localhost:3000/seat");
        let setData = await setResponse.json();

        let movieResponse = await fetch("http://localhost:3000/movie");
        let movieData = await movieResponse.json();

        let cinemaResponse = await fetch("http://localhost:3000/cinema");
        let cinemaData = await cinemaResponse.json();

        // let timeResponse = await fetch("http://localhost:3000/time");
        // let time = await timeResponse.json();

        let print = "";

        print += '<table border = "1"><tr><th>Cinema Name</th><th>Movie Name</th><th>price</th><th>time</th> <th>seat</th><th>Action</th></tr>';

        setData.map((v) => {
            let cinemaname = cinemaData.find((cinema) => cinema.id === v.cinema_id)?.cinema_name || "Unknown Cinema";
            let moviename = movieData.find((movie) => movie.id === v.movie_id)?.movie_name || "Unknown Movie";

            print += `<tr><td>${cinemaname}</td><td>${moviename}</td><td>${v.price}</td><td>${v.time}</td><td>${v.seatObj[0].seat.length}</td><td><i class="fa-solid fa-pen-nib" onclick="handleEdit('${v.id}')"></i><i onclick="handleDelete('${v.id}')" class="fa-solid fa-trash"></i></td></tr>`;
        });

        document.getElementById("disp").innerHTML = print

    } catch (error) {
        console.log(error.message);
    }

}

const handleDelete = async (id) => {
    // console.log(id);

    try {
        await fetch("http://localhost:3000/seat/" + id, {
            method: "DELETE"
        })
    } catch (error) {
        console.log(error.message);
    }
}

const handleEdit = async (id) => {
    // console.log(id);

    let response = await fetch("http://localhost:3000/seat")
    let data = await response.json();

    let updata = data.find((v) => v.id === id);

    document.getElementById("id").value = updata.id;


    document.getElementById("cinemaname").value = updata.cinema_id;
    document.getElementById("moviedata").value = updata.movie_id;
    document.getElementById("setno").value = updata.seat.length;
    document.getElementById("price").value = updata.price;

    await handeldtimedata();
    document.getElementById("time").value = updata.time;

}

const handelAlldata = async () => {
    event.preventDefault()
    // console.log("kjk");

    let id = document.getElementById("id").value;
    // console.log(id);
    let cinema_id = document.getElementById("cinemaname").value;
    let movie_id = document.getElementById("moviedata").value;
    let price = document.getElementById("price").value;
    let time = document.getElementById("time").value;
    // console.log(time);
    let setno = document.getElementById("setno").value;
    let seat = Array.from({ length: parseInt(setno) }, () => 0);

    let response = await fetch("http://localhost:3000/time");
    let data = await response.json();

    let fdata = data.find((v) => v.cinema_id === cinema_id && v.movie_id === movie_id)


    const start_date = new Date(fdata.createdAt)
    const end_date = new Date(fdata.date)
    // console.log(start_date,end_date);

    let seatData = [];

    end_date.setDate(end_date.getDate() + 1)
    while (start_date <= end_date) {
        let Seatobj = {
            date: new Date(start_date).toLocaleDateString(),
            seat
        }

        seatData.push(Seatobj);

        start_date.setDate(start_date.getDate() + 1)
    }
    


    const obj = {
        cinema_id,
        movie_id,
        time,
        
        seatObj:seatData,
        price,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
    }

    if (id) {
        await fetch("http://localhost:3000/seat/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
        // const data = await response.json();
    } else {
        await fetch("http://localhost:3000/seat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
        // const data = await response.json();
    }

}

const setForm = document.getElementById("setForm");
setForm.addEventListener("submit", handelAlldata)

const cinemaname = document.getElementById("cinemaname");
cinemaname.addEventListener("change", handeldcinemadata)

const moviref = document.getElementById("moviedata");
moviref.addEventListener("change", handeldtimedata)

window.onload = () => {
    displaymovie()
    displaycinama()
    handeldtimedata()
    userdispaydata()
}