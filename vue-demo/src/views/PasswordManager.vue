<template>
  <v-layout justify-center mt-5 mx-4>
    <v-flex xs12 sm11 md10 lg8 xl6>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row justify-start mb-3>
            <v-flex shrink mr-3>
              <v-icon large>shield</v-icon>
            </v-flex>
            <v-flex>
              <div class="title">Passwords</div>
              <div class="subheading">View and Manage all your passwords</div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout align-center>
            <v-flex>
              <v-select
                :items="categories"
                label="Category"
                item-text="name"
                return-object
                v-model="selectedCategory"
                hint="View passwords in specific categories."
                persistent-hint
                style="width: 220px"
              ></v-select>
            </v-flex>
            <v-flex shrink>
              <v-btn color="primary" @click="addNewPassword">
                <v-icon left>add_circle</v-icon>Add
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 mt-3>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs12 mt-3>
          <div v-if="isLoadingPasswords" class="text-xs-center">
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
          </div>
          <div
            v-else-if="filteredPasswords.length === 0"
            class="title text-xs-center"
          >{{ selectedCategory.id === 0 ? 'You have no passwords yet. Get going and add some.' : 'No passwords in this category.' }}</div>
          <v-list v-else two-line>
            <v-list-tile v-for="password in filteredPasswords" :key="password.id">
              <v-list-tile-content>
                <v-list-tile-title>{{ password.appName }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ password.appUrl }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple @click="copyPasswordToClipboard(password.id)">
                  <v-icon color="grey">filter_none</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey" @click="editExistingPassword(password.id)">edit</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey" @click="deleteExistingPassword(password.id)">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import { AzkabanService } from '../services/AzkabanService';

export default {
  methods: {
    addNewPassword() {
      this.$router.push('/password');
    },

    editExistingPassword(id) {
      this.$router.push(`/password/${id}`);
    },

    deleteExistingPassword(id) {
      AzkabanService.deletePassword(id);
      let passwordToDelete = this.passwords.find(password => password.id);
      let index = this.passwords.indexOf(passwordToDelete);
      this.passwords.splice(index, 1);
    },

    copyPasswordToClipboard(id) {
      let passwordToCopy = AzkabanService.getPassword(id);
      AzkabanService.copyToClipboard(passwordToCopy.password);
    }
  },
  computed: {
    filteredPasswords() {
      console.log('Selected category: ', this.selectedCategory);
      if (!this.passwords) {
        return [];
      }

      if (this.selectedCategory.id !== 0) {
        return this.passwords.filter(
          password => password.category === this.selectedCategory.id
        );
      } else {
        return this.passwords;
      }
    }
  },
  mounted() {
    this.isLoadingPasswords = true;
    AzkabanService.getPasswords()
      .then(passwords => {
        this.passwords = passwords;
        this.isLoadingPasswords = false;
      })
      .catch(() => {
        this.isLoadingPasswords = false;
      });
  },
  data() {
    return {
      categories: AzkabanService.categories,
      selectedCategory: AzkabanService.categories[0],
      passwords: [],
      isLoadingPasswords: false
    };
  }
};
</script>
