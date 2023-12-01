//Mettre le code JavaScript lié à la page photographer.html
// console.log(photographerList[1].name)


const params = new URL(document.location).searchParams;
const id = parseInt(params.get("id"));   //phId

const photographersRecall = localStorage.getItem("dataPhotographers");
const photographersData = JSON.parse(photographersRecall);

// let currentPhotographer = photographersData.filter(p => p.id == id)
// console.log(currentPhotographer)

let mediaList = [];

const closeModalBtn = document.getElementById("close-modal");
const modal = document.getElementById("contact_modal");


// const closeModalContact = document.getElementById("close_modal_contact_icon");
// closeModalContact.addEventListener("keydown", function (event) {
//   if (modal.style.display === "block"){
//     if (event.key == "Escape"){
//       closeModal()
//     }
//   }
// })


function sumArray (array) {
  const sum = (accumulator, value) => accumulator + value;
  const initialValue = 0;
  sumResult = array.reduce(sum, initialValue);
  return (sumResult);
}


const photographersIdArray = [243,930,82,527,925,195];

let sumResult = 0;
class Media {
  constructor(data) {
      this.id = data.id;
      this.photographerId = data.photographerId;
      this.title = data.title;
      this.likes = data.likes || 0;
      this.date = data.date;
  }

  display() {
      console.log(`Title: ${this.title}, Likes: ${this.likes}`);
  }
}

class ImageMedia extends Media {
  constructor(data) {
      super(data);
      this.image = data.image;
  }

  display() {
      super.display();
      console.log(`Type: Image, Image Path: ${this.image}`);
  }
}

class VideoMedia extends Media {
  constructor(data) {
      super(data);
      this.video = data.video;
  }

  display() {
      super.display();
      console.log(`Type: Video, Video Path: ${this.video}`);
  }
}

async function getMedia() {
  let response = await fetch("data/photographers.json");
  if (!response.ok) {
      alert("HTTP-Error: " + response.status);
  } else {
      let data = await response.json();
      let media = data.media;
      mediaList = media.map(mediaData => {
          if (mediaData.image) {
              return new ImageMedia(mediaData);
          } else if (mediaData.video) {
              return new VideoMedia(mediaData);
          }
      });
      return {
          media: [...mediaList]
      };
  }
}


