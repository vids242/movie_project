const hendalCinemaOption = async () => {
    try {
        const response = await fetch("http://localhost:3000/cinema")
        const data = await response.json();

        let print = '';
        print += `<option value="0">--Select Cinema--</option>`

        data.map((v) => {
            print += `<option value=${v.id}>${v.cinema_name}</option>`
        })

        document.getElementById("cinema_option").innerHTML = print
    } catch (error) {
        console.log(error.message);
    }
}
const hendalMovieChange = async () => {
    let cinema_option = document.getElementById("cinema_option").value;

    const response = await fetch("http://localhost:3000/movie")
    const data = await response.json();

    let fdata = data.filter((v) => v.cinema_Id === cinema_option)

    let print = '';
    print += `<option value="0">--Select Movie--</option>`

    fdata.map((v) => {
        print += `<option value=${v.id}>${v.movie_name}</option>`
    })

    document.getElementById("movie_option").innerHTML = print

}
const displayMovieSelect = async () => {
    try {
        let response = await fetch("http://localhost:3000/movie");
        let data = await response.json()

        let print = `<option value="0">--Select Movie--</option>`

        data.map((v) => {
            print += `<option value=${v.id}>${v.movie_name}</option>`
        });

        document.getElementById("movie_option").innerHTML = print;

    } catch (error) {
        console.log(error);
    }
}


// -----------------time-----------------

const hendalADDtime = (event, value = "") => {

    event.preventDefault();

    const rNo = Math.floor(Math.random() * 1000)

    const divEle = document.createElement("div")
    divEle.setAttribute("id", "row-" + rNo)

    const InputEle = document.createElement("input")
    InputEle.setAttribute("type", "time")
    InputEle.setAttribute("name", "movie_time")
    InputEle.setAttribute("value", value)

    const addButton = document.createElement("button")
    addButton.setAttribute("onclick", "hendalADDtime(event)")
    const addButtonTxt = document.createTextNode("+")
    addButton.appendChild(addButtonTxt)


    divEle.appendChild(InputEle)
    divEle.appendChild(addButton)

    if (document.getElementById("allTime").children.length > 0) {
        const minusButton = document.createElement("button")
        minusButton.setAttribute("onclick", `hendalRemovetime(${rNo})`)
        const minusButtonTxt = document.createTextNode("-")
        minusButton.appendChild(minusButtonTxt)

        divEle.appendChild(minusButton)
    }

    const parentDiv = document.getElementById("allTime");
    parentDiv.appendChild(divEle);

}

const hendalRemovetime = (id) => {
    document.getElementById("row-" + id).remove()
}


// -----------edit&delet-------------

const handleDelete = async (id) => {
    try {
        await fetch("http://localhost:3000/time/" + id, {
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error.message);
    }

}

const handleEdit = async (id, event) => {

    try {
        const response = await fetch("http://localhost:3000/time")
        const data = await response.json();

        let timeData = data.find((v) => v.id === id);

        document.getElementById("id").value = timeData.id
        document.getElementById("cinema_option").value = timeData.cinema_id
        document.getElementById("movie_option").value = timeData.movie_id
        document.getElementById("date").value = timeData.date
        document.getElementById("allTime").value = timeData.time_data

        document.getElementById("allTime").innerHTML = "";
        for (let i = 0; i < timeData.time_data.length; i++) {
            hendalADDtime(event, timeData.time_data[i])
        }

    } catch (error) {
        console.log(error.message);
    }
}


// -------------submit--------------

const hendalSubmitForm = async () => {


    let id = document.getElementById("id").value
    const date = document.getElementById("date").value
    const cinema_id = document.getElementById("cinema_option").value;
    const movie_id = document.getElementById("movie_option").value;
    const times = document.getElementsByName("movie_time");
    const time_data = []

    for (let i = 0; i < times.length; i++) {
        time_data.push(times[i].value)
    }

    const obj = {
        cinema_id,
        movie_id,
        date,
        time_data,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
    }

    if (id) {
        await fetch("http://localhost:3000/time/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })
        // const data = await response.json()
    } else {
        await fetch("http://localhost:3000/time", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)

        })
    }
    
    displaytimeData();
}
const displaytimeData = async () => {

    let timeResponse = await fetch("http://localhost:3000/time", {
        method: 'GET'
    });
    let timeData = await timeResponse.json()

    let movieResponse = await fetch("http://localhost:3000/movie", {
        method: 'GET'
    });
    let movieData = await movieResponse.json()

    let cinemaResponse = await fetch("http://localhost:3000/cinema", {
        method: 'GET'
    });
    let cinemaData = await cinemaResponse.json()


    let print = ''
    print += '<table border="1">'
    print += '<tr> <th>cinema</th> <th>movie</th> <th>Date</th> <th>Time</th>  <th>Action</th> </tr>'

    let data2 = movieData.map((v1) => {
        return cinemaData.find((v) => v.id === v1.cinema_Id);
    })

    let data3 = timeData.map((v2) => {
        return movieData.find((v) => v.id === v2.movie_id)
    })



    timeData.map((v, i) => {
        print += '<tr>'
        print += `<td>${data2[i].cinema_name}</td>  <td>${data3[i].movie_name}</td> <td>${v.date}</td> <td>${v.time_data}</td> <td><i onclick="handleEdit('${v.id}',event)" class="fa-solid fa-square-pen"></i> <i onclick="handleDelete('${v.id}')" class="fa-solid fa-trash"></i></td>`
        print += '</tr>'
    })

    print += '</table>'

    document.getElementById("disp").innerHTML = print
}

const cinema_option = document.getElementById("cinema_option");
cinema_option.addEventListener("change", hendalMovieChange)

const bookingForm = document.getElementById("bookingForm");
bookingForm.addEventListener("submit", hendalSubmitForm)

window.onload = () => {
    hendalCinemaOption();
    displaytimeData()
    displayMovieSelect();
}