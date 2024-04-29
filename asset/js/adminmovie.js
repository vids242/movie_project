const handleMovieRegister = async () => {

    let movie_name = document.getElementById("movie_name").value;
    let movie_pic = document.getElementById("movie_img").src;
    let description = document.getElementById("description").value;
    let movie_status = document.getElementById("movie_status").value;
    let cinema_Id = document.getElementById("movie_cinema").value;
    let id = document.getElementById("id").value;


    let obj = {
        movie_name,
        movie_status,
        movie_pic,
        description,
        cinema_Id,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
    }


    if (id) {
        await fetch("http://localhost:3000/movie/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })
        // const data = await response.json()
    } else {
        await fetch("http://localhost:3000/movie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)

        })
        // const data = await response.json()
    }

    displayMovieData()
}
const cinemaOption = async () => {
    const response = await fetch("http://localhost:3000/cinema");
    const data = await response.json()

    let print = `<option value=0>--select cinema--</option>`

    data.map((v) => {
        print += `<option value=${v.id}>${v.cinema_name}</option>`

    })

    document.getElementById("movie_cinema").innerHTML = print
}
const displayMovieData = async () => {

    let response = await fetch("http://localhost:3000/movie", {
        method: 'GET'
    });
    let data = await response.json()

    const response1 = await fetch("http://localhost:3000/cinema");
    const data1 = await response1.json();
    let data2 = data.map((v1) => {
        return data1.find((v) => v.id === v1.cinema_Id);
    });


    let print = ''
    print += '<table border="1">'
    print += '<tr> <th>Name</th> <th>Image</th> <th>Description</th> <th>Status</th> <th>Cinema</th>  <th>Action</th> </tr>'

    data.map((v,i) => {
        print += '<tr>'
        print += `<td>${v.movie_name}</td> <td><img src="${v.movie_pic}" width="50px" height="50px"></td> <td>${v.description}</td> <td>${v.movie_status}</td> <td>${data2[i].cinema_name}</td> <td><i onclick="handleEdit('${v.id}')" class="fa-solid fa-square-pen"></i> <i onclick="handleDelete('${v.id}')" class="fa-solid fa-trash"></i></td>`
        print += '</tr>'
    })

    print += '</table>'

    document.getElementById("disp").innerHTML = print
}

const handleEdit = async (id) => {

    try {
        const response = await fetch("http://localhost:3000/movie")
        const data = await response.json();

        let movieData = data.find((v) => v.id === id);

        document.getElementById("id").value = movieData.id;
        document.getElementById("movie_name").value = movieData.movie_name;
        document.getElementById("description").value = movieData.description;
        document.getElementById("movie_status").value = movieData.movie_status;
        document.getElementById("movie_cinema").value = movieData.cinema_Id;

        let movie_img = document.getElementById("movie_img");
        movie_img.src = (movieData.movie_pic);

    } catch (error) {
        console.log(error);
    }

}

const handleDelete = async (id) => {

    // const id = document.getElementById("id").value;

    try {
        let response = await fetch("http://localhost:3000/movie/" + id, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error.message);
    }
}

const handleMovieImg = async () => {

    const movie_pic = document.getElementById('movie_pic').value;

    const movie_img = document.getElementById('movie_img');

    const src = movie_img.src = movie_pic;

    const arr = movie_pic.split("\\");

    document.getElementById("movie_img").src = "../asset/img/movie/" + arr[arr.length - 1];

}

const movieForm = document.getElementById("movieForm");
movieForm.addEventListener("submit", handleMovieRegister)

const movie_pic = document.getElementById("movie_pic");
movie_pic.addEventListener("change", handleMovieImg)

window.onload = () => {
    cinemaOption();
    displayMovieData()
} 