function checkPhotographerId () {
  for (let i = 0; i< photographersIdArray.length; i++) {
      if (photographersIdArray[i] == id) {
        const photographerName = photographersData[i].name;
        const photographerCity = photographersData[i].city;
        const photographerCountry = photographersData[i].country;
        const photographerTagline = photographersData[i].tagline;
        const photographerPrice = photographersData[i].price;
        const contactName = document.getElementById("photographer-name-contact");
        const photographerPortrait = `assets/photographers/${photographersData[i].portrait}`;
        console.log(`id:${id}`);
        console.log(photographersData[i].name);
        const mainHeadId = document.getElementById ("main-head");
        mainHeadId.innerHTML =
        `<div class="photograph-header">
            <div class="info-photographer">
                <h1>${photographersData[i].name}</h1>
                <p class="p1">${photographersData[i].city}, ${photographersData[i].country}</p>
                <p class="p2">${photographersData[i].tagline}</p>
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <img src="assets/photographers/${photographersData[i].portrait}" alt="portrait de ${photographersData[i].name}">
        </div>`;
        contactName.textContent=photographerName;
        getMedia();
      }
    }
  }

    checkPhotographerId();



    function updateLikes(heartIcon, likes) {
      heartIcon.previousElementSibling.textContent = likes; // Met à jour le texte du nombre de likes
    }

    async function displayMediaWithPhotographerId () {
      const { media } = await getMedia();
      const sommeNbLikes = [];
      const filterMedia = document.getElementById ("filter");

      for (let x = 0; x< photographersIdArray.length; x++) {
        if (photographersIdArray[x] == id) {
          let mediaFiltered = media.filter(m => m.photographerId == id);
          const photographer_gallery = document.getElementById ("photographer_gallery");
          mediaFiltered.forEach(mediaItem => {
            const galleryCard = document.createElement("div");
            galleryCard.classList.add("gallery_card");

            if (mediaItem instanceof ImageMedia) {
                galleryCard.innerHTML = `<img src="assets/images/${photographersData[x].name}/${mediaItem.image}" tabindex=0 class="gallery_media" alt="assets/images/${photographersData[x].name}/${mediaItem.title}">
                    <div class="card_info">
                        <h3>${mediaItem.title}</h3>
                        <div>
                            <span data-like="${mediaItem.likes}">${mediaItem.likes}</span>
                            <i class="fa-regular fa-heart hearticon" tabindex=0 aria-label="likes"></i>
                        </div>
                    </div>`;
            } else if (mediaItem instanceof VideoMedia) {
                galleryCard.innerHTML = `<video class="gallery_media video_media" tabindex=0 src="assets/images/${photographersData[x].name}/${mediaItem.video}" alt="assets/images/${photographersData[x].name}/${mediaItem.title}"></video>
                    <div class="card_info">
                        <h3>${mediaItem.title}</h3>
                        <div>
                            <span data-like="${mediaItem.likes}">${mediaItem.likes}</span>
                            <i class="fa-regular fa-heart hearticon" tabindex=0 aria-label="likes"></i>
                        </div>
                    </div>`;
            }

            photographer_gallery.appendChild(galleryCard);
            const heartIcon = galleryCard.querySelector(".hearticon");
            const likesSpan = galleryCard.querySelector("span");
            mediaItem.hasLiked = false;


            addOrRemoveALike (heartIcon, mediaItem);
            displayImgInModal ();
            // const mediaItem = mediaFiltered[i];
            sommeNbLikes.push(mediaItem.likes);

          });
          sumArray(sommeNbLikes);
          const nbLikes = document.getElementById("nb_likes");
          nbLikes.innerHTML =`${sumResult} <i class="fa-solid fa-heart"></i>`;
          const price = document.getElementById("price");
          price.innerHTML =`${photographersData[x].price}€ / jour`;

          function addOrRemoveALike (heartIcon, mediaItem) {
            heartIcon.addEventListener("click", function(){
               if (!mediaItem.hasLiked) {
                  // console.log("Entree addALike");
                  mediaItem.likes++; // Augmente de 1 les likes
                  mediaItem.hasLiked = true; // On set à True pour bloquer à 1 seul like ajouté
                  heartIcon.classList.add("hearticon_liked");
                  heartIcon.classList.add("fa-solid");
                  heartIcon.classList.remove("fa-regular");
                  updateLikes(heartIcon, mediaItem.likes); // Met à jour l'affichage du nombre de likes
                  sumResult += 1;
                  // console.log(sumResult);
                  nbLikes.innerHTML =`${sumResult} <i class="fa-solid fa-heart"></i>`;
                } else if (mediaItem.hasLiked) {
                    // console.log("Entree removeALike");
                    mediaItem.likes--; // Suppression du like présent si déjà ajouté
                    mediaItem.hasLiked = false; //
                    heartIcon.classList.remove("hearticon_liked");
                    heartIcon.classList.add("hearticon");
                    heartIcon.classList.remove("fa-solid");
                    heartIcon.classList.add("fa-regular");
                    updateLikes(heartIcon, mediaItem.likes); //
                    sumResult -= 1;
                    // console.log(sumResult);
                    nbLikes.innerHTML =`${sumResult} <i class="fa-solid fa-heart"></i>`;
                }
            });

            heartIcon.addEventListener("keydown", function (event) {
              if (event.key === "Enter") {
                  // console.log("Cœur cliqué avec la touche Enter");
                  if (!mediaItem.hasLiked) {
                    // console.log("Entree addALike");
                    mediaItem.likes++; // Augmente de 1 les likes
                    mediaItem.hasLiked = true; // On set à True pour bloquer à 1 seul like ajouté
                    heartIcon.classList.add("hearticon_liked");
                    heartIcon.classList.add("fa-solid");
                    heartIcon.classList.remove("fa-regular");
                    updateLikes(heartIcon, mediaItem.likes); // Met à jour l'affichage du nombre de likes
                    sumResult += 1;
                    // console.log(sumResult);
                    nbLikes.innerHTML =`${sumResult} <i class="fa-solid fa-heart"></i>`;
                  } else if (mediaItem.hasLiked) {
                      // console.log("Entree removeALike");
                      mediaItem.likes--; // Suppression du like présent si déjà ajouté
                      mediaItem.hasLiked = false; //
                      heartIcon.classList.remove("hearticon_liked");
                      heartIcon.classList.add("hearticon");
                      heartIcon.classList.remove("fa-solid");
                      heartIcon.classList.add("fa-regular");
                      updateLikes(heartIcon, mediaItem.likes); //
                      sumResult -= 1;
                      // console.log(sumResult);
                      nbLikes.innerHTML =`${sumResult} <i class="fa-solid fa-heart"></i>`;
                  }
              }
          });
          }

          const filterMedia = document.getElementById("filter");
          filterMedia.addEventListener("change", function() {
            const selectedFilter = filterMedia.value;
            if (selectedFilter === "popularite") {
              // Tri par popularité
              mediaFiltered.sort((a, b) => b.likes - a.likes);
            } else if (selectedFilter === "date") {
              // Tri par date
              mediaFiltered.sort((a, b) => {
                const dateA = new Date((a.date));
                const dateB = new Date((b.date));
                return dateA - dateB;
              });

            } else if (selectedFilter === "titre") {
              // Tri par titre
              mediaFiltered.sort((a, b) => a.title.localeCompare(b.title));
            }
            // Effacez l'affichage existant
            const photographer_gallery = document.getElementById("photographer_gallery");
            photographer_gallery.innerHTML = "";

            // Réaffichez les éléments triés
            mediaFiltered.forEach(mediaItem => {
              const galleryCard = document.createElement("div");
              galleryCard.classList.add("gallery_card");

              if (mediaItem instanceof ImageMedia) {
                  galleryCard.innerHTML = `<img src="assets/images/${photographersData[x].name}/${mediaItem.image}" tabindex=0 class="gallery_media" alt="assets/images/${photographersData[x].name}/${mediaItem.title}">
                      <div class="card_info">
                          <h3>${mediaItem.title}</h3>
                          <div>
                              <span data-like="${mediaItem.likes}">${mediaItem.likes}</span>
                              <i class="fa-regular fa-heart hearticon" tabindex=0 aria-label="likes"></i>
                          </div>
                      </div>`;
              } else if (mediaItem instanceof VideoMedia) {
                  galleryCard.innerHTML = `<video class="gallery_media video_media" tabindex=0 src="assets/images/${photographersData[x].name}/${mediaItem.video}" alt="assets/images/${photographersData[x].name}/${mediaItem.title}"></video>
                      <div class="card_info">
                          <h3>${mediaItem.title}</h3>
                          <div>
                              <span data-like="${mediaItem.likes}">${mediaItem.likes}</span>
                              <i class="fa-regular fa-heart hearticon" tabindex=0 aria-label="likes"></i>
                          </div>
                      </div>`;
              }

              photographer_gallery.appendChild(galleryCard);
              const heartIcon = galleryCard.querySelector(".hearticon");
              const likesSpan = galleryCard.querySelector("span");
              mediaItem.hasLiked = false;
              addOrRemoveALike (heartIcon, mediaItem);
              displayImgInModal ();
              sommeNbLikes.push(mediaItem.likes);

            });
        });
      }}

      const mediasToOpen = document.querySelectorAll(".gallery_media");
      mediasToOpen.forEach(media => {
        media.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            displayImgInModal ();
            console.log("poueeh");

          }
        });
      });


    }
    displayMediaWithPhotographerId();

    function displayImgInModal () {
      const medias = document.querySelectorAll(".gallery_media");
      const modal = document.getElementById("display_modal");
      const modalImage = document.getElementById("modal_image");
      const modalVideo = document.getElementById("modal_video");
      const modalBg = document.getElementById("display_modal_background");
      const caption = document.getElementById("caption");
      const closeModalBtn = document.getElementById("close_modal_display");
      const leftArrow = document.getElementById("left-arrow");
      const rightArrow = document.getElementById("right-arrow");

      let currentIndex = 0; // Index de l'image actuellement affichée

    medias.forEach((media, index) => {
      media.addEventListener("click", function(){
        modal.style.display = "block"; // Afficher la modal
        modalBg.style.display = "block";
        document.body.classList.add("no-scroll");
        currentIndex = index; // Mettre à jour l'index de l'image actuelle
        currentMediaDisplay();

        // Gérer la fermeture de la modal lorsque l'utilisateur clique sur le bouton de fermeture
        closeModalBtn.addEventListener("click", closeModalDisplay );
        leftArrow.addEventListener("click", previousMediaDisplay); // Afficher l'image précédente dans la modal
        rightArrow.addEventListener("click", nextMediaDisplay); // Afficher l'image suivante dans la modal
    });
      media.addEventListener("keydown", function(event){
        if (event.key === "Enter") {
        modal.style.display = "block"; // Afficher la modal
        modalBg.style.display = "block";
        document.body.classList.add("no-scroll");
        currentIndex = index; // Mettre à jour l'index de l'image actuelle
        currentMediaDisplay();
        }
    });

  });
    function currentMediaDisplay() {

      const chemin = medias[currentIndex].src; //Recupérer dans le src la derniere partie
      const regExpJpg = /\.jpg$/;
      const regExpVideo = /\.mp4$/;
      const matchVideo = chemin.match(regExpVideo);
      const matchImage = chemin.match(regExpJpg);

      const regExp = /\/([^/]+)$/;   //Afin d'afficher le "title" du média via une regExp


      if (matchImage) {
        const match = medias[currentIndex].alt.match(regExp);
      if (match) {
        const dernierePartie = match[1];
        caption.textContent = dernierePartie;
      }
        modalImage.style.display = "block";
        modalVideo.style.display = "none";
        modalImage.src = chemin;// Afficher l'image cliquée dans la modal
      } else if (matchVideo) {
          const videoElement = document.querySelector(".video_media");
          const title = videoElement.getAttribute("alt");
          console.log(title);
          const lastPartTitle = title.match(regExp);
          const titleVideo = lastPartTitle[1];
          console.log(titleVideo);

          caption.textContent = titleVideo;
          modalImage.style.display = "none";
          modalVideo.style.display = "block";
          modalVideo.src = chemin;
          modalVideo.autoplay = true;
          modalVideo.loop = true;
          console.log(medias[currentIndex]);
        }
    }

    function nextMediaDisplay () {
      if (currentIndex < medias.length - 1) {
        currentIndex++;
        currentMediaDisplay();
      }
    }
    function previousMediaDisplay () {
      if (currentIndex > 0) {
        currentIndex--;
        currentMediaDisplay();
      }
    }
    function closeModalDisplay () {
      modal.style.display = "none"; // Cacher la modal
      modalBg.style.display = "none";
      document.body.classList.remove("no-scroll"); // Remettre en place la barre de scroll
    }
      // Gestion des touches du clavier
      document.addEventListener("keydown", function (event) {
        if (modal.style.display === "block") {
          switch (event.key) {
            case "ArrowLeft":
              previousMediaDisplay();
              break;
            case "ArrowRight":
              nextMediaDisplay();
              break;
            case "Escape":
              closeModalDisplay();
              break;
          }
        }
      });
  }

    const form = document.getElementById("myForm");
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const modalContact = document.querySelector("display_modal");


    function validate(){
      console.log(new Message(`${form.firstname.value}`,`${form.lastname.value}`,`${form.email.value}`,`${form.message.value}`));
      form.reset();
      return false;
    }

    class Message {
        constructor(firstname, lastname, email, message) {
          this.fistname = firstname;
          this.lastname = lastname;
          this.email = email;
          this.message = message;
        }

        display(){
          console.log(`Nom : ${this.lastname}, Prénom : ${this.firstname}`);
          console.log(`Email : ${this.email}`);
          console.log(`Message : ${this.message}`);
        }
    }
    const modalContactPhotographer = document.querySelector(".modal");
    modalContactPhotographer.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
          const focusableElements = document.querySelectorAll("#firstname, #lastname, #email, #message, #validate-contact-button");
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
              // Si bouton maj + tab, on dirige vers l'élément précédent
              if (document.activeElement === firstElement) {
                  e.preventDefault();
                  lastElement.focus();
              }
          } else {
              // Sinon bouton tab, on dirige vers l'élément suivant
              if (document.activeElement === lastElement) {
                  e.preventDefault();
                  firstElement.focus();
              }
          }
      }
        if (e.key === "Escape") {
          closeModal();
      }
  });


  modalContactPhotographer.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
        const focusableElements = document.querySelectorAll("#logo-redirect, .contact_button, #filter, .gallery_media, .hearticon");
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            // Si bouton maj + tab, on dirige vers l'élément précédent
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Sinon bouton tab, on dirige vers l'élément suivant
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});
