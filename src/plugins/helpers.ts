import { type ToastType, useToast } from "vue-toast-notification";

const $toast = useToast();

export function showNotification(type: ToastType, message: string) {
  $toast.open({
    position: "top-right",
    duration: 3000,
    type,
    message,
  });
}

export function normalizeDate(date: number) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat(navigator.language, options).format(new Date(date));
}

export const handleFetchErrors = async (response: Response) => {
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    let message = `HTTP ${response.status} ${response.statusText}`;

    if (contentType?.includes("application/json")) {
      const errorBody = await response.json();
      message += `: ${JSON.stringify(errorBody)}`;
    } else {
      const text = await response.text();
      message += `: ${text}`;
    }

    throw new Error(message);
  }

  return response;
};
