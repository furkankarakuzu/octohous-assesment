<template>
  <v-app>
    <v-main>
      <v-btn
        v-if="deleteWaiting"
        icon
        color="info"
        @click="cancelDelete"
        class="cancel-delete-btn"
      >
        <v-icon>mdi-cached</v-icon>
      </v-btn>
      <v-row justify="center" class="mt-5">
        <v-col cols="10" sm="8" md="4" lg="4">
          <v-card ref="form">
            <v-card-text>
              <div>
                <textarea
                  placeholder="Your text here"
                  id="text-input"
                  v-model="postText"
                  rows="4"
                ></textarea>
                <div class="post-image-container" v-if="uploadedImage">
                  <button id="x" @click="uploadedImage = null">X</button>
                  <img class="post-image" :src="uploadedImage" />
                </div>
              </div>
              <div class="d-flex">
                <div>
                  <input
                    id="fileInput"
                    accept="image/png, image/gif, image/jpeg"
                    type="file"
                    @change="onChange"
                    hidden
                  />
                  <v-btn
                    size="x-small"
                    icon
                    elevation="0"
                    style="rotate: -45deg"
                    @click="openFileInput('fileInput')"
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
                <v-btn color="primary" @click="savePost"> Submit </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" v-for="(post, index) in posts" :key="index">
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
                    <span class="post-date">
                      {{
                        post.editedDate
                          ? "was held on " +
                            dayjs(post.editedDate).format("DD.MM.YYYY HH:mm")
                          : dayjs(post.createdDate).format("DD.MM.YYYY HH:mm")
                      }}
                    </span>
                    <p>
                      <span class="text-primary font-weight-bold me-2"
                        >Jane Doe</span
                      >
                      <span v-if="!post.editPost">
                        {{ post.text }}
                      </span>
                      <span class="d-flex justify-space-between" v-else>
                        <input
                          style="border: 1px solid gray"
                          type="text"
                          class="w-100 pa-2"
                          v-model="post.text"
                        />
                        <v-btn color="primary" @click="updatePost(post)">
                          Edit
                        </v-btn>
                      </span>
                    </p>

                    <div class="post-image-container mt-2" v-if="post.image">
                      <button
                        id="x"
                        @click="post.image = null"
                        v-if="post.editPost"
                      >
                        X
                      </button>
                      <img class="post-image" :src="post.image" />
                      <div v-if="post.editPost">
                        <input
                          id="editFileInput"
                          accept="image/png, image/gif, image/jpeg"
                          type="file"
                          @change="onChange($event, post)"
                          hidden
                        />
                        <v-btn
                          size="x-small"
                          icon
                          elevation="0"
                          style="rotate: -45deg"
                          @click="openFileInput('editFileInput')"
                        >
                          <vue-feather
                            size="18"
                            stroke="#00000029"
                            type="paperclip"
                          ></vue-feather>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <div>
                <v-btn size="small" icon elevation="0" @click="likePost(post)">
                  <LikeIcon />
                  <span class="ms-1" style="color: #00000029">{{
                    post.like
                  }}</span>
                </v-btn>
                <v-btn
                  size="small"
                  icon
                  elevation="0"
                  @click="dislikePost(post)"
                >
                  <UnlikeIcon />
                  <span class="ms-1" style="color: #00000029">{{
                    post.dislike
                  }}</span>
                </v-btn>
              </div>
              <v-spacer></v-spacer>
              <div>
                <v-btn
                  size="small"
                  @click="post.editPost = true"
                  icon
                  elevation="0"
                >
                  <EditIcon />
                </v-btn>
                <v-btn
                  size="small"
                  icon
                  elevation="0"
                  @click="deletePost(post)"
                >
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
import Axios from "axios";
import dayjs from "dayjs";
export default {
  name: "App",
  data: () => ({
    //new post variables
    postText: "",
    posts: [],
    uploadedImage: null,
    /**/
    likedPosts: [],
    //delete variables
    deleteWaiting: false,
    deleteWaitingTimeOut: null,
    deletedPost: null,
    /**/
    dayjs,
  }),
  methods: {
    async getPosts() {
      try {
        const res = await Axios.get("http://localhost:3000/posts");
        this.posts = res.data;
        this.posts.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
      } catch (error) {
        console.log(error);
      }
    },

    //SAVE FUNCTION
    async savePost() {
      try {
        let data = {
          text: this.postText,
          createdDate: new Date(),
          like: 0,
          dislike: 0,
          image: this.uploadedImage,
        };
        await Axios.post("http://localhost:3000/posts", data);
        await this.getPosts();
        this.postText = "";
        this.uploadedImage = null;
      } catch (error) {
        console.log(error);
      }
    },

    //LIKE/DISLIKE FUNCTIONS
    async likePost(post) {
      if (localStorage.getItem("dislikedPosts")) {
        let ids = localStorage.getItem("dislikedPosts").split(",");
        if (ids.includes(post.id.toString())) {
          post.dislike--;
          let index = ids.indexOf(post.id.toString());
          ids.splice(index, 1);
          localStorage.setItem("dislikedPosts", ids.join(","));
        }
      }
      if (localStorage.getItem("likedPosts")) {
        let ids = localStorage.getItem("likedPosts").split(",");
        if (ids.includes(post.id.toString())) {
          post.like--;
          let index = ids.indexOf(post.id.toString());
          ids.splice(index, 1);
        } else {
          ids = [...ids, post.id];
          post.like++;
        }
        localStorage.setItem("likedPosts", ids.join(","));
      } else {
        post.like++;
        localStorage.setItem("likedPosts", post.id);
      }
      try {
        await Axios.put(`http://localhost:3000/posts/${post.id}`, post);
        await this.getPosts();
      } catch (error) {
        console.log(error);
      }
    },
    async dislikePost(post) {
      if (localStorage.getItem("likedPosts")) {
        let ids = localStorage.getItem("likedPosts").split(",");
        if (ids.includes(post.id.toString())) {
          post.like--;
          let index = ids.indexOf(post.id.toString());
          ids.splice(index, 1);
          localStorage.setItem("likedPosts", ids.join(","));
        }
      }
      if (localStorage.getItem("dislikedPosts")) {
        let ids = localStorage.getItem("dislikedPosts").split(",");
        if (ids.includes(post.id.toString())) {
          post.dislike--;
          let index = ids.indexOf(post.id.toString());
          ids.splice(index, 1);
        } else {
          ids = [...ids, post.id];
          post.dislike++;
        }
        localStorage.setItem("dislikedPosts", ids.join(","));
      } else {
        post.dislike++;
        localStorage.setItem("dislikedPosts", post.id);
      }
      try {
        await Axios.put(`http://localhost:3000/posts/${post.id}`, post);
        await this.getPosts();
      } catch (error) {
        console.log(error);
      }
    },

    //FILE UPLOAD FUNCTIONS
    openFileInput(id) {
      document.getElementById(id).click();
    },
    onChange(event, post = null) {
      const file = event.target.files[0];

      if (post) {
        post.image = URL.createObjectURL(file).toString();
      } else {
        this.uploadedImage = URL.createObjectURL(file);
      }
    },

    //UPDATE FUNCTION
    async updatePost(post) {
      try {
        post.editedDate = new Date();
        delete post.editPost;
        await Axios.put(`http://localhost:3000/posts/${post.id}`, post);
        this.editPost = false;
        await this.getPosts();
      } catch (error) {
        console.log(error);
      }
    },
    //DELETE FUNCTIONS
    async deletePost(post) {
      this.deleteWaiting = true;
      this.deletedPost = post;
      if (localStorage.getItem("likedPosts")) {
        let ids = localStorage.getItem("likedPosts").split(",");
        if (ids.includes(post.id.toString())) {
          post.like--;
          let index = ids.indexOf(post.id.toString());
          ids.splice(index, 1);
          localStorage.setItem("likedPosts", ids.join(","));
        }
      }
      if (localStorage.getItem("dislikedPosts")) {
        let ids = localStorage.getItem("dislikedPosts").split(",");
        if (ids.includes(post.id.toString())) {
          post.dislike--;
          let index = ids.indexOf(post.id.toString());
          ids.splice(index, 1);
          localStorage.setItem("dislikedPosts", ids.join(","));
        }
      }
      try {
        await Axios.delete(`http://localhost:3000/posts/${post.id}`);
        await this.getPosts();
      } catch (error) {
        console.log(error);
      }
      try {
        await Axios.post(`http://localhost:3000/deletedPosts`, post);
      } catch (error) {
        console.log(error);
      }
      this.deleteWaitingTimeOut = setTimeout(async () => {
        this.deleteWaiting = false;
      }, 10000);
    },
    async cancelDelete() {
      clearTimeout(this.deleteWaitingTimeOut);
      try {
        await Axios.delete(
          `http://localhost:3000/deletedPosts/${this.deletedPost.id}`
        );
      } catch (error) {
        console.log(error);
      }
      try {
        await Axios.post(`http://localhost:3000/posts`, this.deletedPost);
        await this.getPosts();
      } catch (error) {
        console.log(error);
      }
      this.deletedPost = null;
      this.deleteWaiting = false;
    },
  },
  async beforeMount() {
    await this.getPosts();
    this.likedPosts = [localStorage.getItem("likedPosts")] || [];
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

.post-image {
  max-width: 100%;
  height: auto;
}

.cancel-delete-btn {
  position: fixed;
  right: 40px;
  bottom: 40px;
}

.post-image-container {
  width: 80%;
  /*border-radius: 25px;*/
  overflow: visible;
  position: relative;
}
#x {
  position: absolute;
  background: #9b59b6;
  color: white;
  top: -10px;
  right: -10px;
  padding: 3px 7px;
  border-radius: 50%;
}
</style>
