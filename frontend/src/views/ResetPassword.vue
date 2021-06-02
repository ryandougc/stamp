<template>
<div id="resetPasssword">
    <PageTitle :title=title />

    <div id="signup-form">
        <form action="">
            <div id="form-section-current-password" class="form-text-input">
                <label for="input-current-password">Current Password</label>
                <input type="password" name="currentPassword" id="input-current-password" v-model="input.currentPassword">
                <span class="focus-border"></span>
            </div>

            <div id="form-section-new-password" class="form-text-input">
                <div class="input-checkmark">
                    <label for="input-new-password">New Password</label>
                    <svg id="new-password-validated-icon" class="svg-inactive" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>    
                </div>

                <input type="password" name="newPassword" id="input-new-password" v-model="input.newPassword">
                <span class="focus-border"></span>
            </div>

            <div id="form-section-match-password" class="form-text-input">
                <div class="input-checkmark">
                    <label for="input-match-password">Re-type New Password</label>
                    <svg id="match-password-validated-icon" class="svg-inactive" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>    
                </div>

                <input type="password" name="matchPassword" id="input-match-password" v-model="input.matchPassword">
                <span class="focus-border"></span>
            </div>

            <button id="submit-reset-form" class="btn submit-inactive" disabled>Submit</button>
        </form>
    </div>
</div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'

export default {
    name: 'ResetPassword',
    components: {
        PageTitle
    },
    data() {
        return {
            title: "Reset Password",
            input: {
                currentPassword: "",
                newPassword: "",
                matchPassword: ""
            }
        }
    },    
    computed: {
        newPassword() {
            if(this.input.newPassword !== "") return true

            return false
        },
        newPasswordsMatch() {
            if(this.input.newPassword === this.input.matchPassword) return true

            return false
        },
        formComplete() {
            if(this.input.currentPassword !== "" &&
                this.newPasswordsMatch &&
                this.input.newPassword !== "" &&
                this.input.matchPassword !== ""
            ) return true

            return false
        }
    },
    watch: {
        newPassword(val) {
            if(val) {
                document.getElementById('new-password-validated-icon').classList.remove('svg-inactive')
                document.getElementById('new-password-validated-icon').classList.add('svg-active')
            } else {
                document.getElementById('new-password-validated-icon').classList.remove('svg-active')
                document.getElementById('new-password-validated-icon').classList.add('svg-inactive')
            }
        },
        newPasswordsMatch(val) {
            if(val) {
                document.getElementById('match-password-validated-icon').classList.remove('svg-inactive')
                document.getElementById('match-password-validated-icon').classList.add('svg-active')
            } else {
                document.getElementById('match-password-validated-icon').classList.remove('svg-active')
                document.getElementById('match-password-validated-icon').classList.add('svg-inactive')
            }
        },
        formComplete(val) {
            if(val) {
                document.getElementById('submit-reset-form').classList.remove('submit-inactive')
                document.getElementById('submit-reset-form').classList.add('submit-active')
                document.getElementById('submit-reset-form').removeAttribute('disabled')
            } else {
                document.getElementById('submit-reset-form').setAttribute('disabled', 'true')
                document.getElementById('submit-reset-form').classList.remove('submit-active')
                document.getElementById('submit-reset-form').classList.add('submit-inactive')
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
            margin-bottom: 35%;

            font-family: Satoshi;
            font-style: normal;
            font-weight: 500;
            font-size: 1rem;
            color: #888888;
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

        .btn {
            position:absolute;
            bottom:5%;
            right: 15%;
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

        .input-checkmark {
            display: flex;
            justify-content: space-between;
        }

        .input-checkmark svg {
            width: 22px;
            height: 22px;
            fill: none;
        }

        .svg-inactive {
            stroke: #999;
        }
        .svg-active {
            stroke: #10AC84;
        }

</style>