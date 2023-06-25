import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleChangeEmail(evt) {
        setEmail(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.handleRegistration({ email, password });
    }

    return (
        <section className="registration">
            <h2 className="registration__title">Регистрация</h2>
            <form className="registration__form" name="reg-form" onSubmit={handleSubmit}>
                <input className="registration__input registration__input_email"
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={handleChangeEmail}
                    value={email || ""}
                    required
                />
                <input className="registration__input registration__input_password"
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    onChange={handleChangePassword}
                    value={password || ""}
                    required
                />
                <button className="registration__submit-btn"
                    type="submit">Зарегистрироваться</button>
            </form>
            <Link className="registration__footer" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </section>
    );
}

export default Register;