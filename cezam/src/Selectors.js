const Selectors = {
    "discussionList":{
        "type":"node",
        "selector":"div.im_dialogs_col div.im_dialogs_col"
    },
    "messageList":{
        "type":"node",
        "selector":"div.im_history_col_wrap"
    },
    "discussionItem":{
        "type":"node",
        "selector": "li.im_dialog_wrap",
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
        "selector": "input[type='search'].im_dialogs_search_field"
    }
}