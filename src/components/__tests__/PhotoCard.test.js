import * as rtl from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import PhotoCard from "../PhotoCard";


let container = null;
const PhotoInfo = {photo: {
    id:"51297561253",
    secret:"271e135d73",
    server:"65535",
    farm:66,
    owner:{
        username:"adkisonjudith"
    },
    title:{
        _content:"2021 Alaska Whales"
    },
    description:{
        _content:"Whales in Alaska"
    },
    tags:{
        tag:[{
            id:"138756235-51297561253-1127",
            _content:"alaska"
        },
        {
            id:"138756235-51297561253-5479429",
            _content:"bubblefeeding"
        },
        {
            id:"138756235-51297561253-26501",
            _content:"humpbacks"
        }]},
        urls:{
            url:[
                {
                    _content:"https://www.flickr.com/photos/138779289@N03/51297561253/"
                }
            ]},
            ok : true
        },
        ok : true
        } 

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(PhotoInfo)
    })
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    jest.restoreAllMocks();
});


it('should fetch and render input element', async () => {

      // Use the asynchronous version of act to apply resolved promises
    await rtl.act(async () => {
        const id = '';
        await rtl.render(<PhotoCard id={ id } />, container);
    });
    expect(rtl.screen.getByText(PhotoInfo.photo.description._content, { exact: false })).toBeInTheDocument();
    // rtl.screen.debug();
    
});

