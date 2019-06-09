<template>
  <div>
    <pre v-highlightjs="react"><code class="javascript"></code></pre>
  </div>
</template>
<script>
import reactCode from '../static/progress-pattern-2-react.txt'
export default {
  data() {
    return {
      react: reactCode
    }
  }
}
</script>
<style>
code {
  width: 100%;
}
</style>

