// index.js
// Callbacks

function handleClick(clickedRamen) {
  // Add code
  document.querySelector(".detail-image").src = clickedRamen.image;
  document.querySelector(".name").textContent = clickedRamen.name;
  document.querySelector(".restaurant").textContent = clickedRamen.restaurant;
  document.querySelector("#rating-display").textContent = clickedRamen.rating;
  document.querySelector("#comment-display").textContent = clickedRamen.comment;
};

function handleDelete(ramen){
  ramen.remove();
  document.querySelector(".detail-image").src = "./assets/ramen to display.png";
  document.querySelector(".name").textContent = "";
  document.querySelector(".restaurant").textContent = "";
  document.getElementById("rating-display").innerHTML = "";
  document.getElementById("comment-display").innerHTML = "";

}

const addSubmitListener = () => {
  // Add code
  const form = document.querySelector("form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const newImg = document.createElement("img");
    const div = document.createElement("div");
    div.appendChild(newImg);
    document.querySelector("#ramen-menu").appendChild(div);
    newImg.src = document.getElementById("new-image").value;
    // document.querySelector("#ramen-menu").appendChild(newImg);
    //assigning the values of inputs to variables to access them after resetting the form
    const submittedName = document.getElementById("new-name").value;
    const submittedRestaurant = document.getElementById("new-restaurant").value;
    const submittedRating = document.getElementById("new-rating").value;
    const submittedComment = document.getElementById("new-comment").value;
    form.reset();
    newImg.addEventListener("click", e => {
      document.querySelector(".detail-image").src = newImg.src;
      document.querySelector(".name").textContent = submittedName;
      document.querySelector(".restaurant").textContent = submittedRestaurant;
      document.getElementById("rating-display").innerHTML = submittedRating;
      document.getElementById("comment-display").innerHTML = submittedComment;  
    });
  
    const btn = document.createElement("button")
    btn.innerHTML = "x";
    btn.style.position= "relative";
    btn.style.top = "0%";
    btn.style.right = "55%";
    btn.style.fontSize = "8px";
    div.appendChild(btn);
    btn.addEventListener("click", () => { 
      handleDelete(newImg);
      btn.style.display = "none";
    }
  );
})};

const displayRamens = () => {
  // Add code
  fetch("http://localhost:3000/ramens")
  .then(res => res.json())
  .then(ramens => ramens.forEach(ramen => {
    const image = document.createElement("img")
    const div = document.createElement("div");
    document.getElementById("ramen-menu").appendChild(div)
    image.src = ramen.image
    // document.getElementById("ramen-menu").appendChild(image)
    div.appendChild(image)
    image.addEventListener("click", () => handleClick(ramen))
    const btn = document.createElement("button");
    btn.innerHTML = "x"
    btn.style.position= "relative"
    btn.style.top = "0%"
    btn.style.right = "55%"
    btn.style.fontSize = "8px"
    div.appendChild(btn)
    btn.addEventListener("click", () => {
      handleDelete(image)
      btn.style.display = "none"
    })
  }, handleClick(ramens[0])
  ));
};

const form = document.getElementById("edit-ramen");
document.getElementById("edit-ramen").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("comment-display").textContent = document.getElementById("edit-comment").value;
  document.getElementById("rating-display").textContent = document.getElementById("edit-rating").value;
  form.reset();
});


const main = () => {
  // invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
}
main();

//Export functions for testing
// export {
//   displayRamens,
//   addSubmitListener,
//   handleClick,
//   main,
// };
