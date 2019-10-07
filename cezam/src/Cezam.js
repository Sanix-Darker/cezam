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

///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// TEMPLATE BUILDER ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

var createElement = (idd, param_object, toAppend_array) => {

  var iid_ = document.createElement("img");

}


var ChannelHeadTemplate = (channel_header) => {

  // The logo image
  var img = document.createElement("img");
  img.src = channel_header['thumb'];
  img.className = "head_thumb";

  // The spin button for refresh
  var spin = document.createElement("input");
  spin.type = "button";
  spin.className = "spin_channel";
  spin.value = "🔄";
  spin.data_id = 'this_'+channel_header['id'];
  spin.onclick = function() { fetch_items(this.data_id); };

  // The filter input text
  var filter = document.createElement("input");
  filter.type = "text";
  filter.id = 'filter_'+channel_header['id'];
  filter.className = "sub_filter";
  filter.placeholder = 'Search on '+channel_header['title']+'....';
  filter.onkeyup = function() { Filter(this.id); };

  // The complete header
  var h3 = document.createElement("h3");
  h3.className="cezam_header";
  h3.appendChild(img);
  h3.appendChild(document.createTextNode(channel_header['title']+' '+((parseInt(channel_header['badge']) > 0) ? '('+channel_header['badge']+')' : '')));
  h3.appendChild(spin);

  // The final div to return
  var to_append = document.createElement("div");
  to_append.appendChild(h3)
  to_append.appendChild(filter)
  return to_append;
}

var MediaTemplate = (media_item) => {

  // The logo image
  var img = document.createElement("img");
  img.src = media_item["item_thumb"];
  img.className = "tile__img";

  // The div Head
  var div_head = document.createElement("div");
  div_head.className = "tile__media";
  div_head.appendChild(img);

  // The div title
  var div_title = document.createElement("div");
  div_title.className = "tile__title";
  div_title.appendChild(document.createTextNode(media_item["item_title"]));

  // The div body
  var div_body = document.createElement("div");
  div_body.className = "tile__details";
  div_body.appendChild(div_title);

  // The complete div :
  var to_append = document.createElement("div");
  to_append.className = "tile";
  to_append.id = 'media_'+media_item['item_id'];
  to_append.appendChild(div_head);
  to_append.appendChild(div_body);
  return to_append;
}

var SliderList = (channel_item_list) => {
  var to_append = document.createElement("div");
  channel_item_list.forEach(element => {
      to_append.appendChild(MediaTemplate(element));
  });
  return to_append;
}

var ItemTemplate = (channel_item) => {

  // The div row_inner
  var div_row_i = document.createElement("div");
  div_row_i.className = "row__inner";
  div_row_i.id = 'row_filter_'+channel_item['id'];

  // The div row
  var div_row = document.createElement("div");
  div_row.className = "row";
  div_row.appendChild(div_row_i)

  // The div body
  var to_append = document.createElement("div");
  to_append.className = "contain";
  to_append.appendChild(ChannelHeadTemplate(channel_item));
  to_append.appendChild(div_row);

  return to_append
}

var CezamTemplate = (channel_array) => {
  var Br = document.createElement("br");

  // The filter input text
  var filter = document.createElement("input");
  filter.type = "text";
  filter.id = 'global_search';
  filter.className = "filter";
  filter.placeholder = 'Global search here...';

  // The complete header
  var h2 = document.createElement("h2");
  h2.className="cezam_header";
  h2.appendChild(Br);
  h2.appendChild(document.createTextNode("Cezam. "));
  h2.appendChild(filter);
  h2.appendChild(Br);

  var B = document.createElement("b");
  // The logo image
  var img = document.createElement("img");
  img.src = "https://avatars2.githubusercontent.com/u/22576758?s=40&amp;v=4";
  // Author link
  var A = document.createElement("a");
  A.href = "https://github.com/Sanix-Darker";
  A.title = "By Sanix-darker";
  A.target = "_blank";
  A.appendChild(img);
  // The div body
  var author = document.createElement("div");
  author.id = "author";
  author.appendChild(B);
  author.appendChild(A);
  author.appendChild(Br);

  // The div body
  var to_append = document.createElement("div");
  to_append.appendChild(h2);
  channel_array.forEach(element => {
      to_append.appendChild(ItemTemplate(element));
      to_append.appendChild(Br);
  });
  to_append.appendChild(author);

  return to_append;
}
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////


var findAncestor = (el, cls) => {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

var Filter = (input) => {
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

var sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetch_items (id, scroll_level=100) {
  console.log("} Fetching items }--------->>>");
  const messageList = Selectors["messageList"];

  try{
    // We empty the precedent messageList
    document.body.querySelector(messageList["to_empty"]).innerHTML = "";
  }catch(err){ console.log(err); }

  const target = document.getElementById(id);
  target.querySelector(Selectors["discussionItem"]["trigger"]).dispatchEvent(new Event('mousedown'));
  await sleep(1500);
  for (let i = 0; i < scroll_level; i++) {
    document.body.querySelector(messageList["selector"]).scrollTo(0, 100);
    console.log("Scrolling....");
    await sleep(3500);
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
  const SliderListHTML = SliderList(array_items).innerHTML;
  console.log(">>>>>>>>>>>>>>>")
  console.log(">>> SliderListHTML: ", SliderListHTML)
  console.log(">>>>>>>>>>>>>>>")
  console.log("---> row_filter_"+id.replace("this_", ""))
  console.log(">>>>>")

  document.getElementById("row_filter_"+id.replace("this_", "")).innerHTML = SliderListHTML;
}

var fetch_start = () => {
  console.log("Fetching discussion ==--------->>>")
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

var createCezamAndFetch = () => {
  var Cezam_component = document.createElement("div");
  Cezam_component.id="cezam_content";
  Cezam_component.style.display = 'block';
  Cezam_component.appendChild(CezamTemplate(fetch_start()));
  document.body.appendChild(Cezam_component);

  // var Cezam_style = document.createElement("style");
  // Cezam_style.appendChild(document.createTextNode(cezamStyleSheet));
  // Cezam_style.type="text/css";

  document.body.appendChild(Cezam_component);
  //document.body.appendChild(Cezam_style);

}

var start_Cezam = (event) => {
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