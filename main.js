 
status = "";
video = "";
objects = [];

function preload()
{

    video = createVideo('video.mp4');
    video.hide();

}

function setup()
{

    canvas = createCanvas(600, 380);
    canvas.center();

}

function start()
{

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function modelLoaded()
{

    status = "true";
    console.log("CoCossd Model is Loaded");
    video.loop();
    video.speed(1);
    video.volume(0);

}

function draw()
{

    image(video, 0, 0, 600, 380);

    if (status != "")
    {

        objectDetector.detect(video, gotResult);
        
        for(i = 0; i < objects.length; i++ )
        {

            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("no_of_objects").innerHTML = "No. of objects detected : " + objects.length;
            fill("red");
            stroke("red");
            noFill();
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }

    }

}

function gotResult(error, results)
{

    if (error)
    {

        console.error(error);

    }

    console.log(results)

    objects = results;

}