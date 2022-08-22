import * as yup from "yup";

export const initialValues = { password: "" };

export const schema = yup.object().shape({
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(6, "كلمة المرور لاتقل عن ٦ خانات")
    .trim(),
});
