const handleUpdate = async (id) => {

    const response = await fetch("http://localhost:3000/cinema/", {
        method: "GET",
    });
    const data = await response.json();

    const userData = data.find((v) => v.id === id);

    document.getElementById("id").value = userData.id;
    document.getElementById("movieName").value = userData.name;
    // document.getElementById("cinemaImage").value=userData.image ;
    document.getElementById("movieAddress").value = userData.address;
    document.getElementById("moviePhoneNumber").value = userData.phoneNumber;
    document.getElementById("movieEmail").value = userData.email;
    document.getElementById('status').value = userData.status;

    const imagePreview = document.getElementById('cinemaImagePreview');
    imagePreview.src = userData.image;

};

const handleDelete = async (id) => {
    try {
        await fetch("http://localhost:3000/cinema/" + id, {
            method: "DELETE",
        });

        displayCinemaData();
    } catch (error) {
        console.log(error);
    }
};

const handleImage = async () => {
    const updateImage = document.getElementById('movieImage').value;

    const imagePreview = document.getElementById('cinemaImagePreview');

    const src = imagePreview.src = updateImage;

    const arr = updateImage.split("\\");

    document.getElementById("cinemaImagePreview").src = "../asset/img/users/" + arr[arr.length - 1];

}

const handleCinemaAdda = async () => {

    const cinema_name = document.getElementById("movieName").value;
    const image = document.getElementById("cinemaImagePreview").src;
    const address = document.getElementById("movieAddress").value;
    const phoneNumber = document.getElementById("moviePhoneNumber").value;
    const email = document.getElementById("movieEmail").value;
    const id = document.getElementById("id").value;
    const status = document.getElementById('status').value;



    const Arr = image.split("\\");

    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();

    const obj = {
        cinema_name,
        image,
        address,
        phoneNumber,
        email,
        createdAt,
        updatedAt,
        status

    };

    try {
        if (id) {

            await fetch("http://localhost:3000/cinema/" + id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            })
            // const data = await response.json();

        } else {
            const response = await fetch("http://localhost:3000/cinema", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            // const data = await response.json();

        }

    } catch (error) {
        console.log(error.message);
    }
};

const displayCinemaData = async () => {
    try {
        const response = await fetch("http://localhost:3000/cinema", {
            method: "GET",
        });
        const cinemaData = await response.json();

        let print = "";

        print += `<table border="1"> <tr><th>Cinema Name</th><th>Cinema Image</th><th>Cinema Address</th><th>Cinema Phone Number</th><th>Cinema Email</th><th>Status</th><th>Actions</th></tr>`;

        cinemaData.map((v) => {
            print += `<tr><td>${v.cinema_name}</td><td><img src="${v.image}" height="70px" width="70px"></td><td>${v.address}</td><td>${v.phoneNumber}</td><td>${v.email}</td><td>${v.status}</td>`;
            print += `<td><i onclick="handleUpdate('${v.id}')" class="fa-solid fa-pen-to-square"></i>`;
            print += `<i onclick="handleDelete('${v.id}')" class="fa-solid fa-trash "></i></td></tr>`;
        });

        print += `</table>`;

        document.getElementById("moviedis").innerHTML = print;
    } catch (error) {
        console.log(error);
    }
};

const moviesadda = document.getElementById("moviesadda");
moviesadda.addEventListener("submit", handleCinemaAdda);

const movieImage = document.getElementById("movieImage");
movieImage.addEventListener("change", handleImage)
window.onload = () => {
    displayCinemaData();
};