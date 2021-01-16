window.onload = () => {
  // 获取元素当前属性值
  // function getStyle(ele,attr){
  //     return getComputedStyle ? window.getComputedStyle(ele,null)[attr]:ele.currentStyle[attr];
  // }
  // let root = document.getElementById('root')
  // console.log(root);
  // 强类型转换
  // console.log(parseInt(getStyle(root,'width'))); //400
  // 隐式类型转换
  // console.log(getStyle(root,'width')*1);
  // 双精度问题造成的
  // let a = 0.1;  //0.0001100110011001
  // let b = 0.2;
  // let c = a + b;
  // 解决方案一 toFixed()
  // console.log(Number(c.toFixed(1)));
  // 解决方案二 parseFloat配合toFixed()
  // console.log(parseFloat(c.toFixed(1)));
  // 解决方案三 插件
  // bignumber.js
  // parseInt():接收两个参数，第一个是你的字符串，第二个参数是
  // 转换的进制，进制范围在2-36之间，如果超出当前进度范围则返回
  // NaN,如果解析不了，都返回NaN
  // parseInt第二个参数，如果为0，则以10进制进行解析，如果为0x或者
  // 0X，则以16进制解析数据
  // console.log(parseInt("10"));         //返回 10
  // console.log(parseInt("19",10));      //返回 19
  // console.log(parseInt("11",2));       //返回 3
  // console.log(parseInt("17",8));       //返回 15
  // console.log(parseInt("1f",16));      //返回 31
  // console.log(parseInt('100px',0));       //NaN
  // item index arr
  // let arr = [1,2,3].map((item,index,arr) =>{
  //     return parseInt(item,index,arr) //
  // })
  // [1,0,[1,2,3]] ===>[1]
  // [2,1,[1,2,3]] ===>[1,NaN]
  // [3,2,[1,2,3]] ===>[1,NaN,NaN]
  // console.log(arr); //[1, NaN, NaN]
  // let arr = [3,4,5,8,7].map(parseInt);
  // console.log(arr);
  //  0 1 2 3 4
  // [3,NaN,NaN,NaN,NaN]
  // 1 1 1 1
  // c= 1*2
};

let arr = {
  buildId: "Bd11010810022dceae9d1f7011eba9f819190059ee2d",
  buildName: "新项目广场",
  floor: [
    {
      floorId: "Fl110108100244fc5e0e1f7011eba9f8b714922f83fe",
      floorName: "一楼",
      floorMap: "b2b5a2130cf511eabf9667e7f714e00e.jsonz",
      points: [
        {
          id: "1334708999032987650",
          number: "1185",
          pointName: "巡更点1185",
          pointType: "1",
          projectId: "Pj1101081002",
          spaceId: "11516",
          floorId: "Fl110108100244fc5e0e1f7011eba9f8b714922f83fe",
          buildId: "Bd11010810022dceae9d1f7011eba9f819190059ee2d",
          spaceName: "家庭等候 1185",
          floorName: "一楼",
          buildName: "新项目广场",
          floorMap: "b2b5a2130cf511eabf9667e7f714e00e.jsonz",
          location: "新项目广场一楼",
          coordinate: {
            x: "121921.02267050315",
            y: "-71609.80413950927",
          },
          qrCode: "POINT_ID:1338689757826928641.png",
          createId: "4e8c1c6ce4ba4631997985b31f082331",
          createName: "lijian",
          createTime: "20201215113804",
          updateTime: "20201216153636",
        },
        {
          id: "1339067925750509569",
          number: "44555",
          pointName: "手术梯1146",
          pointType: "1",
          projectId: "Pj1101081002",
          spaceId: "11199",
          floorId: "Fl110108100244fc5e0e1f7011eba9f8b714922f83fe",
          buildId: "Bd11010810022dceae9d1f7011eba9f819190059ee2d",
          spaceName: "手术梯3 1146",
          floorName: "一楼",
          buildName: "新项目广场",
          floorMap: "b2b5a2130cf511eabf9667e7f714e00e.jsonz",
          location: "新项目广场一楼",
          coordinate: {
            x: "107577.11902066931",
            y: "-67876.34902312991",
          },
          qrCode: "POINT_ID:1339067925750509569.png",
          createId: "4e8c1c6ce4ba4631997985b31f082331",
          createName: "lijian",
          createTime: "20201216124048",
          updateTime: "20201216145409",
        },
      ],
    },
    {
      floorId: "Fl1101081002cf056ee22f2411eb8e396d1f1a4efbef",
      floorName: "三楼",
      floorMap: "2.jsonz",
      points: [
        {
          id: "1339584414484164610",
          number: "111",
          pointName: "111",
          pointType: "1",
          projectId: "Pj1101081002",
          spaceId: "10194",
          floorId: "Fl1101081002cf056ee22f2411eb8e396d1f1a4efbef",
          buildId: null,
          spaceName: "空间 1",
          floorName: "三楼",
          buildName: "",
          floorMap: "2.jsonz",
          location: "三楼",
          coordinate: {
            x: "-49187.439332271155",
            y: "-48452.178884704525",
          },
          qrCode: "POINT_ID:1339584414484164610.png",
          createId: "4e8c1c6ce4ba4631997985b31f082331",
          createName: "lijian",
          createTime: "20201217225307",
          updateTime: "20201217225307",
        },
      ],
    },
    {
      floorId: "Fl11010810024a56743f1f7011eba9f855b20b19583f",
      floorName: "二楼",
      floorMap: "1.jsonz",
      points: null,
    },
  ],
};

// if (this.dataArr.length) {
  this.handelTree(this.dataArr, "children", (item, parent) => {
    this.$set(item, "parent", parent);
    this.$set(item, "checked", false);
    this.$set(item, "open", true);

    item.id = item.id || item.floorId || item.buildId;
    item.name = item.pointName || item.floorName || item.buildName;
    item.children = item.floor || item.points || [];

    this.reduceData.push(item);
    if (item.checked) {
      this.$refs.treeParent.treeItem = item;
      this.$refs.treeParent.lastTreeItem = item;
    }
  });
// }

function handelTree(list = [], key, cb) {
  (function fn(list = [], parent) {
    list.forEach((item) => {
      cb(item, parent);
      if (Array.isArray(item[key]) && item[key].length) fn(item[key], item);
    });
  })(list);
}

