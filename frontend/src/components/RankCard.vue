<template>
    <div id="user-ranking-card" class="user-ranking-card">
        <span class="left-side-card">
            <div class="avatar">
                <img :src="profilePic" :alt="`${username}'s Profile Picture`" >
            </div>
            

            <p class="username">{{ username }}</p>
        </span>

        <div class="metrics">
            <p class="rank">#{{ rank }}</p>
            <p class="distance">{{ distance }}km</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "RankCard",
    props: {
        isCardYou: Boolean,
        username: String,
        rank: String,
        distance: String,
        profilePic: String,
    },
    mounted() {
        if(this.isCardYou)
        document.getElementById("user-ranking-card").classList.add('you')
        document.querySelector('.user-ranking-card .distance').style.color = "#FFC084"
    }
}
</script>

<style scoped>
.user-ranking-card {
    padding: 8% 8% 0 8%;

    font-weight: normal;
    font-size: 1.1rem;
    color: #666;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.user-ranking-card .left-side-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.user-ranking-card .avatar {
    width: 50px;
    height: 50px; 

    border-radius: 50px;

    overflow: hidden;
    
    margin-right: 25px;
}

.user-ranking-card .avatar img {
    width: 50px;
}

.user-ranking-card .metrics {
    text-align: center;
}

.user-ranking-card .distance {
    font-size: 0.8rem;
    color: #999;
}

.you {
    color: #FF9F43
}
</style>