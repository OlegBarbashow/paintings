import modals from './modules/modals';
import sliders from "./modules/sliders";

window.addEventListener('DOMContentLoaded', () =>{
   'use strict';

   modals();
   sliders('.feedback-slider-item', 'horizontal', '.main-next-btn', '.main-prev-btn');
   sliders('.main-slider-item', 'vertical');


















});