const hendalLogin = async () => {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {
        const response = await fetch("http://localhost:3000/user")
        const data = await response.json();

        let flag = 0;
        data.map((v) => {
            if (email === v.email && password === v.password) {
                if(v.status === 'active'){
                    flag = 1
                } else {
                    flag = 0
                }
            } else {
                flag = 2
            }
        })
        if (flag === 1) {
            console.log("Login Succesfully");
            window.location.href='HomePage.html'
        } else if (flag === 2) {
            console.log("Invalide Email or Password");
        } else {
            console.log("Status Pending");
        }
        

    } catch (error) {
        console.log(error.message);
    }
}


const LoginForm = document.getElementById("LoginForm")
LoginForm.addEventListener("submit", hendalLogin)