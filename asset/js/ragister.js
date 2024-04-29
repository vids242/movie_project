const hendalRagisterForm = async () => {
    const fname = document.getElementById("fname").value
    const age = document.getElementById("age").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const profile_pic = document.getElementById("profile_pic").value

    let profile_data = profile_pic.split("\\")

    const obj = {
        fname: fname,
        age,
        email,
        password,
        profile_pic: 'users/' + profile_data[profile_data.length - 1],
        "status": "pending",
        createAt: new Date().toString(),
        updateAt: new Date().toString()
    }

    //   fetch("http://localhost:3000/user", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(obj)
    // })
    // .then(async(responses) => await responses.json())
    // .then((data) => console.log(data))
    // .catch((error) => console.log(error.message))


    const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    })
    const data = await response.json();
    console.log(data);

}

const RagisterForm = document.getElementById("RagisterForm")
RagisterForm.addEventListener("submit", hendalRagisterForm)
