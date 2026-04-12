Gallery — simple tariqa

1. Apni photos is folder (ya subfolder) mein rakho.
2. App.jsx ke top par import likho, maslan:
     import meriCover from './assets/gallery/chinese-tapestry-bedding/cover.png'
3. Neeche projects wale object mein:
     cover: meriCover,
     images: [meriCover, ...]   // lightbox ke 4 slides — alag files ke liye alag import

Slug / public path ki zaroorat nahi; sirf import + cover / images.
