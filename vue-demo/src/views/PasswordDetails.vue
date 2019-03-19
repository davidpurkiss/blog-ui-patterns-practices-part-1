<template>
  <v-layout justify-center mt-5 mx-4>
    <v-flex xs12 sm11 md10 lg8 xl6>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row justify-start>
            <v-flex shrink mr-3>
              <v-icon large>shield</v-icon>
            </v-flex>
            <v-flex>
              <div class="title">{{ isNew ? 'Add new' : 'Edit' }} password</div>
              <div class="subheading">
                {{isNew
                ? 'Add a new password for an app or website.'
                : 'Change the details for your existing password.'}}
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-form>
            <v-text-field v-model="password.appName" label="App/Site Name" required></v-text-field>
            <v-text-field
              v-model="password.appUrl"
              label="App/Site Url"
              hint="Leave blank if not applicable"
            ></v-text-field>
            <v-select
              :items="categories"
              label="Category"
              item-text="name"
              item-value="id"
              v-model="password.category"
            ></v-select>
            <v-text-field v-model="password.username" label="Username"></v-text-field>
            <v-text-field v-model="password.password" label="Password"></v-text-field>
          </v-form>
        </v-flex>
        <v-flex xs12>
          <div class="text-xs-right">
            <v-btn @click="cancel">Cancel</v-btn>
            <v-btn
              @click="save"
              :disabled="isSaving"
              :loading="isSaving"
              color="primary"
            >{{ isNew ? 'Add' : 'Save'}}</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import { AzkabanService } from '../services/AzkabanService';

export default {
  methods: {
    save() {
      this.isSaving = true;
      if (this.isNew) {
        AzkabanService.addPassword(this.password).then(() => {
          this.isSaving = false;
          this.navigateToPasswords();
        });
      } else {
        AzkabanService.updatePassword(this.getId(), this.password).then(() => {
          this.isSaving = false;
          this.navigateToPasswords();
        });
      }
    },

    cancel() {
      this.navigateToPasswords();
    },

    navigateToPasswords() {
      this.$router.push('/passwords');
    },

    getId() {
      if (this.$route) {
        return this.$route.params.id;
      }
    },

    getIsNew() {
      return this.getId() === undefined;
    }
  },
  mounted() {
    if (!this.isNew) {
      this.password = AzkabanService.getPassword(this.getId());
    }
  },
  data() {
    return {
      isNew: this.getIsNew(),
      isSaving: false,
      password: { category: 1 },
      categories: AzkabanService.categories.filter(
        category => category.id !== 0
      )
    };
  }
};
</script>
