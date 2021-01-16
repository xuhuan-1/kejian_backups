"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upLoad = void 0;

var types = _interopRequireWildcard(require("./utils.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//获取元素
var upLoad = types.$('upLoad'),
    uploadBox = types.$('uploadBox'),
    // 目标区域的盒子
img_box = types.$('img_box'),
    //ul
ul = types.$('ul'); // 阻止浏览器默认行为

exports.upLoad = upLoad;

document.ondragover = function (e) {
  e.preventDefault();
};

document.ondragend = function (e) {
  e.preventDefault();
};

document.ondrop = function (e) {
  e.preventDefault();
};

img_box.ondrop = function _callee2(e) {
  var file, newLoadList, BASE64, frag;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(e);
          file = e.dataTransfer.files;
          file = Array.from(file);

          if (!(file.length == 0)) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return");

        case 5:
          newLoadList = [];
          file.forEach(function (item, index) {
            newLoadList[index] = {
              card: null,
              base64: null,
              file: item
            };
          });
          console.log(file);
          _context2.next = 10;
          return regeneratorRuntime.awrap(Promise.all(file.map(function (item) {
            return types.fileReader(item);
          })));

        case 10:
          BASE64 = _context2.sent;
          console.log(BASE64);
          frag = document.createDocumentFragment();
          BASE64.forEach(function (item, index) {
            var card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = "<img src=\"".concat(item, "\"/>\n                            <div class=\"progress\">\n                                <div class=\"line\"></div>\n                            </div>\n                            <div class=\"mark\"></div>");
            frag.appendChild(card);
            newLoadList[index].card = card;
            newLoadList[index].base64 = item;
            var create_Img = document.createElement('img');
            create_Img.src = item;
            console.log(create_Img);
            img_box.appendChild(create_Img);
          });
          uploadBox.appendChild(frag);
          _context2.next = 17;
          return regeneratorRuntime.awrap(types.delay(3000000));

        case 17:
          newLoadList.forEach(function _callee(item, index) {
            var card, base64, file, data, response;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    card = item.card, base64 = item.base64, file = item.file;
                    data = {
                      chunk: base64,
                      filename: file.name
                    };
                    _context.next = 4;
                    return regeneratorRuntime.awrap(types.postMessage('single2', Qs.stringify(data), {
                      headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                      },
                      onUploadProgress: function onUploadProgress(ev) {
                        var s = ev.loaded / ev.total * 100 + '%';
                        card.querySelector('.line').style.width = s;
                      }
                    }));

                  case 4:
                    response = _context.sent;

                    if (response.code == 0) {// card.remove();
                    }

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //暴漏文件