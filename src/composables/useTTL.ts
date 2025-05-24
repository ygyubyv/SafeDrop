import { computed, ref } from "vue";

export const useTTL = () => {
  const fileTTL = ref("1h");

  const hour = 1 * 60 * 60;
  const options = {
    "1h": 1 * hour,
    "12h": 12 * hour,
    "1d": 24 * hour,
    "7d": 24 * 7 * hour,
  } as Record<string, number>;

  const TTL = computed(() => {
    return options[fileTTL.value];
  });

  return { fileTTL, TTL };
};
