/**
 * Assignment 1:
 * implement a function that returns scaled image list for given canvas size
 * 
 * Problem:
 * Given the list of image objects with different width and height, you need create a function that returns scaled width and height of image object that all fits into canvas
 * 
 * Requirements:
 * implement the logic in pre-defined function fitImagesInCanvas
 * each image can be scaled up or down but the ratio of width and height should remain same, portrait image cannot change to landscape
 * You can scale up or down image as much as needed. There is no limit for it but it cannot exceed width or height of canvas
 * it is expected all scaled width and height values will be rounded into integer values (use Math.round)
 * 
 * 
 * Example:
 * there is a canvas width size 1000x1000
 * const canvas = { width: 1000, height: 1000 }
 *
 * there is a list of images
 * const images = [
 *   { width: 60, height: 50 },
 *   { width: 400, height: 500 },
 *   { width: 300, height: 500 },
 *   { width: 1400, height: 1000 }
 * ];
 * 
 * executing the function
 * const scaledImages = fitImagesInCanvas(canvas, images)
 * 
 * the output of the function should be the list of objects that has scaled width and height
 * { width: 582, height: 485 }, { width: 466, height: 582 }, { width: 349, height: 582 }, { width: 582, height: 416 }
 */

 const canvas = { width: 1000, height: 1000 };
 const images = [
   { width: 60, height: 50 },
   { width: 400, height: 500 },
   { width: 300, height: 500 },
   { width: 1400, height: 1000 }
 ];
 
 function fitImagesToCanvas(canvas, minSize = 1) {
   // implement logic here
 }
 
 // the method result
 const result = fitImagesToCanvas(canvas, images);
 
 // print to dom element
 document.getElementById("output").innerHTML = result ? JSON.stringify(result, null, 4) : "no value is given yet";
 
