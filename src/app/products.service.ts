import { Good } from './goods/goods.component';
const ph = "../../assets/images/sizors.png";
const ph1 = "../../assets/images/goods/1.jpg";
const ph2 = "../../assets/images/goods/2.jpg";
const ph3 = "../../assets/images/goods/3.jpg";
const ph4 = "../../assets/images/goods/4.jpg";

export class GoodsService{
    goods:Good[] = [
        {
          Id:1, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Color:"Синий (Blue)",
          Image: ph1,
          Photoes: [
             ph1, ph2, ph3, ph4 
          ]
        },
        {
          Id:2, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Color:"Синий (Blue)",
          Image: ph1,
          Photoes: [
             ph1, ph2, ph3, ph4 
          ]
        },
        {
          Id:3, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Color:"Синий (Blue)",
          Image: ph1,
          Photoes: [
             ph1, ph2, ph3, ph4 
          ]
        },
        {
          Id:4, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Color:"Синий (Blue)",
          Image: ph1,
          Photoes: [
             ph1, ph2, ph3, ph4 
          ]
        },
        {
          Id:5, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Color:"Синий (Blue)",
          Image: ph1,
          Photoes: [
             ph1, ph2, ph3, ph4 
          ]
        },
        {
          Id:6, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Color:"Синий (Blue)",
          Image: ph1,
          Photoes: [
             ph1, ph2, ph3, ph4 
          ]
        },
        {
          Id:7, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Color:"Синий (Blue)",
          Image: ph1,
          Photoes: [
             ph1, ph2, ph3, ph4 
          ]
        },
        {
          Id:8, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Color:"Синий (Blue)",
          Image: ph1,
          Photoes: [
             ph1, ph2, ph3, ph4 
          ]
        },
        {
          Id:9, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Color:"Синий (Blue)",
          Image: ph1,
          Photoes: [
             ph1, ph2, ph3, ph4 
          ]
        }
  
        
      ];

    getProduct(id){
        return this.goods.find(x => x.Id==id);
    }
}