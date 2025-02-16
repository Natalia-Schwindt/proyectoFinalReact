export const password = {
  required: true,
  minLength: {
    value: 6,
    message: "El mínimo de carácteres es 6",
  },
  maxLength: {
    value: 8,
    message: "El máximo de carácteres es 8",
  },
};

export const username = {
  required: true,
  minLength: {
    value: 3,
    message: "El mínimo de carácteres es 3",
  },
  maxLength: {
    value: 20,
    message: "El máximo de carácteres es 20",
  },
}

export const email = {
  required: true,
}