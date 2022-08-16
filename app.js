const url = "https://udemy-clone-jsonserver.herokuapp.com/courses";
function LoadCourses(title) {
  if (title !== "") title = `?title_like=${title}`;
  fetch(url + title)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let x = document.getElementById("cards-holder");
      x.innerHTML = "";
      data.forEach((element) => {
        let Bestseller = "";
        if (element.bestSeller) {
          Bestseller = `<div class="best-seller">
                          Bestseller
                        </div>`;
        }
        x.innerHTML += `<li><a href="#" class="course"><img class="course-img" src="${
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
    </li>`;
      });
    });
}
document.getElementById("search-form").addEventListener("submit", () => {
  window.location.href += "?q=" + document.getElementById("search-text").value;
});
let a = location.href;
let idx = a.indexOf("?");
let b = "";
if (idx !== -1) b = a.substring(idx + 3);
LoadCourses(b);
