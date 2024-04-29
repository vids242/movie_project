const handleUpdate = async (id) => {
    // let data = JSON.parse(obj)
    const response = await fetch("http://localhost:3000/user")
    const data = await response.json();

    let userData = data.find((v) => v.id === id)
    console.log(userData);

    document.getElementById("id").value = userData.id;
    document.getElementById("fname").value = userData.fname;
    document.getElementById("age").value = userData.age;
    document.getElementById("email").value = userData.email;
    document.getElementById("status").value = userData.status;
    document.getElementById("password").value = userData.password;


}
const hendalUser = async () => {
    const id = document.getElementById("id").value
    const status = document.getElementById("status").value


    try {
        let response = await fetch("http://localhost:3000/user");
        let data = await response.json();

        let userData = data.find((v) => v.id === id)

        let newData = { ...userData, status: status }

        await fetch("http://localhost:3000/user/" + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData)

        })
    } catch (error) {
        console.log(error.message);
    }

}

const hendalDelet = async (id) => {
    try {
        await fetch("http://localhost:3000/user/" + id, {
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error.message);
    }
}

const hendaldisplay = async () => {
    const response = await fetch("http://localhost:3000/user", {
        method: 'GET'
    })
    const data = await response.json()
    let print = '';

    print += `<table border="1"><tr><th>Name</th><th>Profile</th><th>Age</th><th>Email</th><th>Status</th><th>Action</th></tr>`

    data.map((v) => {
        print += `<tr><td>${v.fname}</td><td><img src='../asset/img/${v.profile_pic}'width=100px, height=100px /></td><td>${v.age}</td><td>${v.email}</td><td>${v.status}</td><td><i onclick = handleUpdate('${v.id}') class="fa-solid fa-pen"></i> <i onclick = "hendalDelet('${v.id}')" class="fa-solid fa-trash"></i></td>`
    })

    print += `</table>`

    document.getElementById("disp").innerHTML = print
}
window.onload = hendaldisplay

const UserForm = document.getElementById("UserForm")
UserForm.addEventListener("submit", hendalUser)