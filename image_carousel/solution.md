// Simple js Version

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Simple Image Carousel</title>
  <style>
    .carousel {
      width: 400px;
      margin: 2rem auto;
      text-align: center;
    }

    .carousel img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    .carousel button {
      margin: 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }

  </style>
</head>
<body>
  <div class="carousel" role="region" aria-label="Image Carousel">
    <img id="carousel-image" src="" alt="Carousel Image" />
    <div>
      <button id="prev" aria-label="Previous image">&#8592; Prev</button>
      <button id="next" aria-label="Next image">Next &#8594;</button>
    </div>
  </div>

  <script>
    const images = [
      { src: "https://picsum.photos/id/1011/600/400", alt: "Mountain" },
      { src: "https://picsum.photos/id/1015/600/400", alt: "Bridge" },
      { src: "https://picsum.photos/id/1016/600/400", alt: "Forest" }
    ];

    let currentIndex = 0;

    const imgEl = document.getElementById("carousel-image");
    const updateImage = () => {
      imgEl.src = images[currentIndex].src;
      imgEl.alt = images[currentIndex].alt;
    };

    document.getElementById("prev").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateImage();
    });

    document.getElementById("next").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateImage();
    });

    // Initialize with first image
    updateImage();
  </script>
</body>
</html>
