import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import constants from "~/services/constants";
import "./LoginModal.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import * as locketService from "~/services/locketService";
import * as securityService from "~/services/securityService";

const LoginModal = ({ handleAfterLogin, onPleaseWait, ...props }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        toast.info("Logging in ....", {
            ...constants.toastSettings,
        });

        const { encryptedEmail, encryptedPassword } =
            securityService.encryptLoginData(email, password);
        const res = await locketService.login(
            encryptedEmail,
            encryptedPassword,
            onPleaseWait,
        );
        if (res) {
            handleAfterLogin(res);
        } else {
            toast.dismiss();
            toast.error("Username or password is incorrect", {
                ...constants.toastSettings,
            });
        }
    };

    const handleEnterOnInput = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <Modal {...props} size="sm" centered className="modal-size">
            <Modal.Header closeButton>
                <header className="title-wrapper">
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                </header>
            </Modal.Header>
            <Modal.Body>
                <Form autoComplete="off">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="custom-label">Email</Form.Label>
                        <Form.Control
                            className={"bs-input"}
                            type="text"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="none"
                            onKeyDown={handleEnterOnInput}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mt-3">
                        <Form.Label className="custom-label">
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            className={"bs-input"}
                            onKeyDown={handleEnterOnInput}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={handleLogin}
                    className="btn-login"
                    disabled={!email || !password}
                >
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

LoginModal.propTypes = {
    handleAfterLogin: PropTypes.func,
    onHide: PropTypes.func,
    onPleaseWait: PropTypes.func,
};

export default LoginModal;
