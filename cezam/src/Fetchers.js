var sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetch_items (id, scroll_level=300) {
    const row_component = document.getElementById("row_filter_"+id.replace("this_", ""));

    row_component.innerHTML = "<h2>Loading elements...</h2>";

    document.getElementById("filter_"+id.replace("this_", "")).style.display = 'block';
    console.log("} Fetching items }--------->>>");
    const messageList = Selectors["messageList"];

    try{
        // We empty the precedent messageList
        document.body.querySelector(messageList["to_empty"]).innerHTML = "";
    }catch(err){ console.log(err); }

    const target = document.getElementById(id);
    target.querySelector(Selectors["discussionItem"]["trigger"]).dispatchEvent(new Event('mousedown'));
    await sleep(700);
    for (let i = 0; i < scroll_level; i++) {
        document.body.querySelector(messageList["selector"]).scrollTo(0, 10);
        console.log("Scrolling....");
        await sleep(500);
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
    if (SliderListHTML.length == 0){
        row_component.innerHTML = "<h2>Nothing fetched!</h2>";
    }else{
        row_component.innerHTML = SliderListHTML;
    }

    row_component.innerHTML += "<hr>";
}



var fetch_start = () => {
    console.log("Fetching discussion ==--------->>>")
    let real_data = []
    const discussionItem = Selectors["discussionItem"];
    const discussionItem_child = discussionItem["child"];
    const discussionItemList = document.body.querySelectorAll(discussionItem["selector"])
    discussionItemList.forEach(elt => {
        console.log('discussionItem_child["thumb"]["selector"]: ', discussionItem_child["thumb"]["selector"])
        const caption_selector = elt.querySelector(discussionItem_child["caption"]["selector"]);
        const thumb_selector = elt.querySelector(discussionItem_child["thumb"]["selector"]);
        const badge_selector = elt.querySelector(discussionItem_child["badge"]["selector"]);
        const id = caption_selector.textContent.replace(" ", "_").toLowerCase();
        try{
        let to_add = {
            "id": id,
            "title": caption_selector.textContent.toUpperCase(),
            "thumb": thumb_selector.getAttribute("src"),
            "badge": badge_selector.textContent
        };
        //Then we add the id
        elt.setAttribute("id", "this_"+id);
        real_data.push(to_add);
        }catch(err){console.log(err)}
    })
    return real_data;
}
