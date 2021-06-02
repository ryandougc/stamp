<template>
<div id="login">
    <PageTitle :title=title />

    <div id="signup-form">
        <form action="">
            <div id="form-section-username" class="form-text-input">
                <label for="input-username">Username</label>
                <input type="text" name="username" id="input-username" v-model="input.username">
                <span class="focus-border"></span>
            </div>

            <div id="form-section-password" class="form-text-input">
                <label for="input-password">Password</label>
                <input type="password" name="password" id="input-password" v-model="input.password">
                <span class="focus-border"></span>
            </div>

            <div id="forgot-password">
                <router-link to="/resetPassword">Forgot Password?</router-link>
            </div>

            <button id="submit-login-form" class="btn submit-inactive" disabled>Login</button>
        </form>      
    </div>
</div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'

export default {
    name: 'Login',
    components: {
        PageTitle
    },
    data() {
        return {
            title: "Login",
            input: {
                username: "",
                password: ""
            }
        }
    },
    computed: {
        formComplete() {
            if(this.input.username !== "" && this.input.password !== "") return true

            return false
        }
    },
    watch: {
        formComplete(val) {
            if(val) {
                document.getElementById('submit-login-form').classList.remove('submit-inactive')
                document.getElementById('submit-login-form').classList.add('submit-active')
                document.getElementById('submit-login-form').removeAttribute('disabled')
            } else {
                document.getElementById('submit-login-form').setAttribute('disabled', 'true')
                document.getElementById('submit-login-form').classList.remove('submit-active')
                document.getElementById('submit-login-form').classList.add('submit-inactive')
            }
        }
    }
}
</script>

<style scoped>
.page-title {
    font-family: 'Satoshi', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 1.5rem;
    color: #555555;

    margin-left: 8%;
    margin-top: 5%;
}

#signup-form {
    padding: 15%;
    margin-top: 10%;
}

.form-text-input {
    width: 100%;

    font-family: Satoshi;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    color: #888888;
}
.form-text-input:first-of-type {
    margin-bottom: 35%;
}


.form-text-input input {
    display: block;
    width: 100%;
    margin-top: 15px;

    font-family: Satoshi;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    color: #666;

    border: 0;
    border-bottom: 1px solid #999;

    transition: width 1s;
}


.form-text-input input:focus {
    outline-color: transparent;
    outline-style: none;
}

.form-text-input input:focus~.focus-border {
    transform: scaleX(1) translateY(-2px);
    opacity: 1;
}

.focus-border {
    background-color: #0ABDE3;
    height: 2px;
    width: 100%;
    display: block;
    transform: scaleX(0) translateY(-2px);
    transform-origin: 0%;
    opacity: 0;
    transition: all 150ms linear;
}

#forgot-password {
    margin-top: 10px;
    text-align: right;
}

#forgot-password a {
    color: #999;
    text-decoration: none;

    font-family: Satoshi;
    font-size: 0.9rem;
    font-weight: 300;
    color: #999999;
}

#forgot-password a:hover {
    color: #666;
}

.btn {
    position:absolute;
    bottom:5%;
    right: 15%;
}

.submit-active {
    background-color: #fff;
    border: 1px solid #10AC84;
    border-radius: 5px;
    padding: 1px 12px 4px 12px;

    font-family: Satoshi;
    font-style: normal;
    font-weight: 500;
    font-size: 1.25rem;
    color: #10AC84;
}

.submit-inactive {
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 1px 12px 4px 12px;

    font-family: Satoshi;
    font-style: normal;
    font-weight: 500;
    font-size: 1.25rem;
    color: #888888;
}
</style>