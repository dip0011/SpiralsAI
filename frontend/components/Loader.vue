<template>
    <div class="mt-4 flex flex-col justify-center items-center">
        <div class="loader"></div>
        <p class="text-xs text-gray-600 mt-2">This can take anywhere between 20-30s to run</p>
    </div>
</template>
  
<style scoped>
.loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
  