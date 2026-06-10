import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {

  es: {
    translation: {

      home: "Inicio",
      portfolio: "Portfolio",
      journal: "Journal",
      about: "Sobre nosotros",
      contact: "Contacto",

      hero_subtitle:
        "Fotografía Fine Art & Cinematográfica",

      intro_title_1:
        "Fotografía que se siente",

      intro_title_2:
        "elegante, emocional",

      intro_title_3:
        "y atemporal.",

      intro_text:
        "Creamos imágenes refinadas para parejas, bodas, maternidad y familias, combinando emociones auténticas con una estética editorial inspirada en la luz, el movimiento y el arte de contar historias.",

      featured_stories:
        "Historias destacadas",

      featured_description:
        "Una selección de sesiones recientes creadas con emoción, luz y una narrativa atemporal.",

      view_story:
        "Ver historia",

      view_portfolio:
        "Ver portfolio completo",

      experience_subtitle:
        "La experiencia Golden Light",

      experience_title_1:
        "Más que fotografías.",

      experience_title_2:
        "Experiencias memorables.",

      experience_text:
        "Creemos que la fotografía debe sentirse natural, elegante y profundamente personal.",

      connection_title:
        "Conexión auténtica",

      connection_text:
        "Las fotografías más significativas nacen cuando las personas se sienten cómodas y conectadas con el momento.",

      detail_title:
        "Atención al detalle",

      detail_text:
        "Cada imagen se crea con intención, cuidando la luz, la composición y la emoción.",

      storytelling_title:
        "Narrativa atemporal",

      storytelling_text:
        "Creamos historias visuales que preservan recuerdos y emociones durante generaciones.",

      cta_title_1:
        "Tu historia merece",

      cta_title_2:
        "ser recordada.",

      cta_text:
        "Transformamos momentos auténticos en recuerdos que conservarás para siempre.",

      cta_button:
        "Reserva tu sesión",

    },
  },

  it: {
    translation: {

      home: "Home",
      portfolio: "Portfolio",
      journal: "Journal",
      about: "Chi siamo",
      contact: "Contatti",

      hero_subtitle:
        "Fotografia Fine Art & Cinematografica",

      intro_title_1:
        "Fotografia che appare",

      intro_title_2:
        "elegante, emozionale",

      intro_title_3:
        "e senza tempo.",

      intro_text:
        "Creiamo immagini raffinate per coppie, matrimoni, maternità e famiglie, combinando emozioni autentiche e un'estetica editoriale.",

      featured_stories:
        "Storie in evidenza",

      featured_description:
        "Una selezione di sessioni recenti create con emozione, luce e storytelling senza tempo.",

      view_story:
        "Scopri la storia",

      view_portfolio:
        "Vedi tutto il portfolio",

      experience_subtitle:
        "L'esperienza Golden Light",

      experience_title_1:
        "Più di fotografie.",

      experience_title_2:
        "Esperienze memorabili.",

      experience_text:
        "Crediamo che la fotografia debba essere naturale, elegante e profondamente personale.",

      connection_title:
        "Connessione autentica",

      connection_text:
        "Le fotografie più significative nascono quando le persone si sentono a proprio agio e presenti nel momento.",

      detail_title:
        "Attenzione ai dettagli",

      detail_text:
        "Ogni immagine viene realizzata con cura, dalla luce alla composizione fino all'emozione.",

      storytelling_title:
        "Storytelling senza tempo",

      storytelling_text:
        "Creiamo storie visive che conservano emozioni e ricordi per gli anni a venire.",

      cta_title_1:
        "La tua storia merita",

      cta_title_2:
        "di essere ricordata.",

      cta_text:
        "Trasformiamo momenti autentici in ricordi che conserverai per sempre.",

      cta_button:
        "Prenota la tua sessione",

    },
  },

  en: {
    translation: {

      home: "Home",
      portfolio: "Portfolio",
      journal: "Journal",
      about: "About us",
      contact: "Contact",

      hero_subtitle:
        "Fine Art & Cinematic Photography",

      intro_title_1:
        "Photography that feels",

      intro_title_2:
        "elegant, emotional",

      intro_title_3:
        "and timeless.",

      intro_text:
        "We create refined imagery for couples, weddings, motherhood and families, blending authentic emotions with an editorial aesthetic.",

      featured_stories:
        "Featured Stories",

      featured_description:
        "A curated collection of recent sessions crafted with emotion, light and timeless storytelling.",

      view_story:
        "View Story",

      view_portfolio:
        "View Full Portfolio",

      experience_subtitle:
        "The Golden Light Experience",

      experience_title_1:
        "More than photographs.",

      experience_title_2:
        "Meaningful experiences.",

      experience_text:
        "We believe photography should feel natural, elegant and deeply personal.",

      connection_title:
        "Authentic Connection",

      connection_text:
        "The most meaningful photographs are created when people feel comfortable and connected to the moment.",

      detail_title:
        "Attention to Detail",

      detail_text:
        "Every image is crafted with intention, care and attention to light, composition and emotion.",

      storytelling_title:
        "Timeless Storytelling",

      storytelling_text:
        "We create visual stories that preserve memories and emotions for years to come.",

      cta_title_1:
        "Your story deserves",

      cta_title_2:
        "to be remembered.",

      cta_text:
        "We transform authentic moments into memories you'll treasure forever.",

      cta_button:
        "Book Your Session",

    },
  },

};

i18n
  .use(initReactI18next)
  .init({

    resources,

    lng:
      localStorage.getItem(
        "language"
      ) || "es",

    fallbackLng: "es",

    interpolation: {
      escapeValue: false,
    },

  });

export default i18n;