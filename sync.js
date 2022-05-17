const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.send("req id");
ipcRenderer.on("id", (event, id) => {

    const newVideoName = "video" + id
    document.querySelector(".vid").id = newVideoName;
    document.querySelector(".img").id = "image" + id;
    document.title = id;

    const mediaID = document.getElementById(newVideoName)
    window.sync.addMediaController(mediaID)


    window.sync.onPromotion = ()=>{
            window.sync.scheduleMedia(mediaID, 500, 0);  
            sync.count = 0
            //setInterval(()=>{window.sync.addEventIn("Switch", 100)}, 1000)
            //setInterval(()=>{window.sync.addEventIn("test", 100, sync.count++)}, 1000)
            setInterval(()=>{
                var rnd  = Math.floor(Math.random() * 5) + 1;
                var rnd2  = Math.floor(Math.random() * 5) + 1;

                window.sync.addEventIn("translate", 100, rnd, rnd2)}, 2000)
    }
    
});

const events = {
    test: (counter)=>{        
        console.info(`counter: ${counter} at  ${+new Date() % 10000}, my perf.now = ${performance.now()}`);
    },
    Switch: ()=>{
        console.log("Event launched at "+  +new Date() % 1000000)
        const el = document.querySelector(".img"); 

        if (el.style.visibility === "visible")
        {
            el.style.visibility = "hidden"

        } else{
            el.style.visibility = "visible";
        }
    },
    translate: (rnd)=>{
        const el = document.querySelector(".img");
        el.setAttribute("style","transform: translate3d(" + rnd[0] + "00px," + rnd[1]+ "00px,0px);");
      
    }
}


const SyncObject = require("./sync-lib/module").SyncObject
const node_discover = require("node-discover");
const discover = new node_discover({
    ignoreProcess: false,
    ignoreInstance: false
})
console.log("does this work")
window.sync = new SyncObject(events, discover);
window.isMaster = ()=>window.sync.discover.me.isMaster;

//console.log = (msg)=> document.getElementById("log").innerHTML += "<br>"+  msg;
console.info = (msg)=> document.getElementById("log").innerHTML = msg;
