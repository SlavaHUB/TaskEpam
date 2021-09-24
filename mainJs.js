let form = document.getElementById("mainForm");
let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regexName = /^[a-zA-Z0-9]+$/;
let regexLastName = /^[a-z ,.'-]+$/i;

function checkerEmail() { 
    if((form['email'].value).match(regexEmail) == null)
        alert('Во вводе email допущена ошибка');
}

function checkerName(){
    if((form['name'].value).match(regexName) == null)
        alert('Во вводе имени допущена ошибка');
}

function checkerLastName(){
    if((form['lastname'].value).match(regexLastName) == null){
        alert('Во вводе фамилии допущена ошибка');
    }
}

document.getElementById("sendBytton").addEventListener("click", async function(event){
    event.preventDefault();

    let data = {
        name: form['name'].value,
        lastname: form['lastname'].value,
        email: form['email'].value
    };

    checkerEmail();
    checkerName();
    checkerLastName();
    console.log(data);
    
    try {
        let response = await fetch('http://localhost:1000/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    
        let result = JSON.parse(await response.text());
        console.log(result);
        form.reset();
        alert('Регистрация успешно завершена.');
    } catch {
        alert('Сервер не отвечает, попробуйте позже.');
    }
});