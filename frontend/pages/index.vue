<template>
  <default-layout>
    <!-- Title -->
    <h1 class="text-5xl tracking-tight font-bold mt-8">Spirals</h1>

    <!-- Description -->
    <p class="text-center text-sm text-gray-600 mt-4 w-80">
      Generate beautiful AI spiral art with one click. Powered by
      <span class="text-black font-semibold">Vercel</span> and
      <span class="text-black font-semibold">Replicate</span>.
    </p>

    <!-- AI Prompt Input -->
    <spiral-prompt
      v-model="aiPrompt"
      @send-prompt="sendPrompt"
      :loading="isLoading"
    ></spiral-prompt>

    <!-- Photo Count Label -->
    <p class="text-gray-500 text-xs mb-1">
      41.9K photos generated and counting!
    </p>

    <!-- AI-Generated Image -->
    <spiral-image
      v-if="!isLoading && aiGeneratedImage"
      :src="aiGeneratedImage"
    ></spiral-image>

    <!-- Loader & White Box -->
    <div v-else>
      <div class="flex justify-center items-center w-96 h-96 bg-white drop-shadow border rounded-lg border-2">
        <div class="mt-4 flex flex-col justify-center items-center">
          <loader v-if="isLoading"></loader>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SpiralPrompt from "@/components/SpiralPrompt.vue";
import SpiralImage from "@/components/SpiralImage.vue";
import Loader from "@/components/Loader.vue";

export default {
  components: {
    DefaultLayout,
    SpiralPrompt,
    SpiralImage,
    Loader,
  },
  data() {
    return {
      aiPrompt: "",
      aiGeneratedImage: "",
      isLoading: false,
    };
  },
  methods: {
    async sendPrompt(aiPrompt) {
      try {
        // Show the loader
        this.isLoading = true;
        this.aiPrompt = aiPrompt;

        const response = await this.$axios.post('/imageGeneration/prompt', {
          prompt: aiPrompt,
        });
         this.aiGeneratedImage = response.data.url;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Hide the loader
        this.isLoading = false;
      }
    },
  },
};
</script>
