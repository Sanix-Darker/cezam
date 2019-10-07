///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// TEMPLATE BUILDER ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

/**
 * This method allow me to create DOM elements
 * @param {*} idd 
 * @param {*} param_object 
 * @param {*} toAppendChild_array 
 */
var createElement = (idd, param_object, toAppendChild_array = []) => {

  var iid_ = document.createElement(idd);
  for (var key in param_object) {
    if (param_object.hasOwnProperty(key)) {
      // To handle case like style.display
      if (key.indexOf(".") !== -1){
        const array_key = key.split(".");
        iid_[array_key[0]][array_key[1]] = param_object[key];
      }else{
        iid_[key] = param_object[key];
      }
    }
  }
  toAppendChild_array.forEach(elt => {
    iid_.appendChild(elt);
  });
  return iid_;
}


/**
 * 
 * @param {*} channel_header 
 */
var ChannelHeadTemplate = (channel_header) => {

  // The logo image
  var img = createElement("img",{
    "src": channel_header['thumb'],
    "className": "head_thumb"
  });

  // The spin button for refresh
  var spin = createElement("input",{
    "type":"button",
    "className":"spin_channel",
    "value":"👀",
    "data_id":'this_'+channel_header['id'],
    "onclick": function() { fetch_items(this.data_id); }
  });

  // The filter input text
  var filter = createElement("input",{
    "type":"text",
    "style.display":"none",
    "id":'filter_'+channel_header['id'],
    "className":"sub_filter",
    "placeholder":'Search on '+channel_header['title']+'....',
    "onkeyup": function() { Filter(this.id); }
  });

  // The complete header
  var h3 = createElement("h3",{
    "className": "cezam_header"
  },
  [ img,
    document.createTextNode(
      channel_header['title']+' '+
      ((parseInt(channel_header['badge']) > 0) ? '('+channel_header['badge']+')' : '')
    ),
    spin
  ]);

  // The final div to return
  return createElement("div",{ }, [h3, filter]);
}


/**
 * 
 * @param {*} media_item 
 */
var MediaTemplate = (media_item) => {

  // The div Head
  var div_head = createElement("div",{
    "className": "tile__media"
  }, [
    createElement("img",{
      "src": media_item["item_thumb"],
      "className": "tile__img"
    })
  ]);

  // The div body
  var div_body = createElement("div",{
    "className": "tile__details"
  }, [
    createElement("div",{
      "className": "tile__title"
    }, [document.createTextNode(media_item["item_title"])])
  ]);

  // The complete div :
  return createElement("div",{"className": "tile", "id":'media_'+media_item['item_id']}, [div_head, div_body]);
}


/**
 * 
 * @param {*} channel_item_list 
 */
var SliderList = (channel_item_list) => {
  var to_append = document.createElement("div");
  channel_item_list.forEach(element => {
      to_append.appendChild(MediaTemplate(element));
  });
  return to_append;
}


/**
 * 
 * @param {*} channel_item 
 */
var ItemTemplate = (channel_item) => {

  // The div row
  var div_row = createElement("div",{
    "className": "row"
  }, [
    createElement("div",{
      "id": 'row_filter_'+channel_item['id'],
      "className": "row__inner"
    })
  ]);

  // The div body
  return createElement("div",{"className": "contain"}, [ChannelHeadTemplate(channel_item), div_row]);
}


var CezamTemplate = (channel_array) => {
  // The <b> component
  var B = createElement("b",{});
  // The <br> component
  var Br = createElement("br",{});

  // The filter input text
  var filter = createElement("input",{
    "type": "text",
    "id": 'global_search',
    "className": 'filter',
    "placeholder": 'Global search here...',
  });

  // The complete header
  var h2 = createElement("h2",{
    "className": "cezam_header"
  },
  [Br, document.createTextNode("Cezam. "), filter, Br]);

  // Author link
  var A = createElement("a",{
    "href":"https://github.com/Sanix-Darker",
    "title":"By Sanix-darker",
    "target":"_blank",
  }, [createElement("img",{
    "src": "https://avatars2.githubusercontent.com/u/22576758?s=40&amp;v=4",
  }) ]);

  // The div body
  var author = createElement("div",{
    "id": "author"
  }, [ B, A, Br]);

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