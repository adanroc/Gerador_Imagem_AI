// https://www.imagine.art/api/home
const API_KEY = 'vk-8f3NheXURUV85CFzlP35q321YzGKHLUckwyD4vRoVhzGKW';
const API_URL = 'https://api.vyro.ai/v2/image/generations';

const imageResultElement = document.getElementById('imageResult');
const imageContainer = document.getElementById('imageContainer');

// Function to generate the image
function generateImage(){

    const promptValue = document.getElementById('prompt').value;
    const styleValue = document.getElementById('dropdownStyles').value;
    const ratioValue = document.getElementById('dropdownRatio').value;

    if (!promptValue) {
        alert('Please enter a prompt');
        return;
    }

    // console.log(
    //     promptValue,
    //     styleValue,
    //     ratioValue
    // )

    setLoadingState(true);

    // prepare form data for the API request
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + API_KEY);

    const formData = new FormData();
    formData.append('prompt', promptValue);
    formData.append('style', styleValue);
    formData.append('ratio', ratioValue);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
    };

    fetch(API_URL, requestOptions)
        // .then(response => response.text())
        // .then(result => console.log(result))
        // .then(error => console.log('error'));
        .then(response => response.blob())
        .then(blob => {
            // Create an Object URL for the blob
            const imageUrl = URL.createObjectURL(blob);
            // Set the image source to display it
            imageResultElement.src = imageUrl;
        })
        .catch(error => {
            console.log('error', error);
            alert('An error occurred while generating the image.');
        })
        .finally(() => {
            // Restore the Loading state
            setLoadingState(false);
        });        

    // Text to image
    //     curl --location --request POST 'https://api.vyro.ai/v2/image/generations' \
    // --header 'Authorization: Bearer vk-8f3NheXURUV85CFzlP35q321YzGKHLUckwyD4vRoVhzGKW' \
    // --form 'prompt="A futuristic cityscape at night with neon lights"' \
    // --form 'style="realistic"' \
    // --form 'aspect_ratio="1:1"' \
    // --form 'seed="5"'

    // Text to video
    // curl --location --request POST 'https://api.vyro.ai/v2/video/text-to-video' \
    // --header 'Authorization: Bearer vk-8f3NheXURUV85CFzlP35q321YzGKHLUckwyD4vRoVhzGKW' \
    // --form 'style="kling-1.0-pro"' \
    // --form 'prompt="a flying dinosaur"'

    // Image to Video
    // curl --location --request POST 'https://api.vyro.ai/v2/video/image-to-video' \
    // --header 'Authorization: Bearer vk-8f3NheXURUV85CFzlP35q321YzGKHLUckwyD4vRoVhzGKW' \
    // --form 'style="kling-1.0-pro"' \
    // --form 'prompt="A close-up portrait of a young woman with striking green eyes and a delicate, ethereal appearance. she has a serene expression, with her lips slightly parted, and her skin is covered in a shimmering, scales-like texture. the woman is positioned in the middle of the image, with the background blurred to emphasise her features. she is wearing a light green dress with ruffled edges, which adds a touch of elegance to her overall appearance. her eyes are large and expressive, with a hint of a smile on her lips. her eyelashes are long and full, adding to her natural beauty. the lighting is soft and natural, highlighting her delicate features and creating a sense of depth and dimensionality. the overall effect is one of serenity and beauty, making the image a captivating and captivating piece of art."' \
    // --form 'file=@"cmMtdXBsb2FkLTE3NDIyMDA1ODUwOTktNg==/model.jpg"'
}

// setLoadingState(true);

function setLoadingState(isLoading){
    if(isLoading){
        imageResultElement.style.display = 'none';
        imageContainer.classList.add('loading');
    } else {
        imageResultElement.style.display = 'block';
        imageContainer.classList.remove('loading');
    }
}

function downloadImage(){
    // console.log('download')
    const imageUrl = imageResultElement.src;
    // console.log(imageUrl);
    if (!imageUrl){
        alert('No image avaliable for download.');
        return;
    }

    // Create a temporary anchor element to initiate download
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'ai-genereted-image.jpg';
    link.click();
}