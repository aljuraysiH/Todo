import * as yup from "yup";

export const initialValues = { email: "" };

export const resetSchema = yup.object().shape({
  email: yup.string().email("ادخل ايميل صحيح").required("الإيميل مطلوب").trim(),
});
