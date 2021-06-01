import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card'

class Profile extends React.Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        return (
            <>
                {/* {isAuthenticated && <>
                    <img src={user.picture} alt=''></img>
                    <h1>{user.name}</h1>
                    <h2>{user.email}</h2>
                </>} */}
                
                <Card style={{ width: '18rem' }}>
                        <Card.Title> <h1>{user.name}</h1></Card.Title>
                        {isAuthenticated && <> <Card.Img variant="top" src={user.picture} alt='' />  </>}
                               <Card.Body>
                        <Card.Text>
                        <h2>{user.email}</h2>
                         </Card.Text>
                     
                    </Card.Body>
                </Card>
            </>
        )
    }
}

// const Profile = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0();

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }

//   return (
//     isAuthenticated && (
//       <div>
//         <img src={user.picture} alt={user.name} />
//         <h2>{user.name}</h2>
//         <p>{user.email}</p>
//       </div>
//     )
//   );
// };

export default withAuth0(Profile);