<template>
  <v-app>
    <v-main>
      <v-row justify="center">
        <v-col cols="10" sm="8" md="4" lg="4">
          <v-card ref="form">
            <v-card-text>
              <v-text-field
                ref="name"
                v-model="name"
                :rules="[() => !!name || 'This field is required']"
                :error-messages="errorMessages"
                label="Full Name"
                placeholder="John Doe"
                required
              ></v-text-field>
              <v-text-field
                ref="address"
                v-model="address"
                :rules="[
                  () => !!address || 'This field is required',
                  () =>
                    (!!address && address.length <= 25) ||
                    'Address must be less than 25 characters',
                  addressCheck,
                ]"
                label="Address Line"
                placeholder="Snowy Rock Pl"
                counter="25"
                required
              ></v-text-field>
              <v-text-field
                ref="city"
                v-model="city"
                :rules="[
                  () => !!city || 'This field is required',
                  addressCheck,
                ]"
                label="City"
                placeholder="El Paso"
                required
              ></v-text-field>
              <v-text-field
                ref="state"
                v-model="state"
                :rules="[() => !!state || 'This field is required']"
                label="State/Province/Region"
                required
                placeholder="TX"
              ></v-text-field>
              <v-text-field
                ref="zip"
                v-model="zip"
                :rules="[() => !!zip || 'This field is required']"
                label="ZIP / Postal Code"
                required
                placeholder="79938"
              ></v-text-field>
              <v-autocomplete
                ref="country"
                v-model="country"
                :rules="[() => !!country || 'This field is required']"
                :items="countries"
                label="Country"
                placeholder="Select..."
                required
              ></v-autocomplete>
              <div class="d-flex">
                <v-btn text> Cancel </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary"> Normal Button </v-btn>
              </div>
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
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
  background: #34495e;
}
</style>
