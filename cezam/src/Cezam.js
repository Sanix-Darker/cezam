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
var Cezam_title = document.createElement("div");
Cezam_title.id="cezam_content";
// Cezam_title.appendChild(Title);
// Cezam_title.appendChild(Cezam_close_button);
// Cezam_title.appendChild(Input);

document.getElementById("cezam_content").innerHTML = CezamTemplate(moc_data);