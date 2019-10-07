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