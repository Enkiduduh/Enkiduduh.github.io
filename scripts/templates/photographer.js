function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( "article" );
        article.setAttribute("role", `Vignette du photographe ${name}`);
        const img = document.createElement( "img" );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `portrait de ${name}`);
        img.setAttribute("id", id);
        const h2 = document.createElement( "h2" );
        h2.textContent = name;
        const aLink = document.createElement("a");
        aLink.setAttribute("role", "link");
        aLink.classList.add("card-link");
        aLink.setAttribute("tabindex","0");
        aLink.href = `photographer.html?id=${id}`;
        aLink.appendChild(img);
        aLink.appendChild(h2);
        const h3 = document.createElement( "h3" );
        h3.textContent = `${city}, ${country}`;
        const p1 = document.createElement( "p" );
        p1.textContent = tagline;
        p1.classList.add("p_black_color");
        const p2 = document.createElement( "p" );
        p2.textContent = `${price}€/jour`;
        p2.classList.add("p_grey_color");
        article.appendChild(aLink);
        article.appendChild(h3);
        article.appendChild(p1);
        article.appendChild(p2);
        return (article);
    }
    return { name, picture, city, country, tagline, price, id, getUserCardDOM };
}
