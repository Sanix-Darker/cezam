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

const Filter = () => {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('filterID');
    filter = input.value.toUpperCase();
    ul = document.getElementById("row_list");
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

console.log(Selectors["discussionItemImage"])