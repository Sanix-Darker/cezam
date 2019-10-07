const Selectors = {
    "discussionList":{
        "type":"node",
        "selector":"body div.im_dialogs_col div.im_dialogs_col"
    },
    "messageList":{
        "type":"node",
        "selector":"body div.im_history_col_wrap div.im_history_scrollable_wrap",
        "to_empty":"body div.im_history_col_wrap div.im_history_scrollable_wrap div.im_history_messages div.im_history_messages_peer"
    },
    "discussionItem":{
        "type":"node",
        "selector": "body li.im_dialog_wrap",
        "trigger": "a.im_dialog",
        "child":{
            "thumb":{
                "type":"attribute",
                "target": "src",
                "selector": "img.im_dialog_photo"
            },
            "caption":{
                "type":"text",
                "selector": "div.im_dialog_message_wrap div.im_dialog_peer span"
            },
            "badge":{
                "type":"text",
                "selector": "span.im_dialog_badge"
            }
        }
    },
    "messageMediaMediaItem":{
        "type":"node",
        "selector":"div.im_history_message_wrap div[ng-switch-when='messageMediaDocument']",
        "child":{
            "title":{
                "type":"attribute",
                "target":"title",
                "selector":"a.im_message_document_name"
            },
            "caption":{
                "type":"text",
                "selector": "div.im_message_document_caption"
            },
            "media":{
                "type":"node",
                "selector":"a.im_message_video_thumb",
                "child":{
                    "thumb":{
                        "type":"attribute",
                        "target":"src",
                        "selector":"img.im_message_video_thumb"
                    },
                }
            },
            "size":{
                "type":"text",
                "selector":"span.im_message_document_size"
            }
        }
    },
    "messageMediaPhotoItem":{
        "type":"node",
        "selector":"div.im_history_message_wrap div[ng-switch-when='messageMediaPhoto']",
        "child":{
            "caption":{
                "type":"text",
                "selector": "div.im_message_photo_caption"
            },
            "media":{
                "type":"node",
                "selector":"a.im_message_video_thumb",
                "child":{
                    "thumb":{
                        "type":"attribute",
                        "target":"src",
                        "selector":"img.im_message_photo_thumb"
                    }
                }
            },
            "size":{
                "type":"text",
                "selector":"span.im_message_document_size"
            }
        }
    },
    "globalSearchBox":{
        "type":"node",
        "selector": "body input[type='search'].im_dialogs_search_field"
    }
}

var moc_data = [
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

  const cezamStyleSheet = "#cezam_content{padding:0 10px;margin:0;background:#0e0f11;color:#ecf0f1;font-family:'Open Sans',sans-serif;min-height:100vh;flex-direction:row;align-items:left;width:100%;max-height:100px;overflow:auto}#cezam_content *{box-sizing:border-box}#cezam_content .cezam_header,#cezam_content h1,#cezam_content h2{color:#fff!important}#cezam_content h1,#cezam_content p{text-align:left}#cezam_content p{width:100%;max-width:500px}#cezam_content a:active,#cezam_content a:hover,#cezam_content a:link,#cezam_content a:visited{transition:color 150ms;color:#95a5a6;text-decoration:none}#cezam_content a:hover{color:#7f8c8d;text-decoration:underline}#cezam_content .contain{width:100%}#cezam_content .row{overflow-x:auto;width:100%;overflow-y:hidden}#cezam_content .row__inner{transition:450ms -webkit-transform;transition:450ms transform;transition:450ms transform,450ms -webkit-transform;font-size:0;white-space:nowrap;margin:40px 0}#cezam_content .tile{position:relative;display:inline-block;width:250px;height:140.625px;margin-right:10px;font-size:20px;cursor:pointer;transition:450ms all;-webkit-transform-origin:center left;transform-origin:center left}#cezam_content .tile__img{width:250px;height:140.625px;-o-object-fit:cover;object-fit:cover}#cezam_content .tile__details{position:absolute;bottom:0;left:0;right:0;top:0;font-size:10px;opacity:0;background:linear-gradient(to top,rgba(0,0,0,.9) 0,rgba(0,0,0,0) 100%);transition:450ms opacity}#cezam_content .tile__details:after,#cezam_content .tile__details:before{content:'';position:absolute;top:50%;left:50%;display:#000}#cezam_content .tile__details:after{margin-top:-25px;margin-left:-25px;width:50px;height:50px;border:3px solid #ecf0f1;line-height:50px;text-align:left;border-radius:100%;background:rgba(0,0,0,.5);z-index:1}#cezam_content .tile__details:before{content:'';left:0;width:100%;font-size:30px;margin-left:7px;margin-top:-18px;text-align:center;z-index:2}#cezam_content .tile:hover .tile__details{opacity:1}#cezam_content .tile__title{position:absolute;bottom:0;padding:10px}#cezam_content .row__inner:hover{-webkit-transform:translate3d(-62.5px,0,0);transform:translate3d(-62.5px,0,0)}#cezam_content .row__inner:hover .tile{opacity:.3}#cezam_content .row__inner:hover .tile:hover{-webkit-transform:scale(1.5);transform:scale(1.5);opacity:1}#cezam_content .tile:hover~.tile{-webkit-transform:translate3d(125px,0,0);transform:translate3d(125px,0,0)}#cezam_content .sub_filter{width:auto;min-width:40%;padding:4px;margin-top:-1%;background:0;border:0;border-bottom:1px dashed #fff;color:#fff;outline:0;font-size:20px}#cezam_content #global_search{padding:4px;border:0;background:0;color:#fff;font-size:20px;width:auto;outline:0}#Cezam_button_start{font-size:15px;padding:10px;transition:all .3s;cursor:pointer;border:0;position:fixed;z-index:99999!important;bottom:2%;left:2%;color:#fff;background:#1853d3;box-shadow:0 4px 9px rgba(0,0,0,.7)}#Cezam_button_start span{display:none;transition:all .25s}#Cezam_button_start:hover span{display:inline-block;transition:all .25s}#Cezam_button_start:hover{font-size:20px;padding:15px;transition:all .15s}#author{text-shadow:0 3px 4px rgba(0,0,0,.45);position:fixed;bottom:8px;right:8px;font-size:10px}#author img{box-shadow:0 3px 4px rgba(0,0,0,.45);border-radius:100%;width:80%}#author a{color:#000;text-decoration:none}.head_thumb{border-radius:100%;width:40px}.spin_channel{color:#fff;background:rgba(250,250,250,.4);border:0;padding:8px;border-radius:100%;float:right}"