"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_1 = require("react-router");
const core_1 = require("@blueprintjs/core");
const graphql_1 = require("../graphql");
const storage_1 = require("../common/storage");
exports.default = react_router_1.withRouter(function Login({ history }) {
    const [form, setForm] = React.useState({
        email: '',
        password: '',
        name: '',
    });
    const [isLogin, setLogin] = React.useState(true);
    const mutationParams = {
        variables: form,
        update: (cache, { data }) => {
            if (!data)
                return;
            const { token, user } = 'login' in data ? data.login : data.register;
            storage_1.updateStorage({ token, user });
            cache.writeData({
                data: {
                    isLoggedIn: true,
                    userData: user,
                },
            });
            // TODO: consider moving this to completed since update might be called multiple times. Moved here since omplete isn't available on the 3rd party hook lib
        },
    };
    const targetMutation = isLogin ? graphql_1.useLoginMutation : graphql_1.useRegisterMutation;
    const [auth] = targetMutation(mutationParams);
    return (React.createElement(React.Fragment, null,
        React.createElement("form", { onSubmit: (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                yield auth();
                history.push('/');
            }) },
            !isLogin && (React.createElement(core_1.FormGroup, { label: "Name", labelFor: "name-input" },
                React.createElement(core_1.InputGroup, { id: "name-input", large: true, leftIcon: "user", onChange: (event) => setForm(Object.assign(Object.assign({}, form), { name: event.target.value })), placeholder: "John Doe", value: form.name }))),
            React.createElement(core_1.FormGroup, { label: "Email", labelFor: "email-input" },
                React.createElement(core_1.InputGroup, { id: "email-input", large: true, type: "email", leftIcon: "envelope", onChange: (event) => setForm(Object.assign(Object.assign({}, form), { email: event.target.value })), placeholder: "you@mail.com", value: form.email })),
            React.createElement(core_1.FormGroup, { label: "Password", labelFor: "password-input" },
                React.createElement(core_1.InputGroup, { id: "password-input", large: true, type: "password", leftIcon: "lock", onChange: (event) => setForm(Object.assign(Object.assign({}, form), { password: event.target.value })), placeholder: "Your password", value: form.password })),
            React.createElement("div", { className: "flex flex-between" },
                React.createElement(core_1.Button, { type: "submit", intent: core_1.Intent.PRIMARY }, isLogin ? 'Login' : 'Register'),
                React.createElement(core_1.Button, { type: "button", onClick: () => setLogin(!isLogin) }, isLogin ? 'Need to create an account?' : 'Already have an account?')))));
});
//# sourceMappingURL=Login.js.map