<template>
  <div>
    <v-tabs fixed-tabs>
      <v-tab :key="`vue`">
        Vue
      </v-tab>
      <v-tab :key="`react`">
        React
      </v-tab>
      <v-tab :key="`angular`">
        Angular
      </v-tab>
      <v-tabs-items>
        <v-tab-item :key="`vue`">
          <pre v-highlightjs="vue"><code class="html"></code></pre>
        </v-tab-item>
        <v-tab-item :key="`react`">
          <pre v-highlightjs="react"><code class="html"></code></pre>
        </v-tab-item>
        <v-tab-item :key="`angular`">
          <pre v-highlightjs="angular"><code class="html"></code></pre>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>
<script>
import vueCode from '../static/basic-control-practices-attribute-ordering-vue.txt'
import reactCode from '../static/basic-control-practices-attribute-ordering-react.txt'
import angularCode from '../static/basic-control-practices-attribute-ordering-angular.txt'
export default {
  data() {
    return {
      vue: vueCode,
      react: reactCode,
      angular: angularCode
    }
  }
}
</script>
<style>
code {
  width: 100%;
}
</style>

