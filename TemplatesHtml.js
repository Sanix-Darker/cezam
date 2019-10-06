const ChannelHeadTemplate = (data) => {
    return '<h1> '+data['title']+' </h1>'+
            '<input type="text" id="filter_'+data['id']+'" class="sub_filter" onkeyup="Filter(\'filter_'+data['id']+'\')" placeholder="Search on '+data['title']+'...."/>';
}

const MediaTemplate = (data) => {
    return '<div class="tile" id="media_'+data['item_id']+'">'+
                '<div class="tile__media">'+
                    '<img class="tile__img" src="'+data["item_thumb"]+'" />'+
                '</div>'+
                '<div class="tile__details">'+
                    '<div class="tile__title">'+
                        data["item_title"]+
                    '</div>'+
                '</div>'+
            '</div>';
}

const SliderList = (data) => {
    let slider = '<div class="row__inner" id="row_filter_'+data['id']+'">';
    data['items'].forEach(element => {
        slider += MediaTemplate(element)
    });
    slider += '</div>';
    return slider;
}

const ItemTemplate = (data) => {
    return '<div class="contain">'+
                ChannelHeadTemplate(data)+
                '<div class="row">'+
                SliderList(data)+
                '</div>'+
            '</div>';
}

const CezamTemplate = (data) => {
    let render =""
    data['channels'].forEach(element => {
        render += ItemTemplate(element)
    });
    return render;
}