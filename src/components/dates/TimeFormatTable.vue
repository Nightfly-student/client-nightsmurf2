<template>
  <td class="align-middle">
    {{ dateConverter(order.createdAt) }}
  </td>
</template>

<script>
import moment from "moment";
export default {
  name: "TimeFormatTable",
  props: {
      order: Object,
  },
  methods: {
      dateConverter(date) {
          return moment(date).format("MM D YYYY, h:mm a")
      }
  }
};
</script>

<style></style>
