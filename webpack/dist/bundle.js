/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


/***/ }),

/***/ "./src/TextureLoader.js":
/*!******************************!*\
  !*** ./src/TextureLoader.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n// 方式 1: 导入整个 three.js核心库\r\n\r\n\r\n// 场景代码 ====================================================================\r\n\r\nconst scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\r\nconst camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)\r\ncamera.position.set(0,0,500)\r\nconst renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer();\r\nrenderer.setSize(window.innerWidth, window.innerHeight);\r\ndocument.body.appendChild(renderer.domElement);\r\n\r\n// 创建图形代码 ================================================================\r\n// 创建纹理通过gif\r\nconst texture = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader().load( '/virtual/textures/crate.gif' );\r\nconsole.log(\"[Bowen] ~ file: TextureLoader.js ~ line 16 ~ texture\", texture)\r\nconst geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry( 100, 100, 100 );\r\n// 通过纹理创建材质\r\nconst material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ map: texture } );\r\nvar cube = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material)\r\n// 放入场景\r\nscene.add( cube );\r\n\r\n// 渲染代码 =====================================================================\r\n\r\nfunction animate() {\r\n    requestAnimationFrame(animate);\r\n    renderer.render(scene, camera);\r\n    /*\r\n    2.1 使立方体动起来 \r\n     */\r\n    cube.rotation.x += 0.02;\r\n    cube.rotation.y += 0.02;\r\n}\r\n// 调用\r\nanimate();\r\n\r\n// 调试 ========================================================================\r\n\r\nwindow.cube = cube//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVGV4dHVyZUxvYWRlci5qcy5qcyIsIm1hcHBpbmdzIjoiOztBQUFBO0FBQytCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3Q0FBVztBQUM3QixtQkFBbUIsb0RBQXVCO0FBQzFDO0FBQ0EscUJBQXFCLGdEQUFtQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdEQUFtQjtBQUN2QztBQUNBLHFCQUFxQiw4Q0FBaUI7QUFDdEM7QUFDQSxxQkFBcUIsb0RBQXVCLEdBQUcsZUFBZTtBQUM5RCxlQUFlLHVDQUFVO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aHJlZWpzLy4vc3JjL1RleHR1cmVMb2FkZXIuanM/NWJlZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyDmlrnlvI8gMTog5a+85YWl5pW05LiqIHRocmVlLmpz5qC45b+D5bqTXHJcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuXHJcbi8vIOWcuuaZr+S7o+eggSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuY29uc3Qgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcclxuY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDQ1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4xLCAyMDAwKVxyXG5jYW1lcmEucG9zaXRpb24uc2V0KDAsMCw1MDApXHJcbmNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcclxucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcclxuXHJcbi8vIOWIm+W7uuWbvuW9ouS7o+eggSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIOWIm+W7uue6ueeQhumAmui/h2dpZlxyXG5jb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKS5sb2FkKCAnL3ZpcnR1YWwvdGV4dHVyZXMvY3JhdGUuZ2lmJyApO1xyXG5jb25zb2xlLmxvZyhcIltCb3dlbl0gfiBmaWxlOiBUZXh0dXJlTG9hZGVyLmpzIH4gbGluZSAxNiB+IHRleHR1cmVcIiwgdGV4dHVyZSlcclxuY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoIDEwMCwgMTAwLCAxMDAgKTtcclxuLy8g6YCa6L+H57q555CG5Yib5bu65p2Q6LSoXHJcbmNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgbWFwOiB0ZXh0dXJlIH0gKTtcclxudmFyIGN1YmUgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpXHJcbi8vIOaUvuWFpeWcuuaZr1xyXG5zY2VuZS5hZGQoIGN1YmUgKTtcclxuXHJcbi8vIOa4suafk+S7o+eggSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XHJcbiAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XHJcbiAgICAvKlxyXG4gICAgMi4xIOS9v+eri+aWueS9k+WKqOi1t+adpSBcclxuICAgICAqL1xyXG4gICAgY3ViZS5yb3RhdGlvbi54ICs9IDAuMDI7XHJcbiAgICBjdWJlLnJvdGF0aW9uLnkgKz0gMC4wMjtcclxufVxyXG4vLyDosIPnlKhcclxuYW5pbWF0ZSgpO1xyXG5cclxuLy8g6LCD6K+VID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxud2luZG93LmN1YmUgPSBjdWJlIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/TextureLoader.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TextureLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextureLoader */ \"./src/TextureLoader.js\");\n// import \"./GroupTest\"\r\n// import \"./EdgesGeometryTest\"\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGhyZWVqcy8uL3NyYy9pbmRleC5qcz9iNjM1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBcIi4vR3JvdXBUZXN0XCJcclxuLy8gaW1wb3J0IFwiLi9FZGdlc0dlb21ldHJ5VGVzdFwiXHJcbmltcG9ydCBcIi4vVGV4dHVyZUxvYWRlclwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;