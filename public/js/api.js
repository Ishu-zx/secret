const apiUrl = 'http://localhost:3000'
const errorBox = document.querySelector('.error')
const errorTxt = document.querySelector('.error h3')
const errorBtn = document.querySelector('.error a')
const overlay = document.querySelector('.overlay')
const loginForm = document.querySelector('#loginForm')
const r = document.getElementById('r')

// REGISTER FORM
if(r){
    r.addEventListener('submit',async(e)=>{
        const name = document.querySelector('#name').value
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        e.preventDefault()
        const res = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, email, password })
        })
    
        const data = await res.json()
        console.log(data)
        if (res.ok) {
            window.location.href = 'http://localhost:3000/login'
        } else {
            overlay.style.display = 'block'
            errorBox.style.scale = '1'
            errorTxt.innerText = data.message
        }
    })
}
//error btn
errorBtn.addEventListener('click', () => {
    console.log('clicked')
    errorBox.style.scale = '0'
    overlay.style.display = 'none'
})

//login form
if(loginForm){
    loginForm.addEventListener('submit', async (e) => {
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        e.preventDefault()
        const res = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
    
        const data = await res.json()
        console.log(data)
        if (res.ok) {
            window.location.href = 'http://localhost:3000'
        } else {
            overlay.style.display = 'block'
            errorBox.style.scale = '1'
            errorTxt.innerText = data.message
        }
    })
}

// password functionality
const password = document.querySelector('#password');
document.querySelector('i').addEventListener('click',()=>{
    document.querySelector('i').classList.toggle('fa-eye-slash')
    if(password.type == 'password'){
        password.type = 'text'
    }else{
        password.type ='password'
    }

})