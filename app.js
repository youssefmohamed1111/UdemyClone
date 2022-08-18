const url = "https://udemy-clone-jsonserver.herokuapp.com/";
if (localStorage.getItem("curCategory") === null) {
  localStorage.setItem("curCategory", "Python");
}
function LoadCourses(category, title) {
  if (title !== "") title = `?title_like=${title}`;
  fetch(url + category + title)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      document.getElementById("courses-header").innerText = data[0].header;
      document.getElementById("courses-description").innerText =
        data[0].description;
      document.getElementById("Explore").innerText =
        "Explore " + localStorage.getItem("curCategory");
      let cardsHolder = document.getElementById("cards-holder");
      cardsHolder.innerHTML = "";
      let courseCard = `
      <div class="carousel-item active">
        <div class="row">
    `;
      let cnt = 0;
      data.forEach((element) => {
        let Bestseller = "";

        if (element.bestSeller) {
          Bestseller = `<div class="best-seller">
                          Bestseller
                        </div>`;
        }
        if (cnt % 5 == 0 && cnt != 0) {
          courseCard += `
                      </div>
                        </div>
                      <div class="carousel-item">
                        <div class="row">
                      `;
        }
        cnt++;
        courseCard += `<div class="col"><a href="#" ><img class="course-img" src="${
          element.image
        }" alt="Web Course">
                        <div class="description">
                            <div class="title">${element.title}</div>
                            <div class="Author">${
                              element.instructors[0].name
                            }</div>
                            <span style="font-size: 15px; font-weight: 500; color: darkorange;">${element.rating.toFixed(
                              1
                            )}</span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa-solid fa-star-half-stroke checked"></span>
                            <span class="rate"> (${
                              element.reviews
                            } ratings)</span>
                            <div>E£${element.price}</div>
                            ${Bestseller}
                        </div>
            </a>
    </div>`;
      });
      courseCard += `</div>
                    </div>`;
      cardsHolder.innerHTML += courseCard;
    });
}

document.getElementById("search-form").addEventListener("submit", () => {
  window.location.href += "?q=" + document.getElementById("search-text").value;
});

function LoadCategory(categoryName) {
  localStorage.setItem("curCategory", categoryName);
  LoadCourses(categoryName, "");
}

let a = location.href;
let idx = a.indexOf("?");
let b = "";
if (idx !== -1) b = a.substring(idx + 3);

LoadCourses(localStorage.getItem("curCategory"), b);
