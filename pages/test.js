import withData from "../lib/withData"; //import  
import { gql, graphql } from "react-apollo";//import
import styled from "styled-components";
import { Button } from "antd";

//CSS Space -------------------------------------------------------------------------------------------

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 400px;
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  margin: auto;
  margin-right: 20px;
`;

const DivB = styled.div`margin-bottom: 10px;`;

const Avatar = styled.div`
  background-image: url(https://www.w3schools.com/howto/img_avatar.png);
  background-size: 100% 100%;
  height: 200px;
  background-repeat: no-repeat;
`;

const Container = styled.div`
  padding: 10px;
  margin-bottom: 10px;
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #333333;
`;

const Li = styled.li`float: left;`;

//CSS Space END -------------------------------------------------------------------------------------------



// Create Components

const ListOfLawyer = ({ data: { loading, error, allCats } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Ul>
      {allCats.map((ch, i) => (
        <Li key={ch._id}>
          <Card>
            <Container>
              <Avatar />
              <DivB>{ch.name}</DivB>
              <DivB>Cat1 {i}</DivB>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  alert(ch.name);
                }}
              >
                Meaw
              </Button>
            </Container>
          </Card>
        </Li>
      ))}
    </Ul>
  );
};

// ขอ Query มาใช้
const lawyerIsListQuery = gql`
  {
    allCats {
      _id
      name
      age
    }
  }
`;

const ShowList = graphql(lawyerIsListQuery)(ListOfLawyer); // Regist Component ||||

const AdminPage = withData(ShowList);

export default AdminPage;

//ตัวอย่างไว้ Copy

// return (
//   <Ul>
//       {allCats.map((ch, i) => (
//         <Li key={ch.id}>
//           <Card>
//             <Container>
//               <Avatar />
//               <DivB>{ch.name}</DivB>
//               <DivB>Cat1 {i}</DivB>
//               <Button
//                 size="large"
//                 type="primary"
//                 htmlType="submit"
//                 onClick={() => {
//                   alert(ch.name);
//                 }}
//               >
//                 Meaw
//               </Button>
//             </Container>
//           </Card>
//         </Li>
//       ))}
//     </Ul>
//   );
// };
// );
