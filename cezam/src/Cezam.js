/**
 * CezamJs Core
 * Author : Sanix-darker
 */

class Cezam{

    constructor(DOMhtml){
        this.doc = new DOMParser().parseFromString(DOMhtml, "text/html");
    }
    start(){
    }
}

const findAncestor = (el, cls) => {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

const Filter = (input) => {
    // Declare variables
    var filter, ul, li, a, i, txtValue;
    filter = document.getElementById(input).value.toUpperCase();
    ul = document.getElementById("row_"+input);
    li = ul.querySelectorAll('div.tile div.tile__title');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        findAncestor(li[i], "tile").style.display = "";
      } else {
        findAncestor(li[i], "tile").style.display = "none";
      }
    }
}

const moc_data = [
    {
      "id": "mood_cinema",
      "title":"MOOD CINEMA",
      "items":[
        {
          "item_id":"id_123123",
          "item_thumb":"https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-3.jpg",
          "item_title":"An example here",
        },
        {
          "item_id":"id_1111111",
          "item_thumb":"https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-2.jpg",
          "item_title":"Some interesting thing here",
        },
        {
          "item_id":"id_22222",
          "item_thumb":"https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-1.jpg",
          "item_title":"MOONLIGHT here",
        },
      ]
    }
]

let cezam_activated = false;

const showHideCezam = (Cezam_component) => {
  if(cezam_activated == false){
    Cezam_component.style.display = 'block';
    document.getElementsByClassName('page_wrap')[0].style.display = 'none';
    cezam_activated = true;
  }else{
    document.getElementsByClassName('page_wrap')[0].style.display = 'block';
    Cezam_component.style.display = 'none';
    cezam_activated = false;
  }
}

const fetch_start = () => {
  console.log("Fetching data ============>>>>>>")
  let real_data = []
  const discussionItemList = document.body.querySelectorAll(Selectors["discussionItem"]["selector"])
  discussionItemList.forEach(elt => {
    const caption_selector = elt.querySelector(Selectors["discussionItem"]["child"]["caption"]["selector"])
    const thumb_selector = elt.querySelector(Selectors["discussionItem"]["child"]["thumb"]["selector"])
    const badge_selector = elt.querySelector(Selectors["discussionItem"]["child"]["badge"]["selector"])
    let to_add = {
      "id": caption_selector.textContent.replace(" ", "_").toLowerCase(),
      "title":caption_selector.textContent.toUpperCase(),
      "thumb": thumb_selector.getAttribute("src"),
      "badge": badge_selector.textContent
    }
    elt.querySelector(Selectors["discussionItem"]["trigger"]).dispatchEvent(new Event('mousedown'));
    console.log("elt: ", elt)
    console.log("elt ===> mousedown: ")
    setTimeout(() => {

      for(let i = 0; i <10; i++){

        setTimeout(() => {
          elt.querySelector(Selectors["messageList"]["selector"]).scrollTo(0, 100);

          const PhotoItemList = document.body.querySelectorAll(Selectors["messageMediaPhotoItem"]["selector"])
          // console.log("PhotoItemList: ", PhotoItemList);
          to_add["items"] = []
          PhotoItemList.forEach((elt2, i) => {
            let title = "";
            try{
              title = elt2.querySelector(Selectors["messageMediaPhotoItem"]["child"]["caption"]["selector"]).textContent.substring(0,40)+"..."
            }catch(err){
              title = "..."
            }
            to_add["items"].push(
              {
                "item_id":"id_"+i,
                "item_thumb":elt2.querySelector(Selectors["messageMediaPhotoItem"]["child"]["media"]["child"]["thumb"]["selector"]).getAttribute("src"),
                "item_title":title,
              })
          })
          console.log("to_add: ", to_add);
          real_data.push(to_add)

          return real_data;

        }, 1250)
      }
    }, 2500);
  })
}

const createCezamAndFetch = () => {
  var Cezam_component = document.createElement("div");
  Cezam_component.id="cezam_content";
  Cezam_component.style.display = 'block';
  Cezam_component.innerHTML = CezamTemplate(fetch_start());
  document.body.appendChild(Cezam_component);
  showHideCezam(Cezam_component);
}

const start_Cezam = (event) => {

    // We create the component if it's not yet present
    if (document.getElementById("cezam_content") === null){
      createCezamAndFetch()
    }else{
      if(cezam_activated == false){
        document.body.removeChild(document.getElementById("cezam_content"));
        createCezamAndFetch()
      }
    }

}

// We check if we are on telegram web site
if (document.location.href.indexOf("telegram") !== -1){
    setTimeout(() => {
      // The cezam start button
      var Button_start = document.createElement("button");
      Button_start.id="Cezam_button_start";
      Button_start.appendChild(document.createTextNode("<⚡>"));
      Button_start.onclick=start_Cezam;
      document.body.appendChild(Button_start)
    }, 2000);
}