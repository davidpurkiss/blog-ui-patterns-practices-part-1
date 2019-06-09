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
          <pre v-highlightjs="vue"><code class="javascript"></code></pre>
        </v-tab-item>
        <v-tab-item :key="`react`">
          <pre v-highlightjs="react"><code class="javascript"></code></pre>
        </v-tab-item>
        <v-tab-item :key="`angular`">
          <pre v-highlightjs="angular"><code class="javascript"></code></pre>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>
<script>
import vueCode from '../static/crud-pattern-2-vue.txt'
import reactCode from '../static/crud-pattern-2-react.txt'
import angularCode from '../static/crud-pattern-2-angular.txt'
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

