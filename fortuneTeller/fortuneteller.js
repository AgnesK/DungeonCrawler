let fortuneLabel = document.getElementById("fortuneteller");
const fortunes = ["yes", "no", "maybe"];

function getFortune() {
    const fortuneIndex = Math.floor(Math.random() * fortunes.length);
    fortuneLabel.innerText = fortunes[fortuneIndex];
}
