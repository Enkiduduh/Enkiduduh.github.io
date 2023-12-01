
let photographerList = [];


  async function getPhotographers() {
    let response = await fetch("data/photographers.json");

    if (!response.ok) {
      alert("HTTP-Error: " + response.status);
    } else {
      let data = await response.json();
      let photographers = data.photographers;
      console.log(photographers);
      photographerList = [...photographers];
      return {
        photographers: [...photographers],
    };
  }}

    async function displayData(photographers) {
      const photographersSection = document.querySelector(".photographer_section");

      photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
      });
    }

    async function init() {
      // Récupère les datas des photographes
      const { photographers } = await getPhotographers();
      displayData(photographers);
    }

    init();

    async function verif() {
      // Récupère les datas des photographes
      const { photographers } = await getPhotographers();
      photographers.forEach((photographer) => {
        const photographerId = photographer.id;
      });
    }
    verif();

  //   async function clickOnPortrait () {
  //     const { photographers } = await getPhotographers();
  //     const dataStringified = JSON.stringify(photographers);
  //   const imgArray = document.querySelectorAll("img")
  //   // console.log(imgArray)
  //   imgArray.forEach(img => {
  //     img.addEventListener("click", () => {
  //       photographers.forEach((photographer) => {
  //         const pgrId = img.id;
  //         window.location.href = `photographer.html?id=${pgrId}`;
  //       })
  //     })
  //   });

  // }
  // clickOnPortrait();

  // Fonction de sauvegarde des données photographers
  async function storageData () {
    const { photographers } = await getPhotographers(); // On récupère
    const photographersDataSaved = { photographers };   // le Json
    // On strigify la variable > Transforme le Json en String
    const dataStringified = JSON.stringify(photographers);
    // On sauvegarde la data devenue une string afin de pouvoir
    // la réutiliser sur une autre page
    localStorage.setItem("dataPhotographers", dataStringified);
  }
  storageData();

  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
        const focusableElements = document.querySelectorAll(".card-link");
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            // Tab + Maj > focus vers l'élément précédent
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Sinon juste Tab > focus vers l'élément suivant
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});
