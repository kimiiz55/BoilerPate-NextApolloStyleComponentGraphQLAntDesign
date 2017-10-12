import withData from "../lib/withData"; //import  
import { gql, graphql } from "react-apollo";//import 


/* by Chanom CPE/SIIT 25

ตัวอย่างง่ายสุดในสามโลกก 555555  
 styled Component กับ Antd อยู่หน้า test.js นะครับ

 */


//1. query ก็อบจากหน้า http://localhost:3000/graphiql   

const query = gql`   
  { 
    allCats {
      name
      age
    }
  }
`;

//2. อันนี้คือ Component ของเราสร้างแบบง่าย ๆ div แล้ว map ออกมามันจะเรียงให้แบบนี้
const index = ({ data: { allCats } }) => (
  <div>
    <ul>{allCats.map((u, i) => <li key={i}> {u.name} </li>)}</ul>
  </div>
);

//3. ผูก Query กับ Component 
const GraphqlIndex = graphql(query)(index);  //grapgql(query)(component) คือ โยน query ใส่ใน component 

export default withData(GraphqlIndex); //withData(GraphqlIndex) component ที่ผูก query มาแล้วอันบนอ่ะ

