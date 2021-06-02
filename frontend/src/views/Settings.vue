<template>
<div id="settings">
    <PageTitle :title=title />

    <div class="page-seperator"></div>

    <h5 class="page-header">Account</h5>
    <div id="account-settings">
        <div id="account-settings-forms">
            <form action="">
                <div id="form-section-username" class="form-text-input">
                    <div class="input-edit-btn">
                        <label for="input-username">Username</label>
                        <svg id="edit-username-icon" @click="usernameDisabled = !usernameDisabled" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </div>
                    <input type="text" name="username" id="input-username" :disabled="usernameDisabled" :value=user.username >
                    <span class="focus-border"></span>
                </div>
            </form>

            <div class="form-seperator"></div>

            <form action="">
                <div id="form-section-email" class="form-text-input">
                    <div class="input-edit-btn">
                        <label for="input-email">Email</label>
                        <svg id="edit-email-icon" @click="emailDisabled = !emailDisabled" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </div>
                        <input type="email" name="email" id="input-email" :disabled="emailDisabled" :value=user.email>
                        <span class="focus-border"></span>
                </div>
            </form>
        </div>
        
        <div class="page-seperator"></div>

        <div id="account-settings-links">
            <router-link to="/resetPassword">Change Password</router-link>
        </div>
    </div>

    <h5 class="page-header">Legal Stuff</h5>
    <div id="legal-links">
        <a href="">Terms & Conditions</a>
        <a href="">Privacy Policy</a>
        <a href="">Delete Account</a>
    </div>
</div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'

export default {
    name: "Settings",
    components: {
        PageTitle
    },
    data() {
        return {
            title: "Settings",
            user: {
                username: "Username",
                email: "Email@email.com"
            },
            usernameDisabled: true,
            emailDisabled: true
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

.page-header {
    margin-left: 8%;

    font-family: 'Satoshi', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 0.8rem;
    color: #555555;
}

#account-settings {
    padding: 15%;
    padding-top: 8%;
}

.form-text-input {
    width: 100%;

    font-family: Satoshi;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    color: #888888;
}

.page-seperator {
    display:block;
    height: 50px;
}

.form-seperator {
    display:block;
    height: 100px;
}
.account-settings-form{
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

.form-text-input input:disabled {
    color: #999;
    background-color: transparent;
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

.input-edit-btn {
    display: flex;
    justify-content: space-between;
}

.input-edit-btn svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: #999
}

#account-settings-links a {
    color: #666;
    text-decoration: none;

    font-family: Satoshi;
    font-style: normal;
    font-weight: 500;
    font-size: 1.2rem;
    color: #555;
    transition: 150ms;
}

#account-settings-links a:hover {
    color:#0ABDE3;
    transition: 150ms;
}

#legal-links {
    padding: 5% 15%;

    display: flex;
    flex-direction: column;
}

#legal-links a {
    color: #666;
    text-decoration: none;

    padding: 5px;

    font-family: Satoshi;
    font-style: normal;
    font-weight: 500;
    font-size: 1.2rem;
    color: #555;
    transition: 150ms;
}

#legal-links a:hover {
    color:#0ABDE3;
    transition: 150ms;
}
</style>