<template>
  <h3 class="page-title">{{ title }}</h3>
</template>

<script>
export default {
    name: 'PageTitle',
    props: {
        title: String
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
</style>