<template>
  <v-app>
    <v-main>
      <v-row justify="center">
        <v-col cols="10" sm="8" md="4" lg="4">
          <v-card ref="form">
            <v-card-text>
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
      <v-row justify="center">
        <v-col cols="10" sm="8" md="4" lg="4">
          <v-card>
            <v-card-text class="d-flex">
              <v-row>
                <v-col cols="1"
                  ><v-avatar color="primary" size="40">
                    <img
                      alt="user"
                      width="40"
                      height="40"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTAHbPcscIvQSrHqnMkd4hI2VOfZJ2ZtTgVg&usqp=CAU"
                    />
                  </v-avatar>
                </v-col>
                <v-col class="ms-4" cols="10"
                  ><div>
                    <span class="post-date">30.08.2022 12:39</span>
                    <p>
                      <span class="text-primary font-weight-bold"
                        >Jane Doe</span
                      >
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Animi alias esse dicta placeat
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <div>
                <v-btn size="small" icon elevation="0">
                  <LikeIcon />
                  <span class="ms-1" style="color: #00000029">0</span>
                </v-btn>
                <v-btn size="small" icon elevation="0">
                  <UnlikeIcon />
                  <span class="ms-1" style="color: #00000029">0</span>
                </v-btn>
              </div>
              <v-spacer></v-spacer>
              <div>
                <v-btn size="small" icon elevation="0">
                  <EditIcon />
                </v-btn>
                <v-btn size="small" icon elevation="0">
                  <DeleteIcon />
                </v-btn>
              </div>
            </v-card-actions>
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

.post-date {
  font-size: 11px;
  color: #99a4ae;
}
</style>
