let ID = () => Math.random().toString(36).substring(2,9);

let createAccordion = (title, id) => {
    return `
<div class="accordion-item" id="card${id}">
   <h2 class="accordion-header" id="heading${id}">
     <button class="accordion-button" type="button" data-bs-toggle="collapse"
     data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapseOne">
     ${title}
     </button>
   </h2>
    <div id="collapse${id}" class="accordion-collapse collapse show" aria-labelledby="heading${id}" data-bs-parent="#accordionId">
      <div class="accordion-body">
      </div>
    </div>

</div>`;
};

let createCarouselOuter = (id, innerId) => {
    return `
<div id="carouselControls${id}" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner" id="${innerId}">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${id}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>    
</div>`;
};

let createCarouselInner = (id, active) => {
    return `
    <div class="carousel-item ${active ? "active" : ""}" id="${id}">
    </div>`;
};

let createCard = (item) => {
    return`
 <div class="card d-block">
    <img class="card-img-top img-fluid carousel-img" src="${item["enclosure"]["link"]}" alt="card_not_available">
    <div class="card-body">
        <h5 class="card-title">${item["title"]}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item["author"]}</h6>
        <p class="card-subtitle text-secondary">${item["pubDate"]}</p>
        <p class="card-text">${item["description"]}</p>
        <a href="${item["link"]}" class="stretched-link" target="_blank"></a>
    </div>
 </div>`;
};

let addContent = async () => {
    for(let i=0; i<magazines.length; i++){
        // console.log("Magazines ::", magazines);
        let url = magazines[i];
        
        let resp = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURI(url)}`);
        let data =await resp.json();
        // console.log("Magazine Data ::",data);
    
    //create accordion

    let accordionId = ID();
    let accordion = createAccordion(data["feed"]["title"], accordionId);
    // console.log("Accordion ::",accordion);

    document.getElementById("accordionId").innerHTML += accordion;

    if(i==0){   
        document.getElementById(`collapse${accordionId}`).classList.add("show");
    }
    //carousel
    let carouselId = ID();  
    let carouselInnerId = ID();
    let carousel = createCarouselOuter(carouselId, carouselInnerId);
    // console.log("Carousel Outer ::", carousel);
    document.getElementById(`collapse${accordionId}`).innerHTML = carousel;

    let items = data["items"];
    for(let item in items){
        let card = createCard(items[item]);
            // console.log("Card ::", card);
        let innerCarouselCardId = ID();
        let innerCarouselCard = createCarouselInner(innerCarouselCardId, item == 0);
            // console.log("inner Carousel card ::", innerCarouselCard);
        document.getElementById(`${carouselInnerId}`).innerHTML += innerCarouselCard;
        document.getElementById(`${innerCarouselCardId}`).innerHTML += card;
    };
    }
}
addContent();

