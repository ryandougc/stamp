<template>
<div id="icon-bar">
    <span id="search">
        <svg v-on:click="activateSearch()" id="search-icon" class="search-icon" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>

        <div id="search-bar" style="display: none;">
            <div>
                <input type="text">
                <span class="focus-border"></span>
            </div>

            <svg class="close-search-icon" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
    </span>

    <router-link to="/settings">
        <svg fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    </router-link>
</div>
</template>

<script>
export default {
    name: 'IconBar',
    data() {
        return {
            searchActive: false
        }
    },
    methods: {
        activateSearch() {
            if(this.searchActive === false) {
                this.searchActive = true

                document.getElementById('search-bar').style.display = "flex"
                document.getElementById('search-icon').classList.add('search-icon-clicked')
            } else if(this.searchActive === true) {
                this.searchActive = false
                document.getElementById('search-bar').style.display = "none"
               document.getElementById('search-icon').classList.remove('search-icon-clicked')
            }
        }
    }
}
</script>

<style scoped>
#icon-bar {
    margin-top: 15px;
    padding: 8%;

    display: flex;
    justify-content: space-between;
}

#icon-bar #search {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
}

#icon-bar .search-icon {
    border: 2px solid transparent;
    background-color: transparent;
    border-radius: 50px;
    padding: 3px;
    stroke: #999;
    margin-right: 15px;
    cursor: pointer;
}

#icon-bar .search-icon-clicked {
    border: 2px solid #0ABDE3;
    background-color: #0ABDE3;
    border-radius: 50px;
    padding: 3px;
    stroke: #fff;
    margin-right: 15px;
}

#icon-bar #search-bar {
    display: flex;
    flex-direction: row;
    justify-content: left;
}

#icon-bar input {
    display: block;
    width: 100%;

    font-family: Satoshi;
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    color: #666;

    border: 0;
    border-bottom: 1px solid #999;

    transition: width 1s;
}

#icon-bar input:focus {
    outline-color: transparent;
    outline-style: none;
}

#icon-bar input:focus~.focus-border {
    transform: scaleX(1) translateY(-2px);
    opacity: 1;
}

#icon-bar .focus-border {
    background-color: #0ABDE3;
    height: 2px;
    width: 100%;
    display: block;
    transform: scaleX(0) translateY(-2px);
    transform-origin: 0%;
    opacity: 0;
    transition: all 150ms linear;
}

#icon-bar .close-search-icon,
#icon-bar .close-search-icon path {
    transform: scale(0.8);
}
</style>