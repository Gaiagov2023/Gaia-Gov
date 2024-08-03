export const style = {
  width: { xs: "100%", sm: "calc(50% - 14px)", md: "calc(20% - 14px)" },
};

export const headers = [
  { label: "Name", align: "left" },
  { label: "Email", align: "left" },
  { label: "Title", align: "left" },
  { label: "Votes", align: "left" },
  { label: "Actions", align: "right" },
];

export const inputFields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter last name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
  },
  {
    name: "title",
    label: "Title",
    placeholder: "Enter title",
  },
  {
    name: "noOfVotes",
    type: "number",
    label: "No of Votes",
    placeholder: "Enter no of votes",
  },
];

export const initialObj = {
  firstName: "",
  lastName: "",
  email: "",
  title: "",
  noOfVotes: 0,
};
