import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../User";
import { Button, Form, Modal } from 'semantic-ui-react';

function SignUp({addUserToState}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const {refreshUser} = useContext(UserContext)
    const navigate = useNavigate();

    const user = {
        username: username,
        password: password,
        email: email,
        image: image
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
            .then(r => {
                if (r.ok){
                    r.json().then(addUserToState(user))
                    refreshUser()
                    navigate('/projects')
                } else {
                    console.log('failure')
                }
            })
        e.target.reset()
    }

    return (
        <div className="proflow-body">
            <div className="signup-container">
                <div className="signup-welcome">
                </div>
                <Modal
                    className="signup-modal"
                    trigger={<button className="signup-button">Sign Up</button>}
                >
                    
                    <div className="signup-modal-grid">
                        <div className="signup-image-container">
                            <img className="signup-image" src="https://i.imgur.com/67b562j.png" alt="signup pic" />
                        </div>
                        <div className="signup-content">
                        <Modal.Header className="signup-header">Create a New Account</Modal.Header>
                        <br/><br/><br/>
                            <Modal.Content>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Field>
                                        <label className="signup-labels">Username</label>
                                        <input
                                            onChange={(e) => setUsername(e.target.value)}
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label className="signup-labels">Password</label>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label className="signup-labels">Email Address</label>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label className="signup-labels">Profile Photo URL</label>
                                        <input
                                            onChange={(e) => setImage(e.target.value)}
                                            type="text"
                                            name="image"
                                            placeholder="Profile Photo URL"
                                        />
                                    </Form.Field>
                                    <Button type="submit" className="submit-button">Sign Up</Button>
                                </Form>
                            </Modal.Content>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default SignUp;
