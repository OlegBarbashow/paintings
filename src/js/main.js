import modals from './modules/modals';
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";

window.addEventListener('DOMContentLoaded', () =>{
   'use strict';

   modals();
   sliders('.feedback-slider-item', 'horizontal', '.main-next-btn', '.main-prev-btn');
   sliders('.main-slider-item', 'vertical');
   forms();
   mask('[name = "phone"]');










});