<template>
<div :class='`message ${type}`'>
    <div class="color-bar"></div>

    <div class="message-content">
        <span class="message-text">
            <p class="message-type"></p>
            <p class="message-description">{{ msg }}</p>
        </span>

        <svg xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </div>
</div>
</template>

<script>
export default {
    name: "Message",
    props: {
        type: String,
        msg: String
    }
}
</script>

<style scoped>
.success {
    --bar-color: #10AC84;
    --message-content: "Success";
}

.error {
    --bar-color: #ee5253;
    --message-content: "Error";
}

.message {
    position: absolute;
    width: 100vw;

    background-color: #fff;

    font-family: Satoshi;
    font-weight: 700;

    display: flex;
    justify-content: space-between;

    box-shadow: 0px 4px 9px -3px rgba(0,0,0,0.38);
    -webkit-box-shadow: 0px 4px 9px -3px rgba(0,0,0,0.38);
    -moz-box-shadow: 0px 4px 9px -3px rgba(0,0,0,0.38);
}

.message .color-bar {
    width: 4px;
    height: 90px;
    background-color: var(--bar-color);
}

.message-content {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-left: 50px;
    margin-right: 25px;
}

.message .message-content .message-text {
    width: 80%;

}

.message .message-content .message-text .message-type {
    color: #999;
    font-weight: 500;
}

.message .message-content .message-text .message-type:after {
    content: var(--message-content);
}

.message .message-content .message-text .message-description {
    color: #555;
    font-size: 1.2rem;
}
</style>