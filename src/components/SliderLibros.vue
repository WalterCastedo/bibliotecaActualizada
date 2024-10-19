<template class="slider">
  <Vueper-slides
    lazy
    lazy-load-on-drag
    autoplay
    fixed-height="18rem"
    class="px-1 slider1"
  >
    <Vueper-slide
      class="coltex"
      v-for="(slide, i) in slides"
      :key="i"
      :image="slide.image"
      :title="slide.title"
    />
  </Vueper-slides>
</template>

<script>
// import { Carousel, Slide } from 'vue-carousel';
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "SliderLibros",
  components: {
    // Carousel,
    // Slide,
    VueperSlides,
    VueperSlide,
  },
  data: () => ({
    slides: [
      {
        title: "Medicina",
        content: "Photo by Max Rive",
        // You can also provide a URL for the image.
        image:
          "https://blog.uvm.mx/hs-fs/hubfs/shutterstock_86267791.jpg?width=600&name=shutterstock_86267791.jpg",
      },
      {
        title: "Odontologia",
        content: "Photo by Max Rive",
        // You can also provide a URL for the image.
        image:
          "https://www.odontologos.mx/noticias/noticias/nota-larga-odontocosmetica-grw.jpg",
      },
    ],
  }),
};
</script>

<style>
.coltex {
  color: black;
  font-size: 5rem;
}
@media screen and (max-width: 580px) {
  .coltex {
    font-size: 3rem;
  }
}
</style>
