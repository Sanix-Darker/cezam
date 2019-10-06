const ChannelHeadTemplate = (channel_header) => {
    return '<h1> '+channel_header['title']+' </h1>'+
            '<input type="text" id="filter_'+channel_header['id']+'" class="sub_filter" onkeyup="Filter(\'filter_'+channel_header['id']+'\')" placeholder="Search on '+channel_header['title']+'...."/>';
}

const MediaTemplate = (media_item) => {
    return '<div class="tile" id="media_'+media_item['item_id']+'">'+
                '<div class="tile__media">'+
                    '<img class="tile__img" src="'+media_item["item_thumb"]+'" />'+
                '</div>'+
                '<div class="tile__details">'+
                    '<div class="tile__title">'+
                    media_item["item_title"]+
                    '</div>'+
                '</div>'+
            '</div>';
}

const SliderList = (channel_item_list) => {
    let slider = "";
    channel_item_list.forEach(element => {
        slider += MediaTemplate(element)
    });
    return slider;
}

const ItemTemplate = (channel_item) => {
    return '<div class="contain">'+
                ChannelHeadTemplate(channel_item)+
                '<div class="row">'+
                    '<div class="row__inner" id="row_filter_'+channel_item['id']+'">'+
                        SliderList(channel_item['items'])+
                    '</div>'+
                '</div>'+
            '</div>';
}

const CezamTemplate = (channel_array) => {
    let render = '<h2>Cezam. <input type="text" id="global_search"class="filter" placeholder="Global search here..." /></h2>';
    render += '<br>';
    channel_array.forEach(element => {
        render += ItemTemplate(element);
        render += '<br>';
    });
    return render;
}