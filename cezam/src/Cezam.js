/**
 * CezamJs Core
 * Author : Sanix-darker
 */

// class Cezam{
//     constructor(DOMhtml){
//         this.doc = new DOMParser().parseFromString(DOMhtml, "text/html");
//     }
//     start(){ }
// }

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetch_items (id, scroll_level=50) {
  console.log("} Fetching items }--------->>>");
  const messageList = Selectors["messageList"];
  const target = document.getElementById(id);
  target.querySelector(Selectors["discussionItem"]["trigger"]).dispatchEvent(new Event('mousedown'));
  await sleep(3500);
  for (let i = 0; i < scroll_level; i++) {
    document.body.querySelector(messageList["selector"]).scrollTo(0, 100);
    console.log("Scrolling....");
    await sleep(2500);
  }
  const messageMediaPhotoItem = Selectors["messageMediaPhotoItem"];
  const messageMediaPhotoItem_child = messageMediaPhotoItem["child"];
  let PhotoItemList = document.body.querySelector(messageList["selector"]).querySelectorAll(messageMediaPhotoItem["selector"]);
  let count = 1;
  let array_items = [];
  PhotoItemList.forEach(elt2 => {
    let title = "...";
    try{ title = elt2.querySelector(messageMediaPhotoItem_child["caption"]["selector"]).textContent.substring(0, 40) + "..."; }catch(err){ console.log(err) }
    let thumb = elt2.querySelector(messageMediaPhotoItem_child["media"]["child"]["thumb"]["selector"]).getAttribute("src");
    const item_to_add = {
      "item_id": "id_" + count,
      "item_thumb": thumb,
      "item_title": title,
    };
    array_items.push(item_to_add);
    count ++;
  });
  let sliderList = SliderList(array_items);
  document.getElementById("row_filter_"+id.replace("this_", "")).innerHTML = sliderList;
}

const fetch_start = () => {
  console.log("Fetching data ==--------->>>")
  let real_data = []
  const discussionItem = Selectors["discussionItem"];
  const discussionItem_child = discussionItem["child"];
  const discussionItemList = document.body.querySelectorAll(discussionItem["selector"])
  discussionItemList.forEach(elt => {
    const caption_selector = elt.querySelector(discussionItem_child["caption"]["selector"]);
    const thumb_selector = elt.querySelector(discussionItem_child["thumb"]["selector"]);
    const badge_selector = elt.querySelector(discussionItem_child["badge"]["selector"]);
    const id = caption_selector.textContent.replace(" ", "_").toLowerCase();
    let to_add = {
      "id": id,
      "title": caption_selector.textContent.toUpperCase(),
      "thumb": thumb_selector.getAttribute("src"),
      "badge": badge_selector.textContent
    };
    //Then we add the id
    elt.setAttribute("id", "this_"+id);
    real_data.push(to_add);
  })
  return real_data;
}

// document.getElementsByClassName("spin_channel").click = () => {
//   alert("BOUM!")
//   fetch_items(this.getAttribute("data-id"), 30);
// }

const createCezamAndFetch = () => {
  var Cezam_component = document.createElement("div");
  Cezam_component.id="cezam_content";
  Cezam_component.style.display = 'block';
  Cezam_component.innerHTML = CezamTemplate(fetch_start());
  document.body.appendChild(Cezam_component);
}

const start_Cezam = (event) => {
    // We create the component if it's not yet present
    if (document.getElementById("Cezam_button_start").getAttribute("status") === "close"){
      if(document.getElementById("cezam_content") !== null) {
        document.body.removeChild(document.getElementById("cezam_content"));
      }
      createCezamAndFetch()
      document.getElementById("Cezam_button_start").setAttribute("status", "open");
    }else{
      document.getElementById("Cezam_button_start").setAttribute("status", "close");
    }
    showHideCezam(document.getElementById("cezam_content"));
}

// We check if we are on telegram web site
if (document.location.href.indexOf("telegram") !== -1){
    setTimeout(() => {
      // The cezam start button
      var Button_start = document.createElement("button");
      Button_start.id="Cezam_button_start";
      Button_start.setAttribute("status", "close");
      Button_start.appendChild(document.createTextNode("<⚡>"));
      Button_start.onclick=start_Cezam;
      document.body.appendChild(Button_start)
    }, 2000);
}