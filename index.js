document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementsByClassName("card-container")[0];
  const search = document.getElementsByClassName("input")[0];
  search.addEventListener("input", filerArray);
  const isNew = document.getElementsByClassName("checkbox")[0];
  isNew.addEventListener("click", newFunc);
  const suggestionBox = document.getElementsByClassName("suggestion-box")[0];
  suggestionBox.style.display = "none";
  let newTrue = false;
  let arr = [];
  async function fetchArray() {
    try {
      const response = await fetch(
        "https://fakestoreapiserver.reactbd.com/products"
      );
      if (!response.ok) throw new Error("Failed to fetch data: ");
      const data = await response.json();
      return data;
      // console.log(data);
    } catch (e) {
      console.error("Error:", e);
      return [];
    }
  }

  function displayArr(arr) {
    // console.log("Array",arr);
    cardContainer.innerHTML = "";
    arr.map((item) => {
      const cardDiv = document.createElement("div");
      cardDiv.setAttribute("class", "card-div");
      const id = document.createElement("div");
      id.setAttribute("class", "id");
      id.textContent = item._id;
      cardDiv.appendChild(id);
      const img = document.createElement("img");
      img.setAttribute("src", item.image);
      img.setAttribute("class", "image");
      cardDiv.appendChild(img);
      const textDiv = document.createElement("div");
      textDiv.setAttribute("class", "text-div");
      const title = document.createElement("div");
      title.textContent = "Title: " + item.title;
      title.setAttribute("class", "title");
      textDiv.appendChild(title);
      const desc = document.createElement("div");
      desc.textContent = item.description;
      desc.setAttribute("class", "desc");
      textDiv.appendChild(desc);
      const category = document.createElement("div");
      category.textContent = "Category: " + item.category;
      category.setAttribute("class", "category");
      textDiv.appendChild(category);
      cardDiv.appendChild(textDiv);
      const rating = document.createElement("div");
      rating.innerHTML = `<i class="fa-solid fa-star"></i>`;
      rating.textContent = "Rating: " + item.rating;
      rating.setAttribute("class", "rating");
      textDiv.appendChild(rating);
      const priceDiv = document.createElement("div");
      priceDiv.setAttribute("class", "price");
      const price = document.createElement("div");
      price.textContent = "New Price: $" + item.price;
      priceDiv.appendChild(price);
      const oldPrice = document.createElement("div");
      oldPrice.setAttribute("class", "oldPrice");
      oldPrice.textContent = "Old Price: $" + item.oldPrice;
      priceDiv.appendChild(oldPrice);
      const innerDiv = document.createElement("div");
      innerDiv.setAttribute("class", "inner-div");
      innerDiv.appendChild(cardDiv);
      innerDiv.appendChild(priceDiv);
      cardContainer.appendChild(innerDiv);
    });
  }
  function filerArray(e) {
    const val = e.target.value;
    // console.log(val);
    if (val.length > 2 && newTrue === true) {
      const newArr = arr.filter(
        (item) =>
          item.title.toLowerCase().includes(val.toLowerCase()) &&
          item.isNew === true
      );
      console.log(newArr);
      displayArr(newArr);
      displaySuggestions(newArr);
    } else if (val.length > 2) {
      const newArr = arr.filter((item) =>
        item.title.toLowerCase().includes(val.toLowerCase())
      );
      displayArr(newArr);
      displaySuggestions(newArr);
    } else {
        suggestionBox.style.display = "none";
      suggestionBox.innerHTML = "";
      displayArr(arr);
    }
  }

  function displaySuggestions(filteredArr) {
    suggestionBox.innerHTML = "";
    suggestionBox.style.display= "block";
    if(filteredArr.length === 0){
        suggestionBox.innerHTML = `<div> No Item Found </div>`;
    }
    filteredArr.forEach((item) => {
      const suggestionDiv = document.createElement("div");
      suggestionDiv.classList.add("suggestion");
      suggestionDiv.textContent = item.title;

      const img = document.createElement("img");
      img.setAttribute("src", item.image);
      img.classList.add("suggestion-img");

      suggestionDiv.appendChild(img);
      suggestionDiv.addEventListener("click", () => {
        search.value = item.title;
        suggestionBox.innerHTML = "";
        displayArr([item]);
      });

      suggestionBox.appendChild(suggestionDiv);
    });
  }

  function newFunc() {
    newTrue = !newTrue;
    if (newTrue === true) {
      const newArr = arr.filter((item) => item.isNew === true);
      console.log(newArr);
      displayArr(newArr);
    } else {
      displayArr(arr);
    }
    // console.log(newTrue);
  }

  async function setArray() {
    arr = await fetchArray();
    displayArr(arr);
  }
  setArray();
});
