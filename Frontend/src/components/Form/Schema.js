import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup.string().email("ادخل ايميل صحيح").required("الإيميل مطلوب").trim(),
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(6, "كلمة السر لاتقل عن ٦ خانات")
    .trim(),
});
