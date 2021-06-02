<template>
<div id="leaderboard">
    <PageTitle :title=title />
    <IconBar />
    <RankCard 
        :isCardYou="true"
        :username="`Username`"
        :rank="`1`"
        :distance="`2834`"
        :profilePic="`https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png`"
    />
    <RankCard 
        :isCardYou="false"
        :username="`Username`"
        :rank="`1`"
        :distance="`2834`"
        :profilePic="`https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png`"
    />
    <RankCard 
        :isCardYou="false"
        :username="`Username`"
        :rank="`1`"
        :distance="`2834`"
        :profilePic="`https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png`"
    />
    <router-link to="/signup">Signup</router-link>
    <router-link to="/login">Login</router-link>
</div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'
import IconBar from '../components/IconBar.vue'
import RankCard from '../components/RankCard.vue'

export default {
    name: 'Leaderboard',
    components: {
        PageTitle,
        IconBar,
        RankCard
    },
    data() {
        return {
            title: 'Leaderboard'
        }
    }
}
</script>

<style scoped>
svg {
    stroke: #999;
    fill: none;
    height: 25px;
    width: 25px;
}
</style>