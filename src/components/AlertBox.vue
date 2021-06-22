<template>
  <v-container fluid ma-0 pa-0 fill-width>
    <v-dialog v-model="display" max-width="800px">
      <v-card>
        <v-card-title class="headline">Debug</v-card-title>
        <v-card-text>
          <pre>{{ textToDisplay }}</pre>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data: () => {
    return {
      textToDisplay: "",
      display: false,
    };
  },

  async mounted() {
    this.$bus.$on("alert", (data) => {
      this.textToDisplay = data;
      this.display = true;
    });

    },

  methods: {},
};
</script>
