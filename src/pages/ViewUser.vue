<template>
    <div>
        current user is: {{ $route.params.id }}
{{this.$router.query.user}}
{{$router.query.user}}
        {{$route}}
    </div>
</template>

<script>
    export default {
        name: 'ViewUser',
    }
</script>