export const headers = [
  { label: "Title", align: "left" },
  { label: "URL", align: "left" },
  { label: "Date of vote", align: "left" },
  { label: "POC", align: "left" },
  { label: "Actions", align: "right" },
];

export const inputFields = [
  {
    name: "title",
    label: "Bill title",
    placeholder: "Enter bill title",
  },
  {
    name: "url",
    label: "Bill URL",
    type: "url",
    placeholder: "Enter bill url",
  },
];

export const initialObj = {
  title: "",
  url: "",
  date: null,
};
