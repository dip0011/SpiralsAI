<template>
    <div>
        <img
            :src="src"
            alt="AI-Generated Spiral"
            class="w-96 h-96 drop-shadow border rounded-lg border-2"
        />
    </div>
</template>
  
<script>
export default {
    props: {
        src: String,
    },
};
</script>
  