import { Good } from './goods/goods.component';
const ph = "../../assets/images/sizors.png";


export class GoodsService{
    goods:Good[] = [
        {
          Id:1, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Image: ph
        },
        {
          Id:2, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Image: ph
        },
        {
          Id:3, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Image: ph
        },
        {
          Id:4, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Image: ph
        },
        {
          Id:5, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Image: ph
        },
        {
          Id:6, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Image: ph
        },
        {
          Id:7, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Image: ph
        },
        {
          Id:8, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Image: ph
        },
        {
          Id:9, 
          Name:"Имя", 
          Description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, nemo. Distinctio et necessitatibus labore voluptatibus ab, dolor aperiam sunt totam obcaecati magnam eligendi! Quisquam, ratione velit ab natus porro blanditiis.",
          Price:0.00,
          Image: ph
        }
  
        
      ];

    getProduct(id){
        return this.goods.find(x => x.Id==id);
    }
}