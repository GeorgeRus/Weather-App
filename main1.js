const input = document.querySelector('.input_text');
const main = document.querySelector('#name');
const temp = document.querySelector('.temp');
const description = document.querySelector('.desc');
const clouds = document.querySelector('.clouds');
const button= document.querySelector('.submit');
const buttonFahrenheit = document.querySelector('#tempF');
const buttonCelsius = document.querySelector('#tempC');
const tempButtons = document.querySelectorAll('input[type=radio]');
const myKey = '50a7aa80fa492fa92e874d23ad061374';

window.onload = function(){
    this.rememberLocalStorageItems();
    this.rememberCookies();
}

button.addEventListener('click', getTemperature);
tempButtons.forEach(button => button.addEventListener('click', setCookie));


function getTemperature(){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${myKey}`)
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(() => alert(("Wrong city name!")));
}

function displayData(data){
    let tempValue = ((data['main']['temp'] *9/5) - 459.67).toFixed(2) + " F";
    setToLocalStorage('Temperature', buttonFahrenheit.value);

    if(buttonCelsius.checked){
        tempValue = (data['main']['temp'] -273.15).toFixed(2) + " C";
        setToLocalStorage('Temperature', buttonCelsius.value);
    }

    const nameValue = data['name'];
    const descValue = data['weather'][0]['description'];
    main.innerHTML = nameValue;
    description.innerHTML = 'Descripton: '+ descValue;
    temp.innerHTML = 'Temperature: '+ tempValue;
    input.value = '';
}

function setToLocalStorage(item, itemValue){
    localStorage.setItem(item, itemValue);
}

function setCookie(){
    document.cookie = `Temperature=${this.value}; expires= Wed, 5 Oct 2050 00:00:00 GMT`;
}

function rememberLocalStorageItems(){
    if(buttonCelsius.checked == false && localStorage.getItem("Temperature") == buttonCelsius.value){
        buttonCelsius.checked = !buttonCelsius.checked;
    };

    if(buttonFahrenheit.checked == false && localStorage.getItem("Temperature") == buttonFahrenheit.value){
        buttonFahrenheit.checked = !buttonFahrenheit.checked;
    }
}

function rememberCookies(){
    if(buttonCelsius.checked == false && document.cookie.includes('Temperature') == buttonCelsius.value){
        buttonCelsius.checked = !buttonCelsius.checked;
    };

    if(buttonFahrenheit.checked == false && document.cookie.includes('Temperature') == buttonFahrenheit.value){
        buttonFahrenheit.checked = !buttonFahrenheit.checked;
    }
}

