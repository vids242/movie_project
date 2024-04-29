const displayCinemaData = async () => {
    // console.log("gjh;n;hb");

    let cinema_id = localStorage.getItem("cinema_id");
    // console.log(cinema_id);

    let cinema_response = await fetch("http://localhost:3000/cinema/" + cinema_id);
    let cinema_data = await cinema_response.json()

    // console.log(cinema_data);

    document.getElementById("cinema-disp").innerHTML = `<h1>Welcome to: ${cinema_data.cinema_name}</h1>`;

    let movie_response = await fetch("http://localhost:3000/movie");
    let movie_data = await movie_response.json()

    // console.log(movie_data);

    let fData = movie_data.filter((v) => v.cinema_Id === cinema_id);
    console.log(fData);

    let print = '';

    const displayData = fData.map((v) => {
        print += `<div class="movie-data col-4">
        <a onclick="handleMovie('${v.id}')"> <img src = "${v.movie_pic}"> 
        <h2> ${v.movie_name} </h2>
        
        <h6> Description :  ${v.description} </h6> 
        <h6> Status : <p> ${v.movie_status} </p></h6>
        </a>
        </div>`

    });


    document.getElementById("movie-disp").innerHTML = print
}

const handleMovie = (id) => {
    localStorage.setItem("movie_id", id);

    window.location.href = "http://127.0.0.1:5500/movie_time.html"
}

window.onload = () => {
    displayCinemaData()

}