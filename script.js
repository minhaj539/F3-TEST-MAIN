const apiKey = "dC5ZddXFoHgJ5IoNkkm9l2uZJXvEa23YBXkk1pbx";
const heading = document.getElementById("heading");
const img = document.getElementById("img");
const title = document.getElementById("title");
const explanation = document.getElementById("explanation");

// PICTURE ON GIVEN DATE
const submitBtn = document.getElementById("submit-btn");
const inputDate = document.getElementById("search-input");
const historySection = document.getElementById("history-section");
const list = document.getElementById("list");
submitBtn.addEventListener("click", getImageOfTheDay);

//FUNCTION FOR PICTURE OF THE DAY
async function getCurrentImageOfTheDay(date) {

  let response = await fetch(
    `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`
  );
  let data = await response.json();
  heading.innerText = "Picture on " + date;
  img.src = data.url;
  title.innerText = data.title;
  explanation.innerText=data.explanation
}

// TODAYS PICTURE OF THE DAY
const currentDate = new Date().toISOString().split("T")[0];
console.log(currentDate);
getCurrentImageOfTheDay(currentDate);
addSearchToHistory();

function getImageOfTheDay(event) {
  event.preventDefault();
  let date = inputDate.value;
  getCurrentImageOfTheDay(date);


  saveSearch(date);
}


//FUNCTION TO FETCH THE HISTORY FROM LOCAL STORAGE AND APPENDING IT TO THE DOCUMENT (SHOWING ON WINDOW)
function addSearchToHistory() {
  list.innerHTML = "";
  let searches = JSON.parse(localStorage.getItem("searches"));
  if (searches == null) {
    // console.log("empty searches");
    return;
  }
  for (let i = 0; i < searches.length; i++) {
    let li = document.createElement("li");
    // li.innerHTML = searches[i].date;   original
    li.innerHTML =searches[i].date;
    li.addEventListener("click", (e) => {
      getCurrentImageOfTheDay(e.target.innerHTML);
    });
    list.appendChild(li);
  }
}


//FUNCTION TO SAVE THE DATE INTO LOCAL STORAGE WHENEVER THE USER GIVES INPUT (DATE)
function saveSearch(inputDate) {
  let searches;
  if (localStorage.getItem("searches") == null) {
    searches = [];
    localStorage.setItem("searches", JSON.stringify(searches));
  }
  searches = JSON.parse(localStorage.getItem("searches"));
  for (let i = 0; i < searches.length; i++) {
    let searchItem = searches[i];
    if (searchItem.date === inputDate) {
      for (let j = i; j < searches.length - 1; j++) {
        let temp = searches[j];
        searches[j] = searches[j + 1];
        searches[j + 1] = temp;
      }
      searches.pop();
  
    }
  }
  let obj = { date: inputDate };
  searches.push(obj);
  localStorage.setItem("searches", JSON.stringify(searches));
  addSearchToHistory();
}
