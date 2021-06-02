<template>
    <div id="signup">
        <PageTitle :title=pageTitle />

        <div id="signup-form">
            <form action="">
                
                <div v-if="currentStep == 1" id="step-1">
                    <div id="form-section-username" class="form-text-input">
                        <label for="input-username">Username</label>
                        <input type="text" name="username" id="input-username" v-model="input.username">
                        <span class="focus-border"></span>
                    </div>

                    <div id="form-section-email" class="form-text-input">
                        <div class="input-checkmark">
                            <label for="input-email">Email</label>
                            <svg id="email-validated-icon" class="svg-inactive" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>    
                        </div>

                        <input type="email" name="email" id="input-email" v-model="input.email">
                        <span class="focus-border"></span>
                    </div>
                </div>

                <div v-else-if="currentStep == 2" id="step-2">
                    <div id="form-section-password" class="form-text-input">
                        <div class="input-checkmark">
                            <label for="input-match-password">Password</label>
                            <svg id="password-validated-icon" class="svg-inactive" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>    
                        </div>

                        <input type="password" name="password" id="input-password" v-model="input.password">
                        <span class="focus-border"></span>
                    </div>

                    <div id="form-section-match-password" class="form-text-input">
                        <div class="input-checkmark">
                            <label for="input-match-password">Re-type Password</label>
                            <svg id="password-matches-icon" class="svg-inactive" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>    
                        </div>

                        <input type="password" name="matchPassword" id="input-match-password" v-model="input.passwordMatch">
                        <span class="focus-border"></span>
                    </div>
                </div>
                
            <button v-if="currentStep != maxStep" id="next-form-page" class="btn submit-inactive" @click.prevent="currentStep++" disabled>Next</button>
            <button v-if="currentStep == maxStep" id="submit-page" class="btn submit-inactive" @click.prevent="submitForm()" disabled>Finish</button>
            </form>
        </div>
    </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'

export default {
    name: 'Signup',
    components: {
      PageTitle
    },
    data() {
      return {
        pageTitle: "Signup",
        currentStep: 1,
        maxStep: 2,
        input: {
          username: "",
          email: "",
          password: "",
          passwordMatch: ""
        }
      }
    },
    computed: {
      validateEmail() {
        if(this.input.email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/))
          return true
        else
          return false
      },
      page1Complete() {
        if(this.input.username && this.input.email && this.validateEmail) {
          return true
        }

        return false
      },
      validatePassword() {
        if(this.input.password.match(/[a-zA-Z0-9]*/)) {
          console.log("Heyaa")
          return true
        }

        return false
      },
      matchPassword() {
        if(this.input.password === this.input.passwordMatch &&
          (this.input.password !== "" || this.input.passwordMatch !== "")) {
          return true
        }

        return false
      },
      page2Complete() {
        if(this.validatePassword && this.matchPassword) {
          return true
        }

        return false
      },
      formComplete() {
        if(this.page1Complete && this.page2Complete) {
          return true
        }

        return false
      }
    },
    watch: {
      validateEmail(val) {
        if(val){
          document.getElementById('email-validated-icon').classList.remove('svg-inactive')
          document.getElementById('email-validated-icon').classList.add('svg-active')
        }
        else {
          document.getElementById('email-validated-icon').classList.add('svg-inactive')
          document.getElementById('email-validated-icon').classList.remove('svg-active')
        }
      },
      page1Complete(val) {
        if(val){
          document.getElementById('next-form-page').classList.remove('submit-inactive')
          document.getElementById('next-form-page').classList.add('submit-active')
          document.getElementById('next-form-page').removeAttribute('disabled')
        }
        else {
          document.getElementById('next-form-page').classList.add('submit-inactive')
          document.getElementById('next-form-page').classList.remove('submit-active')
          document.getElementById('next-form-page').setAttribute('disabled', 'true')
        }
      },
      validatePassword(val) {
        if(val){
          document.getElementById('password-validated-icon').classList.remove('svg-inactive')
          document.getElementById('password-validated-icon').classList.add('svg-active')
        }
        else {
          document.getElementById('password-validated-icon').classList.add('svg-inactive')
          document.getElementById('password-validated-icon').classList.remove('svg-active')
        }
      },
      matchPassword(val) {
        if(val){
          document.getElementById('password-matches-icon').classList.remove('svg-inactive')
          document.getElementById('password-matches-icon').classList.add('svg-active')
        }
        else {
          document.getElementById('password-matches-icon').classList.add('svg-inactive')
          document.getElementById('password-matches-icon').classList.remove('svg-active')
        }
      },
      page2Complete(val) {
        if(val){
          document.getElementById('submit-page').classList.remove('submit-inactive')
          document.getElementById('submit-page').classList.add('submit-active')
          document.getElementById('submit-page').removeAttribute('disabled')
        }
        else {
          document.getElementById('submit-page').classList.add('submit-inactive')
          document.getElementById('submit-page').classList.remove('submit-active')
          document.getElementById('submit-page').setAttribute('disabled', 'true')
        }
      }
    },
    methods: {
      submitForm() {
        alert("Done")
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