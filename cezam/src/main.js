/**
 * CezamJs Core
 * Author : Sanix-darker
 */

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

var createCezamAndFetch = () => {

  var Cezam_component = createElement("div",{
    "id": "cezam_content",
    "style.display": "block"
  }, [ CezamTemplate(fetch_start()) ]);
  document.body.appendChild(Cezam_component);

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