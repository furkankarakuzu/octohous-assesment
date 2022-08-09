<template>
  <v-app>
    <v-main>
      <v-row justify="center">
        <v-col cols="10" sm="8" md="4" lg="4">
          <v-card ref="form">
            <v-card-text>
              <!-- <v-textarea
                outlined
                clearable
                auto-grow
                rows="3"
                placeholder="Your text here"
              ></v-textarea> -->
              <textarea
                placeholder="Your text here"
                id="text-input"
                rows="4"
              ></textarea>
              <div class="d-flex">
                <div>
                  <v-btn
                    size="x-small"
                    icon
                    elevation="0"
                    style="rotate: -45deg"
                  >
                    <vue-feather
                      size="18"
                      stroke="#00000029"
                      type="paperclip"
                    ></vue-feather>
                  </v-btn>
                  <v-btn size="x-small" icon elevation="0">
                    <vue-feather
                      size="18"
                      stroke="#00000029"
                      type="smile"
                    ></vue-feather>
                  </v-btn>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="primary"> Submit </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    submit() {
      console.log("hey");
    },
  },
};
</script>

<style>
body {
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
}
#text-input {
  width: 100%;
  opacity: 1;
  padding: 8px;
  margin: 4px 0;
  resize: none;
  height: auto;
}

#text-input:focus-visible {
  outline: 0;
  border-style: none;
}
</style>
