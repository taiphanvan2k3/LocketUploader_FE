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
import { validateEmail } from "~/helper/misc-functions";
import images from "~/assets/images";

const LoginModal = ({ handleAfterLogin, onPleaseWait, ...props }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabledSubmit, setIsDisabledSubmit] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");

    const handleLogin = async () => {
        toast.dismiss();
        const toastId = toast.info("Logging in ....", {
            ...constants.toastSettings,
        });

        const { encryptedEmail, encryptedPassword } =
            securityService.encryptLoginData(email, password);

        setIsDisabledSubmit(true);

        const res = await locketService.login(
            encryptedEmail,
            encryptedPassword,
            onPleaseWait,
        );

        if (res) {
            handleAfterLogin(res);
        } else if (toast.isActive(toastId)) {
            toast.update(toastId, {
                ...constants.toastSettings,
                render: "Username or password is incorrect",
                type: "error",
            });
        } else {
            toast.dismiss();
            toast.error("Username or password is incorrect", {
                ...constants.toastSettings,
            });
        }
        setIsDisabledSubmit(false);
    };

    const handleEnterOnInput = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        if (e.target.value && !validateEmail(e.target.value)) {
            setEmailErrorMessage("Invalid email");
            setIsDisabledSubmit(true);
        } else {
            setEmailErrorMessage("");
            setIsDisabledSubmit(false);
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
                        <Form.Label className="custom-label">
                            {emailErrorMessage ? (
                                <span style={{ color: "red" }}>
                                    {emailErrorMessage}
                                </span>
                            ) : (
                                "Email"
                            )}
                        </Form.Label>
                        <Form.Control
                            className={"bs-input"}
                            type="text"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleChangeEmail}
                            autoComplete="none"
                            onKeyDown={handleEnterOnInput}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mt-3">
                        <Form.Label className="custom-label">
                            Password
                        </Form.Label>
                        <div className="password-wrapper">
                            <Form.Control
                                type={isShowPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                className={"bs-input"}
                                onKeyDown={handleEnterOnInput}
                            />
                            {
                                <button
                                    className="show-password"
                                    type="button"
                                    onMouseDown={() => setIsShowPassword(true)}
                                    onMouseUp={() => setIsShowPassword(false)}
                                    onTouchStart={() => setIsShowPassword(true)}
                                    onTouchEnd={() => setIsShowPassword(false)}
                                >
                                    {isShowPassword ? (
                                        <img src={images.eye} alt="eye" />
                                    ) : (
                                        <img
                                            src={images.noEye}
                                            alt="eye-slash"
                                        />
                                    )}
                                </button>
                            }
                        </div>
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
                    disabled={!email || !password || isDisabledSubmit}
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
